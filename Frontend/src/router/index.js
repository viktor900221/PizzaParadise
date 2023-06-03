import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PizzenView from '../views/PizzenView.vue'
import GetraenkeView from '../views/GetraenkeView.vue'
import KuchenView from '../views/KuchenView.vue'
import CRUDView from '../views/CRUDView.vue'
import LoginView from '../views/LoginView.vue'
import store from '../store'
import AdminView from '../views/admin/AdminView.vue'
import DashboardView from '../views/admin/DashboardView.vue'
import SpeisekarteView from '../views/admin/SpeisekarteView.vue'
import BestellungenView from '../views/admin/BestellungenView.vue'
import ProdukteView from '../views/admin/ProdukteView.vue'
import LogAdminView from '../views/admin/LogAdminView.vue'
import ProfilView from '../views/admin/ProfilView.vue'
import KundenView from '../views/admin/KundenView.vue'
import RechnungenView from '../views/admin/RechnungenView.vue'
import EinnahmeView from '../views/admin/EinnahmeView.vue'

const isAuthenticated = (to, from, next) => {
  if (!store.state.isLoggedIn) {
    next({ path: '/login' })
  } else {
    next()
  }
}
const isAuthenticated2 = (to, from, next) => {
  if (!store.state.isLoggedInAdmin) {
    next({ path: '/admin' })
  } else {
    next()
  }
}


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/admin',
    name: 'admin',
    component: LogAdminView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: isAuthenticated,
  },
  {
    path: '/crud',
    name: 'crud',
    component: CRUDView,
    
  },
  {
    path: '/pizzen',
    name: 'pizzen',
    component: PizzenView,
    beforeEnter: isAuthenticated,
  },
  {
    path: '/getraenke',
    name: 'getraenke',
    component: GetraenkeView,
    beforeEnter: isAuthenticated,
  },
  {
    path: '/kuchen',
    name: 'kuchen',
    component: KuchenView,
    beforeEnter: isAuthenticated,
  },
  {
    path: '/admin_home',
    name: 'admin_home',
    component: AdminView,
    beforeEnter: isAuthenticated2,
    children: [

      {
        path: "produkte",
        name: "produkte",
        component: ProdukteView,
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: DashboardView,
      },
      {
        path: "speisekarte",
        name: "speisekarte",
        component: SpeisekarteView,
      },
      {
        path: "bestellungen",
        name: "bestellungen",
        component: BestellungenView,
      },
      {
        path: "profil",
        name: "profil",
        component: ProfilView,
      },
      {
        path: "kunden",
        name: "kunden",
        component: KundenView,
      },
      {
        path: "rechnungen",
        name: "rechnungen",
        component: RechnungenView,
      },
      {
        path: "einnahme",
        name: "einnahme",
        component: EinnahmeView,
      },

    ]

  },



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
