<template>
  <div id="app">
    <v-app id="inspire">
      <!-- <v-btn color="primary" @click="addItemInPartyMaster">ADD PARTY MASTER</v-btn> -->
      <!-- <v-layout class="text-md-center text-lg-center"> -->
        <div class="text-md-center text-lg-center">
          <v-btn fab dark  color="indigo" @click="addItemInPartyMaster"> <v-icon dark>add</v-icon></v-btn>
        </div>
      <!-- </v-layout> -->
       Add New Record
      <!-- START: Code for Data table -->
      <v-data-table :headers="headers" :items="partyMasterTableData" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editPartyMasterData(props.item)">edit</v-icon>
            <v-icon small @click="deletePartyMasterData(props.item)">delete</v-icon>
          </td>
          <td v-for="values in props.item" :key="values.id">
            {{ values }}
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary">Reset</v-btn>
        </template>
      </v-data-table>
      <!-- END: Code for Data table -->
      <!-- START: Dialog box Model code for Party Master Static and Dynamic Field -->
      <v-dialog
        v-model="partyMasterModel"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="partyMasterModel = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit Information</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="updatePartyMasterData()">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-layout row wrap>
            <v-flex xs12>
              <v-expansion-panel popout>
                <v-expansion-panel-content>
                  <div slot="header">Details</div>
                  <v-card>
                    <v-card-text>
                      <v-container fluid grid-list-xl>
                        <v-layout row justify-space-between>
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
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`${preFix} Alias Name: `}}</label>
                            <b-form-input id="code" v-model="editItems[staticFields[3]]" type="text"
                            :placeholder="`${preFix} Alias Name `" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="">{{`${preFix} Group: `}}</label><span class="mandatoryStar">*</span>
                             <b-form-select v-model="editItems[staticFields[4]]" :options="partyMasterGroupList"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validSupplierGroup() && groupNameBlured}"
                            v-on:blur="groupNameBlured = true"
                            aria-describedby="groupIDLiveFeedback"
                            :placeholder="`${preFix} Group`" value-field="groupID"  text-field="groupName" />
                            <b-form-invalid-feedback id="groupIDLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>

                            <!-- <b-form-select v-model="editItems[staticFields[4]]" :options="partyMasterGroupList"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validSupplierGroup() && groupNameBlured}"
                            v-on:blur="groupNameBlured = true"
                            aria-describedby="groupIDLiveFeedback"
                            :placeholder="`${preFix} Group`" value-field="groupID"  text-field="groupName" />

                            <b-form-invalid-feedback id="groupIDLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback> -->
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="">{{`${preFix} Ledger Group: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-select v-model="editItems[staticFields[5]]" :options="partyMasterLedGroupID"
                            v-bind:class="{'form-control':true, 'is-invalid' : !ValidGroupLedgerid() && ledgerIdBlured}"
                            v-on:blur="ledgerIdBlured = true"
                            aria-describedby="ledgerLiveFeedback"
                            :placeholder="`${preFix} Ledger Group`" value-field="ledgerGroupID" text-field="ledgerGroupName" />
                            <b-form-invalid-feedback id="ledgerLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Address line 1: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="editItems[staticFields[6]]" type="text"
                            aria-describedby="add1LiveFeedback"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validAdd1() && add2Blured}"
                            v-on:blur="cityBlured = true"
                             :placeholder="`Address line 1`" />
                             <b-form-invalid-feedback id="add1LiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Address line 2: `}}</label>
                            <b-form-input id="code" v-model="editItems[staticFields[7]]" type="text" 
                            :placeholder="`Address line 2`" />
                            
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Address line 3: `}}</label>
                            <b-form-input id="code" v-model="editItems[staticFields[8]]" type="text" 
                            :placeholder="`Address line 3`" />
                            
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Address line 4: `}}</label>
                            <b-form-input id="code" v-model="editItems[staticFields[9]]" type="text" 
                            :placeholder="`Address line 4`" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`City: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="editItems[staticFields[10]]" type="text"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validCity() && cityBlured}"
                            v-on:blur="cityBlured = true"
                            aria-describedby="cityLiveFeedback"
                            :placeholder="`City`" />
                            <b-form-invalid-feedback id="cityLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`State: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="editItems[staticFields[12]]" type="text"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validState() && stateBlured}"
                            v-on:blur="stateBlured = true"
                            aria-describedby="stateLiveFeedback"
                            :placeholder="`State`" />
                            <b-form-invalid-feedback id="stateLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Country: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="editItems[staticFields[13]]" type="text"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validCountry() && countryBlured}"
                            v-on:blur="countryBlured = true"
                            aria-describedby="countryLiveFeedback"
                            :placeholder="`Country`" />
                            <b-form-invalid-feedback id="countryLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Pin Code: `}}</label>
                            <b-form-input id="code" v-model="editItems[staticFields[11]]" type="text" :placeholder="`Pin Code`" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <b-form-checkbox
                              id="checkbox1"
                              v-model="editItems[staticFields[14]]"
                            >
                              in Active ?
                            </b-form-checkbox>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <b-form-checkbox
                              id="checkbox2"
                              v-model="editItems[staticFields[15]]"
                            >
                              is Authorised ?
                            </b-form-checkbox>
                          </v-flex>
                        </v-layout>
                      </v-container>
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
                      <vue-form-generator id="Form-generator-css" ref="vfg" :schema="dynamicFieldSchema" :model="dynamicFieldModel" :options="formOptions" @validated="onValidated"></vue-form-generator>
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
      <!-- END: Dialog box Model code for Party Master Static and Dynamic Field -->
      <!-- START: Dialog box Model code for Adding new Item in Party Master -->
      <v-dialog
        v-model="AddItemInpartyMasterModel"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="AddItemInpartyMasterModel = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Add Record</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="addItemRequest()">Add</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-layout row wrap>
            <v-flex xs12>
              <v-expansion-panel popout>
                <v-expansion-panel-content>
                  <div slot="header">Details</div>
                  <v-card>
                    <v-card-text>
                      <v-container fluid grid-list-xl>
                        <v-layout row justify-space-between>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`${preFix} Code: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="addItems[staticFields[0]]" type="text"
                            v-bind:class="{'form-control':true, 'is-invalid' : !addValidCode() && codeBlured}"
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
                            v-bind:class="{'form-control':true, 'is-invalid' : !addValidName() && nameBlured}"
                            v-on:blur="nameBlured = true"
                            aria-describedby="nameLiveFeedback"
                            :placeholder="`${preFix} Name`" />
                            <b-form-invalid-feedback id="nameLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`${preFix} Alias Name: `}}</label>
                            <b-form-input id="code" v-model="addItems[staticFields[2]]" type="text"
                            :placeholder="`${preFix} Alias Name `" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="">{{`${preFix} Group: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-select v-model="addItems[staticFields[3]]" :options="partyMasterGroupList"
                            v-bind:class="{'form-control':true, 'is-invalid' : !addValidSupplierGroup() && groupNameBlured}"
                            v-on:blur="groupNameBlured = true"
                            aria-describedby="groupIDLiveFeedback"
                            :placeholder="`${preFix} Group`" value-field="groupID"  text-field="groupName" />

                            <b-form-invalid-feedback id="groupIDLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="">{{`${preFix} Ledger Group: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-select v-model="addItems[staticFields[4]]" :options="partyMasterLedGroupID"
                            v-bind:class="{'form-control':true, 'is-invalid' : !addValidGroupLedgerid() && ledgerIdBlured}"
                            v-on:blur="ledgerIdBlured = true"
                            aria-describedby="ledgerLiveFeedback"
                            :placeholder="`${preFix} Ledger Group`" value-field="ledgerGroupID" text-field="ledgerGroupName" />
                            <b-form-invalid-feedback id="ledgerLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Address line 1: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="addItems[staticFields[5]]" type="text"
                            aria-describedby="add1LiveFeedback"
                            v-bind:class="{'form-control':true, 'is-invalid' : !addValidAdd1() && add2Blured}"
                            v-on:blur="cityBlured = true"
                             :placeholder="`Address line 1`" />
                             <b-form-invalid-feedback id="add1LiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Address line 2: `}}</label>
                            <b-form-input id="code" v-model="addItems[staticFields[6]]" type="text" 
                            :placeholder="`Address line 2`" />
                            
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Address line 3: `}}</label>
                            <b-form-input id="code" v-model="addItems[staticFields[7]]" type="text" 
                            :placeholder="`Address line 3`" />
                           
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Address line 4: `}}</label>
                            <b-form-input id="code" v-model="addItems[staticFields[8]]" type="text" 
                            :placeholder="`Address line 4`" />
                            
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`City: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="addItems[staticFields[9]]" type="text"
                            v-bind:class="{'form-control':true, 'is-invalid' : !addValidCity() && cityBlured}"
                            v-on:blur="cityBlured = true"
                            aria-describedby="cityLiveFeedback"
                            :placeholder="`City`" />
                            <b-form-invalid-feedback id="cityLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`State: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="addItems[staticFields[11]]" type="text"
                            v-bind:class="{'form-control':true, 'is-invalid' : !addValidState() && stateBlured}"
                            v-on:blur="stateBlured = true"
                            aria-describedby="stateLiveFeedback"
                            :placeholder="`State`" />
                            <b-form-invalid-feedback id="stateLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Country: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="addItems[staticFields[12]]" type="text"
                            v-bind:class="{'form-control':true, 'is-invalid' : !addValidCountry() && countryBlured}"
                            v-on:blur="countryBlured = true"
                            aria-describedby="countryLiveFeedback"
                            :placeholder="`Country`" />
                            <b-form-invalid-feedback id="countryLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Pin Code: `}}</label>
                            <b-form-input id="code" v-model="addItems[staticFields[10]]" type="text" :placeholder="`Pin Code`" />
                          </v-flex>
                          <!-- <v-flex xs12 sm6 md4>
                            <b-form-checkbox
                              id="checkbox1"
                              v-model="addItems[staticFields[14]]"
                            >
                              in Active ?
                            </b-form-checkbox>
                          </v-flex> -->
                          <!-- <v-flex xs12 sm6 md4>
                            <b-form-checkbox
                              id="checkbox1"
                              v-model="addItems[staticFields[15]]"
                            >
                              is Authorised ?
                            </b-form-checkbox>
                          </v-flex> -->
                        </v-layout>
                      </v-container>
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
                      <vue-form-generator id="Form-generator-css" ref="vfg" :schema="addDynamicFieldSchema" :model="addDynamicFieldModel" :options="formOptions" @validated="onValidatedAdd"></vue-form-generator>
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
      <!-- END: Dialog box Model code for Adding new Item in Party Master -->
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

export default {
  components:{
    "vue-form-generator": VueFormGenerator.component
  },
  data: function() {
    return {
      headers: [ { text: "Edit", align: "center" } ],
      partyMasterHeadersKey: [],
      partyMasterTableData: [],
      preFix: null,
      partyMasterModel: false,
      editItems: {},
      addItems: {},
      staticFields: [],
      partyMasterGroupList: [],
      partyMasterLedGroupID: [],
      dynamicFieldSchema: {
        fields: [],
        groups: []
      },
      dynamicFieldModel: {},
      addDynamicFieldSchema: {
        fields: [],
        groups: []
      },
      addDynamicFieldModel: {},
      dynamicFieldOptions: {},
      selectedID: null,
      codeBlured: true,
      nameBlured: true,
      groupNameBlured: true,
      ledgerIdBlured: true,
      cityBlured: true,
      stateBlured: true,
      countryBlured: true,
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true,
        validationErrorCLass :"error"
      },
      add1Blured: true,
      add2Blured: true,
      add3Blured: true,
      add4Blured: true,
      AddItemInpartyMasterModel: false,
      addFlag: false,
      isDynamicFormValid: false,
      snackbar: false,
      color: '',
      mode: '',
      timeout: 5000,
      text: '',
      dynamicShema:{},
      dynamicModal: {}
    }
  },
  beforeMount: function() {
    this.loadPatryMasteData();
  },
  methods: {
    showSnackBar(type,message){
      this.snackbar = true;
      this.color = type;
      this.text = message;
    },
    loadPatryMasteData: function() {
      const docID = localStorage.getItem('menuDocId') || 0;
      this.headers= [ { text: "Edit", align: "center" } ],
      /**
       * Code for loading the party master data
       */
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}PartyMaster?docID=${docID}`,
      })
        .then((result) => {
          if (result.status === 200) {
            const partyMasterData = result.data;
            /**
             * Logic for putting data into data table::
             */
            this.preFix = partyMasterData.prefix;
            this.partyMasterHeadersKey = Object.keys(partyMasterData.tableData[0]);
            this.partyMasterHeadersKey.forEach(element => {
            this.headers.push({ text: element, align: "center", value: element })
            })
            this.partyMasterTableData = partyMasterData.tableData;
          }
        }).catch((err) => {
          this.showSnackBar('error',err.response.data);
        });
    },
    editPartyMasterData: function(params) {
      this.selectedID = params[Object.keys(params)[0]];
      const docID = localStorage.getItem('menuDocId') || 0; 
      this.partyMasterModel = true;
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}PartyMaster?selectedID=${this.selectedID}&docID=${docID}`
      })
        .then((result) => {
          const partyMasterFields = result.data;
          this.preFix = partyMasterFields.prefix;
          this.editItems = partyMasterFields.staticFieldData[0];
          this.staticFields = Object.keys(this.editItems);
          this.partyMasterGroupList = partyMasterFields.groupList;
          this.partyMasterLedGroupID = partyMasterFields.ledgerGroupList;
          if(partyMasterFields.dynamicFieldModal != ""){
            this.dynamicShema = partyMasterFields.dynamicFieldModal.fieldProperties;
            this.dynamicModal = partyMasterFields.dynamicFieldModal.modal[0];
            this.dynamicFieldModel = this.dynamicModal;
            this.dynamicFieldSchema.fields = generateSchema(this.dynamicShema, this.dynamicModal);
            this.dynamicFieldSchema.groups = generateGroupSchema(this.dynamicShema, this.dynamicModal);
          }
        }).catch((err) => {
          this.showSnackBar('error',err.response.data);
        });
    },
    deletePartyMasterData: function(params) {
      const selectedID = this.selectedID;
      const docID = localStorage.getItem('menuDocId') || 0;
      const userID = localStorage.getItem('userId') || 0;
      /**
       * Delete Item in party Master
       */
      httpClient({
        method: 'DELETE',
        url: `${process.env.VUE_APP_API_BASE}PartyMaster?selectedID=${selectedID}&docID=${docID}&userID=${userID}`
      })
        .then((result) => {
          this.loadPatryMasteData();
          this.showSnackBar('success',result.data);
        }).catch((err) => {
          this.showSnackBar('error',err.response.data);
        });
    },
    updatePartyMasterData: function() {
      this.validateOnclick();
      this.editItems[this.staticFields[4]] = typeof(this.editItems[this.staticFields[4]]) === 'object' ? this.editItems[this.staticFields[4]].groupID : this.editItems[this.staticFields[4]];
      this.editItems[this.staticFields[5]] = typeof(this.editItems[this.staticFields[5]]) === 'object' ? this.editItems[this.staticFields[5]].ledgerGroupID : this.editItems[this.staticFields[5]];
      const updateParams = {
        docID: localStorage.getItem('menuDocId') || 0, 
        userID: localStorage.getItem('userId') || 0,
        staticFields: this.editItems,
        dynamicFields: this.dynamicFieldModel
      }
      console.log('Update Params', updateParams);
      /**
       * API call for updating the PartyMaster
       */
      if(this.updateValidation() && this.isDynamicFormValid){
      httpClient({
        method: 'PUT',
        url: `${process.env.VUE_APP_API_BASE}PartyMaster`,
        data: updateParams
      })
        .then((result) => {
          this.loadPatryMasteData();
          this.showSnackBar('success',result.data);
        }).catch((err) => {
          this.showSnackBar('error',err.response.data);
        });
      } else{
        this.showSnackBar('error','Please fill required before saving! ');
      }
    },
    updateValidation(){
      return(this.validCode() && this.validName() && this.ValidGroupLedgerid() && this.validSupplierGroup() && this.validAdd1() &&
      this.validCity() && this.validState() && this.validCountry())? true: false;
    },
    validCode: function() {
      if (this.editItems[this.staticFields[1]]) {
        return (this.editItems[this.staticFields[1]]).length >= 1 ? true : false;
      } else {
        return false
      }
    },
   
    validName: function() {
      if (this.editItems[this.staticFields[2]]) {
        return (this.editItems[this.staticFields[2]]).length >= 1 ? true : false;
      } else { return false; }
    },
    ValidGroupLedgerid: function() {
      if (this.editItems[this.staticFields[5]]) {
        return (this.editItems[this.staticFields[5]].toString()).length >= 1 ? true : false;
      } else { return false; }
    },
    validSupplierGroup: function() {
      if (this.editItems[this.staticFields[4]]) {
        return (this.editItems[this.staticFields[4]].toString()).length >= 1 ? true : false;
      } else { return false; }
    },
    validAdd1: function() {
      if (this.editItems[this.staticFields[6]]) {
        return (this.editItems[this.staticFields[6]].toString()).length >= 1 ? true : false;
      } else { return false; }
    },
     validAdd2: function() {
      if (this.editItems[this.staticFields[7]]) {
        return (this.editItems[this.staticFields[7]].toString()).length >= 1 ? true : false;
      } else { return false; }
    },
     validAdd3: function() {
      if (this.editItems[this.staticFields[8]]) {
        return (this.editItems[this.staticFields[8]].toString()).length >= 1 ? true : false;
      } else { return false; }
    },
     validAdd4: function() {
      if (this.editItems[this.staticFields[9]]) {
        return (this.editItems[this.staticFields[9]].toString()).length >= 1 ? true : false;
      } else { return false; }
    },
    validCity: function() {
      if (this.editItems[this.staticFields[10]]) {
        return (this.editItems[this.staticFields[10]]).length >= 1 ? true : false;
      } else { return false; }
    },
    validState: function() {
      if (this.editItems[this.staticFields[12]]) {
        return (this.editItems[this.staticFields[12]]).length >= 1 ? true : false;
      } else { return false; }
    },
    validCountry: function() {
      if (this.editItems[this.staticFields[13]]) {
        return (this.editItems[this.staticFields[13]]).length >= 1 ? true : false;
      } else { return false; }
    },
    addValidation: function() {
      this.addFlag = true;
      return (this.addValidCode() &&
      this.addValidName() &&
      this.addValidSupplierGroup() &&
      this.addValidGroupLedgerid() &&
      this.addValidAdd1() &&
      this.addValidCity() &&
      this.addValidState() &&
      this.addValidCountry()) ? true : false;
    },
    addValidCode: function() {
      if(this.addFlag) {
        if (this.addItems[this.staticFields[0]]) {
        return (this.addItems[this.staticFields[0]]).length >= 1 ? true : false;
      } else { return false; }
      } else{
        return true;
      }
    },
    addValidName: function() {
      if(this.addFlag) {
        if (this.addItems[this.staticFields[1]]) {
        return (this.addItems[this.staticFields[1]]).length >= 1 ? true : false;
      } else { return false; }
      } else{
        return true;
      }
    },
    addValidSupplierGroup: function() {
      if(this.addFlag) {
        if (this.addItems[this.staticFields[3]]) {
        return (this.addItems[this.staticFields[3]].toString()).length >= 1  ? true : false;
      } else { return false; }
      } else{
        return true;
      }
    },
    addValidGroupLedgerid: function() {
      if(this.addFlag) {
        if (this.addItems[this.staticFields[4]]) {
        return (this.addItems[this.staticFields[4]].toString()).length >= 1 ? true : false;
      } else { return false; }
      } else{
        return true;
      }
    },
    addValidAdd1: function() {
      if(this.addFlag) {
        if (this.addItems[this.staticFields[5]]) {
        return (this.addItems[this.staticFields[5]]).length >= 1 ? true : false;
      } else { return false; }
      } else{
        return true;
      }
    },
    addValidAdd2: function() {
      if(this.addFlag) {
        if (this.addItems[this.staticFields[6]]) {
        return (this.addItems[this.staticFields[6]]).length >= 1 ? true : false;
      } else { return false; }
      } else { return true;}
    },
    addValidAdd3: function() {
      if(this.addFlag) {
        if (this.addItems[this.staticFields[7]]) {
        return (this.addItems[this.staticFields[7]]).length >= 1 ? true : false;
      } else { return false; }
      } else{ return true}
    },
    addValidAdd4: function() {
      if(this.addFlag) {
        if (this.addItems[this.staticFields[8]]) {
        return (this.addItems[this.staticFields[8]]).length >= 1 ? true : false;
      } else { return false; }
      } else{ return true}
    },
    addValidCity: function() {
      if(this.addFlag) {
        if (this.addItems[this.staticFields[9]]) {
        return (this.addItems[this.staticFields[9]]).length >= 1 ? true : false;
      } else { return false; }
      }else{ return true}
    },
    addValidState: function() {
      if(this.addFlag) {
        if (this.addItems[this.staticFields[11]]) {
        return (this.addItems[this.staticFields[11]]).length >= 1 ? true : false;
      } else { return false; }
      }else{ return true}
    },
    addValidCountry: function() {
      if(this.addFlag) {
        if (this.addItems[this.staticFields[12]]) {
        return (this.addItems[this.staticFields[12]]).length >= 1 ? true : false;
      } else { return false; }
      }else{ return true}
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

    addItemInPartyMaster: function() {
      const docID = localStorage.getItem('menuDocId') || 0;
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}PartyMaster?docID=${docID}&type=0`
      }).then((result) => {
        const addItemInPartyMaster = result.data;
        this.addItems = addItemInPartyMaster.staticFieldData;
        this.staticFields = Object.keys(this.addItems);
        this.preFix = addItemInPartyMaster.prefix;
        this.partyMasterGroupList = addItemInPartyMaster.groupList;
        this.partyMasterLedGroupID = addItemInPartyMaster.ledgerGroupList;
        if(addItemInPartyMaster.dynamicFieldModal != ""){
          this.dynamicShema =addItemInPartyMaster.dynamicFieldModal.fieldProperties;
          this.dynamicModal = addItemInPartyMaster.dynamicFieldModal.modal;
          this.addDynamicFieldSchema.fields = generateSchema( this.dynamicShema, this.dynamicModal);
          this.addDynamicFieldSchema.groups = generateGroupSchema( this.dynamicShema, this.dynamicModal);
          this.addDynamicFieldModel = generateNewModal( this.dynamicShema,this.dynamicModal);
        }
        this.AddItemInpartyMasterModel = true;
      }).catch((err) => {
        this.showSnackBar('error',err.response.data);
      });
    },
    addItemRequest: function() {
    this.addFlag = true;
    this.validateOnclick();
    const postParams = {
      docID: localStorage.getItem('menuDocId'),
      userID: localStorage.getItem('userId'),
      staticFields: this.addItems,
      dynamicFields: this.addDynamicFieldModel
    }
    if (this.addValidation() && this.isDynamicFormValid ) {
      httpClient({
        method: 'POST',
        url: `${process.env.VUE_APP_API_BASE}PartyMaster`,
        data: postParams
      }).then((result) => {
        this.showSnackBar('success',result.data);
        this.AddItemInpartyMasterModel = false;
        this.loadPatryMasteData();
      }).catch((err) => {
        this.showSnackBar('error',err.response.data);
      });
      } else{
        this.showSnackBar('error','Please fill all mandatory field.')
      }
    }
  }
}
</script>
<style scoped>
.custom-checkbox{
  top: 40px!important;
}
</style>
