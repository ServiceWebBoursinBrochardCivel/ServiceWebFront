<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Login</router-link> |
      <router-link to="/beers">Beers </router-link> |
      <router-link to="/panier"> <img src="@/assets/shopping-cart.png" alt=""> </router-link>  
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

img{
  height: 10%;
  width: auto;
}
ul.grid{
    list-style: none;
    width: 100%;
    text-align: left;
}

li{
  list-style: none;
}

ul.grid li{
    padding: 2px;
    float:left;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 3%;
}

.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  height: 300px;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}

.card img{
  width: auto;
  height: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  
}
</style>
