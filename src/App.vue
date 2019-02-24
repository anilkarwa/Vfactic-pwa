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
  border-bottom: 1.5px solid #ccc;
  background-color: transparent;
  width:90%;
}



.custom-select{
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  border-bottom: 1.5px solid #ccc;
  background-color: transparent;
  width:90%;
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

.mandatoryStar{
  position: absolute;
  color: rgb(230, 61, 61);
  font-size: 20px;
  margin-top: -7px;
}
.form-group.required label:after {
  content:"*";
  color:red;
  position: relative;
  font-size: 20px;
  margin-top: -9px;
}
.form-group.error .form-control{
  border-bottom: 1.5px solid rgb(202, 41, 41);
}

.form-group.error .custom-select{
  border-bottom: 1.5px solid rgb(202, 41, 41);
}

.errors.help-block span{
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
  font-weight: 100px;
}


fieldset {
 padding-left: 20px;
 margin-bottom: 30px;
}

legend {
  padding: 0.2em 0.5em;
  border-bottom:2px solid rgb(104, 105, 104);
  color:rgb(44, 46, 44);
  margin-bottom: 11px;
}

#Form-generator-css > fieldset > div {
  background-color: transparent!important;
}

</style>
