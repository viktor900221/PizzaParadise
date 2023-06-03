<template> 
    <main class="mainG">
    <table>
      <thead>
        <tr class="titel">
          <h1>Getränke</h1>
        </tr>
      </thead>

      <tbody>
        <div v-for="getraenkeDaten in getraenke" :key="getraenkeDaten">
          <input v-model="getraenkeDaten.name" type="text">
          <input v-model="getraenkeDaten.preis" type="text">
          <img :src="getraenkeDaten.dataUrl" alt="Getraenk Image">
          <button @click="updateGetraenke(getraenkeDaten)" class="button">update</button>
          <button @click="deleteGetraenke(getraenkeDaten.id)" class="button">delete</button>
        </div>
      </tbody>
    </table>
  </main>
  
  <main class="mainG">
    <table>
      <thead>
        <tr class="titel">
          <h1>Eingabe: Getränke hinzufügen</h1>
        </tr>
      </thead>
      <tbody>
        <input ref="newGname" placeholder="new Name" type="text">

        <input ref="newGkategorie" placeholder="new Kategorie" type="text">
           <input ref="newGpreis" placeholder="new Preis" type="number" step="0.01">
      <input ref="newGbild" @change="uploadImage" placeholder="new Bild" type="file" >
        <button @click="addDataG" class="button">Neue Getränke</button>
      </tbody>
    </table>
  </main>
  </template>
  
    <script>
          
           import {ref} from 'vue'
           import axios from "axios";

           export default {
             name: 'GetraenkeFetch',
             data() {
    return {
      getraenke:ref([]),
      bilder:[],
   imageData: ''
    };
  },
  mounted() {
    this.readData();
    
  },
  computed: {
  getGetraenkeName: {
    get() {
      return getraenkeDaten => getraenkeDaten.name;
    },
    set(newValue) {
      getraenkeDaten.name = newValue;
    }
  },
  getGetraenkePreis: {
    get() {
      return getraenkeDaten => getraenkeDaten.preis;
    },
    set(newValue) {
      getraenkeDaten.preis = newValue;
    }
  }
},
             methods: {
                //READ GETRÄNK
                async readData() {
          try {
           
            const response2 = await axios.get("http://localhost:3000/getraenke");
           
            
            this.getraenke = response2.data;
          
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
               //CREATE GETRÄNK   
    async addDataG() {
        
        const newName = this.$refs.newGname.value;
     
        const newKategorie = this.$refs.newGkategorie.value;
        let newPreisToInt = Number(this.$refs.newGpreis.value);
        const newPreis = newPreisToInt

        this.$refs.newGname.value = "";
        this.$refs.newGkategorie.value = "";
        this.$refs.newGpreis.value = "";
        this.$refs.newGbild.value = "";

        try {
        const response = await axios.post('http://localhost:3000/getraenke', {
            name: newName,
            kategorie: newKategorie,
            preis: newPreis,
            bild: this.imageData
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
    async updateGetraenke(getraenkDaten){
   
   fetch('http://localhost:3000/getraenke/', {
   method: 'PATCH',
   headers: {
       'Content-type': 'application/json'
   },
   body: JSON.stringify({
       produkt_id: getraenkDaten.id,
       name: getraenkDaten.name,
       preis: Number(getraenkDaten.preis)
   })
})
   .then(response => response.json())
   .then(data => {
     if (data.success) {
       this.getraenke = this.getraenke.map(getraenk => {
           if (getraenk.produkt_id === getraenkDaten.produkt_id) {
               return {
                   ...getraenk,
                   name: getraenkDaten.name,
               };
           }
           return getraenk;
       });
   }
   })
    },
    //DELETE GETRÄNK
    async deleteGetraenke(produkt_id){
    fetch('http://localhost:3000/getraenke/' + produkt_id, {
      method: 'DELETE'
    })
    .then(response => response.json())
      .then(data => {
          if (data.success) {
              location.reload();
          }
      });
    },
             },
             
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
  .mainG {
    background-color: #baae30e6;
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
  