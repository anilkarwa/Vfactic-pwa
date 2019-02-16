<template>
  <div id="app">
    <v-app id="inspire">
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
            <v-toolbar-title>Edit Static and Dynamic Field here!</v-toolbar-title>
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
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="this.editItems.SUPPCode"
                              :label="`${preFix} Code *`"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="this.editItems.SUPPName"
                              :label="`${preFix} Name *`"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="this.editItems.SUPPAliasName"
                              :label="`${preFix} Alias Name`"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-select
                              v-model="editItems.supplierGroupID"
                              menu-props="auto"
                              :items="partyMasterGroupList"
                              item-text="groupName"
                              item-value="groupID"
                              :label="`${preFix} Group *`"
                            ></v-select>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-select
                              v-model="editItems.LedGroupID"
                              menu-props="auto"
                              :items="partyMasterLedGroupID"
                              item-text="ledgerGroupName"
                              item-value="ledgerGroupID"
                              :label="`${preFix} Ledger Group *`"
                            ></v-select>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="this.editItems.BAdd1"
                              :label="`Address line 1: *`"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="this.editItems.BAdd2"
                              :label="`Address line 2: *`"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="this.editItems.BAdd3"
                              :label="`Address line 3: *`"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="this.editItems.BAdd4"
                              :label="`Address line 4: *`"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="this.editItems.City"
                              :label="`City: *`"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="this.editItems.State"
                              :label="`State: *`"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="this.editItems.Country"
                              :label="`Country: *`"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="this.editItems.PinCode"
                              :label="`Pin Code:`"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-checkbox v-model="this.editItems.InActive" label="in Active ?"></v-checkbox>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-checkbox v-model="this.editItems.Authorised" label="is Authorised ?"></v-checkbox>
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
                      <vue-form-generator :schema="dynamicFieldSchema" :model="dynamicFieldModel" :options="dynamicFieldOptions"></vue-form-generator>
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
    </v-app>
  </div>
</template>
<script>
import httpClient from "@/services/httpClient.js"

export default {
  data: function() {
    return {
      headers: [ { text: "Edit", align: "center" } ],
      partyMasterHeadersKey: [],
      partyMasterTableData: [],
      preFix: null,
      partyMasterModel: false,
      editItems: {},
      partyMasterGroupList: [],
      partyMasterLedGroupID: [],
      dynamicFieldSchema: {
        fields: []
      },
      dynamicFieldModel: {},
      dynamicFieldOptions: {}
    }
  },
  beforeMount: function() {
    this.loadPatryMasteData();
  },
  methods: {
    loadPatryMasteData: function() {
      /**
       * Code for loading the party master data
       */
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}PartyMaster?docID=1121`,
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
      const selectedID = params.SUPPID || 0;
      /**
       * Reading MenuDocID from localstorage:: saved in home view while selecting the menu
       */
      // const docID = localStorage.getItem('menuDocId') || 0; // commented for testing purpose uncomment in PROD:
      const docID = 1121;
      this.partyMasterModel = true;
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}PartyMaster?selectedID=${selectedID}&docID=${docID}`
      })
        .then((result) => {
          console.log('Party Master: edit Model:: server response', result);
          const partyMasterFields = result.data;
          this.preFix = partyMasterFields.prefix;
          this.editItems = partyMasterFields.staticFieldData[0];

          this.partyMasterGroupList = partyMasterFields.groupList;
          this.editItems.supplierGroupID = this.partyMasterGroupList.find(value => value.groupID === partyMasterFields.staticFieldData[0].SUPPGROUPID);

          this.partyMasterLedGroupID = partyMasterFields.ledgerGroupList;
          this.editItems.LedGroupID = this.partyMasterLedGroupID.find(value => value.ledgerGroupID === partyMasterFields.staticFieldData[0].LedGroupID);
          // this.dynamicFieldModel = partyMasterFields.dynamicFieldModal.modal[0];
          this.dynamicFieldModel = {
        id: 1,
        name: 'John Doe',
        password: 'J0hnD03!x4',
        skills: ['Javascript', 'VueJS'],
        email: 'john.doe@gmail.com',
        status: true
      }
          // this.dynamicFieldSchema.fields = partyMasterFields.dynamicFieldModal.fieldProperties;
          this.dynamicFieldSchema.fields = [
            {
            type: 'input',
            inputType: 'text',
            label: 'ID (disabled text field)',
            model: 'id',
            readonly: true,
            disabled: true
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Name',
            model: 'name',
            placeholder: 'Your name',
            featured: true,
            required: true
          },
          {
            type: 'input',
            inputType: 'password',
            label: 'Password',
            model: 'password',
            min: 6,
            required: true,
            hint: 'Minimum 6 characters',
            validator: VueFormGenerator.validators.string
          },
          {
            type: 'select',
            label: 'Skills',
            model: 'skills',
            values: ['Javascript', 'VueJS', 'CSS3', 'HTML5']
          },
          {
            type: 'input',
            inputType: 'email',
            label: 'E-mail',
            model: 'email',
            placeholder: 'User\'s e-mail address'
          },
          {
            type: 'checkbox',
            label: 'Status',
            model: 'status',
            default: true
          }
          ]
          console.log('Model', this.dynamicFieldModel);
          console.log('Schema', this.dynamicFieldSchema.fields);
        }).catch((err) => {
          /**
           * When API call failed: check error in browser console::
           */
          console.error('Error Occured while fetcing the party master Data', err);
        });
    },
    deletePartyMasterData: function(params) {

    },
    updatePartyMasterData: function() {

    }
  }
}
</script>
<style>

</style>
