<template>
  
  <div class="home">
    <navbar></navbar>
   
  
           <stars></stars>

    <div class="headline">



    <clouds></clouds>
    <!--MahlzeitLogo.png-->
       <img src="../assets/LogoGut-removebg-preview.png" id="logo"  alt="">
    

    <div class="headtextbox">
      <kategorien></kategorien>
    <div class="headtext1">
      
      <!--Immer schnell bei dir-->
      <h1>Mittagessen leicht gemacht</h1></div> <div class="headtext2"><h1 id="h1"></h1></div>
    </div>
    
  </div>
 
  </div>
</template>

<script>
// @ is an alias to /src
import Kategorien from '@/components/Kategorien.vue';
import Navbar from '@/components/Navbar.vue'
import Stars from '@/components/Stars.vue'
import Clouds from '@/components/Clouds.vue'


export default {
  beforeCreate: function() {
        document.body.className = 'homepage';
    },
  name: 'HomeView',
 
  components: {
    Clouds,
    Stars,
    Kategorien,
    Navbar,
   
  },
  methods:{
    
    logout(){
     store.commit('SET_LOGGED_IN', false)
     if (!this.isLoggedIn) {
        console.log('Successfully logged out')
        this.$router.push('/admin')
      } else {
        console.log('Failed to log out')
        
      }
    },
  }
}
</script>


<style scoped>



h1{
  color:white;
}

.headline{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.headtextbox{
  flex-direction: column;
    align-items: center;
  
}

.headtext1{
display: flex;
justify-content: center;
margin-right:10px
}
.headtext2{
display: flex;
}


#logo{
  
    margin-top: 30px;
    margin-bottom: 30px;
    width:140px;
    z-index:999;
    box-shadow: 
    /*inset 5px 5px 5px rgb(0 0 0 / 20%), inset -5px -5px 15px rgb(255 255 255 / 10%), 5px 5px 15px rgb(0 0 0 / 30%), -5px -5px 15px rgb(255 255 255 / 10%);
    */
        inset -2px 1px 0px rgb(0 0 0 / 20%), inset -5px -5px 15px rgb(255 255 255 / 10%), 5px 5px 6px rgb(0 0 0 / 30%), -5px -5px 15px rgb(255 255 255 / 10%);
    border-radius: 100px;
    padding: 5px;

}









@media (max-width: 825px) {

  h1{
    font-size:35px
  }
}


@media (max-width: 525px) {

  h1{
    font-size:30px;
    text-align:center
  }
  
}

@media (max-width: 405px) {

  #h1{
    font-size:28px;
  text-align:center;
  margin-top:0px;
  }
 
}
  
</style>
