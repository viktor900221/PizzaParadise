import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    cart: [],
    isLoggedIn: false,
    isLoggedInAdmin: false,
    user: [],
    admin: [],
    rechnungen: [],
    bestellungen: [],
  },
  getters: {
  },
  mutations: {
    addToCart(state, item) {
      state.cart.push(item)
    },
    removeFromCart(state, index) {
      state.cart.splice(index, 1)
    },
    SET_LOGGED_IN(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn
    },
    SET_LOGGED_IN_ADMIN(state, isLoggedInAdmin) {
      state.isLoggedInAdmin = isLoggedInAdmin
    },
    addUser(state, user) {
      state.user.push(user)
      console.log(user)
    },
    addToRechnungen(state, rechnung) {
      state.rechnungen.push(rechnung)
      console.log(rechnung)
    },
    SET_BESTELLUNGEN(state, bestellungen) {
      state.bestellungen = bestellungen
    },
    updateBestellungStatus(state, bestellung) {
      state.bestellungen = state.bestellungen.map(b => {
        if (b.BESTELL_NR === bestellung.BESTELL_NR) {
          return bestellung
        }
        return b
      })
    },

  },
  actions: {
    async loginAdmin({ commit }, userData) {
      console.log(userData);
      // Hier senden wir eine Anfrage an unsere API, um die Anmeldeinformationen zu überprüfen
      try {
        const response = await axios.post('http://localhost:3000/admin', {
          email: userData.email,
          password: userData.password
        });

        // Überprüfe den Status des Antworts

        if (response.data.success) {
          // Ändere den Zustand `isLoggedIn` auf `true`
          commit('SET_LOGGED_IN_ADMIN', true)
          console.log('isLoggedInAdmin: ', this.state.isLoggedInAdmin)
        } else {
          commit('SET_LOGGED_IN_ADMIN', false)
          console.log(false)
        }
        return response
      }
      catch (error) {
        console.error(error)
        commit('SET_LOGGED_IN_ADMIN', false)
        console.log(false)
      }
    },
    async login({ commit }, userData) {
      console.log(userData);
      // Hier senden wir eine Anfrage an unsere API, um die Anmeldeinformationen zu überprüfen
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email: userData.email,
          password: userData.password
        });

        // Überprüfe den Status des Antworts

        if (response.data.success) {
          // Ändere den Zustand `isLoggedIn` auf `true`
          commit('SET_LOGGED_IN', true)
          console.log('isLoggedIn: ', this.state.isLoggedIn)

          const userAdresse = await axios.get(`http://localhost:3000/customerdata/${userData.email}`);
          console.log('userAdresse: ', userAdresse);
          commit('addUser', { email: userData.email, adresse: userAdresse.data.ADRESSE })
          commit('addToRechnungen', { kunden_id: userAdresse.data.KUNDEN_ID })

          console.log('user: ', this.state.user)
          console.log('rechnungen: ', this.state.rechnungen)
        } else {
          commit('SET_LOGGED_IN', false)
          console.log(false)
        }
        return response
      }
      catch (error) {
        console.error(error)
        commit('SET_LOGGED_IN', false)
        console.log(false)
      }
    },
    logout({ commit }) {
      // Perform logout logic here
      commit('SET_LOGGED_IN', false)
    },
    async updateStatus({ commit }, bestellung) {
      commit('updateBestellungStatus', bestellung)
    },
  },

  modules: {
  }
})



