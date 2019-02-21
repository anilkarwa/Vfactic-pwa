<template>
  <div id="app">
    <v-app id="inspire">
      <!-- START: Code for Supplier Group Master Table data -->
      <v-data-table :headers="headers" :items="generalMasterTableData" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editGeneralMasterData(props.item)">edit</v-icon>
            <v-icon small @click="deleteGeneralMasterRequest(props.item)">delete</v-icon>
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
              <v-btn dark flat @click="updateGeneralMasterData()">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-layout row wrap>
            <v-flex xs12>
              <v-expansion-panel popout>
                <v-expansion-panel-content>
                  <div slot="header">supplier Group Master Details</div>
                  <v-card>
                    <v-card-text>
                      <v-container fluid grid-list-xl>
                        <v-layout row justify-space-between>
                          <v-flex xs12 sm6 md4>
                            <!-- <v-text-field
                              v-model="editItems[staticFields[1]]"
                              :label="`${preFix} Code: *`"
                              required
                            ></v-text-field> -->
                            <label for="code">{{`${preFix} Code: *`}}</label>
                            <b-form-input id="code" v-model="editItems[staticFields[1]]" type="text"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validCode() && codeBlured}"
                            v-on:blur="codeBlured = true"
                            :placeholder="`${preFix} Code`" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <!-- <v-text-field
                              v-model="editItems[staticFields[2]]"
                              :label="`${preFix} Name: *`"
                              required
                            ></v-text-field> -->
                            <label for="code">{{`${preFix} Name: *`}}</label>
                            <b-form-input id="code" v-model="editItems[staticFields[2]]" type="text"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validName() && nameBlured}"
                            v-on:blur="nameBlured = true"
                            :placeholder="`${preFix} Name`" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <!-- <v-text-field
                              v-model="editItems[staticFields[3]]"
                              :label="`Added On: *`"
                              required
                            ></v-text-field> -->
                            <label for="code">{{`Added On: *`}}</label>
                            <b-form-input id="code" v-model="editItems[staticFields[3]]" type="text" :placeholder="`Added On`" readonly />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <!-- <v-text-field
                              v-model="editItems[staticFields[4]]"
                              :label="`Added By: *`"
                              required
                            ></v-text-field> -->
                            <label for="code">{{`Added By: *`}}</label>
                            <b-form-input id="code" v-model="editItems[staticFields[4]]" type="text" :placeholder="`Added By`" readonly />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <!-- <v-text-field
                              v-model="editItems[staticFields[5]]"
                              :label="`Changed On: *`"
                              required
                            ></v-text-field> -->
                            <label for="code">{{`Changed On: *`}}</label>
                            <b-form-input id="code" v-model="editItems[staticFields[5]]" type="text" :placeholder="`Changed On`"  readonly />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <!-- <v-text-field
                              v-model="editItems[staticFields[6]]"
                              :label="`Changed By: *`"
                              required
                            ></v-text-field> -->
                            <label for="code">{{`Changed By: *`}}</label>
                            <b-form-input id="code" v-model="editItems[staticFields[6]]" type="text" :placeholder="`Changed By`" readonly />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <!-- <v-checkbox v-model="editItems[staticFields[7]]" label="in Active ?"></v-checkbox> -->
                            <b-form-checkbox
                              id="checkbox1"
                              v-model="editItems[staticFields[7]]"
                            >
                              in Active ?
                            </b-form-checkbox>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <!-- <v-checkbox v-model="editItems[staticFields[8]]" label="is Authorised ?"></v-checkbox> -->
                            <b-form-checkbox
                              id="checkbox1"
                              v-model="editItems[staticFields[8]]"
                            >
                              is Authorised ?
                            </b-form-checkbox>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <!-- END: UOM master detail -->
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
                <v-expansion-panel-content>
                  <div slot="header">Other Information</div>
                  <v-card>
                    <v-card-text>
                      <!-- START: Code for dynamic fields -->
                       <v-container fluid grid-list-xl>
                        <v-layout row justify-space-between>
                          <v-flex xs12 sm4 md4>
                      <vue-form-generator :schema="dynamicFieldSchema" :model="dynamicFieldModel" :options="formOptions" ></vue-form-generator>
                          </v-flex>
                        </v-layout>
                       </v-container>
                      <!-- END: Code for dynamic fields -->
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
      <!-- END: dialog box model code -->
      <!-- START: Code for snackBar -->
      <v-snackbar v-model="snackbar" :color="snackbarColor">
        {{ snackbarText }}
        <v-btn dark flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <!-- END: Code for snackBar -->

      <!-- START: warning model dialog box -->
      <v-dialog v-model="warningDialog" max-width="290" justify-center align-center>
        <v-card>
          <v-card-title class="headline">Delete Request ?</v-card-title>

          <v-card-text>Are you sure ? you wanna delete this. <br>
          <!-- Supplier Group Master Name: <span style="color: red">{{ deleteItem.SupplierGroupMasterName }}</span> -->
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" flat="flat" @click="warningDialog = false">No</v-btn>

            <v-btn color="green darken-1" flat="flat" @click="deleteGeneralMaster()">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- END: warning model dialog box -->
    </v-app>
  </div>
</template>
<script>
import httpClient from "@/services/httpClient.js"
import DynamicFieldSchema from '@/DynamicProperty/generateScheme.js'

export default {
  data: function() {
    return {
      headers: [ { text: "Edit", align: "center" } ],
      generalMasterHeadersKey: [],
      generalMasterTableData: [],
      preFix: null,
      generalMasterModel: false,
      editItems: {},
      staticFields: [],
      snackbar: false,
      snackbarColor: '',
      snackbarText: '',
      warningDialog: false,
      deleteItems: '',
       dynamicFieldSchema: {
        fields: []
      },
      dynamicFieldModel: {},
      dynamicFieldOptions: {},
      codeBlured: true,
      nameBlured: true,
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      }
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
           this.dynamicFieldModel = generalMasterEditFields.dynamicFieldModal.modal[0];
          this.dynamicFieldSchema.fields = DynamicFieldSchema(generalMasterEditFields.dynamicFieldModal.fieldProperties, generalMasterEditFields.dynamicFieldModal.modal[0]);
        }).catch((err) => {
          /**
           * When API call failed: check error in browser console::
           */
          console.error('Error Occured while fetcing the party master Data', err);
        });
    },
    updateGeneralMasterData: function() {
      this.validate();
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
    },
    deleteGeneralMasterRequest: function(params) {
      console.log('Params', params);
      this.deleteItems = params;
      console.log('Delete Items', this.deleteItems);
      // this.warningDialog = true;
    },
    deleteGeneralMaster: function() {

    },
    validCode: function() {
      if (this.editItems[this.staticFields[1]]) {
        return (this.editItems[this.staticFields[1]]).length >= 1 ? true : false;
      } else { return false; }
    },
    validName: function() {
      if (this.editItems[this.staticFields[2]]) {
        return (this.editItems[this.staticFields[2]]).length >= 1 ? true : false;
      } else { return false; }
    },
    validate: function() {
      (this.validCode() && this.validName()) ? true : false;
    }
  }
}
</script>
<style>

</style>
