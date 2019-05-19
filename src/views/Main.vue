<template>
<div id="app">
  <v-app id="inspire">
    <v-toolbar color="blue darken-1" dark fixed app>
      <v-toolbar-title>VfactIC</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="chnageDataBaseModel = true" class="blue darken-1">Change database</v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          justify-space-around
        >
        <v-flex xs sm md4>
           <v-img :src=image width=50px; hight=50px;></v-img>
        </v-flex>
        <v-flex xs8 sm4 mt-5 pt-5>
        <v-card>
          <v-toolbar color="blue darken-1" dark>
            <v-toolbar-title>Select Company</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-list
            subheader
            three-line
          >  
            <v-list-tile v-for="value in companyList" :key="value.gdID" style="cursor: pointer" @click="readCompanyDetials(value)">
              <v-list-tile-content>
                <v-list-tile-title>{{ value.displayOrder }}. {{ value.dbDisplayName }}</v-list-tile-title>
                <v-list-tile-sub-title>DataBase Name: {{ value.dbName }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
        </v-card>
      </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="blue darken-1" app inset>
      <span class="white--text">Softvent &copy; 2019</span>
    </v-footer>
    <!-- START: Code for change database model -->
    <v-dialog v-model="chnageDataBaseModel" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    label="Server *"
                    v-model="dataBaseDetails.server"
                    hint="example: server ip or domain name"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    label="DataBase Name *"
                    v-model="dataBaseDetails.databaseName"
                    hint="example: database which you wanna connect"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    label="User Name *"
                    v-model="dataBaseDetails.userName"
                    hint="example: username for database connection"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    label="Password *"
                    v-model="dataBaseDetails.password"
                    hint="example: password for database connection"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="chnageDataBaseModel = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="changeDataBase()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <!-- END: Code for change database model -->
    <!-- START: Code for snackBar -->
      <v-snackbar
          v-model="snackbar"
          :color="snackbarColor"
        >
          {{ snackbarText }}
          <v-btn
            dark
            flat
            @click="snackbar = false"
          >
            Close
          </v-btn>
      </v-snackbar>
    <!-- END: Code for snackBar -->
  </v-app>
</div>
</template>
<script>
import httpClient from "@/services/httpClient.js";

export default {
  name: 'Login',
  data() {
    return {
      chnageDataBaseModel: false,
      chnageDataBaseModel: false,
      companyList: [],
      dataBaseDetails: {
        databaseName: '',
        userName: '',
        password: '',
        server: ''
      },
      snackbar: false,
      snackbarColor: '',
      snackbarText: '',
      image: require('@/assets/login-bg-1.gif')
    }
  },
  beforeMount: function() {
    this.fetchCompanyList();
    this.getSelectDatabaseDetails();
  },
  methods: {
    fetchCompanyList: function() {
      // console.log('calling fetch function');
      console.log('env::base::', process.env.VUE_APP_API_BASE);
      // console.log('env::url::', `${process.env.VUE_APP_API_BASE}CompaniesList`);
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}CompaniesList`
      }).then((response) => {
        if (response.status === 200) {
          this.companyList = response.data;
        }
      })
    },
    changeDataBase: function(details) {
      console.log('details', details);
      const payload = {
        databaseName: this.dataBaseDetails.databaseName,
        userName: this.dataBaseDetails.userName,
        password: this.dataBaseDetails.password,
        server: this.dataBaseDetails.server,
        fileName :window.location.hostname
      }
      console.log('payload', payload);
      httpClient({
        method: 'put',
        url: `${process.env.VUE_APP_API_BASE}ChangeConnectionString`,
        data: payload
      }).then((response) => {
        console.log('Response from server', response);
        if(response.status === 200) {
          //get to localstoage
         
          localStorage.setItem(`dbusername`,this.dataBaseDetails.userName);
          localStorage.setItem(`dbpassword`,this.dataBaseDetails.password);
          localStorage.setItem(`dbserver`,this.dataBaseDetails.server);
          localStorage.setItem('sessionNumber',Math.floor(Math.random() * 100000000));
          this.snackbarColor = 'green',
          this.snackbarText = ' DataBase connection changed successfully!'
          this.snackbar = true;
         this.fetchCompanyList();
        }
      },(error) => {
        console.log('Error::', error);
        this.snackbarColor = 'red',
        this.snackbarText = 'Opps! error occured please check the database details again.'
        this.snackbar = true;
      });
    },
    readCompanyDetials: function(details) {
      const DatabaseName = details.dbName;
      console.log('DatabaseName', DatabaseName);
      localStorage.setItem('dataBaseName', DatabaseName);
      localStorage.setItem('selectedCompanyName', details.dbDisplayName);
      this.$router.push({ path: 'login' })
      /*httpClient({
        method: 'PUT',
        url: `${process.env.VUE_APP_API_BASE}updateDBInConnectionString?selectedCompanyDB=${DatabaseName}`
      }).then((response) => {
        console.log('Response from server', response);
        if(response.status === 200) {

        }
      })*/
    },
    getSelectDatabaseDetails(){
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}ChangeConnectionString`
      }).then((response) => {
        if(response.status === 200) {
          this.dataBaseDetails.databaseName= response.data.databaseName;
          this.dataBaseDetails.userName= response.data.userName;
          this.dataBaseDetails.password= response.data.password;
          this.dataBaseDetails.server= response.data.server;
          //get to localstoage
          let dbName = response.data.databaseName;
          localStorage.setItem(`dbusername`,response.data.userName);
          localStorage.setItem(`dbpassword`,response.data.password);
          localStorage.setItem(`dbserver`,response.data.server);
        }
      })
    }
  }
}
</script>
<style>

</style>
