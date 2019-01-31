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
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="indigo">
                <v-toolbar-title >NitinAgarwal</v-toolbar-title>
                <!-- <v-spacer></v-spacer> -->
                <!-- <v-tooltip bottom>
                  <v-btn
                    icon
                    large
                    :href="source"
                    target="_blank"
                    slot="activator"
                  >
                    <v-icon large>code</v-icon>
                  </v-btn>
                  <span>Source</span>
                </v-tooltip> -->
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" :model="loginModel.userName" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" :model="loginModel.password" name="password" label="Password" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="userLogin()">Login</v-btn>
              </v-card-actions>
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
import httpClient from "@/services/httpClient.js";

export default {
  name: 'Login',
  data() {
    return {
      loginModel: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    userLogin() {
      const username = this.loginModel.userName;
      const password = this.loginModel.password;
        httpClient({
          method: 'GET',
          url: `${process.env.VUE_APP_API_BASE}Login?username=${username}&password=${password}`
        }).then((result) => {
          console.log('Result', result);
        }).catch((err) => {
          console.log('Error Handling', err);
        });


    }
  }
}
</script>
<style>

</style>
