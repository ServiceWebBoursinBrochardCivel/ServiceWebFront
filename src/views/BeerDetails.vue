<template>
    <div>
        <div>
            <h1>{{beerDetail.name}}</h1>
        </div>

        <div>
            <img :src="beerDetail.image" alt="">
        </div>

        <div>
            <p> Degré d'alcool : {{beerDetail.percentageAlcohol}}</p>
            <p> Catégorie : {{beerDetail.category}}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            beerDetail :{}
        }
    },
    
    beforeMount(){
        axios
        .get('http://127.0.0.1:5000/beer/'+this.$route.params.id).then(res=>{
            this.beerDetail = res.data
        })
        .catch( error=>{
            alert("Erreur de chargement des données.")
        })
    }
    
}
</script>

<style scoped>
a{
    color: black;
}
</style>