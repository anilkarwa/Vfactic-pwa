<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer clipped fixed v-model="drawer" app color="blue darken-1">
        <v-list dense>
            <v-card  class="mx-auto"   max-width="500" >
              <v-sheet class="pa-3 primary">
                <v-text-field v-model="search"  label="Search.." dark
                  flat solo-inverted hide-details clearable clear-icon="mdi-close-circle-outline"  ></v-text-field>
              </v-sheet>
              <v-card-text>
                <v-treeview activatable open-on-click transition  :items="menu" :search="search" :open.sync="open"
                item-key="menuId" item-text="menuItemCapiton" :active.sync="active" > 
                  <template v-slot:prepend="{ item, active }">
                    <v-icon
                      v-if="!item.children"
                      :color="active ? 'primary' : ''"
                    >
                      mdi-account
                    </v-icon>
                  </template>
                </v-treeview>
              </v-card-text>
            </v-card>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app fixed clipped-left color="blue darken-1">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">{{selectedCompanyName}}</v-toolbar-title>
        <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat class="white--text" @click="userLogout()">Logout</v-btn>

      </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <v-layout justify-center align-center>
            <v-flex shrink>
              <div v-if="selected">
                <h1>{{ selected.menuItemCapiton }} </h1>
                <component v-bind:is="currentView"></component>
              </div>
              <div v-else>
                <h1>Dashboard</h1>            
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer app fixed >
        <v-card  class="flex" flat tile color="blue darken-1" >
          <v-card-title >
            <strong class="subheading">Softvent &copy;2019</strong>
  
            <v-spacer></v-spacer>
            <span class="white--text"> Login : {{loggedInUserName}}</span> &nbsp &nbsp&nbsp&nbsp
            <span class="white--text"> Finanical Year : {{currentFinancialYear}}</span>

          </v-card-title>
        </v-card>
      </v-footer>


    </v-app>
  </div>
</template>
<script>
import httpClient from "@/services/httpClient.js"
import PartyMaster from "@/components/masterPages/PartyMaster.vue"
import GeneralMaster from "@/components/masterPages/GeneralMaster.vue"
import ItemMaster from "@/components/masterPages/ItemMaster.vue"
import PartyDocTranscation from "@/components/Transcations/PartyDocTranscation.vue"


export default {
  name: "home",
  components: {
    PartyMaster,
    GeneralMaster,
    ItemMaster,
    PartyDocTranscation
  },
  data: function() {
    return {
      drawer: true,
      menu: [],
      currentView: '',
      active: [],
      open: [1,1],
      search: null,
      caseSensitive: false,
      loggedInUserName :'',
      selectedCompanyName: '',
      currentFinancialYear : ''
    };
  },
  beforeMount: function() {
    
    if(localStorage.getItem('userId') == null){
      this.$router.push({ path: '/' });
    }
    if(localStorage.getItem('userName') != null){
      this.loggedInUserName = localStorage.getItem('userName');
    }
    if(localStorage.getItem('selectedCompanyName') != null){
      this.selectedCompanyName = localStorage.getItem('selectedCompanyName');
    }
    if(localStorage.getItem('financialYear') != null){
      this.currentFinancialYear = localStorage.getItem('financialYear');
    }
    this.fetchMenu();
  },
  computed: {
    selected () {
     // console.log('Active', this.active);
      if (!this.active.length) return undefined
      const id = this.active[0]
      let selectedmenu = null;
      let selectedMenuRow = null;
      this.menu.forEach(m =>{
         if(m.children.length > 0){
            selectedmenu = m.children.find( cm => cm.menuId === id);
            if(!selectedmenu){
              m.children.forEach( fc =>{
                selectedmenu = fc.children.find( sm => sm.menuId ===id);
                if(selectedmenu){
                  selectedMenuRow = selectedmenu;
                }
              })
              if(selectedmenu){
                  selectedMenuRow = selectedmenu;
                }
            } 
            
         }
      })
      if(selectedMenuRow){
      console.log('selected item= '+JSON.stringify(selectedMenuRow));
       localStorage.setItem('menuDocId', selectedMenuRow.menuDocId)
      this.currentView = '';
      let that = this;
      setTimeout(() => 
        {
          that.currentView = selectedMenuRow.pageLink;
        },
        100);
      }
      return selectedMenuRow;
    }
  },
  methods: {
    fetchMenu: function() {
      let selectedUser = 0;
      if(localStorage.getItem('userId') != null){
        selectedUser = localStorage.getItem('userId');
      }
      httpClient({
        method: "GET",
        url: `${process.env.VUE_APP_API_BASE}mainMenu?userID=${selectedUser}`
      }).then(res => {
        console.log("Response from server", res);
        if (res.status === 200 && res.data) {
            this.menu = res.data;
        }
      });
    },
    userLogout(){
      localStorage.clear();
      this.$router.push({ path: '/' })
    }
  }
};
</script>
<style>
</style>
