<template>
  <div id="app">
    <v-app id="inspire">
      <!-- START: table -->
      <v-data-table :headers="headers" :items="itemMasterList" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="EditItemRequest(props.item)">edit</v-icon>
            <v-icon small @click="DeleteItemRequest(props.item)">delete</v-icon>
          </td>
          <td>{{ props.item.itemID }}</td>
          <td>{{ props.item.itemCode }}</td>
          <td>{{ props.item.itemName }}</td>
          <td>{{ props.item.tallyAlias }}</td>
          <td>{{ props.item.itemDescription }}</td>
          <td>{{ props.item.HSNCode }}</td>
          <td>{{ props.item.itemGroupID }}</td>
          <td>{{ props.item.itemType }}</td>
          <td>{{ props.item.BOMItem }}</td>
          <td>{{ props.item.NonStkable }}</td>
          <td>{{ props.item.inActive }}</td>
          <td>{{ props.item.UOMID }}</td>
          <td>{{ props.item.Authorized }}</td>
        </template>
        <template slot="no-data">
          <v-btn color="primary">Reset</v-btn>
        </template>
      </v-data-table>
      <!-- END: table -->
      <!-- START: dialog box model code -->
      <v-dialog
        v-model="itemMasterDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="itemMasterDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="UpdateItemMaster()">Save</v-btn>
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
                            <v-text-field
                              v-model="editedItem.itemID"
                              label="Item ID:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.itemCode"
                              label="Item Code:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.itemName"
                              label="Item Name"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.tallyAlias"
                              label="Tally Alias"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.itemDescription"
                              label="Item Description"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.HSNCode"
                              label="HSN Code:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-select
                              v-model="editedItem.itemGroupID"
                              menu-props="auto"
                              :items="itemGroupIdList"
                              item-text="itemGroupCode"
                              item-value="itemGroupID"
                            ></v-select>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.itemType"
                              label="Item type:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-select
                              v-model="editedItem.UOMID"
                              menu-props="auto"
                              :items="UOMIDList"
                              item-text="UOMCode"
                              item-value="UOMID"
                            ></v-select>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-checkbox v-model="editedItem.BOMItem" label="BOM Item ?"></v-checkbox>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-checkbox v-model="editedItem.NonStkable" label="NonStkable ?"></v-checkbox>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                             <v-checkbox v-model="editedItem.inActive" label="inActive ?"></v-checkbox>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-checkbox v-model="editedItem.Authorized" label="is Authorized ?"></v-checkbox>
                          </v-flex>
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
      <!-- START: Code for snackBar -->
      <v-snackbar v-model="snackbar" :color="snackbarColor">
        {{ snackbarText }}
        <v-btn dark flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <!-- END: Code for snackBar -->
      <!-- START: warning model dialog box -->
      <v-dialog v-model="warningDialog" max-width="290" justify-center align-center>
        <v-card>
          <v-card-title class="headline">Delete Item Master ?</v-card-title>

          <v-card-text>Are you sure? you wanna delete this Item Master. <br>
          <b>Item Group Master: </b> <span style="color: red">{{ deleteItem.itemMasterName }}</span>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" flat="flat" @click="warningDialog = false">No</v-btn>

            <v-btn color="green darken-1" flat="flat" @click="DeleteItemMaster()">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- END: warning model dialog box -->
    </v-app>
  </div>
</template>
<script>
import httpClient from "@/services/httpClient.js";

export default {
  name: 'ItemMaster',
  data: function() {
    return {
      headers: [
        { text: "Edit", align: "center" },
        { text: "itemID", align: "center", value: "itemID" },
        { text: "itemCode", align: "center", value: "itemCode" },
        { text: "itemName", align: "center", value: "itemName" },
        { text: "tallyAlias", align: "center", value: "tallyAlias" },
        { text: "itemDescription", align: "center", value: "itemDescription" },
        { text: "HSNCode", align: "center", value: "HSNCode" },
        { text: "itemGroupID", align: "center", value: "itemGroupID" },
        { text: "itemType", align: "center", value: "itemType" },
        { text: "BOMItem", align: "center", value: "BOMItem" },
        { text: "NonStkable", align: "center", value: "NonStkable" },
        { text: "inActive", align: "center", value: "inActive" },
        { text: "UOMID", align: "center", value: "UOMID" },
        { text: "Authorized", align: "center", value: "Authorized" }
      ],
      itemMasterList: [],
      editedItem: {
        itemID: '',
        itemCode: '',
        itemName: '',
        tallyAlias: '',
        itemDescription: '',
        HSNCode: '',
        itemGroupID: '',
        itemType: '',
        BOMItem: null,
        NonStkable: null,
        inActive: null,
        UOMID: '',
        Authorized: null
      },
      itemMasterDialog: false,
      dynamicFieldSchema: {
        fields: []
      },
      dynamicFieldModel: {},
      dynamicFormOption: {},
      itemGroupIdList: [],
      UOMIDList: [],
      snackbar: false,
      snackbarColor: '',
      snackbarText: '',
      warningDialog: false,
      deleteItem: {
        itemMasterId: null,
        itemMasterName: ''
      }
    }
  },
  beforeMount: function() {
    this.fetchItemMaster();
  },
  methods: {
    fetchItemMaster: function() {
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}ItemMaster`
      }).then(res => {
        this.itemMasterList = res.data;
      })
    },
    EditItemRequest: function(itemData) {
      console.log('itemData for Edition', itemData);
      const ItemMasterId = itemData.itemID;
      const docID = localStorage.getItem('menuDocId');
        httpClient({
          method: 'GET',
          url: `${process.env.VUE_APP_API_BASE}ItemMaster?ItemMasterID=${ItemMasterId}&docID=${docID}`
        }).then((res) => {
          console.log('Response from server', res);
          this.itemGroupIdList = res.data.itemGroupList;
          this.UOMIDList = res.data.UOMList;
          const dynamicFielddata = res.data.dynamiFields;
          console.log('dynamicFielddata', dynamicFielddata);
          const itemMasterStaticData = res.data.itemMasterDetails;
          this.editedItem.itemID = itemMasterStaticData.itemID;
          this.editedItem.itemCode = itemMasterStaticData.itemCode;
          this.editedItem.itemName = itemMasterStaticData.itemName;
          this.editedItem.tallyAlias = itemMasterStaticData.tallyAlias;
          this.editedItem.itemDescription = itemMasterStaticData.itemDescription;
          this.editedItem.HSNCode = itemMasterStaticData.HSNCode;
          // this.editedItem.itemGroupID = itemMasterStaticData.itemGroupID;
          this.editedItem.itemGroupID = this.itemGroupIdList.find(value => value.itemGroupID == itemMasterStaticData.itemGroupID);
          this.editedItem.itemType = itemMasterStaticData.itemType;
          this.editedItem.BOMItem = itemMasterStaticData.BOMItem;
          this.editedItem.NonStkable = itemMasterStaticData.NonStkable;
          this.editedItem.inActive = itemMasterStaticData.inActive;
          this.editedItem.UOMID = this.UOMIDList.find(value => value.UOMID == itemMasterStaticData.UOMID);
          this.editedItem.Authorized = itemMasterStaticData.Authorized;

          this.dynamicFieldModel = dynamicFielddata.modal[0];
          console.log(' this.dynamicFieldModel',  this.dynamicFieldModel);
          this.dynamicFieldSchema.fields = dynamicFielddata.fieldProperties;
          console.log(' this.dynamicFieldModel',  this.dynamicFieldSchema);
        });

        this.itemMasterDialog = true;
    },
   DeleteItemRequest: function(ItemMasterData) {
      console.log('Delete request', ItemMasterData);
      this.deleteItem.itemMasterId = ItemMasterData.itemID;
      this.deleteItem.itemMasterName = ItemMasterData.itemName;
      this.warningDialog = true
    },
    DeleteItemMaster: function(itemData) {
      const itemID = this.deleteItem.itemMasterId;
      httpClient({
        method: 'DELETE',
        url: `${process.env.VUE_APP_API_BASE}ItemMaster?itemID=${itemID}`
      }).then((result) => {
        this.fetchItemMaster();
        this.warningDialog = false;
        this.snackbarColor = 'green';
        this.snackbarText = 'Item Group Master deleted Successfully!';
        this.snackbar = true;
      }).catch((err) => {
        console.error('Opps! Error Occured', err);
        this.warningDialog = false;
        this.snackbarColor = 'red';
        this.snackbarText = 'Opps! Error Occured, please try again after some time';
        this.snackbar = true;
      });
    },
    UpdateItemMaster: function() {
      this.editedItem.UOMID = this.editedItem.UOMID.UOMID
      this.editedItem.itemGroupID = this.editedItem.itemGroupID.itemGroupID
      console.log('Update request: static', this.editedItem)
      console.log('Update request: Dynamic', this.dynamicFieldModel)
      const updateParam = {
        fixedFieldModal: this.editedItem,
        dynamicFieldModal: this.dynamicFieldModel
      }
      console.log('Update Params', updateParam);
      httpClient({
        method: 'PUT',
        url: `${process.env.VUE_APP_API_BASE}ItemMaster`,
        data: updateParam
      }).then((result) => {
        console.log('Update response from server', result);
        this.fetchItemMaster();
        this.snackbarColor = 'green';
        this.snackbarText = 'Item Group Master updated Successfully!';
        this.snackbar = true;
      }).catch((err) => {
        console.error('Opps! Error Occured', err);
        this.snackbarColor = 'red';
        this.snackbarText = 'Opps! Error Occured, please try again after some time';
        this.snackbar = true;
      });
    }
  }
}
</script>
<style>

</style>

