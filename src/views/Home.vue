<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer clipped fixed v-model="drawer" app color="blue darken-1">
        <v-list dense>
            <v-card  class="mx-auto"   max-width="500" >
              <v-sheet class="pa-3 primary">
                 <v-autocomplete v-model="search" :search-input.sync="searchInput" label="Search Menu..." dark :items="searchResults"
                  flat solo-inverted hide-details clearable 
                  clear-icon="mdi-close-circle-outline" item-text="menuItemCapiton" 
                  item-value="menuId"
                  @change="onSearchMenuSelect"
                ></v-autocomplete> 
              </v-sheet>
          
              <v-card-text class="menugrad">
                <div v-if="menu && menu.length">
                <b-tree-view :data="menu" nodeLabelProp="menuItemCapiton" :renameNodeOnDblClick="renameMenu" :contextMenuItems="contextMenuItems" @nodeSelect="selectedMenu"></b-tree-view>
                </div>
              </v-card-text>
            </v-card>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app fixed clipped-left color="blue darken-1">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-img src="https://www.softvent.com/images/logo.png" max-width="200" max-height="200"></v-img>
         <v-spacer></v-spacer>
         <v-toolbar-title class="white--text">{{selectedCompanyName}}</v-toolbar-title>
         <v-spacer></v-spacer>
          
         <v-dialog v-model="dialog3" width="780px">
        <template v-slot:activator="{ on }">
          <v-btn class="mx-2" fab dark small color="primary" v-on="on" >
        <v-icon dark>dashboard</v-icon>
      </v-btn>
        </template>
        <v-layout>
        <v-card>
         <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;">Sales / Purchase Reports</v-card-text>
          <div class="btntext" style="display: inline-flex;margin-top:27px;margin-bottom:27px;">
        
      <v-sheet
      class="grad mx-box text-center"
      color="#24CE9F"
      dark
      height=""
      width="165px"
      margin-right="20px !important"
      margin-left="15px;"
      border-radius= "4px;"
      box-shadow= "3px 5px 4px #b3b2b2;"
    >
      <v-card-title style="margin-bottom:25px !important">
         <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 30px;font-size: 55px;color:white;float:right;opacity: 1;">assessment</i></span>
            <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;text-align: justify;">
            Sales<br> Summary
         </div>
      </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent"> 
         <div class="caption white--text " style="font-size:12px !important;text-align: justify;">
            Quotation      - 24<br>
            Sales Order    - 52<br>
            Sales Invoice Against SO - 24<br>
            Sales Return      - 20<br>
            Delivery Challan  - 14<br>
            Delivery Challen Receipt - 3<br>
            Sales Invoice - 41<br>
            Service Invoice - 7
          </div>
      </v-sheet>
    </v-sheet>
    
     <v-sheet
      class="grad2 mx-box text-center"
      color="#672F89"
      dark
      width="165px"
      border-radius= "4px;"
      box-shadow= "3px 5px 4px #b3b2b2;"
    >
      <v-card-title style="margin-bottom:25px !important">
         <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 30px;font-size: 55px;color:white;float:right;opacity: 1;">assignment</i></span>
            <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;">
            Purchase<br> Summary
          </div>
       
      </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent">
      </v-sheet>
    </v-sheet>
    <v-sheet
      class="grad3 mx-box text-center"
      color="#672F89"
      dark
      max-width="165px"
      border-radius= "4px;"
      box-shadow= "3px 5px 4px #b3b2b2;"
    >
      <v-card-title style="margin-bottom:25px !important">
        <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 85px;font-size: 55px;color:white;float:right;opacity: 1;">low_priority</i></span>
            <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;text-align: justify;">
            Transactional Statistics
          </div>
    
      </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent">
      </v-sheet>
    </v-sheet>
    </div>

    <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;">Stock Reports</v-card-text>
      <div class="btntext" style="display: inline-flex;margin-top:15px;margin-bottom:15px;">
        <v-sheet
      class="grad4 mx-box text-center"
      color="#3FA7EC"
      dark
      width="165px"
      margin-right="25px"
      margin-left="15px;"
    >
    <v-card-title style="margin-bottom:25px !important">
        <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 44px;font-size: 55px;color:white;float:right;opacity: 1;">format_list_bulleted</i></span>
            <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;text-align: justify;">
            Stock<br> Balance
          </div>
   
      </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent">
      </v-sheet>
    </v-sheet>
    <v-sheet
      class="grad5 mx-box text-center"
      margin-right="25px"
      color="#E32379"
      dark
      width="165px"
    >
    <v-card-title style="margin-bottom:25px !important">
         <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 44px;font-size: 55px;color:white;float:right;opacity: 1;">widgets</i></span>
            <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;">
            Stock<br> Ageing
          </div>
      </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent">
      </v-sheet>
      </v-sheet>
     </div>

     <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;">Receivable / Payable Reports</v-card-text>
      <div class="btntext" style="display: inline-flex;margin-top:15px;margin-bottom:15px;">
        <v-sheet
      class="grad6 mx-box text-center"
      color="#FF931E"
      dark
      max-width="165px"
      margin-right="25px"
      margin-left="15px;"
    >
    <v-card-title style="margin-bottom:25px !important">
        <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 55px;font-size: 55px;color:white;float:right;opacity: 1;">how_to_reg</i></span>
            <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;text-align: justify;">
            Customer<br> Outstanding
          </div>
      </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent">
        <div class="caption white--text " style="text-shadow: 0px 4px 2px black;font-size:12px !important;text-align: justify;">
            Customer Master      - 38<br>
            Customer Groupmaster - 4<br>
            Currency Master      - 6
          </div>
      </v-sheet>
    </v-sheet>
    <v-sheet
      class="grad7 mx-box text-center"
      color="#2ACBA1"
      dark
      max-width="165px"
      margin-right="25px"
      margin-left="15px;"
    >
    <v-card-title style="margin-bottom:25px !important">
       <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 55px;font-size: 55px;color:white;float:right;opacity: 1;">money</i></span>
            <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;">
            Supplier<br> Payment
          </div>
      </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent">
        <div class="caption white--text " style="text-shadow: 0px 4px 2px black;font-size:12px !important;text-align: justify;">
            Supplier Master      - 45<br>
            Supplier Groupmaster - 3<br>
            Supplier Personmaster- 23
          </div>
      </v-sheet>
    </v-sheet>
    </div>
    <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;">Miscellaneous Reports</v-card-text>
      <div class="btntext" style="display: inline-flex;margin-top:15px;margin-bottom:55px;">
        <v-sheet
      class="grad8 mx-box text-center"
      color="red"
      dark
      width="165px"
      margin-right="25px"
      margin-left="15px;"
    >
    <v-card-title style="margin-bottom:25px !important">
       <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 90px;font-size: 55px;color:white;float:right;opacity: 1;">restore_page</i></span>
            <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;margin-right: 50px;text-align: justify;">
            Auto Scheduled Reports
          </div>
        </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent">
      </v-sheet>
    </v-sheet>
    <v-sheet
      class="grad9 mx-box text-center"
      color="#652E9A"
      dark
      width="165px"
      margin-right="25px"
      margin-left="15px;"
    >
    <v-card-title style="margin-bottom:25px !important">
       <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 85px;font-size: 55px;color:white;float:right;opacity: 1;">create_new_folder</i></span>
            <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;margin-bottom:4px;margin-top:18px;text-align: justify;">
            Miscellaneous<br>/Others
          </div>
      </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent">
         </v-sheet>
    </v-sheet>
    <v-sheet
      class="grad10 mx-box text-center"
      color="primary"
      dark
      width="165px"
      margin-right="25px"
      margin-left="15px;"
    >
    <v-card-title style="margin-bottom:25px !important">
        <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 85px;font-size: 55px;color:white;float:right;opacity: 1;">insert_chart_outlined</i></span>
            <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;margin-bottom:20px;margin-top:24px;">
            Graphical
          </div>
       </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent">
      </v-sheet>
    </v-sheet>
    </div>
    </v-card>
    <v-card>
       <v-toolbar color="#db6e6e" dark height= 28px>
          <v-toolbar-title style="font-size: 16px;font-weight: 550;">Additional Info</v-toolbar-title>
          <v-spacer></v-spacer>
         </v-toolbar>
		    <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;margin-left:-12px;"><i class="material-icons" style="font-size:16px;">radio_button_checked</i>Notification</v-card-text>
		       <v-btn class="notigrad mx-3 white--text dark" fab dark large style="margin-top: 37px;" >
        <v-icon dark>notification_important</v-icon><br><br>18
      </v-btn>  
      <br>
         <v-dialog v-model="dialog" scrollable max-width="420px" text-align="-webkit-right" margin-left="1010px" style="height:100px;" >
        
        <template v-slot:activator="{ on }">
           <div class="text-center" dark v-on="on" style="margin-top: 0px;"><v-btn>Notification</v-btn></div>
        </template>
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
       <v-card>
          <v-toolbar color="rgb(57, 96, 130)" dark>
         <v-toolbar-title style="color:white;">Notification</v-toolbar-title>
      </v-toolbar>
          <v-divider></v-divider>
          
        <v-list three-line>
        <v-card-title> 
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        <v-text-field  v-model="tableSearch" append-icon="search"  label="Search" single-line  hide-details style="margin-top:-35px;" ></v-text-field>
      </v-card-title>
           <v-divider></v-divider>
         <v-data-table :headers="headers" :search="tableSearch" :items="NotificationTableData" :pagination.sync="pagination"  class="elevation-1">
         <template v-slot:items="props">
           <td class="text-xs-left" style="font-size:15px;font-family:bold;">{{ props.item.Title }}</td>
            <td class="text-xs-left">{{ props.item.NotifText }}</td>
        </template>
        <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
      </v-data-table>    
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer><v-spacer></v-spacer><v-btn  color="blue darken-1"  text @click="dialog = false">OK</v-btn>
          </v-card-actions>
          </v-list>
        </v-card>
      </v-dialog>
      <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;margin-top:-50px;margin-left:-12px;"><i class="material-icons" style="font-size:16px;">radio_button_checked</i>Events</v-card-text>
        <v-btn class="eventgrad mx-3 white--text dark" fab dark large style="margin-top: 37px;" >
        <v-icon dark>grade</v-icon><br><br>10
      </v-btn>  
      <br>
        <template>
         <v-dialog v-model="dialog4" scrollable max-width="420px" text-align="-webkit-right" margin-left="1010px" style="height:100px;" >
         <template v-slot:activator="{ on }">
           <div class="text-center" dark v-on="on" style="margin-top: 0px;"><v-btn>Events</v-btn></div>
        </template>
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
       <v-card>
          <v-toolbar color="rgb(57, 96, 130)" dark>
         <v-toolbar-title style="color:white;">Events</v-toolbar-title>
      </v-toolbar>
          <v-divider></v-divider>
          
        <v-list three-line>
        <v-card-title> 
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        <v-text-field  v-model="tableSearch" append-icon="search"  label="Search" single-line  hide-details style="margin-top:-35px;" ></v-text-field>
      </v-card-title>
           <v-divider></v-divider>
         <v-data-table :headers="top" :search="tableSearch" :items="StatisticTableData" :pagination.sync="pagination"  class="elevation-1">
         <template v-slot:items="props"> <td class="text-xs-left" style="font-size:15px;font-family:bold;">{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.EVENTLIST }}</td>
        </template>
        <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
      </v-data-table>    
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer><v-spacer></v-spacer><v-btn  color="blue darken-1"  text @click="dialog4 = false">OK</v-btn>
          </v-card-actions>
          </v-list>
        </v-card>
      </v-dialog>
      </template>
        <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;margin-top:-25px;margin-left:-12px;"><i class="material-icons" style="font-size:16px;">radio_button_checked</i>News</v-card-text>
         <v-btn class="newsgrad mx-3 white--text dark" fab dark large style="margin-top: 37px;" >
        <v-icon dark>subtitles</v-icon><br><br>10
      </v-btn>  
      <br>
        <v-dialog v-model="dialog5" scrollable max-width="420px" text-align="-webkit-right" margin-left="1010px" style="height:100px;" >
        
        <template v-slot:activator="{ on }">
           <div class="text-center" dark v-on="on" style="margin-top: 0px;"><v-btn>News</v-btn></div>
        </template>
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
       <v-card>
          <v-toolbar color="rgb(57, 96, 130)" dark>
         <v-toolbar-title style="color:white;">News</v-toolbar-title>
      </v-toolbar>
          <v-divider></v-divider>
          
        <v-list three-line>
        <v-card-title> 
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        <v-text-field  v-model="tableSearch" append-icon="search"  label="Search" single-line  hide-details style="margin-top:-35px;" ></v-text-field>
      </v-card-title>
           <v-divider></v-divider>
         <v-data-table :headers="tophead" :search="tableSearch" :items="StatisticTableData" :pagination.sync="pagination"  class="elevation-1">
         <template v-slot:items="props">
            <td class="text-xs-left" style="font-size:15px;font-family:bold;">{{ props.item.NEWSHEADING }}</td>
            <td class="text-xs-left">{{ props.item.NEWSCONTENT }}</td>
        </template>
        <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
      </v-data-table>    
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer><v-spacer></v-spacer><v-btn  color="blue darken-1"  text @click="dialog5 = false">OK</v-btn>
          </v-card-actions>
          </v-list>
        </v-card>
      </v-dialog>
        <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;margin-top:-24px;margin-left:-12px;"><i class="material-icons" style="font-size:16px;">radio_button_checked</i>Urls/Links</v-card-text>
        <v-btn class="urlsgrad mx-3 white--text dark" fab dark large style="margin-top: 37px;" >
        <v-icon dark>pageview</v-icon><br><br>10
      </v-btn>  
      <br>
        <v-dialog v-model="dialog6" scrollable max-width="420px" text-align="-webkit-right" margin-left="1010px" style="height:100px;" >
        
        <template v-slot:activator="{ on }">
           <div class="text-center" dark v-on="on" style="margin-top: 0px;"><v-btn>Urls / Links</v-btn></div>
        </template>
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
       <v-card>
          <v-toolbar color="rgb(57, 96, 130)" dark>
         <v-toolbar-title style="color:white;">Urls / Links</v-toolbar-title>
      </v-toolbar>
          <v-divider></v-divider>
          
        <v-list three-line>
        <v-card-title> 
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        <v-text-field  v-model="tableSearch" append-icon="search"  label="Search" single-line  hide-details style="margin-top:-35px;" ></v-text-field>
      </v-card-title>
           <v-divider></v-divider>
         <v-data-table :headers="head" :search="tableSearch" :items="StatisticTableData" :pagination.sync="pagination"  class="elevation-1">
         <template v-slot:items="props">
            <td class="text-xs-left" style="font-size:15px;font-family:bold;">{{ props.item.id }}</td>
            <td class="text-xs-left"><a
              :href="props.item.WEBSITE"
              target="_blank"
            >{{ props.item.WEBSITE }}</a></td>
        </template>
        <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
      </v-data-table>    
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer><v-spacer></v-spacer><v-btn  color="blue darken-1"  text @click="dialog6 = false">OK</v-btn>
          </v-card-actions>
          </v-list>
        </v-card>
      </v-dialog>
    
    </v-card>
    </v-layout>
    </v-dialog>
    
      <v-dialog v-model="dialog" scrollable max-width="420px" text-align="-webkit-right" margin-left="1010px">
        <template v-slot:activator="{ on }">
          
          <!--<i class="material-icons" dark v-on="on" style="margin-right:5px;font-size: 40px;color:white;">notification_important</i>
           <v-btn  class="blue darken-1 white--text" dark v-on="on" ><v-icon>notification_important</v-icon></v-btn>-->
          <v-btn class="mx-2" fab dark small color="primary" v-on="on" >
        <v-icon dark>notification_important</v-icon>
      </v-btn>         
        </template>
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
       <v-card>
          <v-toolbar color="rgb(57, 96, 130)" dark>
         <v-toolbar-title style="color:white;">Notification</v-toolbar-title>
      </v-toolbar>
          <v-divider></v-divider>
          
        <v-list three-line>
        <v-card-title> 
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        <v-text-field  v-model="tableSearch" append-icon="search"  label="Search" single-line  hide-details style="margin-top:-35px;" ></v-text-field>
      </v-card-title>
           <v-divider></v-divider>
         <v-data-table :headers="headers" :search="tableSearch" :items="Notification" :pagination.sync="pagination"  class="elevation-1">
         <template v-slot:items="props">
        <!--<td class="text-xs-right"><v-radio-group v-model="notif" >
        <v-radio  v-bind:value="props.item.Title" ></v-radio>
       
        </v-radio-group></td>-->
            <!--<td class="text-xs-right"> <v-checkbox
          v-model="notif"
          v-bind:value="props.item.Title"
        >
        </v-checkbox></td>-->
            <td class="text-xs-left" style="font-size:15px;font-family:bold;">{{ props.item.Title }}</td>
            <td class="text-xs-left">{{ props.item.NotifText }}</td>
        </template>
        <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
      </v-data-table>    
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer><v-spacer></v-spacer><v-btn  color="blue darken-1"  text @click="dialog = false">OK</v-btn>
          </v-card-actions>
          </v-list>
        </v-card>
      </v-dialog>
         <v-btn  class="blue darken-1 white--text" @click="changeUser()">Change User</v-btn>
        <v-btn  class="blue darken-1 white--text" @click="userLogout()">Logout</v-btn>
      </v-toolbar>
      
     <v-content>
        <v-container fluid >
          <v-layout justify-center align-center>
            <v-flex shrink>
              <div v-if="selecteMenu" >
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
      
    <!--<template>
    <v-container grid-list-xl style="max-width:538px;">
    <v-layout>
      <v-card
      flex-child
      wrap
    >
      <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;">Sales / Purchase Reports</v-card-text>
      <div class="btntext" style="display: inline-flex;margin-top:27px;margin-bottom:27px;">
        
      <v-sheet
      class="grad mx-box text-center"
      color="#24CE9F"
      dark
      height=""
      width="165px"
      margin-right="20px !important"
      margin-left="15px;"
      border-radius= "4px;"
      box-shadow= "3px 5px 4px #b3b2b2;"
    >
      <v-card-title style="margin-bottom:25px !important">
         <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 30px;font-size: 55px;color:white;float:right;opacity: 1;">assessment</i></span>
           
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;text-align: justify;">
            Sales<br> Summary
          </div>
      </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent">
        
      </v-sheet>
    </v-sheet>
    
     <v-sheet
      class="grad2 mx-box text-center"
      color="#672F89"
      dark
      width="165px"
      border-radius= "4px;"
      box-shadow= "3px 5px 4px #b3b2b2;"
    >
      <v-card-title style="margin-bottom:25px !important">
         <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 30px;font-size: 55px;color:white;float:right;opacity: 1;">assignment</i></span>
     
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;">
            Purchase<br> Summary
          </div>
       
      </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent">
       
      </v-sheet>
    </v-sheet>
    <v-sheet
      class="grad3 mx-box text-center"
      color="#672F89"
      dark
      max-width="165px"
      border-radius= "4px;"
      box-shadow= "3px 5px 4px #b3b2b2;"
    >
      <v-card-title style="margin-bottom:25px !important">
        <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 85px;font-size: 55px;color:white;float:right;opacity: 1;">low_priority</i></span>
           
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;text-align: justify;">
            Transactional Statistics
          </div>
    
      </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent">
      </v-sheet>
    </v-sheet>
    </div>
        <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;">Stock Reports</v-card-text>
      <div class="btntext" style="display: inline-flex;margin-top:15px;margin-bottom:15px;">
        <v-sheet
      class="grad4 mx-box text-center"
      color="#3FA7EC"
      dark
      width="165px"
      margin-right="25px"
      margin-left="15px;"
    >
    <v-card-title style="margin-bottom:25px !important">
        <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 44px;font-size: 55px;color:white;float:right;opacity: 1;">format_list_bulleted</i></span>
           
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;text-align: justify;">
            Stock<br> Balance
          </div>
   
      </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent">
        
      </v-sheet>
    </v-sheet>
    <v-sheet
      class="grad5 mx-box text-center"
      margin-right="25px"
      color="#E32379"
      dark
      width="165px"
    >
    <v-card-title style="margin-bottom:25px !important">
         <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 44px;font-size: 55px;color:white;float:right;opacity: 1;">widgets</i></span>
           
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;">
            Stock<br> Ageing
          </div>
      </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent">
       
      </v-sheet>
      </v-sheet>
     </div>
     
         <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;">Receivable / Payable Reports</v-card-text>
      <div class="btntext" style="display: inline-flex;margin-top:15px;margin-bottom:15px;">
        <v-sheet
      class="grad6 mx-box text-center"
      color="#FF931E"
      dark
      max-width="165px"
      margin-right="25px"
      margin-left="15px;"
    >
    <v-card-title style="margin-bottom:25px !important">
        <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 55px;font-size: 55px;color:white;float:right;opacity: 1;">how_to_reg</i></span>
       
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;text-align: justify;">
            Customer<br> Outstanding
          </div>
      </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent">
       
      </v-sheet>
    </v-sheet>
    <v-sheet
      class="grad7 mx-box text-center"
      color="#2ACBA1"
      dark
      max-width="165px"
      margin-right="25px"
      margin-left="15px;"
    >
    <v-card-title style="margin-bottom:25px !important">
       <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 55px;font-size: 55px;color:white;float:right;opacity: 1;">money</i></span>
       
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;">
            Supplier<br> Payment
          </div>
      </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent">
        
      </v-sheet>
    </v-sheet>
      
      </div>
      
        <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;">Miscellaneous Reports</v-card-text>
      <div class="btntext" style="display: inline-flex;margin-top:15px;margin-bottom:55px;">
        <v-sheet
      class="grad8 mx-box text-center"
      color="red"
      dark
      width="165px"
      margin-right="25px"
      margin-left="15px;"
    >
    <v-card-title style="margin-bottom:25px !important">
       <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 90px;font-size: 55px;color:white;float:right;opacity: 1;">restore_page</i></span>
           
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;margin-right: 50px;text-align: justify;">
            Auto Scheduled Reports
          </div>
        </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent">
        
      </v-sheet>
    </v-sheet>
    <v-sheet
      class="grad9 mx-box text-center"
      color="#652E9A"
      dark
      width="165px"
      margin-right="25px"
      margin-left="15px;"
    >
    <v-card-title style="margin-bottom:25px !important">
       <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 85px;font-size: 55px;color:white;float:right;opacity: 1;">create_new_folder</i></span>
           
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;margin-bottom:4px;margin-top:18px;text-align: justify;">
            Miscellaneous<br>/Others
          </div>
      </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent">
       
      </v-sheet>
    </v-sheet>
    <v-sheet
      class="grad10 mx-box text-center"
      color="primary"
      dark
      width="165px"
      margin-right="25px"
      margin-left="15px;"
    >
    <v-card-title style="margin-bottom:25px !important">
        <div>
            <span
              class="display-2"
            ><i class="material-icons" style="margin-right: 85px;font-size: 55px;color:white;float:right;opacity: 1;">insert_chart_outlined</i></span>
           
          </div>
         <div class="caption white--text text-uppercase" style="text-shadow: 0px 4px 2px black;font-size:15px !important;margin-bottom:20px;margin-top:24px;">
            Graphical
          </div>
       </v-card-title>
  
      <v-divider></v-divider>
  
      <v-sheet color="transparent">
       
      </v-sheet>
    </v-sheet>
      
      </div>
      <v-spacer></v-spacer>
    
    </v-card>
    <v-card>
       <v-toolbar color="#db6e6e" dark height= 28px>
          <v-toolbar-title style="font-size: 16px;font-weight: 550;">Additional Info</v-toolbar-title>
          <v-spacer></v-spacer>
         </v-toolbar>
		    <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;margin-left:-12px;"><i class="material-icons" style="font-size:16px;">radio_button_checked</i>Notification</v-card-text>
		       <v-btn class="notigrad mx-3 white--text dark" fab dark large style="margin-top: 37px;" >
        <v-icon dark>notification_important</v-icon><br><br>18
      </v-btn>  
      <br>
         <v-dialog v-model="dialog" scrollable max-width="420px" text-align="-webkit-right" margin-left="1010px" style="height:100px;" >
        
        <template v-slot:activator="{ on }">
           <div class="text-center" dark v-on="on" style="margin-top: 0px;"><v-btn>Notification</v-btn></div>
        </template>
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
       <v-card>
          <v-toolbar color="rgb(57, 96, 130)" dark>
         <v-toolbar-title style="color:white;">Notification</v-toolbar-title>
      </v-toolbar>
          <v-divider></v-divider>
          
        <v-list three-line>
        <v-card-title> 
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        <v-text-field  v-model="tableSearch" append-icon="search"  label="Search" single-line  hide-details style="margin-top:-35px;" ></v-text-field>
      </v-card-title>
           <v-divider></v-divider>
         <v-data-table :headers="headers" :search="tableSearch" :items="NotificationTableData" :pagination.sync="pagination"  class="elevation-1">
         <template v-slot:items="props">
            <td class="text-xs-left" style="font-size:15px;font-family:bold;">{{ props.item.Title }}</td>
            <td class="text-xs-left">{{ props.item.NotifText }}</td>
        </template>
        <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
      </v-data-table>    
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer><v-spacer></v-spacer><v-btn  color="blue darken-1"  text @click="dialog = false">OK</v-btn>
          </v-card-actions>
          </v-list>
        </v-card>
      </v-dialog>
	  
        <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;margin-top:-50px;margin-left:-12px;"><i class="material-icons" style="font-size:16px;">radio_button_checked</i>Events</v-card-text>
        <v-btn class="eventgrad mx-3 white--text dark" fab dark large style="margin-top: 37px;" >
        <v-icon dark>grade</v-icon><br><br>10
      </v-btn>  
      <br>
        <template>
       <v-dialog v-model="dialog" scrollable max-width="420px" text-align="-webkit-right" margin-left="1010px" style="height:100px;" >
        
        <template v-slot:activator="{ on }">
           <div class="text-center" dark v-on="on" style="margin-top: 0px;"><v-btn>Events</v-btn></div>
        </template>
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
       <v-card>
          <v-toolbar color="rgb(57, 96, 130)" dark>
         <v-toolbar-title style="color:white;">Events</v-toolbar-title>
      </v-toolbar>
          <v-divider></v-divider>
          
        <v-list three-line>
        <v-card-title> 
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        <v-text-field  v-model="tableSearch" append-icon="search"  label="Search" single-line  hide-details style="margin-top:-35px;" ></v-text-field>
      </v-card-title>
           <v-divider></v-divider>
         <v-data-table :headers="top" :search="tableSearch" :items="StatisticTableData" :pagination.sync="pagination"  class="elevation-1">
         <template v-slot:items="props">
            <td class="text-xs-left" style="font-size:15px;font-family:bold;">{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.EVENTLIST }}</td>
        </template>
        <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
      </v-data-table>    
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer><v-spacer></v-spacer><v-btn  color="blue darken-1"  text @click="dialog = false">OK</v-btn>
          </v-card-actions>
          </v-list>
        </v-card>
      </v-dialog>
  </template>
        <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;margin-top:-25px;margin-left:-12px;"><i class="material-icons" style="font-size:16px;">radio_button_checked</i>News</v-card-text>
         <v-btn class="newsgrad mx-3 white--text dark" fab dark large style="margin-top: 37px;" >
        <v-icon dark>subtitles</v-icon><br><br>10
      </v-btn>  
      <br>
        <v-dialog v-model="dialog" scrollable max-width="420px" text-align="-webkit-right" margin-left="1010px" style="height:100px;" >
        
        <template v-slot:activator="{ on }">
           <div class="text-center" dark v-on="on" style="margin-top: 0px;"><v-btn>News</v-btn></div>
        </template>
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
       <v-card>
          <v-toolbar color="rgb(57, 96, 130)" dark>
         <v-toolbar-title style="color:white;">News</v-toolbar-title>
      </v-toolbar>
          <v-divider></v-divider>
          
        <v-list three-line>
        <v-card-title> 
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        <v-text-field  v-model="tableSearch" append-icon="search"  label="Search" single-line  hide-details style="margin-top:-35px;" ></v-text-field>
      </v-card-title>
           <v-divider></v-divider>
         <v-data-table :headers="tophead" :search="tableSearch" :items="StatisticTableData" :pagination.sync="pagination"  class="elevation-1">
         <template v-slot:items="props">
        
            <td class="text-xs-left" style="font-size:15px;font-family:bold;">{{ props.item.NEWSHEADING }}</td>
            <td class="text-xs-left">{{ props.item.NEWSCONTENT }}</td>
        </template>
        <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
      </v-data-table>    
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer><v-spacer></v-spacer><v-btn  color="blue darken-1"  text @click="dialog = false">OK</v-btn>
          </v-card-actions>
          </v-list>
        </v-card>
      </v-dialog>
        
      
        <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;margin-top:-24px;margin-left:-12px;"><i class="material-icons" style="font-size:16px;">radio_button_checked</i>Urls/Links</v-card-text>
       
        <v-btn class="urlsgrad mx-3 white--text dark" fab dark large style="margin-top: 37px;" >
        <v-icon dark>pageview</v-icon><br><br>10
      </v-btn>  
      <br>
        <v-dialog v-model="dialog" scrollable max-width="420px" text-align="-webkit-right" margin-left="1010px" style="height:100px;" >
        
        <template v-slot:activator="{ on }">
           <div class="text-center" dark v-on="on" style="margin-top: 0px;"><v-btn>Urls / Links</v-btn></div>
        </template>
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
       <v-card>
          <v-toolbar color="rgb(57, 96, 130)" dark>
         <v-toolbar-title style="color:white;">Urls / Links</v-toolbar-title>
      </v-toolbar>
          <v-divider></v-divider>
          
        <v-list three-line>
        <v-card-title> 
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        <v-text-field  v-model="tableSearch" append-icon="search"  label="Search" single-line  hide-details style="margin-top:-35px;" ></v-text-field>
      </v-card-title>
           <v-divider></v-divider>
         <v-data-table :headers="head" :search="tableSearch" :items="StatisticTableData" :pagination.sync="pagination"  class="elevation-1">
         <template v-slot:items="props">
        
            <td class="text-xs-left" style="font-size:15px;font-family:bold;">{{ props.item.id }}</td>
            <td class="text-xs-left"><a
              :href="props.item.WEBSITE"
              target="_blank"
            >{{ props.item.WEBSITE }}</a></td>
        </template>
        <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
      </v-data-table>    
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer><v-spacer></v-spacer><v-btn  color="blue darken-1"  text @click="dialog = false">OK</v-btn>
          </v-card-actions>
          </v-list>
        </v-card>
      </v-dialog>
       
       <v-data-table :headers="head" :items="StatisticTableData" style="max-width: 310px;" scrollable >
         <template v-slot:items="props" style="display: block;">
            <td class="text-xs-left" style="font-size:15px;font-family:bold;padding-right:0px;width:50px !important;">{{ props.item.id }}</td>
            <td class="text-xs-left" style="width: 50px;padding-left:0px;"><a
              :href="props.item.WEBSITE"
              target="_blank"
            >{{ props.item.WEBSITE }}</a></td>
        </template>
      </v-data-table>-->
      
    <!--<v-simple-table fixed-header height="300px">
    <thead>
      <tr>
        <th class="text-left">Slno</th>
        <th class="text-center">WEBSITE</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in StatisticReport" :key="item.name">
        <td>{{ item.id }}</td>
        <td>{{ item.WEBSITE }}</td>
      </tr>
    </tbody>
  </v-simple-table>
    </v-card>
     </v-layout>
  </v-container>
</template>-->


      <v-footer app fixed >
        <v-card  class="flex" flat tile color="blue darken-1" >
          <v-card-title >
            <strong class="subheading">Softvent &copy;2019</strong>
  
            <v-spacer></v-spacer>
            <span class="white--text"> Login : {{loggedInUserName}}</span> &nbsp; &nbsp;&nbsp;&nbsp;
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

<ContentLoading></ContentLoading>
<v-snackbar
        v-model="snackbar"
        :color="color"
        :multi-line="true"
        :timeout="timeout"
        :vertical="mode === 'vertical'"
      >{{ text }}
        <v-btn
          dark
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-app>
  </div>
</template>
<script>
import httpClient from "@/services/httpClient.js"
import PartyMaster from "@/components/masterPages/PartyMaster.vue"
import GeneralMaster from "@/components/masterPages/GeneralMaster.vue"
import ItemMaster from "@/components/masterPages/ItemMaster.vue"
import PartyDoc from "@/components/Transcations/PartyDocTranscation.vue"
import ItemOpenningBalance from "@/components/FixedViews/Items/ItemOpenningBalance.vue";
import PartyLinkedDoc from "@/components/Transcations/PurchaseBillAgainstPO.vue";
import PartyNonItemDoc from "@/components/Transcations/TrnWithOutDetailItem.vue";
import NonPartyDoc from "@/components/Transcations/StoreIndent.vue";
import NonPartyItemLinkedDoc from "@/components/Transcations/StoreIssueNote.vue";
import AuthoriseDocument from "@/components/Utilities/AuthoriseDocument.vue";
import ShortCloseDocument from "@/components/Utilities/ShortCloseDocument.vue";
import NonPartyOnlyHdrDoc from "@/components/Transcations/NonPartyOnlyHdrDoc.vue";
import ContentLoading from '@/components/FixedViews/Loader/ContentLoading.vue';
import PostDocEntry from '@/components/Utilities/PostDocEntry.vue';
import NonPartyNonItemDoc from '@/components/Transcations/NonPartyNonItemDoc.vue';
import PartyNonItemLinkedDoc from '@/components/Transcations/PartyNonItemLinkedDoc.vue';
import PartyOnlyHdrDoc from '@/components/Transcations/PartyOnlyHdrDoc.vue';
import NonPartyNonItemLinkedDoc from '@/components/Transcations/NonPartyNonItemLinkedDoc.vue';
import customisedReports from '@/components/Reports/customisedReports.vue';
import DynamicFilterReports from '@/components/Reports/DynamicFilterReports/dynamicFilterReports.vue';
import StaticReports from '@/components/Reports/StaticReports.vue';
import EMail from '@/components/Others/EMail.vue'
import Dashboard from '@/components/Others/Dashboard.vue'
import SMS from '@/components/Others/SMS.vue'

export default {
  name: "home",
   name: "item",
  components: {
    ContentLoading,
    PartyMaster,
    GeneralMaster,
    ItemMaster,
    PartyDoc,
    ItemOpenningBalance,
    PartyLinkedDoc,
    PartyNonItemDoc,
    NonPartyDoc,
    NonPartyItemLinkedDoc,
    AuthoriseDocument,
    ShortCloseDocument,
    NonPartyOnlyHdrDoc,
    PostDocEntry,
    NonPartyNonItemDoc,
    PartyNonItemLinkedDoc,
    PartyOnlyHdrDoc,
    NonPartyNonItemLinkedDoc,
    customisedReports,
    EMail,
    Dashboard,
    SMS,
    DynamicFilterReports,
    StaticReports
    
  },
  data: function() {
    return {
      drawer: true,
      menu: [],
      currentView: '',
      active: [],
      open: [1,1],
      search: null,
      searchInput: null,
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
      loading: false,
      searchResults: [],
      searchMenuSelect: null,
      snackbar: false,
      color: '',
      mode: '',
      timeout: 5000,
      text: '',
      dialogm1: '',
      dialog: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      dialog8: false,
      notification: [],
      toggle: [],
      Notification: [],
      tableSearch: '',
      notif: null,
      pagination: {
        rowsPerPage: parseInt(localStorage.getItem('rowPerPageDataTable')) || 5
        },
      headers: [ { text: "Title", align: "left",value:"Title" },{ text: "Description", align: "left",value:"Description" } ],
      NotificationTableData: [],
        StatisticReport: [],
        StatisticTableData: [], 
        head: [ { text: "Slno", align: "left",value:"Slno" },{ text: "Website", align: "left",value:"Website" } ],
        top: [ { text: "Slno", align: "left",value:"Slno" },{ text: "Event", align: "left",value:"Event" } ], 
        tophead: [ { text: "News Heading", align: "left",value:"News Heading" },{ text: "News Content", align: "left",value:"News Content" } ],     
      checking: false,
      heartbeats: [],
    };
  },
  computed: {
    avg () {
      const sum = this.heartbeats.reduce((acc, cur) => acc + cur, 0)
      const length = this.heartbeats.length

      if (!sum && !length) return 0

      return Math.ceil(sum / length)
    },
  },

  created () {
    this.takePulse(false)
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
    this.GetUserNotification();
    this.loadUserNotification();

    this.GetUserNotification();
    this.loadUserNotification();
    this.StatisticReportGet();
    this.loadStatisticReport();

  },
  watch: {
    searchInput(value) {
      if (value != undefined && value != null && value != '') { 
        this.searchMenu(value);
      }
    }
  },
  
  methods: {
    showSnackBar(type,message){
      this.snackbar = true;
      this.color = type;
      this.text = message;
    },
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
    GetUserNotification(){
         httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}NotificationInformation`
      })
        .then((result) => {
           this.Notification = result.data;
           
        }).catch((err) => {
          /**
           * When API call failed: check error in browser console::
           */
          this.showSnackBar('error',err.response.data);
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
        localStorage.setItem('menuDocId', selectedMenuRow.menuDocId);
        this.$store.commit('currentPage',selectedMenuRow.menuItemCapiton);
        this.currentView = '';
        let that = this;
        setTimeout(() => 
          {
            that.currentView = selectedMenuRow.pageLink;
          },
          100);
        }else if(selectedMenuRow.pageLink == ""){
          this.showSnackBar('error',"Page link not set, Contact administrator.");
        }
      }
    },
    searchMenu(value){
      let userID = localStorage.getItem('userId');
      httpClient({
        method: "GET",
        url: `${process.env.VUE_APP_API_BASE}SearchMenu?searchValue=${value}&userID=${userID}`,
      }).then(res => {
         this.searchResults =res.data;
      }).catch((err) => {
           this.showSnackBar('error',err.response.data);
        });
    },
    onSearchMenuSelect(value){
      let menu = this.searchResults.find(e => e.menuId == value);
      if(menu !=null){
        this.selecteMenu = menu;
        if(menu.pageLink !=""){
          this.processUserRoles(menu.userRights);
          localStorage.setItem('menuDocId', menu.menuDocId);
          this.$store.commit('currentPage',menu.menuItemCapiton);
          this.currentView = menu.pageLink;
        }else{
          this.showSnackBar('error',"Page link not set, Contact administrator.");
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
    },
     loadUserNotification: function() {

      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}NotificationInformation`
      })
        .then((result) => {
            this.Notification = result.data;
        }).catch((err) => {
          /**
           * When API call failed: check error in browser console::
           */
          this.showSnackBar('error',err.response.data);
        });
    },

      GetUserNotification(){
         httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}NotificationMessage`
      })
        .then((result) => {
           this.Notification = result.data;
           
        }).catch((err) => {
          /**
           * When API call failed: check error in browser console::
           */
          this.showSnackBar('error',err.response.data);
        });
    },
    
     loadUserNotification: function() {

      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}NotificationMessage`
      })
        .then((result) => {
            this.NotificationTableData = result.data;
        }).catch((err) => {
          /**
           * When API call failed: check error in browser console::
           */
          this.showSnackBar('error',err.response.data);
        });
    },
    StatisticReportGet(){
         httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}getStatisticReport`
      })
        .then((result) => {
           this.StatisticReport = result.data;
           
        }).catch((err) => {
          /**
           * When API call failed: check error in browser console::
           */
          this.showSnackBar('error',err.response.data);
        });
    },
    loadStatisticReport: function() {

      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}getStatisticReport`
      })
        .then((result) => {
            this.StatisticTableData = result.data;
        }).catch((err) => {
          /**
           * When API call failed: check error in browser console::
           */
          this.showSnackBar('error',err.response.data);
        });
    },
     heartbeat () {
      return Math.ceil(Math.random() * (120 - 80) + 80)
    },
    async takePulse (inhale = true) {
      this.checking = true

      inhale && await exhale(1000)

      this.heartbeats = Array.from({ length: 20 }, this.heartbeat)

      this.checking = false
    },

  }
};

</script>


<style>
.v-dialog__content{
             text-align: -webkit-center;
}

.theme--dark.v-divider {
    border-color: hsla(0,0%,100%,.12);
    margin-top: -20px;
}
.mx-box{
  max-width: 165px !important;
  margin-right: 20px !important;
  margin-left: 15px !important;
}
.v-dialog--scrollable {
    display: -webkit-box; 
    display: inline-block; 
}
.grad{
background: rgb(254,204,177); /* Old browsers */
background: -moz-linear-gradient(45deg, rgba(254,204,177,1) 0%, rgba(241,116,50,1) 0%, rgba(234,85,7,1) 19%, rgba(251,149,94,1) 71%); /* FF3.6-15 */
background: -webkit-linear-gradient(45deg, rgba(254,204,177,1) 0%,rgba(241,116,50,1) 0%,rgba(234,85,7,1) 19%,rgba(251,149,94,1) 71%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(45deg, rgba(254,204,177,1) 0%,rgba(241,116,50,1) 0%,rgba(234,85,7,1) 19%,rgba(251,149,94,1) 71%);
width:"165px";
}
.grad2{
  background: rgb(59,103,158); /* Old browsers */
background: -moz-linear-gradient(45deg, rgba(59,103,158,1) 0%, rgba(32,124,202,1) 44%, rgba(43,136,217,1) 56%, rgba(125,185,232,1) 80%); /* FF3.6-15 */
background: -webkit-linear-gradient(45deg, rgba(59,103,158,1) 0%,rgba(32,124,202,1) 44%,rgba(43,136,217,1) 56%,rgba(125,185,232,1) 80%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(45deg, rgba(59,103,158,1) 0%,rgba(32,124,202,1) 44%,rgba(43,136,217,1) 56%,rgba(125,185,232,1) 80%);
width:"165px";
}
.grad3{
  background: rgb(168,0,119); /* Old browsers */
background: -moz-linear-gradient(45deg, rgba(168,0,119,1) 1%, rgba(193,70,161,1) 1%, rgba(168,0,119,1) 2%, rgba(168,0,119,1) 2%, rgba(168,0,119,1) 26%, rgba(219,54,164,1) 64%, rgba(219,54,164,1) 64%, rgba(203,96,179,1) 72%); /* FF3.6-15 */
background: -webkit-linear-gradient(45deg, rgba(168,0,119,1) 1%,rgba(193,70,161,1) 1%,rgba(168,0,119,1) 2%,rgba(168,0,119,1) 2%,rgba(168,0,119,1) 26%,rgba(219,54,164,1) 64%,rgba(219,54,164,1) 64%,rgba(203,96,179,1) 72%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(45deg, rgba(168,0,119,1) 1%,rgba(193,70,161,1) 1%,rgba(168,0,119,1) 2%,rgba(168,0,119,1) 2%,rgba(168,0,119,1) 26%,rgba(219,54,164,1) 64%,rgba(219,54,164,1) 64%,rgba(203,96,179,1) 72%);
width:"165px";
}
.notigrad{
  background-image: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
}
.eventgrad{
  background-image: linear-gradient(to right top, #aa36a0, #e73964, #e77723, #b6b300, #4ae171);
}
.newsgrad{
  background-image: linear-gradient(to right top, #053730, #004d65, #0059a2, #864cb5, #eb1283);
}
.urlsgrad{
  background-image: linear-gradient(to right top, #051237, #491955, #8f0c5a, #ca1945, #eb5412);
}
.grad4{
  background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
}
.grad5{
  background-image: linear-gradient(to right top, #893a78, #8b328f, #8330aa, #6a35c9, #1241eb);
}
.grad6{
  background-image: linear-gradient(to right top, #68d168, #a39d1c, #b6641d, #a72d3d, #741056);
}
.grad7{
  background-image: linear-gradient(to right top, #f66e48, #fb8d38, #f7ae2c, #ebce30, #d7ed49);
}
.grad8{
  background-image: linear-gradient(to right top, #da2b77, #ed534c, #e48428, #c7b022, #98d557);
}
.grad9{
  background-image: linear-gradient(to right top, #c49d94, #c87e87, #c1608f, #a24ca7, #554bc4);
}
.grad10{
   background-image: linear-gradient(to right top, #d80ccf, #9b55e1, #5d6dde, #2b78ca, #307bac);
}
.menugrad{
  background-image: linear-gradient(to right top, #86b9ed, #74ade8, #62a0e3, #4f94de, #3b87d9, #3b87d9, #3b86d8, #3b86d8, #4f92dc, #619fe0, #74abe4, #86b7e7);
  color: white;
}
.theme--light.v-navigation-drawer {
   background-image: linear-gradient(to right top, #86b9ed, #74ade8, #62a0e3, #4f94de, #3b87d9, #3b87d9, #3b86d8, #3b86d8, #4f92dc, #619fe0, #74abe4, #86b7e7);
}
.tree-node-label span {
    color: white !important;
}
</style>
