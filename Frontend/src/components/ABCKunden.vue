<template>
   
    <main class="mainN">
     <table>
        <thead>
            
            <tr class="titel">
           <h1>ABC Kunden</h1>
         </tr>
      <tr>
        <th>Kunden ID</th>
        <th>Einnahme</th>
        <th>ABC-Kunde</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="Kundendaten in sortierteKunden" :key= Kundendaten[0]>
        <td class="abc" style="background-color:brown">{{ Kundendaten[0] }}</td>
        <td class="abc" style="background-color:coral">{{ Kundendaten[1].toFixed(2) }} €</td>
        <td class="abc">{{ Kundendaten[2] }}</td>
      </tr>
    </tbody>
     </table>
   </main>
  
  
   </template>
   
   <script>
           import axios from "axios";
            //import {ref} from 'vue'
   
            export default {
              name: 'ABCKunden',
              
              data:()=>{
                return {
                 einnahme: [],
                einnahmeProKunde: new Map(),
             
                }
              },
              mounted() {
                this.readData();
                },
               computed: {
    sortierteKunden() {
      const einnahmeProKunde = this.einnahmeProKunde;
      const kunden = [];

      for (const [kundenId, summe] of einnahmeProKunde.entries()) {
        kunden.push([kundenId, summe]);
      }

      kunden.sort(function(a, b) {
        if (a[1] >= 100) {
          return -1;
        } else if (a[1] >= 50) {
          if (b[1] >= 100) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (b[1] >= 20) {
            return 1;
          } else {
            return -1;
          }
        }
      });

      // Fügt den Buchstaben hinzu
      for (let i = 0; i < kunden.length; i++) {
        if (kunden[i][1] >= 100) {
          kunden[i].push("A");
        } else if (kunden[i][1] >= 50) {
          kunden[i].push("B");
        } else {
          kunden[i].push("C");
        }
      }

      return kunden;
    },
  },
              mounted() {
              this.readData();
              },
              methods:{
                 //READ ALL 
                  async readData() {
                  try {
                    const response = await axios.get("http://localhost:3000/rechnungen");
                 
                    this.einnahme = response.data;
                    this.calculateSumPerKunde();
                  
                  } catch (error) {
                    console.error(error);
                  }
                },
                //einnahme function
                calculateSumPerKunde(){
                   for (let i = 0; i < this.einnahme.length; i++) {
        const kundenId = this.einnahme[i].KUNDEN_ID;
        if (this.einnahmeProKunde.has(kundenId)) {
          this.einnahmeProKunde.set(
            kundenId,
            this.einnahmeProKunde.get(kundenId) + this.einnahme[i].SUMME
          );
        } else {
          this.einnahmeProKunde.set(kundenId, this.einnahme[i].SUMME);
        }
      }
                }
               
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
       max-width:170px;
       font-size: 20px;
       padding:10px;
       cursor:default
   }
   

   main{
     margin-bottom:20px;
   }
   .mainN {
     background-color: #b9ae16d4;
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
     text-align: center;
     font-weight: 700;
   }
   
   .abc{
    text-align: center;
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
       cursor: pointer;
   }
  
   .feldname{
    background-color: #ba3d3d;
  
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