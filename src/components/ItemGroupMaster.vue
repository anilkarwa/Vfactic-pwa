<template>
  <div id="app">
    <v-app id="inspire">
      <!-- START: Code for Item Group Master DataTable -->
      <v-data-table :headers="headers" :items="itemGroupMasterList" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="EditItemGroupMaster(props.item)">edit</v-icon>
            <v-icon small @click="DeleteRequest(props.item)">delete</v-icon>
          </td>
          <td>{{ props.item.itemGroupCode }}</td>
          <td>{{ props.item.itemGroupName }}</td>
          <td>{{ props.item.inActive }}</td>
          <td>{{ props.item.addedBy }}</td>
          <td>{{ props.item.addedOn }}</td>
          <td>{{ props.item.changeOn }}</td>
          <td>{{ props.item.changedBy }}</td>
          <td>{{ props.item.Authorised }}</td>
        </template>
        <template slot="no-data">
          <v-btn color="primary">Reset</v-btn>
        </template>
      </v-data-table>
      <!-- END: Code for Item Group Master DataTable -->
      <!-- START: dialog box model code -->
      <v-dialog
        v-model="itemGroupMasterDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="itemGroupMasterDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit supplier Group Master</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="UpdateSupplierGroupMaster()">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-layout row wrap>
            <v-flex xs12>
              <v-expansion-panel popout>
                <v-expansion-panel-content>
                  <div slot="header">supplier Group Master Details</div>
                  <v-card>
                    <v-card-text>
                      <!-- START: UOM master detail -->
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.itemGroupCode"
                              label="Item Group Code:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.itemGroupName"
                              label="Item Group Name:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.addedBy"
                              label="Added By:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.addedOn"
                              label="Added On:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.changeOn"
                              label="Change On:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.changedBy"
                              label="Change By:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-checkbox v-model="editedItem.inActive" label="in Active ?"></v-checkbox>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-checkbox v-model="editedItem.Authorised" label="is Authorised ?"></v-checkbox>
                          </v-flex>
                          <!-- </v-form> -->
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
      <!-- START: Code for snackBar -->
      <v-snackbar v-model="snackbar" :color="snackbarColor">
        {{ snackbarText }}
        <v-btn dark flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <!-- END: Code for snackBar -->
      <!-- START: warning model dialog box -->
      <v-dialog v-model="warningDialog" max-width="290" justify-center align-center>
        <v-card>
          <v-card-title class="headline">Delete Item Group Master ?</v-card-title>

          <v-card-text>Are you sure? you wanna delete this Item Group Master. <br>
          <b>Item Group Master:</b> <span style="color: red">{{ deleteItem.itemGroupName }}</span>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" flat="flat" @click="warningDialog = false">No</v-btn>

            <v-btn color="green darken-1" flat="flat" @click="DeleteItemGroupMaster()">Yes</v-btn>
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
  name: 'ItemGroupMaster',
  data: function() {
    return {
      headers: [
        { text: "Edit", align: "center" },
        { text: "itemGroupID", align: "center", value: "itemGroupID" },
        { text: "itemGroupCode", align: "center", value: "itemGroupCode" },
        { text: "itemGroupName", align: "center", value: "itemGroupName" },
        { text: "inActive", align: "center", value: "inActive" },
        { text: "addedBy", align: "center", value: "addedBy" },
        { text: "addedOn", align: "center", value: "addedOn" },
        { text: "changeOn", align: "center", value: "changeOn" },
        { text: "changedBy", align: "center", value: "changedBy" },
        { text: "Authorised", align: "center", value: "Authorised" },
      ],
      itemGroupMasterList: [],
      itemGroupMasterDialog: false,
      editedItem: {
        itemGroupID: '',
        itemGroupCode: '',
        itemGroupName: '',
        inActive: null,
        addedBy: '',
        addedOn: '',
        changeOn: '',
        changedBy: '',
        Authorised: null
      },
      snackbar: false,
      snackbarColor: '',
      snackbarText: '',
      warningDialog: false,
      deleteItem: {
        itemGroupId: null,
        itemGroupName: ''
      }
    }
  },
  beforeMount: function() {
    this.fetchItemGroupMaster();
  },
  methods: {
    fetchItemGroupMaster: function() {
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}ItemGroupMaster`
      }).then((result) => {
        console.log('Response from server', result);
        this.itemGroupMasterList = result.data;
      }).catch((err) => {
        console.error('OOPS! error occured', err);
      });
    },
    EditItemGroupMaster: function(itemGroupMasterData) {
      console.log('Edit Requesting...', itemGroupMasterData);
      const itemGroupid = itemGroupMasterData.itemGroupID;
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}ItemGroupMaster?itemGroupID=${itemGroupid}`
      }).then((result) => {
        console.log('Response from server', result.data);
        const ItemGroupData = result.data;
        this.editedItem.itemGroupID = ItemGroupData.itemGroupID;
        this.editedItem.itemGroupCode = ItemGroupData.itemGroupCode;
        this.editedItem.itemGroupName = ItemGroupData.itemGroupName;
        this.editedItem.inActive = ItemGroupData.inActive;
        this.editedItem.addedBy = ItemGroupData.addedBy;
        this.editedItem.addedOn = ItemGroupData.addedOn;
        this.editedItem.changeOn = ItemGroupData.changeOn;
        this.editedItem.changedBy = ItemGroupData.changedBy;
        this.editedItem.Authorised = ItemGroupData.Authorised;
        this.itemGroupMasterDialog = true;
      }).catch((err) => {
        console.error('OOPS! Error occured', err);
      });
    },
    UpdateSupplierGroupMaster: function() {
      const updateParam = this.editedItem;
      console.log('Update Request', updateParam);
      httpClient({
        method: 'PUT',
        url: `${process.env.VUE_APP_API_BASE}ItemGroupMaster`,
        data: updateParam
      }).then((result) => {
        console.log('Update Response from server', result);
        this.snackbarColor = 'green';
        this.snackbarText = 'Item Group Master updated Successfully!';
        this.snackbar = true;
      }).catch((err) => {
        console.error('Opps! Error Occured', err);
        this.snackbarColor = 'red';
        this.snackbarText = 'Opps! Error Occured, please try again after some time';
        this.snackbar = true;
      });
    },
    DeleteRequest: function(itemGroupMasterData) {
      console.log('Delete Requesting...', itemGroupMasterData);
      this.deleteItem.itemGroupId = itemGroupMasterData.itemGroupID;
      this.deleteItem.itemGroupName = itemGroupMasterData.itemGroupName;
      this.warningDialog = true;
    },
    DeleteItemGroupMaster: function() {
      const itemGroupID = this.deleteItem.itemGroupId;
      httpClient({
        method: 'DELETE',
        url: `${process.env.VUE_APP_API_BASE}ItemGroupMaster?itemGroupID=${itemGroupID}`,
      }).then((result) => {
        console.log('Response of delete Item', result);
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
    }
  }
}
</script>
<style>

</style>
