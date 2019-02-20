<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer clipped fixed v-model="drawer" app color="blue darken-1">
        <v-list dense>
          <!-- START: Search bar panel -->
          <v-text-field flat solo-inverted prepend-icon="search" label="Search"></v-text-field>
          <!-- END: Search bar panel -->
          <!-- START: Tree style list -->
          <v-treeview activatable open-on-click transition :items="menu" :active.sync="active" :open.sync="open"></v-treeview>
          <!-- END: Tree style list -->
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app fixed clipped-left color="blue darken-1">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>VFactIC</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <v-layout justify-center align-center>
            <v-flex shrink>
              <div v-if="selected">
                <h1>{{ selected.name }} </h1>
                <component v-bind:is="currentView"></component>
              </div>
              <div v-else>
                <h1>Welcome, VfactIC</h1>
                <h2>Date: {{ new Date() }}</h2>
                <!-- <ValidationExample></ValidationExample> -->
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer app fixed color="blue darken-1">
        <span>NitinAgarwal &copy; 2019</span>
      </v-footer>


    </v-app>
  </div>
</template>
<script>
import httpClient from "@/services/httpClient.js"
import PartyMaster from "@/components/masterPages/PartyMaster.vue"
import GeneralMaster from "@/components/masterPages/GeneralMaster.vue"
import ItemMaster from "@/components/masterPages/ItemMaster.vue"
import ValidationExample from "@/components/masterPages/ValidationField.vue"

export default {
  name: "home",
  components: {
    PartyMaster,
    GeneralMaster,
    ItemMaster,
    ValidationExample
  },
  data: function() {
    return {
      drawer: true,
      menu: [],
      menuChildren: [],
      currentView: '',
      active: [],
      open: []
    };
  },
  beforeMount: function() {
    this.fetchMenu();
  },
  computed: {
    selected () {
      console.log('Active', this.active);
      if (!this.active.length) return undefined

      const id = this.active[0]
      const selectedmenu = this.menuChildren.find(user => user.id === id)
      this.readMenuDocId(selectedmenu)
      return selectedmenu;
    }
  },
  methods: {
    fetchMenu: function() {
      httpClient({
        method: "GET",
        url: `${process.env.VUE_APP_API_BASE}mainMenu?userID=5`
      }).then(res => {
        console.log("Response from server", res);
        if (res.status === 200 && res.data) {
          res.data.forEach(element => {
            const children = {
              id: element.menuId,
              name: element.menuItemCapiton,
              docId: element.menuDocId,
              view: element.pageLink || ''
            };
            // console.log("Tree", children);
            this.menuChildren.push(children);
            // console.log("After pushing the value", this.menu);
          });
          const menuItem = {
            id: 1,
            name: "Master",
            children: this.menuChildren
          };
          this.menu.push(menuItem);
          // console.log("Menu", this.menu);
        }
      });
    },
    readMenuDocId(menuData) {
      console.log('Reading.....', menuData);
      localStorage.setItem('menuDocId', menuData.docId)
      this.currentView = menuData.view;
      console.log('Current View.....', this.currentView);
      // console.log('Doc ID from localstorage', localStorage.getItem('menuDocId'));
    }
  }
};
</script>
<style>
</style>
