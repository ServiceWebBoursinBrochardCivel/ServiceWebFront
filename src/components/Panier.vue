<template>
  <div class="beerlist">
    <h1>Votre Panier</h1>
    <br>
    <table class="grid">
      <tr v-for="beer in beers" :key="beer.id">
          <td class="card">
            <router-link :to="'/beer/'+beer.id"><img :src="beer.image" alt=""></router-link>
            <span class="container">
              <h4> Bière : {{beer.name}}</h4>
              <p>Quantité dans votre panier de {{beer.name}} : {{quantiteBeer(beer)}}</p>
            </span>
          </td>
      </tr>
    </table>


    <div v-if="beers.length!=0" class="buttons">

      <button @click="annulerPanier()">Annuler la commande</button>
      <button @click="validerPanier()">Valider votre panier</button>
    </div>

    <div v-if="beers.length==0">
      <h3>Vous n'avez aucun élément dans votre panier. Aller en ajouter sur la page <router-link to="/beers">Beers</router-link> </h3>
    </div>
    
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
    },
     validerPanier(){
      let current_beer=null;
      //modification du stock
      //vider panier
      //vider localStorage
      this.beers.forEach( async beer => {
        
        await axios
        .get('http://127.0.0.1:5000/beer/'+beer.id).
        then(res => {
            current_beer = res.data
        })
        .catch( error=>{
          alert(error)
        })

        if(current_beer.stock<localStorage.getItem(beer.id)){
          alert("Le stock restant est désormais inférieur à la quantite de votre panier pour la bière "+beer.name);
          return;
        }
        
        axios
        .put('http://127.0.0.1:5000/beer/'+beer.id,{
          name:beer.name,
          percentageAlcohol:beer.percentageAlcohol,
          category:beer.category,
          stock:beer.stock-localStorage.getItem(beer.id),
          image:beer.image
        })
        .catch( error=>{
          alert(error)
        })

        localStorage.removeItem(beer.id);

        axios
          .delete('http://127.0.0.1:5000/panier/'+beer.id+'/1')
          .catch( error=>{
            alert(error)
          })
      });
      window.location.reload()
    },
    annulerPanier(){
      this.beers.forEach(beer => {
        localStorage.removeItem(beer.id);

        axios
          .delete('http://127.0.0.1:5000/panier/'+beer.id+'/1')
          .catch( error=>{
            alert(error)
          })
      });
      window.location.reload()
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

.beerlist{
  text-align: center;
  display: grid;
  grid-template-rows: 3;
}


.buttons{
  margin-top: 1%;
}

img{
   width: auto;
  height: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
