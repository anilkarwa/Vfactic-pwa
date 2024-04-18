<template>
  <v-container grid-list-xl>
    <v-layout>
      <v-card fab flex-child wrap> <!--<v-toolbar height= 28px>
          
          <v-toolbar-title style="font-size: 16px;font-weight: 0;">Sales/Purchase Reports</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>-->
        <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;">Sales / Purchase
          Reports</v-card-text>
        <div class="btntext" style="display: inline-flex;margin-top:27px;margin-bottom:27px;">

          <v-sheet class="grad mx-box text-center" color="#24CE9F" dark height="" width="165px"
            margin-right="20px !important" margin-left="15px;" border-radius="4px;" box-shadow="3px 5px 4px #b3b2b2;">
            <v-card-title style="margin-bottom:25px !important">
              <div>
                <span class="display-2"><i class="material-icons"
                    style="margin-right: 30px;font-size: 55px;color:white;float:right;opacity: 1;">assessment</i></span>
                <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
              </div>
              <div class="caption white--text text-uppercase"
                style="text-shadow: 0px 4px 2px black;font-size:15px !important;text-align: justify;">
                Sales<br> Summary
              </div>
            </v-card-title>

            <v-divider></v-divider>

            <v-sheet color="transparent">
              <!--<v-sparkline
          :key="String(avg)"
          :smooth="16"
          :gradient="['#f72047', '#ffd200', '#1feaea']"
          :line-width="3"
          :value="heartbeats"
          auto-draw
          stroke-linecap="round"
        ></v-sparkline>-->

            </v-sheet>
          </v-sheet>

          <v-sheet class="grad2 mx-box text-center" color="#672F89" dark width="165px" border-radius="4px;"
            box-shadow="3px 5px 4px #b3b2b2;">
            <v-card-title style="margin-bottom:25px !important">
              <div>
                <span class="display-2"><i class="material-icons"
                    style="margin-right: 30px;font-size: 55px;color:white;float:right;opacity: 1;">assignment</i></span>
                <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
              </div>
              <div class="caption white--text text-uppercase"
                style="text-shadow: 0px 4px 2px black;font-size:15px !important;">
                Purchase<br> Summary
              </div>

            </v-card-title>

            <v-divider></v-divider>

            <v-sheet color="transparent">
              <!--<v-sparkline
          :key="String(avg)"
          :smooth="16"
          :gradient="['#f72047', '#ffd200', '#1feaea']"
          :line-width="3"
          :value="heartbeats"
          auto-draw
          stroke-linecap="round"
        ></v-sparkline>-->
            </v-sheet>
          </v-sheet>
          <v-sheet class="grad3 mx-box text-center" color="#672F89" dark max-width="165px" border-radius="4px;"
            box-shadow="3px 5px 4px #b3b2b2;">
            <v-card-title style="margin-bottom:25px !important">
              <div>
                <span class="display-2"><i class="material-icons"
                    style="margin-right: 85px;font-size: 55px;color:white;float:right;opacity: 1;">low_priority</i></span>
                <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
              </div>
              <div class="caption white--text text-uppercase"
                style="text-shadow: 0px 4px 2px black;font-size:15px !important;text-align: justify;">
                Transactional Statistics
              </div>

            </v-card-title>

            <v-divider></v-divider>

            <v-sheet color="transparent">
              <!--<v-sparkline
          :key="String(avg)"
          :smooth="16"
          :gradient="['#f72047', '#ffd200', '#1feaea']"
          :line-width="3"
          :value="heartbeats"
          auto-draw
          stroke-linecap="round"
        ></v-sparkline>-->
            </v-sheet>
          </v-sheet>
        </div>
        <!--<v-toolbar color="#A5D08E" dark height= 28px>
          
          <v-toolbar-title style="font-size: 16px;font-weight: 550;">Stock Reports</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>-->
        <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;">Stock
          Reports</v-card-text>
        <div class="btntext" style="display: inline-flex;margin-top:15px;margin-bottom:15px;">
          <v-sheet class="grad4 mx-box text-center" color="#3FA7EC" dark width="165px" margin-right="25px"
            margin-left="15px;">
            <v-card-title style="margin-bottom:25px !important">
              <div>
                <span class="display-2"><i class="material-icons"
                    style="margin-right: 44px;font-size: 55px;color:white;float:right;opacity: 1;">format_list_bulleted</i></span>
                <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
              </div>
              <div class="caption white--text text-uppercase"
                style="text-shadow: 0px 4px 2px black;font-size:15px !important;text-align: justify;">
                Stock<br> Balance
              </div>

            </v-card-title>

            <v-divider></v-divider>

            <v-sheet color="transparent">
              <!--<v-sparkline
          :key="String(avg)"
          :smooth="16"
          :gradient="['#f72047', '#ffd200', '#1feaea']"
          :line-width="3"
          :value="heartbeats"
          auto-draw
          stroke-linecap="round"
        ></v-sparkline>-->
            </v-sheet>
          </v-sheet>
          <v-sheet class="grad5 mx-box text-center" margin-right="25px" color="#E32379" dark width="165px">
            <v-card-title style="margin-bottom:25px !important">
              <div>
                <span class="display-2"><i class="material-icons"
                    style="margin-right: 44px;font-size: 55px;color:white;float:right;opacity: 1;">widgets</i></span>
                <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
              </div>
              <div class="caption white--text text-uppercase"
                style="text-shadow: 0px 4px 2px black;font-size:15px !important;">
                Stock<br> Ageing
              </div>
            </v-card-title>

            <v-divider></v-divider>

            <v-sheet color="transparent">
              <!--<v-sparkline
          :key="String(avg)"
          :smooth="16"
          :gradient="['#f72047', '#ffd200', '#1feaea']"
          :line-width="3"
          :value="heartbeats"
          auto-draw
          stroke-linecap="round"
        ></v-sparkline>-->
            </v-sheet>
          </v-sheet>
        </div>
        <!--<v-toolbar color="#FEE795" dark height= 28px>
          <v-toolbar-title style="font-size: 16px;font-weight: 550;">Receivable/Payable Reports</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>-->
        <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;">Receivable /
          Payable Reports</v-card-text>
        <div class="btntext" style="display: inline-flex;margin-top:15px;margin-bottom:15px;">
          <v-sheet class="grad6 mx-box text-center" color="#FF931E" dark max-width="165px" margin-right="25px"
            margin-left="15px;">
            <v-card-title style="margin-bottom:25px !important">
              <div>
                <span class="display-2"><i class="material-icons"
                    style="margin-right: 55px;font-size: 55px;color:white;float:right;opacity: 1;">how_to_reg</i></span>
                <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
              </div>
              <div class="caption white--text text-uppercase"
                style="text-shadow: 0px 4px 2px black;font-size:15px !important;text-align: justify;">
                Customer<br> Outstanding
              </div>
            </v-card-title>

            <v-divider></v-divider>

            <v-sheet color="transparent">
              <!--<v-sparkline
          :key="String(avg)"
          :smooth="16"
          :gradient="['#f72047', '#ffd200', '#1feaea']"
          :line-width="3"
          :value="heartbeats"
          auto-draw
          stroke-linecap="round"
        ></v-sparkline>-->
            </v-sheet>
          </v-sheet>
          <v-sheet class="grad7 mx-box text-center" color="#2ACBA1" dark max-width="165px" margin-right="25px"
            margin-left="15px;">
            <v-card-title style="margin-bottom:25px !important">
              <div>
                <span class="display-2"><i class="material-icons"
                    style="margin-right: 55px;font-size: 55px;color:white;float:right;opacity: 1;">money</i></span>
                <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
              </div>
              <div class="caption white--text text-uppercase"
                style="text-shadow: 0px 4px 2px black;font-size:15px !important;">
                Supplier<br> Payment
              </div>
            </v-card-title>

            <v-divider></v-divider>

            <v-sheet color="transparent">
              <!--<v-sparkline
          :key="String(avg)"
          :smooth="16"
          :gradient="['#f72047', '#ffd200', '#1feaea']"
          :line-width="3"
          :value="heartbeats"
          auto-draw
          stroke-linecap="round"
        ></v-sparkline>-->
            </v-sheet>
          </v-sheet>
        </div>
        <!--<v-toolbar color="#C1D616" dark height= 28px>
          <v-toolbar-title style="font-size: 16px;font-weight: 550;">Miscellaneous Reports</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>-->
        <v-card-text style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;">Miscellaneous
          Reports</v-card-text>
        <div class="btntext" style="display: inline-flex;margin-top:15px;margin-bottom:55px;">
          <v-sheet class="grad8 mx-box text-center" color="red" dark width="165px" margin-right="25px"
            margin-left="15px;">
            <v-card-title style="margin-bottom:25px !important">
              <div>
                <span class="display-2"><i class="material-icons"
                    style="margin-right: 90px;font-size: 55px;color:white;float:right;opacity: 1;">restore_page</i></span>
                <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
              </div>
              <div class="caption white--text text-uppercase"
                style="text-shadow: 0px 4px 2px black;font-size:15px !important;margin-right: 50px;text-align: justify;">
                Auto Scheduled Reports
              </div>
            </v-card-title>

            <v-divider></v-divider>

            <v-sheet color="transparent">
              <!--<v-sparkline
          :key="String(avg)"
          :smooth="16"
          :gradient="['#f72047', '#ffd200', '#1feaea']"
          :line-width="3"
          :value="heartbeats"
          auto-draw
          stroke-linecap="round"
        ></v-sparkline>-->
            </v-sheet>
          </v-sheet>
          <v-sheet class="grad9 mx-box text-center" color="#652E9A" dark width="165px" margin-right="25px"
            margin-left="15px;">
            <v-card-title style="margin-bottom:25px !important">
              <div>
                <span class="display-2"><i class="material-icons"
                    style="margin-right: 85px;font-size: 55px;color:white;float:right;opacity: 1;">create_new_folder</i></span>
                <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
              </div>
              <div class="caption white--text text-uppercase"
                style="text-shadow: 0px 4px 2px black;font-size:15px !important;margin-bottom:4px;margin-top:18px;text-align: justify;">
                Miscellaneous<br>/Others
              </div>
            </v-card-title>

            <v-divider></v-divider>

            <v-sheet color="transparent">
              <!--<v-sparkline
          :key="String(avg)"
          :smooth="16"
          :gradient="['#f72047', '#ffd200', '#1feaea']"
          :line-width="3"
          :value="heartbeats"
          auto-draw
          stroke-linecap="round"
        ></v-sparkline>-->
            </v-sheet>
          </v-sheet>
          <v-sheet class="grad10 mx-box text-center" color="primary" dark width="165px" margin-right="25px"
            margin-left="15px;">
            <v-card-title style="margin-bottom:25px !important">
              <div>
                <span class="display-2"><i class="material-icons"
                    style="margin-right: 85px;font-size: 55px;color:white;float:right;opacity: 1;">insert_chart_outlined</i></span>
                <!--<strong v-if="avg" style="color:white;">REPORT</strong>-->
              </div>
              <div class="caption white--text text-uppercase"
                style="text-shadow: 0px 4px 2px black;font-size:15px !important;margin-bottom:20px;margin-top:24px;">
                Graphical
              </div>
            </v-card-title>

            <v-divider></v-divider>

            <v-sheet color="transparent">
              <!--<v-sparkline
          :key="String(avg)"
          :smooth="16"
          :gradient="['#f72047', '#ffd200', '#1feaea']"
          :line-width="3"
          :value="heartbeats"
          auto-draw
          stroke-linecap="round"
        ></v-sparkline>-->
            </v-sheet>
          </v-sheet>

        </div>
        <v-spacer></v-spacer>

      </v-card>
      <v-card>
        <v-toolbar color="#db6e6e" dark height=28px>
          <v-toolbar-title style="font-size: 16px;font-weight: 550;">Additional Info</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text
          style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;margin-left:-12px;"><i
            class="material-icons" style="font-size:16px;">radio_button_checked</i>Notification</v-card-text>
        <v-btn class="notigrad mx-3 white--text dark" fab dark large style="margin-top: 37px;">
          <v-icon dark>notification_important</v-icon><br><br>18
        </v-btn>
        <br>
        <v-dialog v-model="dialog" scrollable max-width="420px" text-align="-webkit-right" margin-left="1010px"
          style="height:100px;">

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
                <v-text-field v-model="tableSearch" append-icon="search" label="Search" single-line hide-details
                  style="margin-top:-35px;"></v-text-field>
              </v-card-title>
              <v-divider></v-divider>
              <v-data-table :headers="headers" :search="tableSearch" :items="NotificationTableData"
                :pagination.sync="pagination" class="elevation-1">
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
                <v-spacer></v-spacer><v-spacer></v-spacer><v-btn color="blue darken-1" text
                  @click="dialog = false">OK</v-btn>
              </v-card-actions>
            </v-list>
          </v-card>
        </v-dialog>


        <!--<v-toolbar color="#d1498f" dark style="height: 28px;margin-top: 0px;">
           <v-toolbar-title style="font-size: 16px;padding-bottom: 33px;font-weight: 550;">Events</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>-->
        <v-card-text
          style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;margin-top:-50px;margin-left:-12px;"><i
            class="material-icons" style="font-size:16px;">radio_button_checked</i>Events</v-card-text>
        <v-btn class="eventgrad mx-3 white--text dark" fab dark large style="margin-top: 37px;">
          <v-icon dark>grade</v-icon><br><br>10
        </v-btn>
        <br>
        <template>
          <!--<v-data-table :headers="top"  :items="StatisticTableData" style="max-width: 310px;" scrollable >
         <template v-slot:items="props" style="display: block;width:40px;">
            <td class="text-xs-left" style="font-size:15px;font-family:bold;padding-right:0px;padding-left:50px;max-width:83;">{{ props.item.id }}</td>
            <td class="text-xs-left" style="max-width: 83px;padding-left:0px;"><a
              :href="props.item.EVENTLIST"
              target="_blank"
            >{{ props.item.EVENTLIST }}</a></td>
        </template>
</v-data-table>-->

          <v-dialog v-model="dialog4" scrollable max-width="420px" text-align="-webkit-right" margin-left="1010px"
            style="height:100px;">

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
                  <v-text-field v-model="tableSearch" append-icon="search" label="Search" single-line hide-details
                    style="margin-top:-35px;"></v-text-field>
                </v-card-title>
                <v-divider></v-divider>
                <v-data-table :headers="top" :search="tableSearch" :items="StatisticTableData"
                  :pagination.sync="pagination" class="elevation-1">
                  <template v-slot:items="props">
                    <!--<td class="text-xs-right"><v-radio-group v-model="notif" >
        <v-radio  v-bind:value="props.item.Title" ></v-radio>
       
        </v-radio-group></td>-->
                    <!--<td class="text-xs-right"> <v-checkbox
          v-model="notif"
          v-bind:value="props.item.Title"
        >
        </v-checkbox></td>-->
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
                  <v-spacer></v-spacer><v-spacer></v-spacer><v-btn color="blue darken-1" text
                    @click="dialog4 = false">OK</v-btn>
                </v-card-actions>
              </v-list>
            </v-card>
          </v-dialog>


          <!--<v-simple-table fixed-header height="0px">
    <thead>
      <tr>
        <th class="text-left">Slno</th>
        <th class="text-center">EVENTS</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in StatisticReport" :key="item.EVENTLIST">
        <td>{{ item.id }}</td>
        <td>{{ item.EVENTLIST }}</td>
      </tr>
    </tbody>
  </v-simple-table>-->
        </template>
        <!--<v-toolbar color="#d18552" dark style="height: 28px;margin-top: 0px;">
         <v-toolbar-title style="font-size: 16px;padding-bottom: 33px;font-weight: 550;">News</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>-->
        <v-card-text
          style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;margin-top:-25px;margin-left:-12px;"><i
            class="material-icons" style="font-size:16px;">radio_button_checked</i>News</v-card-text>
        <v-btn class="newsgrad mx-3 white--text dark" fab dark large style="margin-top: 37px;">
          <v-icon dark>subtitles</v-icon><br><br>10
        </v-btn>
        <br>
        <v-dialog v-model="dialog5" scrollable max-width="420px" text-align="-webkit-right" margin-left="1010px"
          style="height:100px;">

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
                <v-text-field v-model="tableSearch" append-icon="search" label="Search" single-line hide-details
                  style="margin-top:-35px;"></v-text-field>
              </v-card-title>
              <v-divider></v-divider>
              <v-data-table :headers="tophead" :search="tableSearch" :items="StatisticTableData"
                :pagination.sync="pagination" class="elevation-1">
                <template v-slot:items="props">
                  <!--<td class="text-xs-right"><v-radio-group v-model="notif" >
        <v-radio  v-bind:value="props.item.Title" ></v-radio>
       
        </v-radio-group></td>-->
                  <!--<td class="text-xs-right"> <v-checkbox
          v-model="notif"
          v-bind:value="props.item.Title"
        >
        </v-checkbox></td>-->
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
                <v-spacer></v-spacer><v-spacer></v-spacer><v-btn color="blue darken-1" text
                  @click="dialog5 = false">OK</v-btn>
              </v-card-actions>
            </v-list>
          </v-card>
        </v-dialog>

        <!--<v-data-table :headers="tophead"  :items="StatisticTableData" style="max-width: 310px;" scrollable >
         <template v-slot:items="props" style="display: block;">
            <td class="text-xs-left" style="font-size:15px;font-family:bold;padding-right:0px;padding-left:50px;">{{ props.item.NEWSHEADING }}</td>
            <td class="text-xs-left" style="width: 50px;padding-left:0px;">{{ props.item.NEWSCONTENT }}</td>
        </template>
      </v-data-table>-->
        <!--<v-toolbar color="#7af59b" dark style="height: 28px;margin-top: 0px;">
          <v-toolbar-title style="font-size: 16px;padding-bottom: 33px;font-weight: 550;">Urls/Links</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>-->
        <v-card-text
          style="text-align-last: left;font-weight: 520;color:#6d70738c;font-size: 18px;margin-top:-24px;margin-left:-12px;"><i
            class="material-icons" style="font-size:16px;">radio_button_checked</i>Urls/Links</v-card-text>

        <v-btn class="urlsgrad mx-3 white--text dark" fab dark large style="margin-top: 37px;">
          <v-icon dark>pageview</v-icon><br><br>10
        </v-btn>
        <br>
        <v-dialog v-model="dialog6" scrollable max-width="420px" text-align="-webkit-right" margin-left="1010px"
          style="height:100px;">

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
                <v-text-field v-model="tableSearch" append-icon="search" label="Search" single-line hide-details
                  style="margin-top:-35px;"></v-text-field>
              </v-card-title>
              <v-divider></v-divider>
              <v-data-table :headers="head" :search="tableSearch" :items="StatisticTableData"
                :pagination.sync="pagination" class="elevation-1">
                <template v-slot:items="props">
                  <!--<td class="text-xs-right"><v-radio-group v-model="notif" >
        <v-radio  v-bind:value="props.item.Title" ></v-radio>
       
        </v-radio-group></td>-->
                  <!--<td class="text-xs-right"> <v-checkbox
          v-model="notif"
          v-bind:value="props.item.Title"
        >
        </v-checkbox></td>-->
                  <td class="text-xs-left" style="font-size:15px;font-family:bold;">{{ props.item.id }}</td>
                  <td class="text-xs-left"><a :href="props.item.WEBSITE" target="_blank">{{ props.item.WEBSITE }}</a>
                  </td>
                </template>
                <template v-slot:no-results>
                  <v-alert :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                  </v-alert>
                </template>
              </v-data-table>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer><v-spacer></v-spacer><v-btn color="blue darken-1" text
                  @click="dialog6 = false">OK</v-btn>
              </v-card-actions>
            </v-list>
          </v-card>
        </v-dialog>

        <!--<v-data-table :headers="head" :items="StatisticTableData" style="max-width: 310px;" scrollable >
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
  </v-simple-table>-->
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  components: {
    SheetFooter: {
      functional: true,
      render(h, { children }) {
        return h('v-sheet', {
          staticClass: 'mt-auto align-center justify-center d-flex',
          props: {
            color: 'rgba(0, 0, 0, .36)',
            dark: true,
            height: 50
          },
        }, children)
      }
    }
  },

};
</script>
<script>
import httpClient from "@/services/httpClient.js"

export default {
  data: function() {
    return {
      dialogm1: '',
      dialog: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      notification: [],
      toggle: [],
      active: [],
      Notification: [],
      NotificationTableData: [],
      tableSearch: '',
      search: null,
      pagination: {
        rowsPerPage: parseInt(localStorage.getItem('rowPerPageDataTable')) || 5
        },
      headers: [ { text: "Title", align: "left",value:"Title" },{ text: "Description", align: "left",value:"Description" } ],
        StatisticReport: [],
        StatisticTableData: [], 
        head: [ { text: "Slno", align: "left",value:"Slno" },{ text: "Website", align: "left",value:"Website" } ],
        top: [ { text: "Slno", align: "left",value:"Slno" },{ text: "Event", align: "left",value:"Event" } ], 
        tophead: [ { text: "News Heading", align: "left",value:"News Heading" },{ text: "News Content", align: "left",value:"News Content" } ],     
    };
  },
  beforeMount: function() {
    this.GetUserNotification();
    this.loadUserNotification();
    this.StatisticReportGet();
    this.loadStatisticReport();
  },
    methods: {
    
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
  }
};
</script>

<style>
.theme--dark.v-divider {
  border-color: hsla(0, 0%, 100%, .12);
  margin-top: -20px;
}

.mx-box {
  max-width: 165px !important;
  margin-right: 20px !important;
  margin-left: 15px !important;
}

.v-dialog--scrollable {
  display: -webkit-box;
  display: inline-block;
}
</style>