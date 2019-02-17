<template>
  <div id="app">
    <v-app id="inspire">
     <!-- START: Code for Supplier Group Master Table data -->
      <v-data-table :headers="headers" :items="supplierGroupMasterList" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="EditSupplierGroupMaster(props.item)">edit</v-icon>
            <v-icon small @click="DeleteRequest(props.item)">delete</v-icon>
          </td>
          <td>{{ props.item.supplierGroupCode }}</td>
          <td>{{ props.item.supplierGroupName }}</td>
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
     <!-- END: Code for Supplier Group Master Table data -->
     <!-- START: dialog box model code -->
      <v-dialog
        v-model="supplierGroupMasterDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="supplierGroupMasterDialog = false">
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
                              v-model="editedItem.supplierGroupCode"
                              label="Supplier Group Code:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.supplierGroupName"
                              label="Supplier Group Name:"
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
          <v-card-title class="headline">Delete Supplier Group Master ?</v-card-title>

          <v-card-text>Are you sure? you wanna delete this supplier group master. <br>
          Supplier Group Master Name: <span style="color: red">{{ deleteItem.SupplierGroupMasterName }}</span>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" flat="flat" @click="warningDialog = false">No</v-btn>

            <v-btn color="green darken-1" flat="flat" @click="DeleteSupplierGroupMaster()">Yes</v-btn>
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
  name: 'SupplierGroupMaster',
  data: function() {
    return {
      headers: [
        { text: "Edit", align: "center" },
        { text: "supplierGroupID", align: "center", value: "supplierGroupID" },
        { text: "supplierGroupCode", align: "center", value: "supplierGroupCode" },
        { text: "supplierGroupName", align: "center", value: "supplierGroupName" },
        { text: "inActive", align: "center", value: "inActive" },
        { text: "addedBy", align: "center", value: "addedBy" },
        { text: "addedOn", align: "center", value: "addedOn" },
        { text: "changeOn", align: "center", value: "changeOn" },
        { text: "changedBy", align: "center", value: "changedBy" },
        { text: "Authorised", align: "center", value: "Authorised" },
      ],
      supplierGroupMasterList: [],
      supplierGroupMasterDialog: false,
      editedItem: {
        supplierGroupID: '',
        supplierGroupCode: '',
        supplierGroupName: '',
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
      deleteItem: {
        SupplierGroupMasterId: null,
        SupplierGroupMasterName: ''
      },
      warningDialog: false
    }
  },
  beforeMount: function() {
    this.fetchSupplierGroupMaster();
  },
  methods: {
    fetchSupplierGroupMaster: function() {
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}SupplierGroupMaster`
      }).then((result) => {
        console.log('Response from server', result);
        this.supplierGroupMasterList = result.data;
      }).catch((err) => {
        console.error('Error Occured', err);
      });
    },
    EditSupplierGroupMaster: function(SupplierGroupMasterData) {
      console.log('Edit request', SupplierGroupMasterData);
      const supplierGroupID = SupplierGroupMasterData.supplierGroupID;
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}SupplierGroupMaster?supplierGroupID=${supplierGroupID}`
      }).then((result) => {
        console.log('Response from server', result);
        const supplierGroupData = result.data[0];
        console.log('supplierGroupData', supplierGroupData);
        this.editedItem.supplierGroupID = supplierGroupData.supplierGroupID;
        this.editedItem.supplierGroupCode = supplierGroupData.supplierGroupCode;
        this.editedItem.supplierGroupName = supplierGroupData.supplierGroupName;
        this.editedItem.inActive = supplierGroupData.inActive;
        this.editedItem.addedBy = supplierGroupData.addedBy;
        this.editedItem.addedOn = supplierGroupData.addedOn;
        this.editedItem.changeOn = supplierGroupData.changeOn;
        this.editedItem.changedBy = supplierGroupData.changedBy;
        this.editedItem.Authorised = supplierGroupData.Authorised;
      }).catch((err) => {
        console.error('Error Occur', err);
      });
      this.supplierGroupMasterDialog = true;
    },
    UpdateSupplierGroupMaster: function() {
      console.log('Update Request', this.editedItem);
      const updateParam = this.editedItem;
      httpClient({
        method: 'PUT',
        url: `${process.env.VUE_APP_API_BASE}SupplierGroupMaster`,
        data: updateParam
      }).then((result) => {
        console.log('update Request response', result);
        this.snackbarColor = 'green',
        this.snackbarText = 'Supplier Group Master updated Successfully!'
        this.snackbar = true;
      }).catch((err) => {
        this.snackbarColor = 'red',
        this.snackbarText = 'Opps! Error occured, please try again after sometime.'
        this.snackbar = true;
      });
    },
    DeleteRequest: function(SupplierGroupMasterData) {
      this.deleteItem.SupplierGroupMasterId = SupplierGroupMasterData.supplierGroupID;
      this.deleteItem.SupplierGroupMasterName = SupplierGroupMasterData.supplierGroupName;
      this.warningDialog = true;
    },
    DeleteSupplierGroupMaster: function() {
      const supplierGroupID = this.deleteItem.SupplierGroupMasterId;
      httpClient({
        method: 'DELETE',
        url: `${process.env.VUE_APP_API_BASE}SupplierGroupMaster?supplierGroupID=${supplierGroupID}`,
      }).then((result) => {
        console.log('Response of delete Request', result);
        this.warningDialog = true;
        this.snackbarColor = 'green',
        this.snackbarText = 'Supplier Group Master Deleted Successfully!'
        this.snackbar = true;
      }).catch((err) => {
        this.warningDialog = true;
        this.snackbarColor = 'red',
        this.snackbarText = 'Opps! Error occured, please try again after sometime.'
        this.snackbar = true;
      });
    }
  }
}
</script>
<style>

</style>
