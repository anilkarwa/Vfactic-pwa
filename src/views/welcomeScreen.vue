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
  
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>1. Company one</v-list-tile-title>
                <v-list-tile-sub-title>little description for company one</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
  
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>2. Company two</v-list-tile-title>
                <v-list-tile-sub-title>little description for company two</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>N. And so on......</v-list-tile-title>
                <v-list-tile-sub-title>little description</v-list-tile-sub-title>
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
export default {
  name: 'Login',
  data() {
    return {
      chnageDataBaseModel: false
    }
  }
}
</script>
<style>

</style>
