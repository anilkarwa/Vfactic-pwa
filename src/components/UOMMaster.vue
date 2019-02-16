<template>
  <div id="app">
    <v-app id="inspire">
      <!-- START: Code for UOM master LIST -->
      <v-data-table :headers="headers" :items="UOMMasterList" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="EditUOMMaster(props.item)">edit</v-icon>
            <v-icon small @click="DeleteRequest(props.item)">delete</v-icon>
          </td>
          <td>{{ props.item.UOMCode }}</td>
          <td>{{ props.item.UOMName }}</td>
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
      <!-- END: Code for UOM master LIST -->
      <!-- START: dialog box model code -->
      <v-dialog
        v-model="UOMMasterDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="UOMMasterDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit UOM Master</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="UpdateUOMMaster()">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-layout row wrap>
            <v-flex xs12>
              <v-expansion-panel popout>
                <v-expansion-panel-content>
                  <div slot="header">UOM Master Details</div>
                  <v-card>
                    <v-card-text>
                      <!-- START: UOM master detail -->
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.UOMCode"
                              label="UOM Code:"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.UOMName"
                              label="UOM Name:"
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
                              label="Changed By:"
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
          <v-card-title class="headline">Delete UOM Master ?</v-card-title>

          <v-card-text>Are you sure? you wanna delete this UOM. <br> UOM Name: <span style="color: red">{{ deleteItem.UOMName }}</span> </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" flat="flat" @click="warningDialog = false">No</v-btn>

            <v-btn color="green darken-1" flat="flat" @click="DeleteUOMMaster()">Yes</v-btn>
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
  name: 'UOMMaster',
  data: function() {
    return {
      headers: [
        { text: "Edit", align: "center" },
        { text: "UOMID", align: "center", value: "UOMID"},
        { text: "UOMCode", align: "center", value: "UOMCode"},
        { text: "UOMName", align: "center", value: "UOMName"},
        { text: "inActive", align: "center", value: "inActive"},
        { text: "addedBy", align: "center", value: "addedBy"},
        { text: "addedOn", align: "center", value: "addedOn"},
        { text: "changeOn", align: "center", value: "changeOn"},
        { text: "changedBy", align: "center", value: "changedBy"},
        { text: "Authorised", align: "center", value: "Authorised"}
      ],
      UOMMasterList: [],
      UOMMasterDialog: false,
      editedItem: {
        UOMID: '',
        UOMCode: '',
        UOMName: '',
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
        UOMID: 0,
        UOMName: ''
      },
      warningDialog: false
    }
  },
  beforeMount: function() {
    this.fetchUOMMaster();
  },
  methods: {
    fetchUOMMaster: function() {
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}UOMMaster`
      }).then((res) => {
        console.log('Response from server', res);
        this.UOMMasterList = res.data;
      })
    },
    EditUOMMaster: function(UOMData) {
      console.log('UOM Master data', UOMData);
      const UOMID = UOMData.UOMID;
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}UOMMaster?uomID=${UOMID}`
      }).then((res) => {
        console.log('Response ', res);
        const UOMMasterStaticFielddata = res.data;
        this.editedItem.UOMID = UOMMasterStaticFielddata.UOMID
        this.editedItem.UOMCode = UOMMasterStaticFielddata.UOMCode
        this.editedItem.UOMName = UOMMasterStaticFielddata.UOMName
        this.editedItem.inActive = UOMMasterStaticFielddata.inActive
        this.editedItem.addedBy = UOMMasterStaticFielddata.addedBy
        this.editedItem.addedOn = UOMMasterStaticFielddata.addedOn
        this.editedItem.changeOn = UOMMasterStaticFielddata.changeOn
        this.editedItem.changedBy = UOMMasterStaticFielddata.changedBy
        this.editedItem.Authorised = UOMMasterStaticFielddata.Authorised
      });
      this.UOMMasterDialog = true;
    },
    UpdateUOMMaster: function() {
      console.log('this.editedItem', this.editedItem);
      const updateParam = this.editedItem;
      httpClient({
        method: 'PUT',
        url: `${process.env.VUE_APP_API_BASE}UOMMaster`,
        data: updateParam
      }).then((result) => {
        console.log('update response from server', result);
        this.snackbarColor = 'green';
        this.snackbarText =  'UOM updated Successfully';
        this.snackbar = true;
      }).catch((err) => {
        console.error('Error Occured', err);
        this.snackbarColor = 'red';
        this.snackbarText =  'Opps! Error occur, please try again after some time';
        this.snackbar = true;
      });
    },
    DeleteRequest: function(UOMData) {
      console.log('UOM Master data', UOMData);
      this.deleteItem.UOMID = UOMData.UOMID;
      this.deleteItem.UOMName = UOMData.UOMName;
      this.warningDialog = true;
    },
    DeleteUOMMaster: function() {
      const UOMId = this.deleteItem.UOMID;
      httpClient({
        method: 'DELETE',
        url: `${process.env.VUE_APP_API_BASE}UOMMaster?uomID=${UOMId}`
      }).then((result) => {
        console.log('Result of delete request');
        this.snackbarColor = 'green';
        this.snackbarText =  'UOM deleted Successfully';
        this.snackbar = true;
      }).catch((err) => {
        this.snackbarColor = 'red';
        this.snackbarText =  'Opps! Error occur, please try again after some time';
        this.snackbar = true;
      });
    }
  }
}
</script>
<style>

</style>
