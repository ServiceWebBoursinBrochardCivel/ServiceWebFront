<template>
    <div>
        <div class="head">
            <h1>{{beerDetail.name}}  <router-link to="/beers"> <img src="@/assets/closeWindow.png" alt=""></router-link> </h1>
        </div>

        <div class="image">
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
            beerDetail :{},
            config : {
                headers : {
                    token:localStorage.getItem("token")
                }
            }
        }
    },
    
    beforeMount(){

        if(!localStorage.getItem("token")){
            alert("Veuillez vous connecter avant d'accèder à nos bières")
            this.$router.push({name:'Login'})
            return
        }
        axios
        .get('http://127.0.0.1:5000/beer/'+this.$route.params.id,this.config).then(res=>{
            this.beerDetail = res.data
        })
        .catch( error=>{
            alert("Erreur de chargement des données.")
        })
    }
    
}
</script>

<style scoped>

.head img{
    width: auto;
    height: 30px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}

.image img{
    width: auto;
    height: 400px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
</style>