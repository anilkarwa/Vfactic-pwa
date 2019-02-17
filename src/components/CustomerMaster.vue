<template>
  <div id="app">
    <v-app id="inspire">
      <!-- START: Code for Customer master dataTable -->
      <v-data-table :headers="headers" :items="customerMasterList" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="EditCustomerMaster(props.item)">edit</v-icon>
            <v-icon small @click="DeleteRequest(props.item)">delete</v-icon>
          </td>
          <td>{{ props.item.customerMasterID }}</td>
          <td>{{ props.item.customerMasterCode }}</td>
          <td>{{ props.item.customerMasterName }}</td>
          <td>{{ props.item.tallyAlias }}</td>
          <td>{{ props.item.inActive }}</td>
          <td>{{ props.item.customerGroupID }}</td>
          <td>{{ props.item.addressLine1 }}{{ props.item.addressLine2 }}{{ props.item.addressLine3 }}{{ props.item.addressLine4 }}{{ props.item.city }}{{ props.item.state }}{{ props.item.country }}{{ props.item.pincode }}</td>
          <td>{{ props.item.Authorised }}</td>
        </template>
        <template slot="no-data">
          <v-btn color="primary">Reset</v-btn>
        </template>
      </v-data-table>
      <!-- END: Code for Customer master dataTable -->
      <!-- START: dialog box model code -->
      <v-dialog
        v-model="customerMasterDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="customerMasterDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit Customer Master</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="UpdateCustomerMaster()">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-layout row wrap>
            <v-flex xs12>
              <v-expansion-panel popout>
                <v-expansion-panel-content>
                  <div slot="header">Customer Master Details</div>
                  <v-card>
                    <v-card-text>
                      <!-- START: Supplier detail form code -->
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.customerMasterID"
                              label="Customer Master ID:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.customerMasterCode"
                              label="Customer Master Code"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.customerMasterName"
                              label="Customer Master Name"
                              required
                            ></v-text-field>
                            <!-- <v-select
                              v-model="editedItem.customerMasterName"
                              menu-props="auto"
                              :items="supplierGroupIdList"
                              item-text="supplierGroupName"
                              item-value="supplierGroupID"
                            ></v-select> -->
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.tallyAlias"
                              label="Tally Alias"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-select
                              v-model="editedItem.customerGroupID"
                              menu-props="auto"
                              :items="customerGroupIdList"
                              item-text="customerGroupName"
                              item-value="customerGroupID"
                            ></v-select>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.addressLine1"
                              label="Address Line 1:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.addressLine2"
                              label="Address Line 2:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.addressLine3"
                              label="Address Line 3:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.addressLine4"
                              label="Address Line 4:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.city"
                              label="City:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.state"
                              label="State:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.country"
                              label="Country:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.pincode"
                              label="Pin Code:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-checkbox v-model="editedItem.inActive" label="In Active ?"></v-checkbox>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-checkbox v-model="editedItem.Authorised" label="Is Authorised ?"></v-checkbox>
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
            <!-- START: warning model dialog box -->
      <v-dialog v-model="warningDialog" max-width="290" justify-center align-center>
        <v-card>
          <v-card-title class="headline">Delete Customer ?</v-card-title>

          <v-card-text>Are you sure? you wanna delete this customer.<br> <b>Customer Name: </b> <span style="color: red">{{ deleteItem.customerName }}</span> </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" flat="flat" @click="warningDialog = false">No</v-btn>

            <v-btn color="green darken-1" flat="flat" @click="DeleteCustomerMaster()">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- END: warning model dialog box -->
      <!-- START: Code for snackBar -->
      <v-snackbar v-model="snackbar" :color="snackbarColor">
        {{ snackbarText }}
        <v-btn dark flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <!-- END: Code for snackBar -->
    </v-app>
  </div>
</template>
<script>
import httpClient from "@/services/httpClient.js";

export default {
  name: 'CustomerMaster',
  data: function() {
    return {
      headers: [
        { text: "Edit", align: "center" },
        { text: "customer Master ID", align: "center", value: "customerMasterID" },
        { text: "customer Master Code", align: "center", value: "customerMasterCode" },
        { text: "customer Master Name", align: "center", value: "customerMasterName" },
        { text: "Tally Alias", align: "center", value: "tallyAlias" },
        { text: "In Active", align: "center", value: "inActive" },
        { text: "customer Group ID", align: "center", value: "customerGroupID" },
        { text: "Address", align: "center", value: "Address" },
        { text: "Authorised", align: "center", value: "Authorised" }
      ],
      customerMasterList: [],
      customerMasterDialog: false,
      editedItem: {
        customerMasterID: '',
        customerMasterCode: '',
        customerMasterName: '',
        tallyAlias: '',
        inActive: '',
        customerGroupID: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        addressLine4: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        Authorised: ''
      },
      dynamicFieldSchema: {
        fields: []
      },
      dynamicFieldModel: {},
      dynamicFormOption: {},
      deleteItem: {
        customerID: null,
        customerName: ''
      },
      warningDialog: false,
      snackbar: false,
      snackbarColor: '',
      snackbarText: '',
      customerGroupIdList: []
    }
  },
  beforeMount: function() {
    this.fetchCustomerMaster();
  },
  methods: {
    fetchCustomerMaster: function() {
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}CustomerMaster`
      }).then((result) => {
        console.log('Response from server', result);
        this.customerMasterList = result.data;
      }).catch((err) => {
        console.error('Opps! Error Occured', err);
      });
    },
    EditCustomerMaster: function(customerMasterData) {
      console.log('Edit request', customerMasterData);
      const customerID = customerMasterData.customerMasterID;
      const docID = localStorage.getItem('menuDocId');
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}CustomerMaster?customerID=${customerID}&docID=${docID}`
      }).then((result) => {
        console.log('Response from server', result);
        const customerData = result.data.customerDetails[0];
        const customerDynamicFields = result.data.dynamiFields;
        const customergroupDropDown = result.data.customerGroupMaster;
        this.customerGroupIdList = customergroupDropDown;
        console.log('customerData', customerData);
        this.editedItem.customerMasterID = customerData.customerMasterID
        this.editedItem.customerMasterCode = customerData.customerMasterCode
        this.editedItem.customerMasterName = customerData.customerMasterName
        this.editedItem.tallyAlias = customerData.tallyAlias
        this.editedItem.inActive = customerData.inActive
        this.editedItem.customerGroupID = customergroupDropDown.find(value => value.customerGroupName == customerData.customerGroupID)
        this.editedItem.addressLine1 = customerData.addressLine1
        this.editedItem.addressLine2 = customerData.addressLine2
        this.editedItem.addressLine3 = customerData.addressLine3
        this.editedItem.addressLine4 = customerData.addressLine4
        this.editedItem.city = customerData.city
        this.editedItem.state = customerData.state
        this.editedItem.country = customerData.country
        this.editedItem.pincode = customerData.pincode
        this.editedItem.Authorised = customerData.Authorised
        this.dynamicFieldModel = customerDynamicFields.modal[0];
        console.log('this.dynamicFieldModel', this.dynamicFieldModel);
        this.dynamicFieldSchema.fields = customerDynamicFields.fieldProperties;
        console.log('this.dynamicFieldSchema', this.dynamicFieldSchema);
        this.customerMasterDialog = true;
      }).catch((err) => {
        console.error('Opps! Error Occured', err);
      });
    },
    UpdateCustomerMaster: function() {
      console.log('Update Request......');
      console.log('Static Field', this.editedItem);
      console.log('Dyanmic Field', this.dynamicFieldModel);
      const updateParam = {
        dynamicFieldModal: this.dynamicFieldModel,
        fixedFieldModal: this.editedItem
      }
      httpClient({
        method: 'PUT',
        url: `${process.env.VUE_APP_API_BASE}CustomerMaster`,
        data: updateParam
      }).then((result) => {
        console.log('Response of Update Customer data', result);
        this.fetchCustomerMaster();
        this.snackbarColor = 'green';
        this.snackbarText = 'Customer updated successfully!';
        this.snackbar = true;
      }).catch((err) => {
        console.error('Opps! Error Occured', err);
      });
    },
    DeleteRequest: function(requestData) {
      this.deleteItem.customerID = requestData.customerMasterID;
      this.deleteItem.customerName = requestData.customerMasterName;
      console.log('this.deleteItem.customerID', this.deleteItem.customerID);
      this.warningDialog = true;
    },
    DeleteCustomerMaster: function() {
      const customerMasterID = this.deleteItem.customerID;
      httpClient({
        method: 'DELETE',
        url: `${process.env.VUE_APP_API_BASE}CustomerMaster?customerMasterID=${customerMasterID}`,
      }).then((result) => {
        console.log('Response of Delete Customer Details', result);
        this.fetchCustomerMaster();
        this.warningDialog = false;
        this.snackbarColor = 'green';
        this.snackbarText = 'Customer Deleted Successfully!';
        this.snackbar = true;
      }).catch((err) => {
        console.error('Opps! Error Occured', err);
        this.warningDialog = false;
        this.snackbarColor = 'red';
        this.snackbarText = 'Opps! Error Occured, please try again';
        this.snackbar = true;
      });
    }
  }
}
</script>
<style>

</style>
