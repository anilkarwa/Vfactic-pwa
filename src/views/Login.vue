<template>
<div id="app">
  <v-app id="inspire">
    <v-toolbar color="blue darken-1" dark fixed app>
      <v-toolbar-title>VfactIC</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to = "/"><span class="white--text">Back to Company Selection</span> </router-link>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
          justify-space-around
        >
        <v-flex xs sm md4>
           <v-img :src=loginImage width=50px; hight=50px;></v-img>
        </v-flex>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="blue darken-1">
                <v-toolbar-title >User Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" v-model="loginModel.userName" name="login" label="Login" type="text" ></v-text-field>
                  <v-text-field prepend-icon="lock" v-model="loginModel.password" name="password" label="Password" id="password" type="password" ></v-text-field>
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
    <v-footer color="blue darken-1" app inset>
      <span class="white--text">Softvent &copy; 2019</span>
    </v-footer>
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
      loginModel: {
        userName: '',
        password: ''
      },
      LoginFormvalid: true,
      snackbar: false,
      snackbarColor: '',
      snackbarText: '',
      loginImage: require('@/assets/login-bg-2.gif')
    }
  },
  methods: {
    userLogin() {
      if(this.loginModel.userName && this.loginModel.password) {
        const username = this.loginModel.userName;
        const password = this.loginModel.password;
        httpClient({
          method: 'GET',
          url: `${process.env.VUE_APP_API_BASE}Login?username=${username}&password=${password}`
        }).then((result) => {
          console.log('Result', result.data);
          if(result.data.userId !== 0) {
            localStorage.setItem('userId', result.data.userId);
            localStorage.setItem('userName',result.data.name);
            localStorage.setItem('financialYear',result.data.financialYear);
            this.$router.push({ path: 'home' })
          } else {
            this.snackbarColor = 'red',
            this.snackbarText = 'Invalid Username and password'
            this.snackbar = true;
          }
        }).catch((err) => {
          console.log('Error Handling', err);
          this.snackbarColor = 'red',
          this.snackbarText = 'Opps! error is occured!'
          this.snackbar = true;
        });
      } else {
        this.snackbarColor = 'red',
        this.snackbarText = 'username and password should not be empty'
        this.snackbar = true;
      }
    }
  }
}
</script>
<style>
</style>
