<template>
  <div id="app">
    <v-app id="inspire">
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
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md4>
                            <!-- <v-text-field
                              v-model="editedItems[staticFields[1]]"
                              :label="`${preFix} Code:`"
                              required
                            ></v-text-field> -->
                            <label for="code">{{`${preFix} Code: *`}}</label>
                            <b-form-input id="code" v-model="editedItems[staticFields[1]]" type="text" :placeholder="`${preFix} Code: *`" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <!-- <v-text-field
                              v-model="editedItems[staticFields[2]]"
                              :label="`${preFix} Name:`"
                              required
                            ></v-text-field> -->
                            <label for="code">{{`${preFix} Name: *`}}</label>
                            <b-form-input id="code" v-model="editedItems[staticFields[2]]" type="text" :placeholder="`${preFix} Name: *`" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <!-- <v-text-field
                              v-model="editedItems[staticFields[3]]"
                              :label="`${preFix} Desc:`"
                              required
                            ></v-text-field> -->
                            <label for="code">{{`${preFix} Desc: *`}}</label>
                            <b-form-input id="code" v-model="editedItems[staticFields[3]]" type="text" :placeholder="`${preFix} Desc: *`" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <!-- <v-select
                              v-model="editedItems[staticFields[4]]"
                              menu-props="auto"
                              :items="itemGroupList"
                              item-text="itemGroupCode"
                              item-value="itemGroupID"
                              :label="`${preFix} Group Id:`"
                            ></v-select> -->
                            <label for="">{{`${preFix} Group Id:`}}</label>
                            <b-form-select v-model="editedItems[staticFields[4]]" :options="itemGroupList" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <!-- <v-text-field
                              v-model="editedItems[staticFields[5]]"
                              :label="`Tally Alias:`"
                              required
                            ></v-text-field> -->
                            <label for="">{{`Tally Alias:`}}</label>
                            <b-form-input id="code" v-model="editedItems[staticFields[5]]" type="text" :placeholder="`Tally Alias:`" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <!-- <v-text-field
                              v-model="editedItems[staticFields[6]]"
                              label="HSN Code:"
                              required
                            ></v-text-field> -->
                            <label for="">{{`HSN Code:`}}</label>
                            <b-form-input id="code" v-model="editedItems[staticFields[6]]" type="text" :placeholder="`HSN Code:`" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <!-- <v-select
                              v-model="editedItems[staticFields[7]]"
                              menu-props="auto"
                              :items="itemTypeList"
                              item-text="itemTypeName"
                              item-value="itemTypeID"
                              label="Item Type"
                            ></v-select> -->
                            <label for="">{{`${preFix} Item Type:`}}</label>
                            <b-form-select v-model="editedItems[staticFields[7]]" :options="itemTypeList" />
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <!-- <v-select
                              v-model="editedItems[staticFields[8]]"
                              menu-props="auto"
                              :items="UOMList"
                              item-text="UOMCode"
                              item-value="UOMID"
                            ></v-select> -->
                            <label for="">{{`UOM ID`}}</label>
                            <b-form-select v-model="editedItems[staticFields[7]]" :options="UOMList" />
                          </v-flex>
                          <v-layout wrap>
                            <v-flex xs12 sm6 md3>
                            <!-- <v-checkbox v-model="editedItems[staticFields[9]]" label="BOM Item ?"></v-checkbox> -->
                            <b-form-checkbox
                              id="checkbox1"
                              v-model="editedItems[staticFields[9]]"
                            >
                              BOM Item ?
                            </b-form-checkbox>
                          </v-flex>
                          <v-flex xs12 sm6 md3>
                            <!-- <v-checkbox v-model="editedItems[staticFields[10]]" label="NonStkable ?"></v-checkbox> -->
                            <b-form-checkbox
                              id="checkbox1"
                              v-model="editedItems[staticFields[10]]"
                            >
                              NonStkable ?
                            </b-form-checkbox>
                          </v-flex>
                          <v-flex xs12 sm6 md3>
                             <!-- <v-checkbox v-model="editedItems[staticFields[11]]" label="inActive ?"></v-checkbox> -->
                             <b-form-checkbox
                              id="checkbox1"
                              v-model="editedItems[staticFields[11]]"
                            >
                              inActive ?
                            </b-form-checkbox>
                          </v-flex>
                          <v-flex xs12 sm6 md3>
                            <!-- <v-checkbox v-model="editedItems[staticFields[12]]" label="is Authorized ?"></v-checkbox> -->
                            <b-form-checkbox
                              id="checkbox1"
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
                      <vue-form-generator :schema="dynamicFieldSchema" :model="dynamicFieldModel"></vue-form-generator>
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
    }
  }
}
</script>
<style>

</style>
