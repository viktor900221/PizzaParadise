<template>
  <div>
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
  </div>
</template>
  
    <script>
import { ref } from "vue";
import axios from "axios";
export default {
  name: "PizzenFetch",
  data() {
    return {
      pizzen: ref([]),
      bilder: [],

      imageData: "",
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
        this.pizzen = response.data;
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
  },
};
</script>
  
  
  <style scoped>
input {
  margin: 2px;
  border-radius: 5px;
  background-color: #103454;
  color: white;
  min-width: 200px;
  font-size: 20px;
  padding: 10px;
}

p {
  text-align: center;
  margin: 20px 0 60px;
}
main {
  margin-bottom: 20px;
}
.mainP {
  background-color: mediumseagreen;
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
  display: block;
  text-align: center;
}
table {
  width: 100%;
}

tr,
tbody {
  display: block;
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

img {
  width: 150px;
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

@media (min-width: 460px) {
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
}
</style>
  