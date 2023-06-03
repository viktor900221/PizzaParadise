<template>
   
    <main class="mainN">
     <table>
       <thead>
         <tr class="titel">
           <h1>Einnahme</h1>
         </tr>
       </thead>
       
       <tbody>
         
        <!--  <input id="einnahme" type="text" :value="summe + ' €'" readonly>-->
  
         <input id="einnahme" type="text" :value="summeDisplay" readonly>
  
  
         
       </tbody>
     </table>
   </main>
  
  
   </template>
   
   <script>
           import axios from "axios";
            import {ref} from 'vue'
   
            export default {
              name: 'Einnahme',
              
              data:()=>{
                return {
                 einnahme: ref([]),
                 summe: 0,
                
                }
              },
              computed:{
                summeDisplay() {
          return this.summe.toFixed(2) + ' €';
        }
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
                    this.calculateSum();
                  
                  } catch (error) {
                    console.error(error);
                  }
                },
                //einnahme function
                calculateSum(){
                  
                for(let i = 0; i < this.einnahme.length; i++){
    this.summe += Number(this.einnahme[i].SUMME);
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