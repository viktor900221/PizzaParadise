<template>
   
    <main class="mainN">
     <table>
       <thead>
         <tr class="titel">
           <h1>Kunden</h1>
         </tr>
       </thead>
       
       <tbody>
         <h3>Kunden</h3>
         <div v-if="kunden.length > 0">
         <div v-for="kundenDaten in kunden" :key="kundenDaten">
           <input v-model="kundenDaten.EMAIL" readonly>
           <input v-model="kundenDaten.PASSWORD" readonly>
            <input v-model="kundenDaten.ADRESSE" readonly>
            <input v-model="kundenDaten.KUNDEN_ID" readonly>
          </div>
      </div>
    <div v-else>
      <p>Keine Kunden verfügbar</p>
    </div>
         
       </tbody>
     </table>
   </main>


   </template>
   
   <script>
           import axios from "axios";
            import {ref} from 'vue'
   
            export default {
              name: 'KundenView',
              components:{
             
              },
              data:()=>{
                return {
                 kunden: ref([]),
                
                }
              },
              mounted() {
              this.readData();
              },
              methods:{
                 //READ ALL 
                  async readData() {
                  try {
                    const response = await axios.get("http://localhost:3000/customerdata");
                 
                    this.kunden = response.data;
                  
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
   
   input{
     margin: 2px;
       border-radius: 5px;
       background-color: #103454;
       color: white;
       min-width:200px;
       font-size: 20px;
       padding:10px;
       cursor:default
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