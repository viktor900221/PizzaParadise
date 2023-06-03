<template>
    
<div class="dashboardcontainer">

  <table>
     <thead>
       <tr class="titel">
         <h1>Dashboard</h1>
       </tr>
     </thead>
     
     <tbody class="">
    
     
        <div>
              <div>
                  <ABCKunden></ABCKunden>
              </div>
        </div>

      
        <div>
              <div>
                  <einnahme></einnahme>
              </div>
        </div>
       
  
        <div class="speisekarte">
          <h3>Speisekarte</h3>
              <div>
                  <input value="Pizzen">
                  <div v-for="pizzaDaten in pizzen" :key="pizzaDaten">
           <input v-model="pizzaDaten.name" readonly>
   
           <input v-model="pizzaDaten.preis" readonly>
         </div>
                  <input value="Getränke">
                  <div v-for="getraenkeDaten in getraenke" :key="getraenkeDaten">
           <input v-model="getraenkeDaten.name" readonly>
           <input v-model="getraenkeDaten.preis" readonly>
          
         </div>
                  <input value="Kuchen">
                  <div v-for="kuchenDaten in kuchen" :key="kuchenDaten">
           <input v-model="kuchenDaten.name" readonly>
           <input v-model="kuchenDaten.preis" readonly>
           
         </div>
              </div>
        </div>
      </tbody>
   </table>

</div>



   </template>
   
   <script>
          
          import axios from "axios";
import {ref} from 'vue'
import Einnahme from '@/components/Einnahme.vue';
import ABCKunden from '@/components/ABCKunden.vue';
            export default {
              name: 'Dashboard',
              components:{
                Einnahme,
                      ABCKunden
              },
              data() {
    return {
      pizzen:ref([]),
      getraenke:ref([]),
      kuchen:ref([])
    };
  },
  mounted() {
    this.readData();
    
  },
               methods:{
                async readData() {
          try {
            const response = await axios.get("http://localhost:3000/pizzen");
            const response2 = await axios.get("http://localhost:3000/getraenke");
            const response3 = await axios.get("http://localhost:3000/kuchen");
            this.pizzen = response.data;
            this.getraenke = response2.data;
            this.kuchen = response3.data;


          } catch (error) {
            console.error(error);
          }
    },
               }
   
            }
   </script>
   
   <style scoped>
   * {
     box-sizing: border-box;
   }
   
   .dashboardcontainer{
    background-color:mediumseagreen;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
   }
   .speisekarte{
    background-color: rgb(63 41 153 / 70%);
    color:burlywood;
    max-width:850px;
    border: ridge;

    box-shadow: 0 0 15px #000000b8;
    margin: 15px;
    padding: 15px;
   }
   
   table{border: ridge;

box-shadow: 0 0 15px #000000b8;}
   tbody{
    display:flex;
    flex-direction: column;
    align-items: center;
   }

   input#einnahme {
    text-align: end;
}
   </style>