import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BeerList from '../views/BeerListView.vue'
import BeerDetails from '../views/BeerDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
]

const router = new VueRouter({
  routes
})

export default router
