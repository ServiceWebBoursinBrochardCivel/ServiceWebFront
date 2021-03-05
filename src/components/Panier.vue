<template>
  <div class="beerlist">
    <h1>Votre Panier</h1>
    <br>
    <ul class="list">
      <li v-for="beer in beers" :key="beer.id">
          <div class="card">
            <router-link :to="'/beer/'+beer.id"><img :src="beer.image" alt=""></router-link>
            <div class="container">
              <h4> Bière : {{beer.name}}</h4>
              <p>Quantité dans votre panier de {{beer.name}} : {{quantiteBeer(beer)}}</p>
            </div>
          </div>
      </li>
    </ul>
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'BeerList',
  data(){
    return{
      beersPanier :[],
      beers :[]
    } 
  },
  methods:{
    quantiteBeer(beer){
      var index = this.beers.indexOf(beer)
      return this.beersPanier[index].quantite
    }
  },
  async beforeMount(){
    try{
      await axios.get('http://127.0.0.1:5000/panier/1')
    .then(res => {
        this.beersPanier = res.data
    })
    .catch( error=>{
      alert("Erreur de chargement des données.")
    })
    }catch(e){
      console.log(e)
    }  

    this.beersPanier.forEach(item => {
      try{
        axios.get('http://127.0.0.1:5000/beer/'+item.beer_id)
      .then(res => {
          this.beers.push(res.data)
      })
      .catch( error=>{
        alert("Erreur de chargement des données.")
      })
      }catch(e){
        console.log(e)
      }  
    });  
  }
}
</script>

<style scoped>

img {
  max-height: auto;
  width: 100px;
}
</style>
