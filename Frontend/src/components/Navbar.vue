<template>
  <div class="navbar">
    <div class="dropdown">
      <img
        @mouseenter="status"
        id="profil"
        alt="profil"
        src="../assets/user1.png"
      />
      <div class="dropdown-content profil">
        <!--IF einbauen wenn wir auf den Profil gehen also Mouseenter nur dann soll this.store gezeigt werden-->

        <li id="nameUser">
          Hello
          <!--{{this.$store.state.user[0]}}-->
        </li>

        <li
          id="MeineDaten"
          @click="
            showBox = true;
            checkAndShow();
          "
        >
          Meine Daten
        </li>

        <div class="box" v-if="showBox" @mouseleave="showBox = false">
          <button id="x" @click="showBox = false">X</button>
          <h5 id="email">Email:{{ email }}</h5>
          <h5 id="adresse">Adresse:{{ adresse }}</h5>
        </div>
        <li id="Bestellungen" @click="showBox2Handler">Bestellungen</li>
        <div class="box" v-if="showBox2">
          <button id="x" @click="showBox2 = false">X</button>
          <div
            v-for="bestellungDaten in pageBestellungen"
            :key="bestellungDaten"
          >
            <h6>Bestellnummer:</h6>
            <textarea v-model="bestellungDaten.BESTELL_NR" readonly />
            <h6>Bestellung:</h6>
            <div
              v-for="order in extractOrders(bestellungDaten.ORDER_LIST)"
              :key="order.name"
            >
              <li>Name: {{ order.name }}</li>
              <li>Preis: {{ order.preis }}</li>
            </div>
            <h6>Status</h6>
            <textarea v-model="bestellungDaten.STATUS" readonly />
            <h6>Datum</h6>

            <li>
              {{
                new Date(bestellungDaten.DATUM).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
              }}
            </li>
            <button
              class="rechnungButton"
              @click="printRechnung(bestellungDaten)"
            >
              Rechnung
            </button>
          </div>

          <button @click="previousPage">zurück</button>
          <button @click="nextPage">nächste</button>
        </div>

        <li id="Punkte" @click="showBox3 = true">Punkte</li>
        <div class="box" v-if="showBox3" @mouseleave="showBox3 = false">
          <button id="x" @click="showBox3 = false">X</button>
          <p>Die verfügbare Punkte</p>
        </div>
      </div>
    </div>

    <div class="dropdown" id="drop" @mouseenter="dropcalc">
      <!--<img  id="einkaufswagen" alt="einkaufswagen" src="../assets/einkaufswagen.png">-->
      <img
        src="../assets/shopcar3.gif"
        id="einkaufswagen"
        alt="image description"
      />
      <h6 class="ArtikelSummeWarenkorb">{{ cart.length }}</h6>
      <div class="dropdown-content einkauf">
        <h6>Artikel im Korb:</h6>
        <h6>Artikel</h6>

        <!--For schleife so viele Produkte die gerade reingemacht werden-->
        <ul v-for="item in cart" :key="item.name">
          <li>
            {{ item.name }}
          </li>
          <li>{{ item.preis }}€</li>
          <button class="warenkorbX" @click="removeFromCart(item)">X</button>
        </ul>

        <h6 id="Summe">Summe:{{ cartSumme.toFixed(2) }}€</h6>
        <button class="warenkorbKaufen" @click="toBuy">Kaufen</button>
      </div>
    </div>

    <img
      id="logout"
      alt="logout"
      @click="logout"
      class="logout"
      src="../assets/check-out.png"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import store from "../store";
import { mapState } from "vuex";
import { mapActions } from "vuex";
import jsPDF from "jspdf";

export default {
  name: "Navbar",

  data: () => {
    return {
      // cart:[],
      //cartSumme: 0,

      warenkorb: [],
      //email: "Bitte einloggen",
      adresse: "Bitte einloggen",
      bestellung: ref([]),
      rechnungen: ref([]),
      bestellungDaten: ref([]),
      kunden: ref([]),
      isBuy: false,
      showBox: false,
      showBox2: false,
      showBox3: false,
      currentPage: 1,
      perPage: 1,
    };
  },
  watch: {
    bestellungDaten: {
      handler() {
        console.log("bestellungDaten has changed: ", this.bestellungDaten);

        this.renderNavbar();
      },
      deep: true,
    },
  },

  mounted() {
    this.readData();
  },
  computed: {
    ...mapState({ cart: (state) => state.rechnungen }),
    ...mapState({ cart: (state) => state.cart }),
    ...mapState(["isLoggedIn"]),
    ...mapState(["bestellungen"]),
    email() {
      return this.isLoggedIn
        ? this.$store.state.user[0].email
        : "Bitte einloggen";
    },
    cartSumme() {
      let sum = 0;
      for (const item of this.cart) {
        sum += item.preis;
      }
      const obj = { summe: sum };
      //Zum Array rechnungen wird nur dann die Summe hinzugefügt wenn auf kaufen gedrückt wird.
      return sum;
    },
    sortedBestellungen() {
      return this.bestellung.sort((a, b) => b.BESTELL_NR - a.BESTELL_NR);
    },
    pageBestellungen() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.sortedBestellungen.slice(start, end);
    },
  },
  methods: {
    extractOrders(ORDER_LIST) {
      let orders = JSON.parse(ORDER_LIST);
      return orders.map((order) => {
        return { name: order.name, preis: order.preis };
      });
    },

    showBox2Handler() {
      this.readData(); // rufe die Methode zum Abrufen der Daten auf
      this.showBox2 = true; // setze die Variable auf "true"
    },
    //Pagination
    renderNavbar() {
      this.$forceUpdate();
    },
    nextPage() {
      if (this.currentPage * this.perPage < this.bestellung.length) {
        this.currentPage += 1;
      }
    },
    previousPage() {
      if (this.currentPage - 1 > 0) {
        this.currentPage -= 1;
      }
    },
    //READ ALL Bestellungen
    async readData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/bestellung/${this.email}`
        );
        const response2 = await axios.get("http://localhost:3000/rechnungen");
        this.bestellung = response.data;
        this.rechnung = response2.data;
      } catch (error) {
        console.error(error);
      }
    },

    removeFromCart(item) {
      const index = this.$store.state.cart.indexOf(item);
      this.$store.commit("removeFromCart", index);
    },
    logout() {
      store.commit("SET_LOGGED_IN", false);
      if (!this.isLoggedIn) {
        console.log("Successfully logged out");
        location.reload();
        this.$router.push("/login");
      } else {
        console.log("Failed to log out");
      }
    },
    //...mapActions(['rechnung']),
    toBuy() {
      const items = this.cart;
      const email = this.$store.state.user[0].email;
      const adresse = this.$store.state.user[0].adresse;

      // POST request to insert data into ORDER_MODEL2
      fetch("http://localhost:3000/bestellung", {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          order_list: items,
          kunden_email: email,
          kunden_adresse: adresse,
        }),
      })
        .then((response) => response.json())
        .then(async () => {
          // GET request to fetch data from ORDER_MODEL2 for a particular kunden_email
          const response = await fetch(
            `http://localhost:3000/bestellung/${email}`
          );
          const data = await response.json();

          // Sort the data by date
          data.sort((a, b) => new Date(b.DATUM) - new Date(a.DATUM));

          // Extract the bestell_nr from the data
          const bestell_nr = data[0].BESTELL_NR;
          //console.log( data[0].BESTELL_NR)

          // GET request to fetch data from KUNDENDATEN for a particular email
          const response2 = await fetch(
            `http://localhost:3000/customerdata/${email}`
          );
          const data2 = await response2.json();

          console.log(data2);
          // Extract the kunden_id from the data
          const kunden_id = data2.KUNDEN_ID;

          const sum = this.cartSumme;
          // Create an object containing the required data and push it to the rechnungen array
          const rechnung = {
            bestell_nr: bestell_nr,
            kunden_id: kunden_id,
            summe: sum,
          };
          this.$store.commit("addToRechnungen", rechnung);
          try {
            const response3 = await axios.post(
              "http://localhost:3000/rechnungen",
              {
                bestell_nr: bestell_nr,
                kunden_id: kunden_id,
                summe: sum,
              }
            );

            return response3;
          } catch (error) {
            console.error(error);
          }
        })
        .then((data) => {
          let empty = [];
          this.$store.state.cart = empty;

          this.readData();
        });

      this.isBuy = true;
    },

    //Check für Profil email und adresse
    checkAndShow() {
      if (this.$store.state.isLoggedIn) {
        this.email = this.$store.state.user[0].email;
        this.adresse = this.$store.state.user[0].adresse;
      }
    },

    status() {
      this.readData();
    },
    //Print Rechnung
    printRechnung(rechnungenDaten) {
      const pdf = new jsPDF();
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();

      //Daten aus der "rechnungen" Datenquelle extrahieren
      const rechnungsdaten = this.rechnung.find(
        (r) => r.BESTELL_NR === rechnungenDaten.BESTELL_NR
      );
      const kundenId = rechnungsdaten.KUNDEN_ID;
      const summe = rechnungsdaten.SUMME;

      // Daten aus der "bestellung" Datenquelle extrahieren
      const bestellungsdaten = this.bestellung.find(
        (b) => b.BESTELL_NR === rechnungenDaten.BESTELL_NR
      );
      const kundenAdresse = bestellungsdaten.KUNDEN_ADRESSE;
      const datum = bestellungsdaten.DATUM;

      pdf.text("Max Mustermann", 120, 10);
      pdf.text("Mahlzeit", 120, 20);
      pdf.text("Fiktiv Straße 43", 120, 30);
      pdf.text("7077 Göttingen", 120, 40);
      pdf.text("Telefon: 030 - 12 34 56-9", 120, 50);
      pdf.text("Telefax: 030 - 12 34 56-8", 120, 60);
      pdf.text("USt-Id-Nr.: DE 986534232 ", 120, 70);

      pdf.text(
        "Rechnungsnummer: " +
          2023 +
          "-" +
          kundenId +
          rechnungenDaten.BESTELL_NR,
        10,
        10
      );
      pdf.text("Datum: " + formattedDate, 120, 90);
      pdf.text("KundenID: " + kundenId, 10, 100);
      pdf.text("Kunden Adresse: " + kundenAdresse, 10, 110);
      pdf.text("Bestellnummer: " + rechnungenDaten.BESTELL_NR, 10, 120);
      pdf.text("Bestelldatum: " + datum, 10, 130);

      pdf.text("Summe: " + summe, 10, 140);

      pdf.text(
        "Bitte überweisen Sie den Rechnungsbetrag ohne Abzüge auf mein Konto:",
        10,
        160
      );
      pdf.text("IBAN: " + "DE921005000012322", 10, 170);
      pdf.text("BIC: " + "BELADEBEXXX", 10, 180);
      pdf.text(
        "Mit freundlichen Grüßen" + "\n" + "\n" + "    " + "Max Mustermann",
        10,
        200
      );

      pdf.save("rechnung.pdf");
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Segoe Print", Tahoma, Geneva, Verdana, sans-serif, Helvetica,
    Arial, sans-serif;
}

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  min-height: 50px;
  background-color: #20183fb3;
  box-shadow: 1px 1px 1px 1px white;
  text-align: end;
}

.profil {
  height: 60px;
}

.logout {
  margin: 5px;
  margin-right: 20px;
  cursor: pointer;
}

#einkaufswagen {
  margin: 5px;
  margin-right: 20px;
  cursor: pointer;
}

#profil {
  margin: 5px;
  margin-right: 20px;
  cursor: pointer;
}

img {
  width: 50px;
}

.ArtikelSummeWarenkorb {
  position: absolute;
  color: #ffffff;
  position: absolute;
  right: 20%;
  top: 60%;
  font-size: 18px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #20183fb3;
  min-width: 90px;
  min-height: 90px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 999;
  text-align: start;
  color: aliceblue;
  transition: all 0.2s ease;
}

.box {
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #20183fb3;
  min-width: 200px;
  min-height: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 999;
  text-align: end;
  color: aliceblue;
  transition: all 0.2s ease;
}
.box2 {
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #20183fb3;
  min-width: 200px;
  min-height: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 999;
  text-align: start;
  color: aliceblue;
  transition: all 0.2s ease;
}
.box3 {
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #20183fb3;
  min-width: 200px;
  min-height: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 999;
  text-align: start;
  color: aliceblue;
  transition: all 0.2s ease;
}
.box button {
  background-color: #bd1563;
  cursor: pointer;
}

button:hover {
  /*box-shadow: 1px 1px 1px 1px #ffffff;*/
  -webkit-box-shadow: 0px 0px 73px 14px rgba(255, 255, 255, 1);
  -moz-box-shadow: 0px 0px 73px 14px rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 73px 14px rgba(255, 255, 255, 1);
}
ul {
  padding-left: 5px;
}
li {
  font-size: 11px;
  list-style-type: none;
}

h6 {
  margin: 0px;
}

.profil {
  right: -10%;
}

.einkauf {
  right: -15%;
}

.dropdown:hover .dropdown-content {
  display: block;
  animation: opacity 700ms ease-in-out normal;
}

.warenkorbX {
  background-color: #d53f3f;
}
.warenkorbKaufen {
  background-color: #ffb700;
  padding: 4px 20px;
  border-radius: 5px;
  color: rgb(255, 255, 255);
  box-shadow: 0 10px 20px rgb(0 0 0 / 20%);
  transition: 0.5s;
}

.rechnungButton {
  background-color: #ffb700 !important;
  margin-bottom: 2px;
  margin-top: 2px;
}
#nameUser {
  color: #d53f3f;
  font-size: 12px;
}

#MeineDaten {
  cursor: pointer;
}
#MeineDaten:hover {
  background-color: #d53f3f;
}

#Bestellungen {
  cursor: pointer;
}
#Bestellungen:hover {
  background-color: #c79523;
}

#Punkte {
  cursor: pointer;
}
#Punkte:hover {
  background-color: #bd1563;
}

textarea {
  font-size: 12px;
  background-color: darkcyan;
}

@keyframes opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-ms-keyframes opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-o-keyframes opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>