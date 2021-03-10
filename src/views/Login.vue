<template>
    <div class="login">
        <br>
        <h1>Login</h1>
        <div class="form-groupe">
            <label for="pseudo">Pseudo  </label>
            <input id="pseudo" type="text" v-model="pseudo" name="pseudo">
        </div>
        <br>
        <div class="form-groupe">
            <label for="pwd">Mot de passe  </label>
            <input id="pwd" type="password" v-model="pwd" name="pwd">
        </div>
        <br>
        <div class="form-groupe">
            <button type="button" v-on:click="login()">Se connecter</button>
        </div>
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
                alert("Pseudo manquant.")
            }else if(!this.checkPseudo(this.pseudo)){
                this.errors.push("Identifiant ou mot de passe incorrect.");
                alert("Identifiant ou mot de passe incorrect.")
            }
            if(!this.pwd){
                this.errors.push("Mot de passe manquant.");
                alert("Mot de passe manquant.")
            }

            if(this.errors.length){
                console.log(this.errors);
                return true;
            }
            axios.post("http://127.0.0.1:5001/login", {
                pseudo: this.pseudo,
                password: this.pwd
            }).then(response => {
                let token = response.data;
                console.log(token);
                localStorage.setItem("token", token);
                this.$router.push({name:'Beers'})
            }).catch(error => {
                alert("Identifiant ou mot de passe incorrect");
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