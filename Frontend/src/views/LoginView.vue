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
      <h3>PizzaParadise</h3>

      <label for="username">Username</label>
      <input
        type="text"
        placeholder="Email"
        id="usernameLogin"
        v-model="login_form.email"
      />

      <label for="password">Password</label>
      <input
        type="password"
        placeholder="Password"
        id="passwordLogin"
        v-model="login_form.password"
      />

      <button value="Login">Log In</button>
      <div class="box-SignInLogIn">
        <a class="signin signinbutton" @click="showBoxR">Sign In</a>
      </div>
      <div class="imgbox">
        <img id="deliver" alt="deliver" src="../assets/deliver.png" />
        <img id="stadt" alt="stadt" src="../assets/intelligente-stadt.png" />
      </div>
    </form>

    <form class="register" @submit.prevent="register">
      <img src="" alt="" />

      <label for="username">Email</label>
      <input
        type="email"
        placeholder="Email"
        id="usernameReg"
        v-model="register_form.email"
      />

      <label for="password">Passwort</label>
      <input
        type="password"
        placeholder="Password"
        id="passwordReg"
        v-model="register_form.password"
      />

      <label for="adresse">Adresse</label>
      <input
        type="text"
        placeholder="Adresse"
        id="adresseReg"
        v-model="register_form.adresse"
      />

      <button id="signin">Registrierung</button>
      <div class="box-SignInLogIn">
        <a class="loginb loginbutton" @click="showBoxL">Anmelden</a>
      </div>

      <div class="imgbox"></div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { mapActions } from "vuex";
import store from "../store";
import { mapState } from "vuex";

export default {
  beforeCreate: function () {
    document.body.className = "loginpage";
  },
  setup() {
    const login_form = ref({});
    const register_form = ref({});
    const login = async () => {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          email: login_form.value.email,
          password: login_form.value.password,
        });
        console.log(response);
        store.dispatch("login", {
          email: login_form.value.email,
          password: login_form.value.password,
        });
      } catch (error) {
        console.error(error);
      }
    };
    const register = async () => {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (
        !register_form.value.email ||
        !emailRegex.test(register_form.value.email)
      ) {
        console.error("Invalid email");
        return;
      }
      try {
        const response = await axios.post("http://localhost:3000/register", {
          email: register_form.value.email,
          password: register_form.value.password,
          adresse: register_form.value.adresse,
        });
        console.log(response.data);
        alert(
          "Sie haben sich erfolgreich registriert, jetzt können sie sich einloggen"
        );
      } catch (error) {
        console.error(error);
      }
    };
    return {
      login_form,
      register_form,
      login,
      register,
    };
  },
  data() {
    return {
      email: "",
      password: "",
      adresse: "",
    };
  },
  computed: mapState({
    isLoggedIn: (state) => state.isLoggedIn,
  }),
  watch: {
    isLoggedIn(value) {
      if (value) {
        this.$router.push({ name: "home" });
      }
    },
  },
  methods: {
    ...mapActions(["login"]),

    submitLogin() {
      try {
        this.login({ email: this.email, password: this.password }).then(() => {
          this.$router.push({ name: "home" });
        });
        console.log(store.state.isLoggedIn);
      } catch (error) {
        console.error(error);
      }
    },

    showBoxR() {
      let regBox = document.querySelector(".register");
      regBox.style.display = "block";
      document.querySelector(".signinbutton").style.display = "none";
      //document.querySelector('img').style.display = "none"
      document.querySelector(".loginbutton").style.display = "block";
      document.querySelector("form").style.boxShadow =
        "0 0 5px rgb(8 7 16 / 60%)";
    },

    showBoxL() {
      let regBox = document.querySelector(".register");
      regBox.style.display = "none";
      document.querySelector(".signinbutton").style.display = "block";
      document.querySelector(".loginbutton").style.display = "none";
      ("0 0 40px rgb(8 7 16 / 60%)");
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Segoe Print", Tahoma, Geneva, Verdana, sans-serif, Helvetica,
    Arial, sans-serif;
}
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.background {
  width: 430px;
  height: 520px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}

.background .shape {
  height: 200px;
  width: 200px;
  position: absolute;
  border-radius: 50%;
}
.shape:first-child {
  background: linear-gradient(#1845ad, #23a2f6);
  left: -80px;
  top: -80px;
}
.shape:last-child {
  background: linear-gradient(to right, #ff512f, #f09819);
  right: -30px;
  bottom: -80px;
}

/*deliver*/
img {
  max-width: 50px;
}
.imgbox {
  display: flex;
  justify-content: space-between;
}

#signin {
  margin-top: 15px;
}

/*Form*/
form {
  height: 520px;
  width: 400px;
  /*background-color: rgba(255,255,255,0.13);*/
  background-color: #266370;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;

  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
}

form * {
  font-family: "Segoe Print", Tahoma, Geneva, Verdana, sans-serif, Helvetica,
    Arial, sans-serif;

  color: #ffffff;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}
form h3 {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
  color: ghostwhite;
}

label {
  display: block;
  margin-top: 25px;
  font-size: 16px;
  font-weight: 500;
}
input {
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}
::placeholder {
  color: #e5e5e5;
}
button {
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

.login {
  padding: 45px 35px;
}

.box-SignInLogIn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
}
.signin {
  cursor: pointer;
}
.loginb {
  cursor: pointer;
}
.signinbutton {
  display: block;
}

.loginbutton {
  display: none;
}
</style>