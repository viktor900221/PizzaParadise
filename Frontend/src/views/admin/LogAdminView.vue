<template>
    <!--<img  id="bedienung" alt="bedienung" src="../assets/deliver.png">-->
<div>
<div>
 <div class="wave"></div>
 <div class="wave"></div>
 <div class="wave"></div>
</div>
<!--@submit.prevent="submitLogin"-->
<form class="login" @submit.prevent="submitLogin">

    <h3>PizzaParadise </h3>
    <label for="username">Username</label>
    <input type="text" placeholder="Email" id="usernameLogin" v-model="login_form.email">
    <label for="password">Password</label>
    <input type="password" placeholder="Password" id="passwordLogin" v-model="login_form.password">
    <button value="Login">Log In</button>
    <h3 id="adminH3">Admin</h3>
   <div class="imgbox">
    <img  id="deliver" alt="deliver" src="../../assets/deliver.png">
<img  id="stadt" alt="stadt" src="../../assets/intelligente-stadt.png">
</div>
</form>
</div>
</template>

<script>
import axios from "axios";
import {ref} from 'vue'
import { mapActions } from 'vuex'
import store from "../../store"
import { mapState } from 'vuex'


export default {
    name: 'LogAdminView',
    beforeCreate: function() {
        document.body.className = 'loginpage';
    },
    computed: mapState({
        isLoggedInAdmin: state => state.isLoggedInAdmin
    }),
    watch: {
        isLoggedInAdmin(value) {
            if (value) {
                this.$router.push({ name: "admin_home" });
            }
        }
    },
    data() {
        return {
            login_form:{
            email: '',
            password: '',
        }
        }
    },
    methods: {
        ...mapActions(['loginAdmin']),
        submitLogin() {
            try {
                this.loginAdmin({ email: this.login_form.email, password: this.login_form.password })
                    .then(() => {
                        this.$router.push({ name: 'dashboard' });
                    });
                console.log(store.state.isLoggedInAdmin)
            } catch (error) {
                console.error(error);
            }
        }
    }
};





</script>

<style scoped>

*
*,
*:before,
*:after{
padding: 0;
margin: 0;
box-sizing: border-box;
}

.background{
width: 430px;
height: 520px;
position: absolute;
transform: translate(-50%,-50%);
left: 50%;
top: 50%;
}

.background .shape{
height: 200px;
width: 200px;
position: absolute;
border-radius: 50%;
}
.shape:first-child{
background: linear-gradient(
    #1845ad,
    #23a2f6
);
left: -80px;
top: -80px;
}
.shape:last-child{
background: linear-gradient(
    to right,
    #ff512f,
    #f09819
);
right: -30px;
bottom: -80px;
}

/*deliver*/ 
img{max-width: 50px}
.imgbox{
display: flex;
justify-content: space-between;
}

#signin{
  margin-top:15px;
}

/*Form*/
form{
height: 520px;
width: 400px;
/*background-color: rgba(255,255,255,0.13);*/
background-color:#266370;
position: absolute;
transform: translate(-50%,-50%);
top: 50%;
left: 50%;
border-radius: 10px;

border: 2px solid rgba(255,255,255,0.1);
box-shadow: 0 0 40px rgba(8,7,16,0.6);
padding: 50px 35px;
}


form *{
  font-family: 'Segoe Print', Tahoma, Geneva, Verdana, sans-serif, Helvetica, Arial, sans-serif;

color: #ffffff;
letter-spacing: 0.5px;
outline: none;
border: none;
}
form h3{
font-size: 32px;
font-weight: 500;
line-height: 42px;
text-align: center;
    color: ghostwhite
}

label{
display: block;
margin-top: 25px;
font-size: 16px;
font-weight: 500;
}
input{
display: block;
height: 50px;
width: 100%;
background-color: rgba(255,255,255,0.07);
border-radius: 3px;
padding: 0 10px;
margin-top: 8px;
font-size: 14px;
font-weight: 300;
}
::placeholder{
color: #e5e5e5;
}
button{
margin-top: 25px;
width: 100%;
background-color: #ffffff;
color: #080710;
padding: 15px 0;
font-size: 18px;
font-weight: 600;
border-radius: 5px;
cursor: pointer;
}

.register {
display: none;
z-index: 1;
padding: 0px 35px;
}

.login{
padding: 45px 35px;
}

.box-SignInLogIn{
display:flex;
flex-direction: column;
align-items: center;
padding:5px;
}
.signin {
cursor: pointer;
}
.loginb{
cursor: pointer;

}
.signinbutton{
display: block;
}

.loginbutton{
display: none;
}
#adminH3{
    margin-top:15px ;
    color: #122e32;
}
</style>