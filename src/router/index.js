import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import BeerList from '../views/BeerListView.vue'
import BeerDetails from '../views/BeerDetails.vue'
import Panier from '../views/PanierView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/beers',
    name: 'Beers',
    component: BeerList
  },
  {
    path:'/beer/:id',
    name :"BeerDetails",
    component : BeerDetails
  },
  {
    path:'/panier',
    name :"Panier",
    component : Panier
  },
]

const router = new VueRouter({
  routes
})

export default router
