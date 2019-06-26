<template>
  <div id="app">
    <v-app id="inspire">
        <div class="text-md-center text-lg-center">
          <v-btn fab dark small color="indigo" @click="addItemInItemMaster" v-if="getCurrentUserRoles('addRight') == '1'"> <v-icon dark>add</v-icon></v-btn>
        </div>
       <span v-if="getCurrentUserRoles('addRight') == '1'"> Add New Record</span>
      <!-- START: table -->
      <v-card>
      <v-card-title> 
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        <v-text-field  v-model="tableSearch" append-icon="search"  label="Search" single-line  hide-details  ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :search="tableSearch" :items="itemMasterDataTable" :pagination.sync="pagination"  class="elevation-1">
        <template slot="items" slot-scope="props">
          <tr >
          <td class="justify-center layout px-0">
            <v-icon v-if="getCurrentUserRoles('editRight') == '1'" small class="mr-2" @click="editItemMasterData(props.item)">edit</v-icon>
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
      <!-- END: table -->
      <!-- START: dialog box model code -->
      <v-dialog
        v-model="itemMasterModel"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
       >
        <v-card>
          <v-toolbar fixed dark color="primary">
            <v-btn icon dark @click="itemMasterModel = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>{{$store.state.pageName}} - Edit</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="blue darken-1 white--text" @click="updateItemMasterData()">Save</v-btn>
          </v-toolbar>
           <v-container class="spaceFromTop" fluid grid-list-md >
          <v-layout row wrap>
            <v-flex xs12>
              <v-expansion-panel popout>
                <v-expansion-panel-content>
                  <div slot="header">Item Master Details</div>
                  <v-card>
                    <v-card-text>
                      <!-- START: Supplier detail form code -->
                      <v-container fluid grid-list-xl>
                        <v-layout row justify-space-between>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`${preFix} Code: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="editedItems[staticFields[1]]" type="text"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validCode() && nameBlured}"
                            v-on:blur="nameBlured = true"
                            aria-describedby="codeLiveFeedback"
                            :placeholder="`${preFix} Code`" />
                            <b-form-invalid-feedback id="codeLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`${preFix} Name: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="editedItems[staticFields[2]]" type="text"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validName() && nameBlured}"
                            v-on:blur="nameBlured = true"
                            aria-describedby="nameLiveFeedback"
                            :placeholder="`${preFix} Name`" />
                            <b-form-invalid-feedback id="nameLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`${preFix} Desc: `}}</label>
                            <b-form-input id="code" v-model="editedItems[staticFields[3]]" type="text"
                            :placeholder="`${preFix} Desc`" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="">{{`${preFix} Group: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-select v-model="editedItems[staticFields[4]]" :options="itemGroupList"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validitemGroup() && itemGroupBlured}"
                            v-on:blur="itemGroupBlured = true"
                            aria-describedby="groupIDLiveFeedback"
                            value-field="itemGroupID" text-field="itemGroupCode" />
                            <b-form-invalid-feedback id="groupIDLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="">{{`Tally Alias:`}}</label>
                            <b-form-input id="code" v-model="editedItems[staticFields[5]]" type="text" :placeholder="`Tally Alias`" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="">{{`HSN Code:`}}</label>
                            <b-form-input id="code" v-model="editedItems[staticFields[6]]" type="text" :placeholder="`HSN Code`" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="">{{`${preFix} Type: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input v-model="editedItems[staticFields[7]]" type="text" :placeholder="`Item Type`" list="ItemTypeList"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validitemType() && itemTypeBlured}"
                            v-on:blur="itemTypeBlured = true" aria-describedby="itemTypeLiveFeedback" />
                             <datalist id="ItemTypeList">
                                <option v-for="data in itemTypeList" :key="data.id">{{data.itemTypeName}}</option>
                            </datalist>
                             <b-form-invalid-feedback id="itemTypeLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                             <label for="">{{`Item UOM: `}}</label><span class="mandatoryStar">*</span>
                                <b-form-select v-model="editedItems[staticFields[8]]" :options="UOMList"
                                v-bind:class="{'form-control':true, 'is-invalid' : !validUOM() && UOMBlured}"
                                v-on:blur="UOMBlured = true"
                                aria-describedby="UOMLiveFeedback"
                                value-field="UOMID" text-field="UOMCode" />
                                <b-form-invalid-feedback id="UOMLiveFeedback">
                                  This field is required
                               </b-form-invalid-feedback> 
                          </v-flex>
                          <v-layout wrap>
                            <v-flex xs12 sm4 md4>
                            <b-form-checkbox
                              id="BOMItemEdit"
                              v-model="editedItems[staticFields[9]]"
                            >
                              BOM Item ?
                            </b-form-checkbox>
                          </v-flex>
                          <v-flex xs12 sm8 md8>
                            <b-form-checkbox
                              id="NonSktableEdit"
                              v-model="editedItems[staticFields[10]]"
                            >
                              NonStkable ?
                            </b-form-checkbox>
                          </v-flex>
                          <v-flex xs12 sm4 md4>
                             <b-form-checkbox
                              id="inActive"
                              v-model="editedItems[staticFields[11]]"
                            >
                              inActive ?
                            </b-form-checkbox>
                          </v-flex>
                          <v-flex xs12 sm8 md8>
                            <b-form-checkbox
                              id="Authorised"
                              v-model="editedItems[staticFields[12]]"
                            >
                              is Authorized ?
                            </b-form-checkbox>
                          </v-flex>
                          </v-layout>
                          <!-- </v-form> -->
                        </v-layout>
                      </v-container>
                      <!-- END: Supplier detail form code -->
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
                      <vue-form-generator id="Form-generator-css"  ref="vfg" :schema="dynamicFieldSchema" :model="dynamicFieldModel" :options="formOptions" @validated="onValidated" ></vue-form-generator>
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
      <!-- START: dialog box model code for adding new Item in Item Master -->
      <v-dialog
        v-model="addItemMasterModel"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
       >
        <v-card>
          <v-toolbar fixed dark color="primary">
            <v-btn icon dark @click="addItemMasterModel = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>{{$store.state.pageName}} - Add</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="blue darken-1 white--text" @click="addItemRequest()">ADD</v-btn>
          </v-toolbar>
           <v-container class="spaceFromTop" fluid grid-list-md >
          <v-layout row wrap>
            <v-flex xs12>
              <v-expansion-panel popout>
                <v-expansion-panel-content>
                  <div slot="header"> Item Master Details</div>
                  <v-card>
                    <v-card-text>
                      <!-- START: Supplier detail form code -->
                      <v-container fluid grid-list-xl>
                        <v-layout row justify-space-between>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`${preFix} Code: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="addItems[staticFields[0]]" type="text"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validAddCode() && nameBlured}"
                            v-on:blur="nameBlured = true"
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
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`${preFix} Desc: `}}</label>
                            <b-form-input id="code" v-model="addItems[staticFields[2]]" type="text"
                            :placeholder="`${preFix} Desc`" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="">{{`${preFix} Group: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-select v-model="addItems[staticFields[3]]" :options="itemGroupList"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validitemAddGroup() && itemGroupBlured}"
                            v-on:blur="itemGroupBlured = true"
                            aria-describedby="groupIDLiveFeedback"
                            value-field="itemGroupID" text-field="itemGroupCode" />
                            <b-form-invalid-feedback id="groupIDLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="">{{`Tally Alias:`}}</label>
                            <b-form-input id="code" v-model="addItems[staticFields[4]]" type="text" :placeholder="`Tally Alias`" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="">{{`HSN Code:`}}</label>
                            <b-form-input id="code" v-model="addItems[staticFields[5]]" type="text" :placeholder="`HSN Code`" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="">{{`${preFix} Item Type: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input name="ItemTypeListAdd" v-model="addItems[staticFields[6]]" type="text" :placeholder="`Item Type`" list="ItemTypeListAdd"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validAdditemType() && itemTypeBlured}"
                            v-on:blur="itemTypeBlured = true" aria-describedby="itemTypeLiveFeedback" />
                             <datalist id="ItemTypeListAdd">
                                <option v-for="data in itemTypeList" :key="data.id" :value="data.itemTypeName">{{data.itemTypeName}}</option>
                            </datalist>
                            <b-form-invalid-feedback id="itemTypeLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="">{{`Item UOM: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-select v-model="addItems[staticFields[7]]" :options="UOMList"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validAddUOM() && UOMBlured}"
                            v-on:blur="UOMBlured = true"
                            aria-describedby="UOMLiveFeedback"
                            value-field="UOMID" text-field="UOMCode" />
                            <b-form-invalid-feedback id="UOMLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-layout wrap>
                            <v-flex xs12 sm4 md4>
                            <b-form-checkbox
                              id="BOMItem"
                              v-model="addItems[staticFields[8]]"
                            >
                              BOM Item ?
                            </b-form-checkbox>
                          </v-flex>
                          <v-flex xs12 sm8 md8>
                            <b-form-checkbox
                              id="NonSktable"
                              v-model="addItems[staticFields[9]]"
                            >
                              NonStkable ?
                            </b-form-checkbox>
                          </v-flex>
                          <!-- <v-flex xs12 sm4 md4>
                             <b-form-checkbox
                              id="inActive"
                              v-model="addItems[staticFields[11]]"
                            >
                              inActive ?
                            </b-form-checkbox>
                          </v-flex> -->
                          <!-- <v-flex xs12 sm8 md8>
                            <b-form-checkbox
                              id="Authorised"
                              v-model="addItems[staticFields[12]]"
                            >
                              is Authorized ?
                            </b-form-checkbox>
                          </v-flex> -->
                          </v-layout>
                          <!-- </v-form> -->
                        </v-layout>
                      </v-container>
                      <!-- END: Supplier detail form code -->
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
                       <vue-form-generator id="Form-generator-css" ref="vfg" :schema="addDynamicFieldSchema" :model="addDynamicFieldModel" :options="formOptions" @validated="onValidatedAdd" ></vue-form-generator>
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
      <!-- END: dialog box model code for adding new Item in Item Master -->
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
            <v-btn  color="green darken-1" flat="flat"  @click="deleteItemMasterData()">
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
import httpClient from "@/services/httpClient.js";
import VueFormGenerator from 'vue-form-generator'
import DynamicFieldSchema from '@/DynamicProperty/generateScheme.js'
import generateGroupSchema from '@/DynamicProperty/generateGroupSchema.js'
import generateNewModal from '@/DynamicProperty/generateNewModal.js'
import customeValidaton from '@/DynamicProperty/customeValidation.js'
import updateModalAfterChangeMaster from '@/DynamicProperty/updateModalAfterChangeMaster.js';
import convertDateWithSchema from '@/DynamicProperty/convertDateWithSchema.js';

export default {
  data: function() {
    return {
      headers: [ { text: "Edit", align: "center" } ],
      itemMasterHeadersKey: [],
      itemMasterDataTable: [],
      itemMasterModel: false,
      editedItems: {},
      addItems: {},
      staticFields: [],
      preFix: null,
      tableSearch:'',
      UOMList: [],
      itemGroupList: [],
      itemTypeList: [],
      dynamicFieldSchema: {
        fields: [],
        groups:[]
      },
      dynamicFieldModel: {},
      dynamicFieldOptions: {},
      addDynamicFieldSchema: {
        fields: [],
        groups:[]
      },
      addDynamicFieldModel: {},
      addDynamicFieldOptions: {},
      nameBlured: true,
      itemGroupBlured: true,
      itemTypeBlured: true,
      UOMBlured: true,
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      },
      addItemMasterModel: false,
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
    this.loadItemMaster();
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
    loadItemMaster: function() {
      const docID = localStorage.getItem('menuDocId') || 0;
      this. headers= [ { text: "Action", align: "center",sortable: false } ],
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}ItemMaster?docID=${docID}`
      })
      .then((result) => {
        this.itemMasterDataTable = result.data.tableData;
        this.itemMasterHeadersKey = Object.keys(result.data.tableData[0]);
        this.itemMasterHeadersKey.forEach(element => {
        this.headers.push({ text: element, align: "center", value: element })
        })
      }).catch((err) => {
        this.showSnackBar('error',err.response.data);
      });
    },
    editItemMasterData: function(params) {

      if(this.getCurrentUserRoles('editRight') != '1')
       {
         this.showSnackBar('error',"You do not have edit rights on the page.");
         return
       }

      const selectedID = params[Object.keys(params)[0]];
      this.selectedID = params[Object.keys(params)[0]];
      const docID = localStorage.getItem('menuDocId') || 0;
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}ItemMaster?selectedID=${selectedID}&docID=${docID}`
      })
        .then((result) => {
          const itemMasterData = result.data;
          this.preFix = itemMasterData.prefix;
          this.editedItems = itemMasterData.staticFieldData[0];
          this.staticFields = Object.keys(this.editedItems);
          this.UOMList = itemMasterData.UOMList;
          this.itemGroupList = itemMasterData.itemGroupList;
          this.itemTypeList = itemMasterData.itemType;
          if(itemMasterData.dynamicFieldModal != ""){
            this.dynamicShema = itemMasterData.dynamicFieldModal.fieldProperties;
            this.dynamicModal = itemMasterData.dynamicFieldModal.modal[0];
            this.dynamicFieldModel = this.dynamicModal;
            this.dynamicFieldSchema.fields = DynamicFieldSchema(this.dynamicShema, this.dynamicModal);
            this.dynamicFieldSchema.groups = generateGroupSchema(this.dynamicShema, this.dynamicModal);
            convertDateWithSchema(this.dynamicShema,this.dynamicFieldModel, false);
          }
         
          this.itemMasterModel = true;
        }).catch((err) => {
          this.showSnackBar('error',err.response.data);
        });
    },
    openDeleteConfirmatinModal(params){
      this.deleteSelectedId = params[Object.keys(params)[0]];
      this.deleteModal =true;
    },
    deleteItemMasterData() {
      const selectedID = this.deleteSelectedId;
      const docID = localStorage.getItem('menuDocId') || 1121; // Need to remove 1121 value and put 0 apart of this;
      const userID = localStorage.getItem('userId') || 0;
       /**
       * Delete Item in party Master
       */
      httpClient({
        method: 'DELETE',
        url: `${process.env.VUE_APP_API_BASE}ItemMaster?selectedID=${selectedID}&docID=${docID}&userID=${userID}`
      })
        .then((result) => {
          this.deleteModal = false;
          this.deleteSelectedId = 0;
          this.loadItemMaster();
          this.showSnackBar('success',result.data);
        }).catch((err) => {
           this.showSnackBar('error',err.response.data);
        });

    },
    updateItemMasterData: function() {
      this.validateOnclick();
      let updateModal = JSON.parse(JSON.stringify(this.dynamicFieldModel));
      convertDateWithSchema(this.dynamicShema,updateModal, true);

      const updateParams = {
        docID: localStorage.getItem('menuDocId') || 0, // Need to remove 1121 value and put 0 apart of this
        userID: localStorage.getItem('userId') || 0,
        staticFields: this.editedItems,
        dynamicFields: updateModal
      }
         /**
       * API call for updating the PartyMaster
       */
      if(this.validate() && this.isDynamicFormValid){
      httpClient({
        method: 'PUT',
        url: `${process.env.VUE_APP_API_BASE}ItemMaster`,
        data: updateParams
      })
        .then((result) => {
          this.loadItemMaster();
          this.showSnackBar('success',result.data);
        }).catch((err) => {
          this.showSnackBar('error',err.response.data);
        });
      }else{
        this.showSnackBar('error','Please fill mandatory fields!');
      }
    },
     validCode: function() {
      if (this.editedItems[this.staticFields[1]]) {
        return (this.editedItems[this.staticFields[1]]).length >= 1 ? true : false;
      } else { return false; }
    },
    validName: function() {
      if (this.editedItems[this.staticFields[2]]) {
        return (this.editedItems[this.staticFields[2]]).length >= 1 ? true : false;
      } else { return false; }
    },
    validitemGroup: function() {
      if (this.editedItems[this.staticFields[4]]) {
        return (this.editedItems[this.staticFields[4]].toString()).length >= 1 ? true : false;
      } else { return false; }
    },
    validitemType: function() {
      if (this.editedItems[this.staticFields[7]]) {
        return (this.editedItems[this.staticFields[7]].toString()).length >= 1 ? true : false;
      } else { return false; }
    },
    validUOM: function() {
      if (this.editedItems[this.staticFields[8]]) {
        return (this.editedItems[this.staticFields[8]].toString()).length >= 1 ? true : false;
      } else { return false; }
    },
    validate: function() {
     return (this.validCode() &&this.validName() && this.validitemGroup() && this.validitemType() && this.validUOM()) ? true : false;
    },
    addValidation: function() {
      return (this.validAddUOM() &&
      this.validAdditemType() &&
      this.validitemAddGroup() &&
      this.validAddName() &&
      this.validAddCode()) ? true : false;
    },
    validAddUOM: function() {
      if(this.isFormSavedOnce){
        if (this.addItems[this.staticFields[7]]) {
          return (this.addItems[this.staticFields[7]].toString()).length >= 1 ? true : false;
        } else { return false; }
      }else { return true; }
    },
    validAdditemType: function() {
      if(this.isFormSavedOnce){
        if (this.addItems[this.staticFields[6]]) {
          
          return (this.addItems[this.staticFields[6]]) != "" ? true : false;
        } else { return false; }
      }else { return true; }
    },
    validitemAddGroup: function() {
      if(this.isFormSavedOnce){
        if (this.addItems[this.staticFields[3]]) {
          return (this.addItems[this.staticFields[3]].toString()).length >= 1 ? true : false;
        } else { return false; }
      }else { return true; }
    },
    validAddName: function() {
      if(this.isFormSavedOnce){
        if (this.addItems[this.staticFields[1]]) {
          return (this.addItems[this.staticFields[1]].toString()).length >= 1 ? true : false;
        } else { return false; }
      }else { return true; }
    },
    validAddCode: function() {
      if(this.isFormSavedOnce){
        if (this.addItems[this.staticFields[0]]) {
          return (this.addItems[this.staticFields[0]].toString()).length >= 1 ? true : false;
        } else { return false; }
      }else { return true; }
    },
    addItemInItemMaster: function() {
      const docID = localStorage.getItem('menuDocId') || 0;
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}ItemMaster?docID=${docID}&type=0`
      }).then((result) => {
        const addItemInItemMaster = result.data;
        this.preFix = addItemInItemMaster.prefix;;
        this.addItems = addItemInItemMaster.staticFieldData;
        this.staticFields = Object.keys(this.addItems);
        this.itemGroupList = addItemInItemMaster.itemGroupList;
        this.itemTypeList = addItemInItemMaster.itemType;
        this.UOMList = addItemInItemMaster.UOMList;
       
        if(addItemInItemMaster.dynamicFieldModal.modal != ""){
          this.dynamicShema =addItemInItemMaster.dynamicFieldModal.fieldProperties;
          this.dynamicModal = addItemInItemMaster.dynamicFieldModal.modal;
          this.addDynamicFieldModel = this.dynamicModal;
          this.addDynamicFieldSchema.fields = DynamicFieldSchema(this.dynamicShema, this.dynamicModal);
          this.addDynamicFieldSchema.groups = generateGroupSchema(this.dynamicShema, this.dynamicModal);
          this.addDynamicFieldModel = generateNewModal(this.dynamicShema,this.dynamicModal);
        }
        this.addItemMasterModel = true;
      }).catch((err) => {
        this.showSnackBar('error',err.response.data);
      });
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
      console.log('postParams', JSON.stringify(postParams));
      if (this.addValidation() && this.isDynamicFormValid) {
          httpClient({
            method: 'POST',
            url: `${process.env.VUE_APP_API_BASE}ItemMaster`,
            data: postParams
          }).then((result) => {
            console.log('Result', result);
              this.showSnackBar('success',result.data);
              this.addItemMasterModel = false;
              this.loadItemMaster();
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
<style scoped>
.custom-checkbox{
  top: 0px!important;
}
</style>
