<template>
  <div class="beer">
    <div id="nav">
      <router-link to="/beers">Beers</router-link> |
      <router-link to="/panier"> <img src="@/assets/shopping-cart.png" alt=""></router-link> |
      <button @click="logout"><router-link to="/">Logout</router-link></button>
    </div>
    <BeerList></BeerList>
  </div>
</template>

<script>
import BeerList from '@/components/BeerList.vue'

export default {
  name: 'Home',
  components: {
    BeerList
  },
  methods :{
    logout(){
      localStorage.clear();
      console.log(localStorage.getItem("token"))
      console.log("hello")
    }
  }
}
</script>

<style scoped>
button{
  color: transparent;
  background-color: transparent;
  border: none;
  text-align: center;
  font-size: 100%;
}
</style>