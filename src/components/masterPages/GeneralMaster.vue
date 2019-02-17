<template>
  <div id="app">
    <v-app id="inspire">
      <!-- START: Code for Supplier Group Master Table data -->
      <v-data-table :headers="headers" :items="generalMasterTableData" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editGeneralMasterData(props.item)">edit</v-icon>
            <v-icon small @click="deleteGeneralMasterData(props.item)">delete</v-icon>
          </td>
          <td v-for="values in props.item" :key="values.id">
            {{ values }}
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary">Reset</v-btn>
        </template>
      </v-data-table>
      <!-- END: Code for Supplier Group Master Table data -->
      <!-- START: dialog box model code -->
      <v-dialog
        v-model="generalMasterModel"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="generalMasterModel = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit Group Master</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="UpdateGeneralMasterData()">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-layout row wrap>
            <v-flex xs12>
              <v-expansion-panel popout>
                <v-expansion-panel-content>
                  <div slot="header">supplier Group Master Details</div>
                  <v-card>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editItems[staticFields[1]]"
                              :label="`${preFix} Code: *`"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editItems[staticFields[2]]"
                              :label="`${preFix} Name: *`"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editItems[staticFields[3]]"
                              :label="`Added On: *`"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editItems[staticFields[4]]"
                              :label="`Added By: *`"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editItems[staticFields[5]]"
                              :label="`Changed On: *`"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editItems[staticFields[6]]"
                              :label="`Changed By: *`"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-checkbox v-model="editItems[staticFields[7]]" label="in Active ?"></v-checkbox>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-checkbox v-model="editItems[staticFields[8]]" label="is Authorised ?"></v-checkbox>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <!-- END: UOM master detail -->
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
      <!-- END: dialog box model code -->
    </v-app>
  </div>
</template>
<script>
import httpClient from "@/services/httpClient.js"

export default {
  data: function() {
    return {
      headers: [ { text: "Edit", align: "center" } ],
      generalMasterHeadersKey: [],
      generalMasterTableData: [],
      preFix: null,
      generalMasterModel: false,
      editItems: {},
      staticFields: []
    }
  },
  beforeMount: function() {
    this.loadGeneralMaster();
  },
  methods: {
    loadGeneralMaster: function() {
      /**
       * Code for loading the party master data
       */
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}GeneralMaster?docID=1122`
      })
        .then((result) => {
          console.log('General Master:: server response::', result);
          const generalMasterData = result.data;
          /**
           * Logic for putting data into data table::
           */
          this.preFix = generalMasterData.prefix;
          this.generalMasterHeadersKey = Object.keys(generalMasterData.tableData[0]);
          this.generalMasterHeadersKey.forEach(element => {
            this.headers.push({ text: element, align: "center", value: element })
          });
          this.generalMasterTableData = generalMasterData.tableData;
          console.log('this.generalMasterTableData', this.generalMasterTableData);
        }).catch((err) => {
          /**
           * When API call failed: check error in browser console::
           */
          console.error('Error Occured while fetcing the party master Data', err);
        });
    },
    editGeneralMasterData: function() {
      this.generalMasterModel = true;
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}GeneralMaster?selectedID=2&docID=1122`
      })
        .then((result) => {
          console.log('Edit Fields Result::', result.data);
          const generalMasterEditFields = result.data;
          this.preFix = generalMasterEditFields.prefix;

          this.editItems = generalMasterEditFields.staticFieldData[0]
          console.log('EDit Item Master', JSON.stringify(this.editItems));
          this.staticFields = Object.keys(this.editItems);
        }).catch((err) => {
          /**
           * When API call failed: check error in browser console::
           */
          console.error('Error Occured while fetcing the party master Data', err);
        });
    },
    UpdateGeneralMasterData: function() {
      console.log('Update params', this.editItems);
      const updateParam = {
        docID: localStorage.getItem('menuDocId') || 1121, // Need to remove 1121 value and put 0 apart of this;
        userID: localStorage.getItem('userId') || 0,
        staticFields: this.editItems,
        dynamicFields: ''
      }
      httpClient({
        method: 'PUT',
        url: `${process.env.VUE_APP_API_BASE}GeneralMaster`,
        data: this.editItems
      })
        .then((result) => {
          console.log('Result', result);
        }).catch((err) => {
          console.error('ERROR OCCURED!', err);
        });
    }
  }
}
</script>
<style>

</style>
