<template>
  <div id="app">
    <v-app id="inspire">
      <v-btn color="primary" @click="addItemInItemMaster">ADD ITEM MASTER</v-btn>
      <!-- START: table -->
      <v-data-table :headers="headers" :items="itemMasterDataTable" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItemMasterData(props.item)">edit</v-icon>
            <v-icon small @click="deleteItemMasterData(props.item)">delete</v-icon>
          </td>
          <td v-for="values in props.item" :key="values.id">
              {{ values }}
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary">Reset</v-btn>
        </template>
      </v-data-table>
      <!-- END: table -->
      <!-- START: dialog box model code -->
      <v-dialog
        v-model="itemMasterModel"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="itemMasterModel = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="updateItemMasterData()">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
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
                            <label for="">{{`${preFix} Item Type: `}}</label><span class="mandatoryStar">*</span>
                            <b-form-select v-model="editedItems[staticFields[7]]" :options="itemTypeList"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validitemType() && itemTypeBlured}"
                            v-on:blur="itemTypeBlured = true"
                            aria-describedby="itemTypeLiveFeedback"
                            value-field= "itemTypeID" text-field="itemTypeName" />
                             <b-form-invalid-feedback id="itemTypeLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="">{{`UOM: `}}</label><span class="mandatoryStar">*</span>
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
                              id="BOMItem"
                              v-model="editedItems[staticFields[9]]"
                            >
                              BOM Item ?
                            </b-form-checkbox>
                          </v-flex>
                          <v-flex xs12 sm8 md8>
                            <b-form-checkbox
                              id="NonSktable"
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
      <!-- START: dialog box model code for adding new Item in Item Master -->
      <v-dialog
        v-model="addItemMasterModel"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="addItemMasterModel = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="">ADD</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-layout row wrap>
            <v-flex xs12>
              <v-expansion-panel popout>
                <v-expansion-panel-content>
                  <div slot="header">ADD Item Master Details</div>
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
                            <b-form-select v-model="addItems[staticFields[6]]" :options="itemTypeList"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validAdditemType() && itemTypeBlured}"
                            v-on:blur="itemTypeBlured = true"
                            aria-describedby="itemTypeLiveFeedback"
                            value-field= "itemTypeID" text-field="itemTypeName" />
                             <b-form-invalid-feedback id="itemTypeLiveFeedback">
                              This field is required
                            </b-form-invalid-feedback>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <label for="">{{`UOM: `}}</label><span class="mandatoryStar">*</span>
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
                      <vue-form-generator :schema="addDynamicFieldSchema" :model="addDynamicFieldModel" :options="formOptions" ></vue-form-generator>
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
      <!-- END: dialog box model code for adding new Item in Item Master -->
    </v-app>
  </div>
</template>
<script>
import httpClient from "@/services/httpClient.js";
import DynamicFieldSchema from '@/DynamicProperty/generateScheme.js'

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
      UOMList: [],
      itemGroupList: [],
      itemTypeList: [],
      dynamicFieldSchema: {
        fields: []
      },
      dynamicFieldModel: {},
      dynamicFieldOptions: {},
      addDynamicFieldSchema: {
        fields: []
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
      addItemMasterModel: false
    }
  },
  beforeMount: function() {
    this.loadItemMaster();
  },
  methods: {
    loadItemMaster: function() {
      const docID = 1114;
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}ItemMaster?docID=${docID}`
      })
      .then((result) => {
        console.log('Response from server', result.data.tableData);
        this.itemMasterDataTable = result.data.tableData;
        this.itemMasterHeadersKey = Object.keys(result.data.tableData[0]);
        this.itemMasterHeadersKey.forEach(element => {
          this.headers.push({ text: element, align: "center", value: element })
        })
      }).catch((err) => {
        console.log('Error!', err);
      });
    },
    editItemMasterData: function(params) {
      console.log('EDit Master Data', params.ITEMID);
      const selectedID = params.ITEMID;
      const docID = 1114;
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}ItemMaster?selectedID=${selectedID}&docID=${docID}`
      })
        .then((result) => {
          console.log('Item Master', result.data);
          const itemMasterData = result.data;
          this.preFix = itemMasterData.prefix;
          this.editedItems = itemMasterData.staticFieldData[0];
          console.log('Edit Items', JSON.stringify(this.editedItems));
          this.staticFields = Object.keys(this.editedItems);
          this.UOMList = itemMasterData.UOMList;
          this.itemGroupList = itemMasterData.itemGroupList;
          this.itemTypeList = itemMasterData.itemType;

          this.dynamicFieldModel = itemMasterData.dynamicFieldModal.modal[0];
          this.dynamicFieldSchema.fields = DynamicFieldSchema(itemMasterData.dynamicFieldModal.fieldProperties, itemMasterData.dynamicFieldModal.modal[0]);

          this.itemMasterModel = true;
        }).catch((err) => {
          console.error('Error', err);
        });
    },
    deleteItemMasterData: function(params) {

    },
    updateItemMasterData: function() {
      const updateParams = {
        docID: localStorage.getItem('menuDocId') || 1121, // Need to remove 1121 value and put 0 apart of this
        userID: localStorage.getItem('userId') || 0,
        staticFields: this.editedItems,
        dynamicFields: this.dynamicFieldModel
      }
      console.log('Update Params', updateParams);
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
      (this.validName() && this.validitemGroup() && this.validitemType() && this.validUOM()) ? true : false;
    },
    validAddUOM: function() {
      if (this.addItems[this.staticFields[7]]) {
        return (this.addItems[this.staticFields[7]].toString()).length >= 1 ? true : false;
      } else { return false; }
    },
    validAdditemType: function() {
      if (this.addItems[this.staticFields[6]]) {
        return (this.addItems[this.staticFields[6]].toString()).length >= 1 ? true : false;
      } else { return false; }
    },
    validitemAddGroup: function() {
      if (this.addItems[this.staticFields[3]]) {
        return (this.addItems[this.staticFields[3]].toString()).length >= 1 ? true : false;
      } else { return false; }
    },
    validAddName: function() {
      if (this.addItems[this.staticFields[1]]) {
        return (this.addItems[this.staticFields[1]].toString()).length >= 1 ? true : false;
      } else { return false; }
    },
    validAddCode: function() {
      if (this.addItems[this.staticFields[0]]) {
        return (this.addItems[this.staticFields[0]].toString()).length >= 1 ? true : false;
      } else { return false; }
    },
    addItemInItemMaster: function() {
      const docID = localStorage.getItem('menuDocId') || 0;
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}ItemMaster?docID=${docID}&type=0`
      }).then((result) => {
        console.log('Result', result.data);
        const addItemInItemMaster = result.data;
        this.preFix = addItemInItemMaster.prefix;
        // console.log('this.preFix', this.preFix);
        this.addItems = addItemInItemMaster.staticFieldData;
        console.log('this.addItems', JSON.stringify(this.addItems));
        this.staticFields = Object.keys(this.addItems);
        // console.log('this.staticFields', this.staticFields);
        this.UOMList = addItemInItemMaster.UOMList;
        // console.log('UOM LIST', this.UOMList);
        this.addDynamicFieldModel = addItemInItemMaster.dynamicFieldModal.modal;
        this.addDynamicFieldSchema.fields = DynamicFieldSchema(addItemInItemMaster.dynamicFieldModal.fieldProperties, addItemInItemMaster.dynamicFieldModal.modal[0]);
        this.addItemMasterModel = true;
      }).catch((err) => {
        console.error('Error Occured', err);
      });
    }
  }
}
</script>
<style scoped>
.custom-checkbox{
  top: 0px!important;
}
</style>
