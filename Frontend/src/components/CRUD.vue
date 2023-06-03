<template>
  <div class="home">
    <div class="dropdown">
      <button class="dropdown-button">Menu</button>
      <div class="dropdown-content">
        <a @click="showBox1 = true">Option 1</a>
        <div class="box" v-if="showBox1">
          <button id="x" @click="showBox1 = false">X</button>
          <h6>Innerhalb von Option 1</h6>
          <p>Hier könnte Ihr Inhalt stehen</p>
        </div>
        <a @click="showBox2 = true">Option 2</a>
        <div class="box" v-if="showBox2">
          <button id="x" @click="showBox2 = false">X</button>
          <h6>Innerhalb von Option 2</h6>
          <p>Hier könnte Ihr Inhalt stehen</p>
        </div>
      </div>
    </div>
    <!--CRUD-->
    <!--Pizzen-->
    <main class="mainP">
      <table>
        <thead>
          <tr class="titel">
            <h1>Pizzen</h1>
          </tr>
        </thead>

        <tbody>
          <div v-for="pizzaDaten in pizzen" :key="pizzaDaten">
            <input v-model="pizzaDaten.name" type="text" />
            <input v-model="pizzaDaten.preis" type="text" />
            <img :src="pizzaDaten.dataUrl" alt="Pizza Image" />

            <button @click="updatePizza(pizzaDaten)" class="button">
              update
            </button>
            <button @click="deletePizza(pizzaDaten.id)" class="button">
              delete
            </button>
          </div>
        </tbody>
      </table>
    </main>

    <main class="mainP">
      <table>
        <thead>
          <tr class="titel">
            <h1>Eingabe: Pizza hinzufügen</h1>
          </tr>
        </thead>
        <tbody>
          <input ref="newname" placeholder="new Name" type="text" />
          <input ref="newkategorie" placeholder="new Kategorie" type="text" />
          <input
            ref="newpreis"
            placeholder="new Preis"
            type="number"
            step="0.01"
          />
          <input
            ref="newbild"
            @change="uploadImage"
            placeholder="new Bild"
            type="file"
          />
          <button @click="addData" class="button">Neue Pizza</button>
        </tbody>
      </table>
    </main>

    <!--Getränke-->
    <main class="mainP">
      <table>
        <thead>
          <tr class="titel">
            <h1>Getränke</h1>
          </tr>
        </thead>

        <tbody>
          <div v-for="getraenkeDaten in getraenke" :key="getraenkeDaten">
            <input v-model="getraenkeDaten.NAME" type="text" />
            <input v-model="getraenkeDaten.PREIS" type="text" />
            <button @click="updatePizza(getraenkeDaten)" class="button">
              update
            </button>
            <button
              @click="deletePizza(getraenkeDaten.PRODUKT_ID)"
              class="button"
            >
              delete
            </button>
          </div>
        </tbody>
      </table>
    </main>

    <main class="mainP">
      <table>
        <thead>
          <tr class="titel">
            <h1>Eingabe: Getränk hinzufügen</h1>
          </tr>
        </thead>
        <tbody>
          <input ref="newGname" placeholder="new Name" type="text" />
          <input ref="newGid" placeholder="new ID" type="number" />
          <input ref="newGkategorie" placeholder="new Kategorie" type="text" />
          <input ref="newGpreis" placeholder="new Preis" type="number" />
          <button @click="addDataG" class="button">Neues Getränk</button>
        </tbody>
      </table>
    </main>

    <!--Kuchen-->
    <main class="mainP">
      <table>
        <thead>
          <tr class="titel">
            <h1>Kuchen</h1>
          </tr>
        </thead>

        <tbody>
          <div v-for="kuchenDaten in kuchen" :key="kuchenDaten">
            <input v-model="kuchenDaten.NAME" type="text" />
            <input v-model="kuchenDaten.PREIS" type="text" />
            <button @click="updateKuchen(kuchenDaten)" class="button">
              update
            </button>
            <button
              @click="deleteKuchen(kuchenDaten.PRODUKT_ID)"
              class="button"
            >
              delete
            </button>
          </div>
        </tbody>
      </table>
    </main>

    <main class="mainP">
      <table>
        <thead>
          <tr class="titel">
            <h1>Eingabe: Kuchen hinzufügen</h1>
          </tr>
        </thead>
        <tbody>
          <input ref="newKname" placeholder="new Name" type="text" />
          <input ref="newKid" placeholder="new ID" type="number" />
          <input ref="newKkategorie" placeholder="new Kategorie" type="text" />
          <input ref="newKpreis" placeholder="new Preis" type="number" />
          <button @click="addDataK" class="button">Neue Kuchen</button>
        </tbody>
      </table>
    </main>

    <!--Rechnungen-->
    <main class="mainP">
      <table>
        <thead>
          <tr class="titel">
            <h1>Rechnungen</h1>
          </tr>
        </thead>

        <tbody>
          <div v-for="rechnungDaten in rechnung" :key="rechnungDaten">
            KundenID:
            <input v-model="rechnungDaten.KUNDEN_ID" type="text" />
            Bestellnummer:
            <input v-model="rechnungDaten.BESTELL_NR" type="text" />
            Summe:
            <input v-model="rechnungDaten.SUMME" type="text" />
            <button @click="updateKuchen(rechnungDaten)" class="button">
              ausdrucken
            </button>
          </div>
        </tbody>
      </table>
    </main>

    <!--BILD-->

    <main class="mainP">
      <table>
        <thead>
          <tr class="titel">
            <h1>Bild</h1>
          </tr>
        </thead>

        <tbody>
          <div v-for="bild in bilder" :key="bild.id">
            <!--<div :style="{ backgroundImage: 'url(' + bild.dataUrl + ')', backgroundSize: 'contain' }">-->
            <img :src="bild.dataUrl" />
          </div>
        </tbody>
      </table>
    </main>

    <main class="mainP">
      <table>
        <thead>
          <tr class="titel">
            <h1>Eingabe: BILD hinzufügen</h1>
          </tr>
        </thead>
        <tbody>
          <input
            ref="newBname"
            placeholder="new Bild"
            type="file"
            @change="uploadImage"
            enctype="multipart/form-data"
          />

          <button @click="addDataB" class="button">Neue BILD</button>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  name: "CRUD",
  data() {
    return {
      pizzen: ref([]),
      getraenke: ref([]),
      kuchen: ref([]),
      rechnung: ref([]),
      bilder: [],

      imageData: "",
      showBox1: false,
      showBox2: false,
    };
  },
  mounted() {
    this.readData();
  },
  computed: {
    getPizzaName: {
      get() {
        return (pizzaDaten) => pizzaDaten.name;
      },
      set(newValue) {
        pizzaDaten.name = newValue;
      },
    },
    getPizzaPreis: {
      get() {
        return (pizzaDaten) => pizzaDaten.preis;
      },
      set(newValue) {
        pizzaDaten.preis = newValue;
      },
    },
  },
  methods: {
    //READ ALL
    async readData() {
      try {
        const response = await axios.get("http://localhost:3000/pizzen");
        const response2 = await axios.get("http://localhost:3000/getraenke");
        const response3 = await axios.get("http://localhost:3000/kuchen");
        const response4 = await axios.get("http://localhost:3000/rechnungen");
        const response5 = await axios.get("http://localhost:3000/bild");
        this.pizzen = response.data;
        this.getraenke = response2.data;
        this.kuchen = response3.data;
        this.rechnung = response4.data;
        this.bilder = response5.data;
        console.log("Image loaded:", response5.data);
      } catch (error) {
        console.error(error);
      }
    },
    async uploadImage(event) {
      const file = event.target.files[0];
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

      this.imageData = await toBase64(file);
      console.log(this.imageData);
    },

    //CREATE PIZZA
    async addData() {
      const newName = this.$refs.newname.value;

      const newKategorie = this.$refs.newkategorie.value;
      let newPreisToInt = Number(this.$refs.newpreis.value);

      const newPreis = newPreisToInt;
      console.log(newPreis);
      this.$refs.newname.value = "";

      this.$refs.newkategorie.value = "";
      this.$refs.newpreis.value = "";
      this.$refs.newbild.value = "";

      console.log(this.imageData);

      fetch("http://localhost:3000/pizzen", {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          name: newName,
          kategorie: newKategorie,
          preis: newPreis,
          bild: this.imageData,
        }),
      }).then((response) => response.json());
    },
    //UPDATE PIZZA
    async updatePizza(pizzaDaten) {
      fetch("http://localhost:3000/pizzen/", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          produkt_id: pizzaDaten.id,
          name: pizzaDaten.name,
          //Fehler wegen type
          preis: Number(pizzaDaten.preis),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            this.pizzen = this.pizzen.map((pizza) => {
              if (pizza.produkt_id === pizzaDaten.id) {
                return {
                  ...pizza,
                  name: pizzaDaten.name,
                  preis: pizzaDaten.preis,
                };
              }
              return pizza;
            });
          }
        });
    },
    //DELETE PIZZA
    async deletePizza(produkt_id) {
      fetch("http://localhost:3000/pizzen/" + produkt_id, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            location.reload();
          }
        });
    },
    //CREATE GETRÄNK
    async addDataG() {
      const newName = this.$refs.newGname.value;
      const newId = this.$refs.newGid.value;
      const newKategorie = this.$refs.newGkategorie.value;
      const newPreis = this.$refs.newGpreis.value;

      this.$refs.newGname.value = "";
      this.$refs.newGid.value = "";
      this.$refs.newGkategorie.value = "";
      this.$refs.newGpreis.value = "";

      try {
        const response = await axios.post("http://localhost:3000/getraenke", {
          name: newName,
          produkt_id: newId,
          kategorie: newKategorie,
          preis: newPreis,
        });

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      /* fetch('http://localhost:3000/getraenke', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ name: newName, produkt_id: newId, kategorie: newKategorie, preis:newPreis  })
        })
            .then(response => response.json());*/
    },
    //UPDATE GETRÄNK
    async updateGetraenk(getraenkDaten) {
      fetch("http://localhost:3000/getraenke/", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          produkt_id: getraenkDaten.PRODUKT_ID,
          name: getraenkDaten.NAME,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            this.getraenke = this.getraenke.map((getraenk) => {
              if (getraenk.PRODUKT_ID === getraenkDaten.PRODUKT_ID) {
                return {
                  ...getraenk,
                  NAME: getraenkDaten.NAME,
                };
              }
              return getraenk;
            });
          }
        });
    },
    //DELETE GETRÄNK
    async deletePizza(produkt_id) {
      fetch("http://localhost:3000/getraenke/" + produkt_id, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            location.reload();
          }
        });
    },
    //CREATE KUCHEN
    async addDataK() {
      const newName = this.$refs.newKname.value;
      const newId = this.$refs.newKid.value;
      const newKategorie = this.$refs.newKkategorie.value;
      const newPreis = this.$refs.newKpreis.value;

      this.$refs.newKname.value = "";
      this.$refs.newKid.value = "";
      this.$refs.newKkategorie.value = "";
      this.$refs.newKpreis.value = "";

      try {
        const response = await axios.post("http://localhost:3000/kuchen", {
          name: newName,
          produkt_id: newId,
          kategorie: newKategorie,
          preis: newPreis,
        });

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    //UPDATE KUCHEN
    async updateKuchen(kuchenDaten) {
      fetch("http://localhost:3000/kuchen/", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          produkt_id: kuchenDaten.PRODUKT_ID,
          name: kuchenDaten.NAME,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            this.kuchen = this.kuchen.map((kuchen) => {
              if (kuchen.PRODUKT_ID === kuchenDaten.PRODUKT_ID) {
                return {
                  ...kuchen,
                  NAME: kuchenDaten.NAME,
                };
              }
              return kuchen;
            });
          }
        });
    },
    //DELETE KUCHEN
    async deleteKuchen(produkt_id) {
      fetch("http://localhost:3000/kuchen/" + produkt_id, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            location.reload();
          }
        });
    },

    /*//ADD BILD
  async uploadImage(event) {
  const file = event.target.files[0];
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const base64String = await toBase64(file);
  
  console.log('Size of image:', file.size / 1024, 'KB');
  console.log(file)
  console.log('Base64 string:', base64String);

  await axios.post('http://localhost:3000/bild', { 
    bild: base64String 
  });
  await this.readData();
},*/

    //READ BILD Die brauchen wir nicht
    /*async created() {
  const response = await axios.get('http://localhost:3000/bild');
  this.bilder =  response.data.map(bild => {
      return {
        id: bild.id,
        dataUrl: bild.dataUrl.replace("data:image/png;base64,", "")
      };
    });
}*/
  },
};
</script>

<style scoped>
.home {
  display: flex;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  background-color: #4caf50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.box {
  display: block;
  background-color: #f9f9f9;
  padding: 12px 16px;
  text-align: left;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>