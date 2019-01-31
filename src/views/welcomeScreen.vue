<template>
<div id="app">
  <v-app id="inspire">
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-title>VfactIC</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="chnageDataBaseModel = true" class="indigo">Change database</v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
        >
          <v-flex xs8 sm4 mt-5 pt-5>
        <v-card>
          <v-toolbar color="indigo" dark>
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
    <v-footer color="indigo" app inset>
      <span class="white--text">NitinAgarwal &copy; 2019</span>
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
            <v-btn color="blue darken-1" flat @click="chnageDataBaseModel = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <!-- END: Code for change database model -->
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
        databaseName: 'vFactIC_Globe',
        userName: 'sa',
        password: 'svt@123$$',
        server: 'SOFTVENTS02'
      }
    }
  },
  beforeMount: function() {
    console.log('calling before mount function');
    this.fetchCompanyList();
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
        server: this.dataBaseDetails.server
      }
      console.log('payload', payload);
      httpClient({
        method: 'PUT',
        url: `${process.env.VUE_APP_API_BASE}ChangeConnectionString`,
        payload: payload
      }).then((response) => {
        console.log('Response from server', response);
      });
    },
    readCompanyDetials: function(details) {
      const DatabaseName = details.dbName;
      console.log('DatabaseName', DatabaseName);
      httpClient({
        method: 'PUT',
        url: `${process.env.VUE_APP_API_BASE}updateDBInConnectionString?selectedCompanyDB=${DatabaseName}`
      }).then((response) => {
        console.log('Response from server', response);
      })
      this.$router.push({ path: 'login' })
    }
  }
}
</script>
<style>

</style>
