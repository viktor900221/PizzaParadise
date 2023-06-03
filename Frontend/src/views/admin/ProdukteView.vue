<template>
<div>
    <h1 id="titel" style="text-align:center,"> Produkte verwalten</h1>
    <PizzenFetch></PizzenFetch>
    <GetraenkeFetch></GetraenkeFetch>
    <NachspeisenFetch></NachspeisenFetch>
    
    </div>
    
      </template>
             
             <script>
            
             import {ref} from 'vue'
            
                import PizzenFetch from '@/components/PizzenFetch';
             import GetraenkeFetch from '@/components/GetraenkeFetch';
              import NachspeisenFetch from '@/components/NachspeisenFetch';
            
           
          
                  
             export default {
               name: 'Produkte',
               components:{
                PizzenFetch,
                GetraenkeFetch,
                NachspeisenFetch,
               },
              
             }
             </script>
    
    
    <style scoped>
    
    
    .pizzen{
    display: flex;
    border-radius:15px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    background-color:#3a8b5b;
    max-width:500px;
    padding: 10px;
    margin: auto;
    justify-content: center;
    flex-direction:column;
    align-items:center;
    }
    
    .getraenke{
    display: flex;
    border-radius:15px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    background-color:#c1c825;
    max-width:500px;
    padding: 10px;
    margin:auto;
    margin-top:10px;
    
    justify-content: center;
    flex-direction:column;
    align-items:center;
    }
    
    
    .eingabe{
      background-color:#1b4879;
      border-radius:15px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
      padding:8px;
      margin:10px;
      display:flex;
      flex-direction: column
    }

    #titel{
      color: #1b4879;
    }
    
    input{
      margin: 2px;
        border-radius: 5px;
        background-color: #103454;
        color: white;
        max-width:120px;
    }
    </style>
    
    