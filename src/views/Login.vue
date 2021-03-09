<template>
    <div class="login">
            <label for="mail">Adresse e-mail</label>
            <input id="mail" type="text" v-model="mail" name="mail">
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
        mail : null,
        pwd : null,
        errors : []
        }
    },
    methods :{
        login(){
            this.errors = [];
            if(!this.mail){
                this.errors.push("Adresse e-mail manquante.");
            }else if(!this.checkMail(this.mail)){
                this.errors.push("E-mail invalide.");
            }
            if(!this.pwd){
                this.errors.push("Mot de passe manquant.");
            }

            if(this.errors.length){
                console.log(this.errors);
                return true;
            }
            axios.post("http://127.0.0.1:5001/login", {
                mail: this.mail,
                password: this.pwd
            }).then(response => {
                console.log("Ah")
            }).catch(error => {
                console.log(error)
            }).finally(()=> console.log("ok"));
        },
        checkMail(mail){
            var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(mail);
        }
    }
}
</script>