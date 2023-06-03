<template> 
 
    <main class="mainN">
    <table>
      <thead>
        <tr class="titel">
          <h1>Nachspeisen</h1>
        </tr>
      </thead>
  
      <tbody>
        <div v-for="kuchenDaten in kuchen" :key="kuchenDaten">
          <input v-model="kuchenDaten.name" type="text">
          <input v-model="kuchenDaten.preis" type="number">
          <img :src="kuchenDaten.dataUrl" alt="Kuchen Image">
          <button @click="updateNachspeise(kuchenDaten)" class="button">update</button>
          <button @click="deleteNachspeise(kuchenDaten.id)" class="button">delete</button>
        </div>
      </tbody>
    </table>
  </main>
  
  <main class="mainN">
    <table>
      <thead>
        <tr class="titel">
          <h1>Eingabe: Nachspeise hinzufügen</h1>
        </tr>
      </thead>
      <tbody>
        <input ref="newKname" placeholder="new Name" type="text">
        <input ref="newKkategorie" placeholder="new Kategorie" type="text">
        <input ref="newKpreis" placeholder="new Preis" type="number" step="0.01">
      <input ref="newKbild" @change="uploadImage" placeholder="new Bild" type="file" >
       
        <button @click="addDataK" class="button">Neue Nachspeise</button>
      </tbody>
    </table>
  </main>
  
  </template>
  
    <script>
          
           import {ref} from 'vue'
           import axios from "axios";
           
           export default {
             name: 'NachspeisenFetch',
             data() {
    return {
      kuchen:ref([]),
      bilder:[],
   imageData: ''
    };
  },
  mounted() {
    this.readData();
    
  },
  computed: {
  getKuchenName: {
    get() {
      return kuchenDaten => kuchenDaten.name;
    },
    set(newValue) {
      kuchenDaten.name = newValue;
    }
  },
  getGetraenkePreis: {
    get() {
      return kuchenDaten => kuchenDaten.preis;
    },
    set(newValue) {
      kuchenDaten.preis = newValue;
    }
  }
},
             methods: {
                //READ KUCHEN
                async readData() {
          try {
            const response3 = await axios.get("http://localhost:3000/kuchen");
            this.kuchen = response3.data;
          } catch (error) {
            console.error(error);
          }
    },
    async uploadImage(event) {
      const file = event.target.files[0];
      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

      this.imageData = await toBase64(file);
      console.log(this.imageData)
    },
    //CREATE KUCHEN   
    async addDataK() {
        
        const newName = this.$refs.newKname.value;
        const newKategorie = this.$refs.newKkategorie.value;
        let newPreisToInt = Number(this.$refs.newKpreis.value);
        const newPreis = newPreisToInt

        this.$refs.newKname.value = "";
        this.$refs.newKkategorie.value = "";
        this.$refs.newKpreis.value = "";
        this.$refs.newKbild.value = "";

        try {
        const response = await axios.post('http://localhost:3000/kuchen', {
            name: newName,
            kategorie: newKategorie,
            preis: newPreis,
            bild: this.imageData
        });

        console.log(response.data);
    } catch (error) {
        console.error(error);
    }

    },
    //UPDATE KUCHEN
    async updateNachspeise(kuchenDaten){
   
   fetch('http://localhost:3000/kuchen/', {
   method: 'PATCH',
   headers: {
       'Content-type': 'application/json'
   },
   body: JSON.stringify({
       produkt_id: kuchenDaten.id,
       name: kuchenDaten.name,
       preis: Number(kuchenDaten.preis)
   })
})
   .then(response => response.json())
   .then(data => {
     if (data.success) {
       this.kuchen = this.kuchen.map(kuchen => {
           if (kuchen.produkt_id === kuchenDaten.produkt_id) {
               return {
                   ...kuchen,
                   name: kuchenDaten.name,
               };
           }
           return kuchen;
       });
   }
   })
    },
    //DELETE KUCHEN
    async deleteNachspeise(produkt_id){
    fetch('http://localhost:3000/kuchen/' + produkt_id, {
      method: 'DELETE'
    })
    .then(response => response.json())
      .then(data => {
          if (data.success) {
              location.reload();
          }
      });
    },
}
           }
           </script>
  
  
  <style scoped>
  
  input{
    margin: 2px;
      border-radius: 5px;
      background-color: #103454;
      color: white;
      min-width:200px;
      font-size: 20px;
      padding:10px;
  }
  
  p {
    text-align: center;
    margin: 20px 0 60px;
  }
  main{
    margin-bottom:20px;
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
    color:white;
    font-weight: bold;
  }
  
  table {
    display: block;
    text-align: center;
  }
  table {
    width: 100%;
  }
  
  tr, tbody {
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
  
    td, th {
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
  
    tr:nth-child(2n+2) td {
      background-color: #242e39;
    }
    .select {
      padding: 5px;
    }
  }
  </style>
  