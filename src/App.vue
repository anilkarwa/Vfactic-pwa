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
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import "jquery/dist/jquery.js"
import 'moment/moment.js'
import 'bootstrap/js/dist/collapse.js'
import 'eonasdan-bootstrap-datetimepicker-npm/build/js/bootstrap-datetimepicker.min.js'
import 'eonasdan-bootstrap-datetimepicker-npm/build/css/bootstrap-datetimepicker.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


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
.theme--light.application{
  background-color: white!important;
}

.form-control {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  border-bottom: 1.5px solid #ccc;
  background-color: transparent;
  width:100%;
}



.custom-select{
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  border-bottom: 1.5px solid #ccc;
  background-color: transparent;
  width:100%;
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
.hint{
  font-size: 75%;
  font-style: italic;
  color: cornflowerblue;

}

.help{
  margin-left: .3em;
  position: relative;
}
.help .icon{
display: inline-block;
    width: 20px;
    height: 18px;
    background-image: url("./assets/help-icon.png");
    background-repeat: no-repeat;
    background-position: 50%;
    background-size:contain;
}

.help .helpText{
  background-color:#444;
  bottom:30px;
  color:#fff;
  display:block;
  left:0;
  opacity:0;
  padding:20px;
  pointer-events:none;
  position:absolute;
  text-align:justify;
  width:300px;
  transition:all .25s ease-out;
  box-shadow:2px 2px 6px rgba(0,0,0,.5);
  border-radius:6px
  }
 
 .help .helpText a{
   font-weight:700;
   text-decoration:underline
   }

.help .helpText:before{
  bottom:-20px;
  content:" ";
  display:block;
  height:20px;
  left:0;
  position:absolute;
  width:100%
  }
.help:hover .helpText{
  opacity:1;
  pointer-events:auto;
  transform:translateY(0)
  }

.input-group.date .input-group-addon {
    cursor: pointer;
    width: 20px;
    height: 18px;
    background-image: url("./assets/calendar.jpg");
    background-position: 50%;
    background-size:contain;
 }
 .spaceFromTop{
   position: relative;
   top:50px;
 }
 table thead{
   background-color: #4286f4;
 }
 table thead th{
   color: white !important;
 }

</style>
