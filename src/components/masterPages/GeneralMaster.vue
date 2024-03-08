<template>
  <div id="app">
    <v-app id="inspire">
        <div class="text-md-center text-lg-center" v-if="getCurrentUserRoles('addRight') == '1'">
          <v-btn  fab dark small color="indigo" @click="addItemInPartyMaster"> <v-icon dark>add</v-icon></v-btn>
         
        </div>
       <span v-if="getCurrentUserRoles('addRight') == '1'"> Add New Record</span><br/>
      <!-- START: Code for Supplier Group Master Table data -->
      <v-card>
      <v-card-title> 
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        <v-text-field  v-model="tableSearch" append-icon="search"  label="Search" single-line  hide-details  ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :search="tableSearch" :items="generalMasterTableData" :pagination.sync="pagination"  class="elevation-1">
        <template slot="items" slot-scope="props">
          <tr >
          <td class="justify-center layout px-0">
            <v-icon v-if="getCurrentUserRoles('editRight') == '1'"  small class="mr-2" @click="editGeneralMasterData(props.item)">edit</v-icon>
            <v-icon v-if="getCurrentUserRoles('deleteRight') == '1'" small @click="openDeleteConfirmatinModal(props.item)">delete</v-icon>
          </td>
          <td v-for="values in props.item" :key="values.id">
            {{ values }}
          </td>
          </tr>
        </template>
        <template slot="no-data">
          <v-btn color="primary">Reset</v-btn>
        </template>
      </v-data-table>
      </v-card>
      <!-- END: Code for Supplier Group Master Table data -->
      <!-- START: dialog box model code -->
      <v-dialog
        v-model="generalMasterModel"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
       >
        <v-card>
          <v-toolbar fixed dark color="primary">
            <v-btn icon dark @click="generalMasterModel = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>{{$store.state.pageName}} - Edit</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="blue darken-1 white--text" @click="updateGeneralMasterData()">Save</v-btn>
          </v-toolbar>
           <v-container class="spaceFromTop" fluid grid-list-md >
          <v-layout row wrap>
            <v-flex xs12>
              <v-expansion-panel popout>
                <v-expansion-panel-content>
                  <div slot="header">Details</div>
                  <v-card>
                    <v-card-text>
                      <v-container fluid grid-list-xl>
                        <v-layout row >
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`${preFix} Code: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="editItems[staticFields[1]]" type="text"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validCode() && codeBlured}"
                            v-on:blur="codeBlured = true"
                            aria-describedby="codeLiveFeedback"
                            :placeholder="`${preFix} Code`" />
                            <b-form-invalid-feedback id="codeLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`${preFix} Name: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="editItems[staticFields[2]]" type="text"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validName() && nameBlured}"
                            v-on:blur="nameBlured = true"
                            aria-describedby="nameLiveFeedback"
                            :placeholder="`${preFix} Name`" />
                            <b-form-invalid-feedback id="nameLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                        </v-layout>
                        <v-layout row >
                          <!-- <v-flex xs12 sm6 md4>
                            <label for="code">{{`Added On: `}}</label>
                            <b-form-input id="code" v-model="editItems[staticFields[3]]" type="text" :placeholder="`Added On`" readonly />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Added By: `}}</label>
                            <b-form-input id="code" v-model="editItems[staticFields[4]]" type="text" :placeholder="`Added By`" readonly />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Changed On: `}}</label>
                            <b-form-input id="code" v-model="editItems[staticFields[5]]" type="text" :placeholder="`Changed On`"  readonly />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Changed By: `}}</label>
                            <b-form-input id="code" v-model="editItems[staticFields[6]]" type="text" :placeholder="`Changed By`" readonly />
                          </v-flex> -->
                          <v-flex xs12 sm6 md4>
                            <b-form-checkbox
                              id="checkbox1"
                              v-model="editItems[staticFields[7]]"
                            >
                              in Active ?
                            </b-form-checkbox>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <b-form-checkbox
                              id="checkbox2"
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
                      <vue-form-generator id="Form-generator-css" ref="vfg" :schema="dynamicFieldSchema" :model="dynamicFieldModel" :options="formOptions" @validated="onValidated"  ></vue-form-generator>
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
           </v-container>
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
      <!-- START: dialog box model code For Adding the new Item -->
      <v-dialog
        v-model="addGeneralMasterModel"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
       >
        <v-card>
          <v-toolbar fixed dark color="primary">
            <v-btn icon dark @click="addGeneralMasterModel = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>{{$store.state.pageName}} - Add</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="blue darken-1 white--text" @click="addItemRequest()">Add</v-btn>
          </v-toolbar>
           <v-container class="spaceFromTop" fluid grid-list-md >
          <v-layout row wrap>
            <v-flex xs12>
              <v-expansion-panel popout>
                <v-expansion-panel-content>
                  <div slot="header">Details</div>
                  <v-card>
                    <v-card-text>
                      <v-container fluid grid-list-xl>
                        <v-layout row >
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`${preFix} Code: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="addItems[staticFields[0]]" type="text"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validAddCode() && codeBlured}"
                            v-on:blur="codeBlured = true"
                            aria-describedby="codeLiveFeedback"
                            :placeholder="`${preFix} Code`" />
                            <b-form-invalid-feedback id="codeLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`${preFix} Name: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="addItems[staticFields[1]]" type="text"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validAddName() && nameBlured}"
                            v-on:blur="nameBlured = true"
                            aria-describedby="nameLiveFeedback"
                            :placeholder="`${preFix} Name`" />
                            <b-form-invalid-feedback id="nameLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <!-- <v-flex xs12 sm6 md4>
                            <label for="code">{{`Added On: `}}</label>
                            <b-form-input id="code" v-model="editItems[staticFields[3]]" type="text" :placeholder="`Added On`" readonly />
                          </v-flex> -->
                          <!-- <v-flex xs12 sm6 md4>
                            <label for="code">{{`Added By: `}}</label>
                            <b-form-input id="code" v-model="editItems[staticFields[4]]" type="text" :placeholder="`Added By`" readonly />
                          </v-flex> -->
                          <!-- <v-flex xs12 sm6 md4>
                            <label for="code">{{`Changed On: `}}</label>
                            <b-form-input id="code" v-model="editItems[staticFields[5]]" type="text" :placeholder="`Changed On`"  readonly />
                          </v-flex> -->
                          <!-- <v-flex xs12 sm6 md4>
                            <label for="code">{{`Changed By: `}}</label>
                            <b-form-input id="code" v-model="editItems[staticFields[6]]" type="text" :placeholder="`Changed By`" readonly />
                          </v-flex> -->
                          <!-- <v-flex xs12 sm6 md4>
                            <b-form-checkbox
                              id="checkbox1"
                              v-model="editItems[staticFields[7]]"
                            >
                              in Active ?
                            </b-form-checkbox>
                          </v-flex> -->
                          <!-- <v-flex xs12 sm6 md4>
                            <b-form-checkbox
                              id="checkbox1"
                              v-model="editItems[staticFields[8]]"
                            >
                              is Authorised ?
                            </b-form-checkbox>
                          </v-flex> -->
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
                          <vue-form-generator id="Form-generator-css" ref="vfg" :schema="addDynamicFieldSchema" :model="addDynamicFieldModel" :options="formOptions"  @validated="onValidatedAdd" ></vue-form-generator>
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
           </v-container>
        </v-card>
      </v-dialog>
      <!-- END: dialog box model code For Adding the new Item-->
      <!-- Delete confirm dialog model -->
      <v-dialog v-model="deleteModal"  max-width="290">
        <v-card>
          <v-card-title class="headline">Delete selected record?</v-card-title>
          <v-card-text>
            Are you sure, you want to delete this record?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1"  flat="flat"  @click="deleteModal = false" >
              Cancel
            </v-btn>
            <v-btn  color="green darken-1" flat="flat"  @click="deleteGeneralMasterRequest()">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
       </v-dialog>
       <!-- End delete dailog modal -->
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
import VueFormGenerator from 'vue-form-generator'
import generateSchema from '@/DynamicProperty/generateScheme.js'
import generateGroupSchema from '@/DynamicProperty/generateGroupSchema.js'
import generateNewModal from '@/DynamicProperty/generateNewModal.js'
import customeValidaton from '@/DynamicProperty/customeValidation.js'
import updateModalAfterChangeMaster from '@/DynamicProperty/updateModalAfterChangeMaster.js';
import convertDateWithSchema from '@/DynamicProperty/convertDateWithSchema.js';

export default {
  data: function() {
    return {
      headers: [ { text: "Edit", align: "center" } ],
      generalMasterHeadersKey: [],
      generalMasterTableData: [],
      preFix: null,
      tableSearch: '',
      generalMasterModel: false,
      editItems: {},
      addItems: {},
      staticFields: [],
      snackbar: false,
      snackbarColor: '',
      snackbarText: '',
      warningDialog: false,
      deleteItems: '',
      dynamicFieldSchema: {
        fields: [],
        groups:[]
      },
      dynamicFieldModel: {},
      dynamicFieldOptions: {},
      addDynamicFieldSchema: {
        fields: [],
        groups: []
      },
     addDynamicFieldModel: {},
      codeBlured: true,
      nameBlured: true,
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      },
      addGeneralMasterModel: false,
      isFormSavedOnce: false,
      isDynamicFormValid: false,
      snackbar: false,
      color: '',
      mode: '',
      timeout: 5000,
      text: '',
      dynamicShema:{},
      dynamicModal: {},
      deleteModal: false,
      deleteSelectedId:0,
      pagination: {
        rowsPerPage: parseInt(localStorage.getItem('rowPerPageDataTable')) || 5
      },
    }
  },
  beforeMount: function() {
    this.loadGeneralMaster();
  },
  watch:{
    dynamicFieldModel:{
     handler(val, oldVal){
        this.updateEditModalForValueChanges();
        },
    deep: true
   },
   addDynamicFieldModel:{
     handler(val, oldVal){
        this.updateAddModalForValueChanges();
        },
    deep: true
   },
   pagination: {
    handler () {
      localStorage.setItem('rowPerPageDataTable',this.pagination.rowsPerPage);
    },
    deep: true
  }

  },
  methods: {
    showSnackBar(type,message){
      this.snackbar = true;
      this.color = type;
      this.text = message;
    },
    loadGeneralMaster: function() {
      /**
       * Code for loading the party master data
       */
      const docID =  localStorage.getItem('menuDocId') || 0;
      this.headers = [ { text: "Action", align: "center",sortable: false } ];
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}GeneralMaster?docID=${docID}`
      })
        .then((result) => {
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
        }).catch((err) => {
          /**
           * When API call failed: check error in browser console::
           */
          this.showSnackBar('error',err.response.data);
        });
    },
    editGeneralMasterData: function(params) {
      if(this.getCurrentUserRoles('editRight') != '1')
       {
         this.showSnackBar('error',"You do not have edit rights on the page.");
         return
       }

      this.generalMasterModel = true;
      const docID = localStorage.getItem('menuDocId') || 0;
      const selectedI = params[Object.keys(params)[0]];
      this.selectedID = params[Object.keys(params)[0]];
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}GeneralMaster?selectedID=${this.selectedID}&docID=${docID}`
      })
        .then((result) => {
          const generalMasterEditFields = result.data;
          this.preFix = generalMasterEditFields.prefix;
          this.editItems = generalMasterEditFields.staticFieldData[0];
          this.staticFields = Object.keys(this.editItems);
         
          if(generalMasterEditFields.dynamicFieldModal != ""){
            this.dynamicShema = generalMasterEditFields.dynamicFieldModal.fieldProperties;
            this.dynamicModal = generalMasterEditFields.dynamicFieldModal.modal[0];
            this.dynamicFieldModel =  this.dynamicModal
            this.dynamicFieldSchema.fields = generateSchema(this.dynamicShema,  this.dynamicModal);
            this.dynamicFieldSchema.groups = generateGroupSchema(this.dynamicShema,  this.dynamicModal);
            convertDateWithSchema(this.dynamicShema,this.dynamicFieldModel, false);
          }
        }).catch((err) => {
          this.showSnackBar('error',err.response.data);
        });
    },
    updateGeneralMasterData: function() {
      this.validateOnclick();
      console.log('Update params',JSON.stringify(this.editItems));
      let updateModal = JSON.parse(JSON.stringify(this.dynamicFieldModel));
      convertDateWithSchema(this.dynamicShema,updateModal, true);
      const updateParam = {
        docID: localStorage.getItem('menuDocId') || 0, 
        userID: localStorage.getItem('userId') || 0,
        staticFields: this.editItems,
        dynamicFields: updateModal
      }
      if(this.validate() && this.isDynamicFormValid){
      httpClient({
        method: 'PUT',
        url: `${process.env.VUE_APP_API_BASE}GeneralMaster`,
        data: updateParam
      })
        .then((result) => {
        this.showSnackBar('success',result.data);
        this.loadGeneralMaster();
        }).catch((err) => {
          this.showSnackBar('error',err.response.data);
        });
      }else{
         this.showSnackBar('error','Please fill mandatory fields!');
      }
    },
    openDeleteConfirmatinModal(params){
      this.deleteSelectedId = params[Object.keys(params)[0]];
      this.deleteModal =true;
    },
    deleteGeneralMasterRequest(){
      const selectedID = this.deleteSelectedId;
      const docID = localStorage.getItem('menuDocId') || 0; 
      const userID = localStorage.getItem('userId') || 0;
       /**
       * Delete Item in party Master
       */
      httpClient({
        method: 'DELETE',
        url: `${process.env.VUE_APP_API_BASE}GeneralMaster?selectedID=${selectedID}&docID=${docID}&userID=${userID}`
      })
        .then((result) => {
          this.deleteModal = false;
          this.deleteSelectedId = 0;
          this.showSnackBar('success',result.data);
          this.loadGeneralMaster();
        }).catch((err) => {
          this.showSnackBar('error',err.response.data);
        });

      // this.warningDialog = true;
    },
    validCode: function() {
      if (this.editItems[this.staticFields[1]]) {
        return (this.editItems[this.staticFields[1]].toString()).length >= 1 ? true : false;
      } else { return false; }
    },
    validAddCode: function() {
      if(this.isFormSavedOnce){
      if (this.addItems[this.staticFields[0]]) {
        return (this.addItems[this.staticFields[0]].toString()).length >= 1 ? true : false;
      } else { return false; }
      }else { return true;}
    },
    validName: function() {
      if (this.editItems[this.staticFields[2]]) {
        return (this.editItems[this.staticFields[2]].toString()).length >= 1 ? true : false;
      } else { return false; }
    },
    validAddName: function() {
      if(this.isFormSavedOnce){
      if (this.addItems[this.staticFields[1]]) {
        return (this.addItems[this.staticFields[1]].toString()).length >= 1 ? true : false;
      } else { return false; }
       }else { return true;}
    },
    validate: function() {
      return (this.validCode() && this.validName()) ? true : false;
    },
    addValidation: function() {
      (this.validAddCode() && this.validAddName()) ? true : false;
    },
    addItemInPartyMaster: function() {
      const docID = localStorage.getItem('menuDocId') || 0;
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}GeneralMaster?docID=${docID}&type=0`
      }).then((result) => {
        const addFieldForGeneralMaster = result.data;
        this.preFix = addFieldForGeneralMaster.prefix;
        this.addItems = addFieldForGeneralMaster.staticFieldData;
        this.staticFields = Object.keys(this.addItems);
        this.dynamicShema =addFieldForGeneralMaster.dynamicFieldModal.fieldProperties;
        this.dynamicModal = addFieldForGeneralMaster.dynamicFieldModal.modal;
        if(addFieldForGeneralMaster.dynamicFieldModal.modal !=null){
        this.addDynamicFieldSchema.fields = generateSchema(this.dynamicShema, this.dynamicModal);
        this.addDynamicFieldSchema.groups = generateGroupSchema(this.dynamicShema, this.dynamicModal);
        this.addDynamicFieldModel = generateNewModal(this.dynamicShema,this.dynamicModal)
        }
        this.addGeneralMasterModel = true;
      }).catch((err) => {
        this.showSnackBar('error',err.response.data);

      });
    },
     addValidation: function() {
      return (
      this.validAddName() &&
      this.validAddCode()) ? true : false;
    },
    addItemRequest: function() {
      this.isFormSavedOnce = true;
      this.validateOnclick();
      let newModalData = JSON.parse(JSON.stringify(this.addDynamicFieldModel));
      convertDateWithSchema(this.dynamicShema,newModalData, true);
      const postParams = {
        docID: localStorage.getItem('menuDocId'),
        userID: localStorage.getItem('userId'),
        staticFields: this.addItems,
        dynamicFields: newModalData
      }

      if (this.addValidation() && this.isDynamicFormValid) {
      httpClient({
        method: 'POST',
        url: `${process.env.VUE_APP_API_BASE}GeneralMaster`,
        data: postParams
      }).then((result) => {
        this.showSnackBar('success',result.data);
        this.addGeneralMasterModel = false;
        this.loadGeneralMaster();
      }).catch((err) => {
        this.showSnackBar('error',err.response.data);
      });
      } else{
        this.showSnackBar('error','Please fill all mandatory field.')
      }
    },
    onValidatedAdd: function(isValid, errors) {
      if(this.dynamicShema != null){
     customeValidaton(this.dynamicShema,this.addDynamicFieldSchema.fields,this.addDynamicFieldSchema.groups,this.addDynamicFieldModel);
      }
      console.log("Validation result: ", isValid, ", Errors:", errors);
      this.isDynamicFormValid = isValid;
    },
     onValidated: function(isValid, errors) {
       if(this.dynamicShema != null){
       customeValidaton(this.dynamicShema,this.dynamicFieldSchema.fields,this.dynamicFieldSchema.groups,this.dynamicFieldModel);
       }
      console.log("Validation result: ", isValid, ", Errors:", errors);
      this.isDynamicFormValid = isValid;
    },
    validateOnclick: function($event) {
      var errors = this.$refs.vfg.validate();
    },
    updateEditModalForValueChanges(){
      updateModalAfterChangeMaster(this.dynamicShema,this.dynamicFieldModel);
    },
    updateAddModalForValueChanges(){
      updateModalAfterChangeMaster(this.dynamicShema,this.addDynamicFieldModel);
    },
    getCurrentUserRoles(type){
      switch(type){
        case "addRight": return localStorage.getItem('addRight') || 0;
          break;
        case "editRight": return localStorage.getItem('editRight') || 0;
          break;
        case "deleteRight": return localStorage.getItem('deleteRight') || 0;
          break;
        case "printRight": return localStorage.getItem('printRight') || 0;
          break;
        case "viewRight": return localStorage.getItem('viewRight') || 0;
          break;
        case "authRight": return localStorage.getItem('authRight') || 0;
          break;
        case "auth1Right": return localStorage.getItem('auth1Right') || 0;
          break;
        case "option1Right": return localStorage.getItem('option1Right') || 0;
          break;
        case "option2Right": return localStorage.getItem('option2Right') || 0;
          break;
        case "option3Right": return localStorage.getItem('option3Right') || 0;
          break;
        case "option4Right": return localStorage.getItem('option4Right') || 0;
          break;
        case "option5Right": return localStorage.getItem('option5Right') || 0;
          break;
      }
    }
  }
}
</script>
<style>

</style>
