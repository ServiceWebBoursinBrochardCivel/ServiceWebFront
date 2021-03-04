<template>
  <div class="beerlist">
    <h1>Liste de nos bières</h1>
    <br>

    <div>
      <p>{{localStorage}}</p>
    </div>
    <ul class="grid">
      <li v-for="beer in beers" :key="beer.id">
          <div class="card">
            <router-link :to="'/beer/'+beer.id"><img :src="beer.image" alt=""></router-link>
            <div class="container">
              <h4>{{beer.name}}</h4>
              <div v-if="beer.stock>0">
                <button @click="removeStock(beer)">Ajouter au panier</button>
                <div v-if="isInLocalStorage(beer.id)">
                  <button @click="addStock(beer)">Retirer du panier</button>
                </div>
                <p> Stock restant : {{beer.stock}}</p>
                <p>Votre pannier : {{stockBeer(beer)}}</p>
              </div>
              <div v-if="beer.stock==0">
                <p>Plus de stocks</p>
              </div>
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
      beers :[],
      beersPanier :[]
    } 
  },
  methods:{
    removeStock(beer){
      try{
        var index =this.beers.indexOf(beer);
        axios
        .put('http://127.0.0.1:5000/beer/'+beer.id,{
          name:beer.name,
          percentageAlcohol:beer.percentageAlcohol,
          category:beer.category,
          stock:beer.stock-1,
          image:beer.image
        })
        .then(res => {
            this.beers[index].stock = res.data.stock
        })
        .catch( error=>{
          alert("Erreur de chargement des données.")
        })
        }catch(e){
          console.log(e)
        }
        
        if(localStorage.getItem(beer.id)==null){
          localStorage.setItem(beer.id,1);
        }else{
          localStorage.setItem(beer.id,parseInt(localStorage.getItem(beer.id))+1);
        }
        
        
    },
    addStock(beer){
      try{
        var index =this.beers.indexOf(beer);
        axios
        .put('http://127.0.0.1:5000/beer/'+beer.id,{
          name:beer.name,
          percentageAlcohol:beer.percentageAlcohol,
          category:beer.category,
          stock:beer.stock+1,
          image:beer.image
        })
        .then(res => {
            this.beers[index].stock = res.data.stock
        })
        .catch( error=>{
          alert("Erreur de chargement des données.")
        })
        }catch(e){
          console.log(e)
        }

        if(parseInt(localStorage.getItem(beer.id))-1==0){
          localStorage.removeItem(beer.id);
        }else{
          localStorage.setItem(beer.id,parseInt(localStorage.getItem(beer.id))-1);
        }
    },
    isInLocalStorage(beer){
      if(localStorage.getItem(beer)!=null){
        return true
      }
      return false
    },
    stockBeer(beer){
      return localStorage.getItem(beer.id);
    }

  },
  beforeMount(){
    try{
      axios.get('http://127.0.0.1:5000/beers')
    .then(res => {
        this.beers = res.data
    })
    .catch( error=>{
      alert("Erreur de chargement des données.")
    })
    }catch(e){
      console.log(e)
    }  
  }
}
</script>

<style scoped>

img {
  max-height: auto;
  width: 100px;
}
</style>
