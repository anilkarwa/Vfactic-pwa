<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer clipped fixed v-model="drawer" app color="blue darken-1">
        <v-list dense>
            <v-card  class="mx-auto"   max-width="500" >
              <v-sheet class="pa-3 primary">
                <!-- <v-text-field v-model="search"  label="Search.." dark
                  flat solo-inverted hide-details clearable clear-icon="mdi-close-circle-outline"  ></v-text-field> -->
              </v-sheet>
              <v-card-text>
                <div v-if="menu && menu.length">
                <b-tree-view :data="menu" nodeLabelProp="menuItemCapiton" :renameNodeOnDblClick="renameMenu" :contextMenuItems="contextMenuItems" @nodeSelect="selectedMenu"></b-tree-view>
                </div>
              </v-card-text>
            </v-card>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app fixed clipped-left color="blue darken-1">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">{{selectedCompanyName}}</v-toolbar-title>
        <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat class="white--text" @click="changeUser()">Change User</v-btn>
        <v-btn flat class="white--text" @click="userLogout()">Logout</v-btn>

      </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <v-layout justify-center align-center>
            <v-flex shrink>
              <div v-if="selecteMenu">
                <h1>{{ selecteMenu.menuItemCapiton }} </h1>
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
            <span @dblclick="changeFinancialYear()" style="cursor:pointer;" class="white--text"> Finanical Year : {{currentFinancialYear}}</span>

            <v-dialog v-model="financialYearDialog" scrollable max-width="700px">
              <v-card>
                <v-card-title>Change financial Year</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 400px;">
                  <v-data-table  :headers="financialYearTableheaders"  :items="financialYearList"  class="elevation-1" >
                    <template v-slot:items="props">
                      <td class="text-xs-center">{{ props.item.fromDate }}</td>
                      <td class="text-xs-center">{{ props.item.toDate }}</td>
                      <td class="text-xs-right">
                         <v-switch v-model="props.item.active" @change="switchFinancialYear(props.item)"></v-switch>
                      </td>
                    </template>
                  </v-data-table>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn color="blue darken-1" flat @click="financialYearDialog = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

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
import ItemOpenningBalance from "@/components/FixedViews/Items/ItemOpenningBalance.vue";
import PurhaseBillAgainstPO from "@/components/Transcations/PurchaseBillAgainstPO.vue";
import TrnWithOutDetailItem from "@/components/Transcations/TrnWithOutDetailItem.vue";
import StoreIndent from "@/components/Transcations/StoreIndent.vue";
import StoreIssueNote from "@/components/Transcations/StoreIssueNote.vue";
import AuthoriseDocument from "@/components/Utilities/AuthoriseDocument.vue";
import ShortCloseDocument from "@/components/Utilities/ShortCloseDocument.vue";

export default {
  name: "home",
  components: {
    PartyMaster,
    GeneralMaster,
    ItemMaster,
    PartyDocTranscation,
    ItemOpenningBalance,
    PurhaseBillAgainstPO,
    TrnWithOutDetailItem,
    StoreIndent,
    StoreIssueNote,
    AuthoriseDocument,
    ShortCloseDocument
    
    
    
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
      currentFinancialYear : '',
      renameMenu: false,
      contextMenuItems : [],
      selecteMenu:{},
      financialYearDialog:false,
      financialYearList: [],
      financialYearTableheaders : [
        { text: 'From Date', align: 'center',  value: 'fromDate',sortable: false, },
        { text: 'To Date', align: 'center',  value: 'toDate',sortable: false, },
        { text: 'Action', align: 'left',  value: 'active',sortable: false, }
        ],
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
    selectedMenu(treeObject, isSelected){
      console.log(JSON.stringify(treeObject.data)+ " "+ isSelected);
      if(isSelected){
      const id = treeObject.data.menuId;
      let selectedmenu = null;
      let selectedMenuRow = null;
      this.menu.forEach(m =>{
         if(m.children.length > 0){
            selectedmenu = m.children.find( cm => cm.menuId == id);
            if(!selectedmenu){
              m.children.forEach( fc =>{
                selectedmenu = fc.children.find( sm => sm.menuId == id);
                if(selectedmenu){
                  selectedMenuRow = selectedmenu;
                }
              })
            } 
             if(selectedmenu){
               selectedMenuRow = selectedmenu;
            }
            
         }
      })
      
      if(selectedMenuRow && selectedMenuRow.pageLink !="" &&  selectedMenuRow.pageLink !=null && isSelected){
        this.selecteMenu = selectedMenuRow;
        console.log('selected item= '+JSON.stringify(selectedMenuRow));
        this.processUserRoles(selectedMenuRow.userRights);
        localStorage.setItem('menuDocId', selectedMenuRow.menuDocId)
        this.currentView = '';
        let that = this;
        setTimeout(() => 
          {
            that.currentView = selectedMenuRow.pageLink;
          },
          100);
        }
      }
    },
    changeFinancialYear(){
      this.financialYearDialog =true;
      httpClient({
        method: "GET",
        url: `${process.env.VUE_APP_API_BASE}ChangeFinanicalYear`
      }).then(res => {
        if (res.status === 200 && res.data) {
            this.financialYearList = res.data;
        }
      });
    },
    switchFinancialYear(row){
      //reset all other financial year to false
      this.financialYearList.forEach(e =>{
         if(e.fromDate != row.fromDate && e.toDate != row.toDate){
           e.active = false;
         } else{
           localStorage.setItem('financialYear',e.fromDate+ ' - '+e.toDate);
           this.currentFinancialYear = e.fromDate+ ' - '+e.toDate;
         }
      })

      httpClient({
        method: "PUT",
        url: `${process.env.VUE_APP_API_BASE}ChangeFinanicalYear`,
        data: this.financialYearList
      }).then(res => {
        if (res.status === 200 && res.data) {
           this.changeFinancialYear();
        }
      });
    },
    processUserRoles(roles){
      let rights = roles.split('');
      localStorage.setItem('addRight',rights[0]);
      localStorage.setItem('editRight',rights[1]);
      localStorage.setItem('deleteRight',rights[2]);
      localStorage.setItem('printRight',rights[3]);
      localStorage.setItem('viewRight',rights[4]);
      localStorage.setItem('authRight',rights[5]);
      localStorage.setItem('auth1Right',rights[6]);
      localStorage.setItem('option1Right',rights[7]);
      localStorage.setItem('option2Right',rights[8]);
      localStorage.setItem('option3Right',rights[9]);
      localStorage.setItem('option4Right',rights[10]);
      localStorage.setItem('option5Right',rights[11]);
    },
    userLogout(){
      localStorage.clear();
      this.$router.push({ path: '/' })
    },
    changeUser(){
      this.$router.push({ path: '/login' })
    }
  }
};
</script>
<style>
</style>
