<template>
  <main class="mainN">
    <table>
      <thead>
        <tr class="titel">
          <h1>Bestellungen</h1>
          <h3>
            Bitte erst auf Bearbeiten klicken um den Kunde benachrichtigen dass
            seine Bestellung bald fertig ist.
          </h3>
        </tr>
      </thead>
      <tbody class="BestellungContainer">
        <div v-for="bestellungDaten in pageBestellungen" :key="bestellungDaten">
          <input v-model="bestellungDaten.BESTELL_NR" readonly />
          <div
            v-for="order in extractOrders(bestellungDaten.ORDER_LIST)"
            :key="order.name"
          >
            <div class="orderlist">
              <li>{{ order.name }}</li>
              <li>{{ order.preis }}</li>
            </div>
          </div>
          <li class="orderlist">
            {{
              new Date(bestellungDaten.DATUM).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            }}
          </li>
          <input v-model="bestellungDaten.KUNDEN_ADRESSE" readonly />
          <input
            :id="'status-' + bestellungDaten.BESTELL_NR"
            v-model="bestellungDaten.STATUS"
            readonly
            @input="updateColor(index, bestellungDaten)"
          />
          <button
            @click="updateStatus1(bestellungDaten)"
            class="button"
            style="background-color: #c6c616; color: black"
          >
            Bearbeiten
          </button>
          <button @click="updateStatus2(bestellungDaten)" class="button">
            Fertig
          </button>
        </div>
        <div class="buttonContainer">
          <button class="backNext" @click="previousPage">zurück</button>
          <button class="backNext" @click="nextPage">nächste</button>
        </div>
      </tbody>
    </table>
  </main>
</template>
   
   <script>
import { ref } from "vue";
import axios from "axios";
import store from "../../store";
import { mapActions } from "vuex";

export default {
  name: "Bestellungen",
  data: () => {
    return {
      bestellung: ref([]),

      index: 0,
      currentPage: 1,
      perPage: 4,
    };
  },
  computed: {
    sortedBestellungen() {
      return this.bestellung.sort((a, b) => b.BESTELL_NR - a.BESTELL_NR);
    },
    pageBestellungen() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.sortedBestellungen.slice(start, end);
    },
  },
  mounted() {
    this.readData().then(() => {
      this.updateInputColors();
    });
  },

  methods: {
    ...mapActions(["updateStatus"]),
    //Pagination
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
    //Unsere Bestellung aufteilen
    extractOrders(ORDER_LIST) {
      let orders = JSON.parse(ORDER_LIST);
      return orders.map((order) => {
        return { name: order.name, preis: order.preis };
      });
    },
    //READ ALL
    async readData() {
      try {
        const response = await axios.get("http://localhost:3000/bestellung");
        this.bestellung = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    //UPDATE Status in-Bearbeitung
    async updateStatus1(bestellungDaten) {
      try {
        const response = await fetch("http://localhost:3000/bestellung/", {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            bestell_nr: bestellungDaten.BESTELL_NR,
            status: (bestellungDaten.STATUS = "in-Bearbeitung"),
          }),
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
          this.bestellung = this.bestellung.map((bestellung) => {
            if (bestellung.BESTELL_NR === bestellungDaten.BESTELL_NR) {
              this.bestellungDaten = this.$store.state.bestellungen;
              this.$emit("status-updated");
              this.$store.commit("updateBestellungStatus", {
                BESTELL_NR: bestellungDaten.BESTELL_NR,
                STATUS: bestellungDaten.STATUS,
              });
              return {
                ...bestellung,
                status: bestellungDaten.STATUS,
              };
            }
            return bestellung;
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    //UPDATE Status Fertig
    async updateStatus2(bestellungDaten) {
      try {
        const response = await fetch("http://localhost:3000/bestellung/", {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            bestell_nr: bestellungDaten.BESTELL_NR,
            status: (bestellungDaten.STATUS = "fertig"),
          }),
        });
        const data = await response.json();
        if (data.success) {
          this.bestellung = this.bestellung.map((bestellung) => {
            if (bestellung.BESTELL_NR === bestellungDaten.BESTELL_NR) {
              console.log(this.bestellungDaten); // Hier wird überprüft, ob bestellungDaten tatsächlich aktualisiert wurde
              this.$emit("status-updated");
              this.$store.commit("updateBestellungStatus", {
                BESTELL_NR: bestellungDaten.BESTELL_NR,
                STATUS: bestellungDaten.STATUS,
              });

              return {
                ...bestellung,
                status: bestellungDaten.STATUS,
              };
            }
            return bestellung;
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    updateInputColors() {
      this.bestellung.forEach((bestellungDaten, index) => {
        if (bestellungDaten.STATUS === "fertig") {
          document.getElementById(
            `status-${bestellungDaten.BESTELL_NR}`
          ).style.backgroundColor = "green";
        } else if (bestellungDaten.STATUS === "in-Bearbeitung") {
          document.getElementById(
            `status-${bestellungDaten.BESTELL_NR}`
          ).style.backgroundColor = "#ffff017d";
        }
      });
    },
  },
};
</script>

   
   <style scoped>
* {
  box-sizing: border-box;
}

input {
  display: flex;
  margin: 2px;
  border-radius: 5px;
  background-color: #103454;
  color: white;
  /* min-width: 200px;*/
  font-size: 20px;
  padding: 10px;
  cursor: default;
  /*word-break: break-all;*/
}

p {
  text-align: center;
  margin: 20px 0 60px;
}
main {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
.mainN {
  background-color: #8b70a7;
  box-shadow: 0 0 15px #000000b8;
  padding: 10px;
  border: ridge;
}
h1 {
  text-align: center;
  font-weight: 300;
  color: white;
  font-weight: bold;
}

table {
  display: flex;
  text-align: center;
  justify-content: center;
}

/*tbody {
  display: block;
}*/

.BestellungContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.backNext {
  display: flex;
  height: 40px;
  line-height: 1;
  display: inline-block;
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: 5px;
  color: #fff;
  padding: 8px;
  background-color: #c8861d;
  margin-left: 10px;
  margin-bottom: 10px;
}
thead {
  display: none;
}

tr {
  padding-bottom: 10px;
}

th {
  text-align: left;
  font-weight: 700;
}

thead th {
  background-color: #202932;
  color: #fff;
  border: 1px solid #202932;
}

.orderlist {
  display: flex;

  list-style-type: none;
  justify-content: space-between;
  margin: 2px;
  border-radius: 5px;
  background-color: #103454;
  color: white;
  max-width: 262px;
  font-size: 20px;
  padding: 10px;
  cursor: default;
  word-break: break-all;
}
.button {
  line-height: 1;
  display: inline-block;
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: 5px;
  color: #fff;
  padding: 8px;
  background-color: #4b908f;
  margin-left: 10px;
  margin-bottom: 10px;
}

.buttonContainer {
  display: flex;
  flex: 20%;

  justify-content: flex-end;
}
/*@media (min-width: 460px) {
  td {
    text-align: left;
  }
  td:before {
    display: inline-block;
    text-align: right;
    width: 140px;
  }

  .select {
    padding-left: 160px;
  }
}
@media (min-width: 720px) {
  table {
    display: table;
  }

  tr {
    display: table-row;
  }

  td,
  th {
    display: table-cell;
  }

  tbody {
    display: table-row-group;
  }

  thead {
    display: table-header-group;
  }

  th {
    padding: 5px;
  }

  tr:nth-child(2n + 2) td {
    background-color: #242e39;
  }
  .select {
    padding: 5px;
  }
}*/
</style>