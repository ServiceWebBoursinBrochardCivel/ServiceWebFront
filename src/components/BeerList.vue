<template>
  <div class="beerlist">
    <h1>Liste de nos bières</h1>
    <br>

    <ul class="grid">
      <li v-for="beer in beers" :key="beer.id">
          <div class="card">
            <router-link :to="'/beer/'+beer.id"><img :src="beer.image" alt=""></router-link>
            <div class="container">
              <h4>{{beer.name}}</h4>
              <div>
                <div v-if="beer.stock - panierBeer(beer)>0">
                  <button @click="removeStock(beer)">Ajouter au panier</button>
                </div>
                <div v-if="isInLocalStorage(beer.id)">
                  <button @click="addStock(beer)">Retirer du panier</button>
                </div>
                <p> Stock restant : {{beer.stock - panierBeer(beer)}}</p>
                <p>Votre panier : {{panierBeer(beer)}}</p>
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

        if(localStorage.getItem(beer.id)==null){
          localStorage.setItem(beer.id,1);

           axios
            .post('http://127.0.0.1:5000/panier',{
              beer_id:beer.id,
              user_id:1,
              quantite:localStorage.getItem(beer.id)
            })
            .then(res => {
              this.$forceUpdate()
                
            })
            .catch( error=>{
              alert("Erreur de changement de stock PO.")
            })

        }else{
          localStorage.setItem(beer.id,parseInt(localStorage.getItem(beer.id))+1);

          axios
            .put('http://127.0.0.1:5000/panier/'+beer.id+'/1',{
              beer_id:beer.id,
              user_id:1,
              quantite:localStorage.getItem(beer.id)
            })
            .then(res => {
              this.$forceUpdate()
                
            })
            .catch( error=>{
              alert("Erreur de changement de stock P.")
            })
        }
    },
    addStock(beer){
        if(parseInt(localStorage.getItem(beer.id))-1==0){
          localStorage.removeItem(beer.id);

          axios
            .delete('http://127.0.0.1:5000/panier/'+beer.id+'/1')
            .then(res => {
              this.$forceUpdate()
                
            })
            .catch( error=>{
              alert(error)
            })
        }else{
          localStorage.setItem(beer.id,parseInt(localStorage.getItem(beer.id))-1);

          axios
            .put('http://127.0.0.1:5000/panier/'+beer.id+'/1',{
              beer_id:beer.id,
              user_id:1,
              quantite:localStorage.getItem(beer.id)
            })
            .then(res => {
              this.$forceUpdate()
               
            })
            .catch( error=>{
              alert("Erreur de Changement de données P2.")
            }) 
        }
    },
    isInLocalStorage(beer){
      if(localStorage.getItem(beer)!=null){
        return true
      }
      return false
    },
    panierBeer(beer){
      if(localStorage.getItem(beer.id)==null){
        return 0
      }
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
</style>
