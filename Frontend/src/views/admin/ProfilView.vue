<template>
  <!--Admin-->
<main class="mainP">
  <table>
    <thead>
      <tr class="titel">
        <h1>Admin</h1>
      </tr>
    </thead>
    
    <tbody>
      <div v-for="adminDaten in admin" :key="adminDaten">
        <input v-model="adminDaten.EMAIL" type="text">
        <input v-model="adminDaten.PASSWORD" type="text">
        <button @click="updateAdmin(adminDaten)" class="button">update</button>
        <button @click="deleteAdmin(adminDaten.EMAIL)"  class="button">delete</button>
      </div>
    </tbody>
  </table>
</main>

<main class="mainP">
  <table>
    <thead>
      <tr class="titel">
        <h1>Admin hinzufügen</h1>
      </tr>
    </thead>
    <tbody>
      <input ref="newAname" placeholder="new Email" type="text">
      <input ref="newApw" placeholder="new Passwort" type="text">
      <button @click="addDataA"  class="button">Neue Admin</button>
    </tbody>
  </table>
</main>
</template>

<script>

import {ref} from 'vue'
import axios from "axios";

export default {
name: 'ProfilView',
 data() {
    return {
      admin:ref([])
    };
  },
  mounted() {
    this.readData();
    
  },
  methods: 
  {
    //READ ALL 
    //Ich muss noch ein get für admin in backend schreiben
    async readData() {
          try {
            const response = await axios.get("http://localhost:3000/admin");
            this.admin = response.data;
          } catch (error) {
            console.error(error);
          }
    },
      //CREATE Admin   
    async addDataA() {
        
        const newAname = this.$refs.newAname.value;
        const newApw = this.$refs.newApw.value;
       

        this.$refs.newAname.value = "";
        this.$refs.newApw.value = "";

        fetch('http://localhost:3000/admin', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ email: newAname, password: newApw, })
        })
            .then(response => response.json());

    },
    //UPDATE PIZZA
    async updateAdmin(adminDaten){
   
        fetch('http://localhost:3000/admin', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email: adminDaten.EMAIL,
            password: adminDaten.PASSWORD,
        })
    })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            this.admin = this.admin.map(admin => {
                if (admin.EMAIL === adminDaten.EMAIL) {
                    return {
                        ...admin,
                        EMAIL: pizzaDaten.EMAIL,
                    };
                }
                return admin;
            });
        }
        })
    },
    //DELETE ADMIN
    async deleteAdmin(email){
      fetch('http://localhost:3000/admin/' + email, {
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

<style>
 
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
  .mainP {
    background-color: mediumseagreen;
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