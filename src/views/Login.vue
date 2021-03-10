<template>
    <div class="login">
            <label for="pseudo">Pseudo</label>
            <input id="pseudo" type="text" v-model="pseudo" name="pseudo">
            <label for="pwd">Mot de passe</label>
            <input id="pwd" type="password" v-model="pwd" name="pwd">
            <button type="button" v-on:click="login()">Se connecter</button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "Login",
    data () {
        return{
        pseudo : null,
        pwd : null,
        errors : []
        }
    },
    methods :{
        login(){
            this.errors = [];
            if(!this.pseudo){
                this.errors.push("Pseudo manquant.");
            }else if(!this.checkPseudo(this.pseudo)){
                this.errors.push("Identifiant ou mot de passe incorrect.");
            }
            if(!this.pwd){
                this.errors.push("Mot de passe manquant.");
            }

            if(this.errors.length){
                console.log(this.errors);
                return true;
            }
            axios.post("http://127.0.0.1:5001/login", {
                pseudo: this.pseudo,
                password: this.pwd
            }).then(response => {
                console.log("Ah");
                let token = response.data;
                console.log(token);
                localStorage.setItem("token", token);
            }).catch(error => {
                console.log(error)
            }).finally(()=> console.log("ok"));
        },
        checkPseudo(pseudo){
            let regex = /^(\w+)$/;
            return regex.test(pseudo);
        }
    }
}
</script>