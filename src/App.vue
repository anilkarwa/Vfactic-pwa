<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>
<script>
import 'vuetify/dist/vuetify.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  
}
</script>

<style>

 @import url('https://fonts.googleapis.com/css?family=Raleway:300,400,700');
* {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1f2429;
  font-weight: 400;
}

#app{
  text-align: center;
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

.form-control {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  border-bottom: 2px solid #ccc;
  background-color: transparent;
}



.custom-select{
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  border-bottom: 2px solid #ccc;
  background-color: transparent;
}

 .custom-select:focus{
  border-color: #007BFF;
   box-shadow:0 0 0;
  /* box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgb(221, 230, 238); */
} 

 .form-control:focus {
  border-color: #007BFF;
  box-shadow: 0 0 0 ;
} 

</style>
