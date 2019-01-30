<template>
<div id="app">
  <v-app id="inspire">
    <!-- <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->
    <v-toolbar color="indigo" dark fixed app>
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-toolbar-title>VfactIC</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-title>Application</v-toolbar-title> -->
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
        >
          <v-flex xs8 sm4>
        <v-card>
          <v-toolbar color="indigo" dark>  
            <v-toolbar-title>Select Company</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
  
          <v-list
            subheader
            three-line
          >
            <!-- <v-subheader>Company Names:</v-subheader> -->
  
            <v-list-tile v-for="value in companyList" :key="value.gdID">
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
  </v-app>
</div>
</template>
<script>
import httpClient from "../services/httpClient.js";

export default {
  name: 'Login',
  data() {
    return {
      chnageDataBaseModel: false,
      companyList: []
    }
  },
  beforeMount: function() {
    console.log('calling before mount function');
    this.fetchCompanyList();
  },
  methods: {
    fetchCompanyList: function() {
      console.log('calling fetch function');
      console.log('env::base::', process.env.VUE_APP_API_BASE);
      console.log('env::url::', `${process.env.VUE_APP_API_BASE}CompaniesList`);
      httpClient({
        method: 'get',
        url: `${process.env.VUE_APP_API_BASE}CompaniesList`
      }).then((response) => {
        if (response.status === 200) {
          this.companyList = response.data;
        }
      })
    }
  }
}
</script>
<style>

</style>
