<template>
  <div id="app">
    <v-app id="inspire">
      <v-btn color="primary" @click="addItemInPartyMaster">ADD PARTY MASTER</v-btn>
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
                            <label for="code">{{`Address line 2: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="editItems[staticFields[7]]" type="text" 
                            v-bind:class="{'form-control':true, 'is-invalid' : !validAdd2() && add2Blured}"
                            v-on:blur="cityBlured = true"
                            aria-describedby="add2LiveFeedback"
                            :placeholder="`Address line 2`" />
                            <b-form-invalid-feedback id="add2LiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Address line 3: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="editItems[staticFields[8]]" type="text" 
                            v-bind:class="{'form-control':true, 'is-invalid' : !validAdd3() && add3Blured}"
                            v-on:blur="cityBlured = true"
                            aria-describedby="add3LiveFeedback"
                            :placeholder="`Address line 3`" />
                            <b-form-invalid-feedback id="add3LiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Address line 4: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="editItems[staticFields[9]]" type="text" 
                            v-bind:class="{'form-control':true, 'is-invalid' : !validAdd4() && add4Blured}"
                            v-on:blur="cityBlured = true"
                            aria-describedby="add4LiveFeedback"
                            :placeholder="`Address line 4`" />
                            <b-form-invalid-feedback id="add4LiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
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
                              id="checkbox1"
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
                      <vue-form-generator id="Form-generator-css" :schema="dynamicFieldSchema" :model="dynamicFieldModel" :options="formOptions" @validated="onValidated"></vue-form-generator>
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
                            <b-form-input id="code" v-model="addItems[staticFields[0]]" type="text"
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
                            <b-form-input id="code" v-model="addItems[staticFields[1]]" type="text"
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
                            <b-form-input id="code" v-model="addItems[staticFields[2]]" type="text"
                            :placeholder="`${preFix} Alias Name `" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="">{{`${preFix} Group: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-select v-model="addItems[staticFields[3]]" :options="partyMasterGroupList"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validSupplierGroup() && groupNameBlured}"
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
                            <b-form-input id="code" v-model="addItems[staticFields[5]]" type="text"
                            aria-describedby="add1LiveFeedback"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validAdd1() && add2Blured}"
                            v-on:blur="cityBlured = true"
                             :placeholder="`Address line 1`" />
                             <b-form-invalid-feedback id="add1LiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Address line 2: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="addItems[staticFields[6]]" type="text" 
                            v-bind:class="{'form-control':true, 'is-invalid' : !validAdd2() && add2Blured}"
                            v-on:blur="cityBlured = true"
                            aria-describedby="add2LiveFeedback"
                            :placeholder="`Address line 2`" />
                            <b-form-invalid-feedback id="add2LiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Address line 3: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="addItems[staticFields[7]]" type="text" 
                            v-bind:class="{'form-control':true, 'is-invalid' : !validAdd3() && add3Blured}"
                            v-on:blur="cityBlured = true"
                            aria-describedby="add3LiveFeedback"
                            :placeholder="`Address line 3`" />
                            <b-form-invalid-feedback id="add3LiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`Address line 4: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="addItems[staticFields[8]]" type="text" 
                            v-bind:class="{'form-control':true, 'is-invalid' : !validAdd4() && add4Blured}"
                            v-on:blur="cityBlured = true"
                            aria-describedby="add4LiveFeedback"
                            :placeholder="`Address line 4`" />
                            <b-form-invalid-feedback id="add4LiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="code">{{`City: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-input id="code" v-model="addItems[staticFields[9]]" type="text"
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
                            <b-form-input id="code" v-model="addItems[staticFields[11]]" type="text"
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
                            <b-form-input id="code" v-model="addItems[staticFields[12]]" type="text"
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
                      <vue-form-generator :schema="addDynamicFieldSchema" :model="addDynamicFieldModel" :options="formOptions" @validated="onValidated"></vue-form-generator>
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
    </v-app>
  </div>
</template>
<script>
import httpClient from "@/services/httpClient.js"
import generateSchema from '@/DynamicProperty/generateScheme.js'
import generateGroupSchema from '@/DynamicProperty/generateGroupSchema.js'
import VueFormGenerator from 'vue-form-generator'


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
        fields: []
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
        validateAsync: true
      },
      add1Blured: true,
      add2Blured: true,
      add3Blured: true,
      add4Blured: true,
      AddItemInpartyMasterModel: false
    }
  },
  beforeMount: function() {
    this.loadPatryMasteData();
  },
  methods: {
    loadPatryMasteData: function() {
      const docID = localStorage.getItem('menuDocId') || 0;
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
          /**
           * When API call failed: check error in browser console::
           */
          console.error('Error Occured while fetcing the party master Data', err);
        });
    },
    editPartyMasterData: function(params) {
      console.log('EDit Party Master with Item Data', params.SUPPID);
      this.selectedID = params.SUPPID || 0;
      console.log('Selected ID', this.selectedID);
      /**
       * Reading MenuDocID from localstorage:: saved in home view while selecting the menu
       */
      const docID = localStorage.getItem('menuDocId') || 0; // commented for testing purpose uncomment in PROD:
      // const docID = 1121;
      this.partyMasterModel = true;
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}PartyMaster?selectedID=${this.selectedID}&docID=${docID}`
      })
        .then((result) => {
          console.log('Party Master: edit Model:: server response', result.data);
          // console.log('Party Master: edit Model:: server response', JSON.stringify(result.data.staticFieldData[0]));
          const partyMasterFields = result.data;
          this.preFix = partyMasterFields.prefix;
          console.log('Static Fields', JSON.stringify(partyMasterFields.staticFieldData[0]));
          this.editItems = partyMasterFields.staticFieldData[0];
          this.staticFields = Object.keys(this.editItems);
          this.partyMasterGroupList = partyMasterFields.groupList;

          // this.editItems[this.staticFields[4]] = this.partyMasterGroupList.find(value => value.groupID === partyMasterFields.staticFieldData[0].SUPPGROUPID);
          this.editItems[this.staticFields[4]] = partyMasterFields.staticFieldData[0].SUPPGROUPID;
          this.partyMasterLedGroupID = partyMasterFields.ledgerGroupList;
          // this.editItems[this.staticFields[5]] = this.partyMasterLedGroupID.find(value => value.ledgerGroupID === partyMasterFields.staticFieldData[0].LedGroupID);
          this.editItems[this.staticFields[5]] = partyMasterFields.staticFieldData[0].LedGroupID;
          this.dynamicFieldModel = partyMasterFields.dynamicFieldModal.modal[0];
          this.dynamicFieldSchema.fields =generateSchema(partyMasterFields.dynamicFieldModal.fieldProperties, this.dynamicFieldModel);
          this.dynamicFieldSchema.groups = generateGroupSchema(partyMasterFields.dynamicFieldModal.fieldProperties, this.dynamicFieldModel);
        }).catch((err) => {
          /**
           * When API call failed: check error in browser console::
           */
          console.error('Error Occured while fetcing the party master Data', err);
        });
    },
    deletePartyMasterData: function(params) {
      const selectedID = this.selectedID;
      const docID = localStorage.getItem('menuDocId') || 1121; // Need to remove 1121 value and put 0 apart of this;
      const userID = localStorage.getItem('userId') || 0;
      /**
       * Delete Item in party Master
       */
      httpClient({
        method: 'DELETE',
        url: `${process.env.VUE_APP_API_BASE}PartyMaster?selectedID=${selectedID}&docID=${docID}&userID=${userID}`
      })
        .then((result) => {
          console.log('Delete Request Response', result);
        }).catch((err) => {
          console.error('Error occured: while Delete request', err);
        });
    },
    updatePartyMasterData: function() {
      evt.preventDefault()
      this.editItems[this.staticFields[4]] = typeof(this.editItems[this.staticFields[4]]) === 'object' ? this.editItems[this.staticFields[4]].groupID : this.editItems[this.staticFields[4]];
      this.editItems[this.staticFields[5]] = typeof(this.editItems[this.staticFields[5]]) === 'object' ? this.editItems[this.staticFields[5]].ledgerGroupID : this.editItems[this.staticFields[5]];
      const updateParams = {
        docID: localStorage.getItem('menuDocId') || 1121, // Need to remove 1121 value and put 0 apart of this
        userID: localStorage.getItem('userId') || 0,
        staticFields: this.editItems,
        dynamicFields: this.dynamicFieldModel
      }
      console.log('Update Params', updateParams);
      /**
       * API call for updating the PartyMaster
       */
      httpClient({
        method: 'PUT',
        url: `${process.env.VUE_APP_API_BASE}PartyMaster`,
        data: updateParams
      })
        .then((result) => {
          console.log('Update Response from server', result);
        }).catch((err) => {
          console.error('OOps! Error occured while updating the request', err);
        });
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
    validate: function() {
      (this.validCode() && this.validName() && this.ValidGroupLedgerid() && this.validSupplierGroup() && this.validCity() && this.validState() && this.validCountry()) ? true : false;
    },
    onValidated: function(isValid, errors) {
      console.log("Validation result: ", isValid, ", Errors:", errors);
    },
    addItemInPartyMaster: function() {
      const docID = localStorage.getItem('menuDocId') || 0;
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}PartyMaster?docID=${docID}&type=0`
      }).then((result) => {
        console.log('Response from server', result);
        const addItemInPartyMaster = result.data;
        console.log('Add Items In Party Master', addItemInPartyMaster);
        this.addItems = addItemInPartyMaster.staticFieldData;
        console.log('this.addItems', JSON.stringify(this.addItems));
        this.staticFields = Object.keys(this.addItems);
        this.preFix = addItemInPartyMaster.prefix;

        this.partyMasterGroupList = addItemInPartyMaster.groupList;
        this.partyMasterLedGroupID = addItemInPartyMaster.ledgerGroupList;

        this.addDynamicFieldModel = addItemInPartyMaster.dynamicFieldModal.modal[0];
        this.addDynamicFieldSchema.fields = generateSchema(addItemInPartyMaster.dynamicFieldModal.fieldProperties, this.addDynamicFieldModel);

        this.AddItemInpartyMasterModel = true;
      }).catch((err) => {
        console.error('Error Occured', err);
      });
    }
  }
}
</script>
<style scoped>
.custom-checkbox{
  top: 40px!important;
}
</style>
