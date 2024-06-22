<template>
  <div id="app">
    <v-app id="inspire">
      <div class="text-md-center text-lg-center">
        <v-btn fab dark small color="indigo" @click="addNewItemOpenningBalance"> <v-icon dark>add</v-icon></v-btn>
      </div>
      Add New Record
      <!-- START: Code for Supplier Group Master Table data -->
      <AgGridWrapper :columns="itemTableHeader" :rows="itemTableData" :editRowData="editItemOpenningBalance"
        :deleteConfirmation="deleteGeneralMasterRequest"></AgGridWrapper>
      <!-- <v-data-table :headers="itemTableHeader" :items="itemTableData" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItemOpenningBalance(props.item)">edit</v-icon>
            <v-icon small @click="deleteGeneralMasterRequest(props.item)">delete</v-icon>
          </td>
          <td v-for="values in props.item" :key="values.id">
            {{ values }}
          </td>
        </template>
<template slot="no-data">
          <v-btn color="primary">Reset</v-btn>
        </template>
</v-data-table> -->
      <!-- END: Code for Supplier Group Master Table data -->

      <!-- Edit PartyDoc Transcation Dialog -->
      <v-dialog v-model="addItemOpenningBalanceModal" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar fixed dark color="primary">
            <v-btn icon dark @click="addItemOpenningBalanceModal = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Add Record</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="saveNewItemOpenningBalanceRecord()">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-container class="spaceFromTop" fluid grid-list-xl>
            <v-layout row justify-space-between>
              <v-flex xs12 sm12 md12>
                <v-form ref="NewRecordForm" v-model="addFromValid" lazy-validation>
                  <v-container fluid grid-list-xl>
                    <v-layout row>
                      <v-flex xs12 sm3 md3>
                        <v-select :rules="requiredRules" v-model="itemOpenningData.locationId" :items="locationData"
                          item-text="locationCode" item-value="locationId" label="Location" required></v-select>
                      </v-flex>
                      <v-flex xs12 sm3 md3>
                        <v-autocomplete :rules="requiredRules" v-model="selectedItem" :items="searchItemResult"
                          clearable :search-input.sync="addSearchItems" flat hide-no-data hide-details
                          label="Search Item" item-text="itemCode" item-value="itemId">

                          <template v-slot:no-data>
                            <v-list-tile>
                              <v-list-tile-title>
                                Search for
                                <strong>items</strong>
                              </v-list-tile-title>
                            </v-list-tile>
                          </template>
                          <template v-slot:selection="{ item, selected }">
                            <v-chip :selected="selected" color="blue-grey" class="white--text">
                              <v-icon left>view_list</v-icon>
                              <span v-text="item.itemCode"></span>
                            </v-chip>
                          </template>
                          <template v-slot:item="{ item }">
                            <v-list-tile-avatar color="indigo" class=" font-weight-light white--text">
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title v-text="item.itemCode"></v-list-tile-title>
                              <v-list-tile-sub-title v-text="item.UOM"></v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              <v-icon>view_list</v-icon>
                            </v-list-tile-action>
                          </template>
                        </v-autocomplete>
                      </v-flex>
                      <v-flex xs12 sm3 md3>
                        <v-text-field :rules="requiredRules" v-model="itemName" label="ItemName"
                          required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm3 md3>
                        <v-text-field :rules="requiredRules" v-model="itemUOM" label="UOM" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm3 md3>
                        <v-menu reff="datePickerModal" v-model="datePickerModal" :close-on-content-click="false" lazy
                          transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                          <template v-slot:activator="{ on }">
                            <v-text-field :rules="requiredRules" v-model="dateFormatted" label="Date" persistent-hint
                              prepend-icon="event" @blur="date = parseDate(dateFormatted)" v-on="on"></v-text-field>
                          </template>
                          <v-date-picker v-model="date" no-title @input="datePickerModal = false"></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs12 sm3 md3>
                        <v-text-field v-model="itemOpenningData.receiptReference" label="Receipt Ref"
                          required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm3 md3>
                        <v-text-field :rules="requiredRules" type="number" v-model="itemOpenningData.openningQty"
                          label="Qty" required></v-text-field>
                      </v-flex>

                      <v-flex xs12 sm3 md3>
                        <v-text-field :rules="requiredRules" type="number" v-model="itemOpenningData.openningRate"
                          label="Rate" required prefix="र"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm3 md3>
                        <v-text-field :rules="requiredRules" type="text" v-model="itemValue" label="Value" readonly
                          prefix="र"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm3 md3>
                        <v-text-field v-model="itemOpenningData.remarks" label="Remarks" required></v-text-field>
                      </v-flex>

                    </v-layout>
                  </v-container>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
      <!--End Edit PartyDoc Transcation Dialog -->

      <!-- Edit PartyDoc Transcation Dialog -->
      <v-dialog v-model="editItemOpenningBalanceModal" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar fixed dark color="primary">
            <v-btn icon dark @click="editItemOpenningBalanceModal = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit Information</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="updateItemOpenningBalanceData()">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-container class="spaceFromTop" fluid grid-list-xl>
            <v-layout row justify-space-between>
              <v-flex xs12 sm12 md12>
                <v-form ref="UpdateRecordForm" v-model="updateFromValid" lazy-validation>
                  <v-container fluid grid-list-xl>
                    <v-layout row>
                      <v-flex xs12 sm3 md3>
                        <v-select :rules="requiredRules" v-model="itemOpenningData.locationId" :items="locationData"
                          item-text="locationCode" item-value="locationId" label="Location" required></v-select>
                      </v-flex>
                      <v-flex xs12 sm3 md3>
                        <v-autocomplete :rules="requiredRules" v-model="selectedItem" :items="searchItemResult"
                          clearable :search-input.sync="searchItems" flat hide-no-data hide-details label="Search Item"
                          item-text="itemCode" item-value="itemId">

                          <template v-slot:no-data>
                            <v-list-tile>
                              <v-list-tile-title>
                                Search for
                                <strong>items</strong>
                              </v-list-tile-title>
                            </v-list-tile>
                          </template>
                          <template v-slot:selection="{ item, selected }">
                            <v-chip :selected="selected" color="blue-grey" class="white--text">
                              <v-icon left>view_list</v-icon>
                              <span v-text="item.itemCode"></span>
                            </v-chip>
                          </template>
                          <template v-slot:item="{ item }">
                            <v-list-tile-avatar color="indigo" class=" font-weight-light white--text">
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title v-text="item.itemCode"></v-list-tile-title>
                              <v-list-tile-sub-title v-text="item.UOM"></v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              <v-icon>view_list</v-icon>
                            </v-list-tile-action>
                          </template>
                        </v-autocomplete>
                      </v-flex>
                      <v-flex xs12 sm3 md3>
                        <v-text-field :rules="requiredRules" v-model="itemName" label="ItemName"
                          required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm3 md3>
                        <v-text-field :rules="requiredRules" v-model="itemUOM" label="UOM" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm3 md3>
                        <v-menu reff="datePickerModal" v-model="datePickerModal" :close-on-content-click="false" lazy
                          transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                          <template v-slot:activator="{ on }">
                            <v-text-field :rules="requiredRules" v-model="dateFormatted" label="Date" persistent-hint
                              prepend-icon="event" @blur="date = parseDate(dateFormatted)" v-on="on"></v-text-field>
                          </template>
                          <v-date-picker v-model="date" no-title @input="datePickerModal = false"></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs12 sm3 md3>
                        <v-text-field v-model="itemOpenningData.receiptReference" label="Receipt Ref"
                          required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm3 md3>
                        <v-text-field :rules="requiredRules" type="number" v-model="itemOpenningData.openningQty"
                          label="Qty" required prefix="र"></v-text-field>
                      </v-flex>

                      <v-flex xs12 sm3 md3>
                        <v-text-field :rules="requiredRules" type="number" v-model="itemOpenningData.openningRate"
                          label="Rate" required prefix="र"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm3 md3>
                        <v-text-field :rules="requiredRules" type="text" v-model="itemValue" label="Value" readonly
                          prefix="र"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm3 md3>
                        <v-text-field v-model="itemOpenningData.remarks" label="Remarks" required></v-text-field>
                      </v-flex>

                    </v-layout>
                  </v-container>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
      <!--End Edit PartyDoc Transcation Dialog -->

      <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="timeout"
        :vertical="mode === 'vertical'">{{
          text }}
        <v-btn dark flat @click="snackbar = false"> Close </v-btn>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>

import httpClient from "@/services/httpClient.js";
import AgGridWrapper from "../../Shared/AgGridWrapper.vue";

export default {
  components: {
    AgGridWrapper,
  },
  data: vm => ({
    addFromValid: true,
    updateFromValid: true,
    itemTableData: [],
    itemTableHeader: [],
    itemOpenningData: {
      refID: '',
      finYear: '',
      locationId: '',
      itemId: '',
      receiptDate: '',
      receiptReference: '',
      openningQty: '',
      openningRate: '',
      remarks: ''
    },
    itemValue: '',
    itemName: '',
    itemUOM: '',
    searchItems: null,
    addSearchItems: null,
    selectedItem: 0,
    searchItemResult: [],
    locationData: [],
    datePickerModal: false,
    addItemOpenningBalanceModal: false,
    editItemOpenningBalanceModal: false,
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    requiredRules: [
      v => !!v || 'This field is required'
    ],
    snackbar: false,
    color: '',
    mode: '',
    timeout: 5000,
    text: ''

  }),

  beforeMount: function () {
    this.loadItemOpenningBalanceTableData();
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    },
    itemOpenningData: {
      handler(val, oldVal) {
        this.itemValue = parseInt(val.openningQty) * parseInt(val.openningRate);
        if (!this.itemValue) {
          this.itemValue = '';
        }
      },
      deep: true
    },
    selectedItem: function (val) {
      let itemData = this.searchItemResult.find(e => e.itemId == val);
      console.log('selected item=' + JSON.stringify(itemData));
      if (itemData != undefined && itemData != null) {
        this.itemOpenningData.itemId = itemData.itemId;
        this.itemName = itemData.itemName;
        this.itemUOM = itemData.UOM;
      } else {
        this.itemName = '';
        this.itemUOM = '';
      }
    },
    addSearchItems(value) {
      if (value != undefined && value != null && value != '') {
        httpClient({
          method: 'GET',
          url: `${process.env.VUE_APP_API_BASE}getItemByCode?itemCode=${value}`
        })
          .then((result) => {
            this.searchItemResult = result.data;
          }).catch((err) => {

            this.showSnackBar('error', err.response.data);
          });
      }
    },
    searchItems(value) {
      if (value != undefined && value != null && value != '') {
        httpClient({
          method: 'GET',
          url: `${process.env.VUE_APP_API_BASE}getItemByCode?itemCode=${value}`
        })
          .then((result) => {
            this.searchItemResult = result.data;
          }).catch((err) => {

            this.showSnackBar('error', err.response.data);
          });
      }
    },

  },
  methods: {
    showSnackBar(type, message) {
      this.snackbar = true;
      this.color = type;
      this.text = message;
    },
    loadItemOpenningBalanceTableData() {
      const docID = localStorage.getItem('menuDocId') || 0;
      this.itemTableHeader = [{ text: "Edit", align: "center" }],
        /**
         * Code for loading the party master data
         */
        httpClient({
          method: 'GET',
          url: `${process.env.VUE_APP_API_BASE}ItemOpenningBalance?docID=${docID}`,
        })
          .then((result) => {
            if (result.status === 200) {
              const openningBalanceData = result.data;

              let headersKey = Object.keys(openningBalanceData[0]);
              headersKey.forEach(element => {
                this.itemTableHeader.push({ text: element, align: "center", value: element })
              })
              this.itemTableData = openningBalanceData;
            }
          }).catch((err) => {
            this.showSnackBar('error', err.response.data);
          });
    },
    addNewItemOpenningBalance() {
      this.addItemOpenningBalanceModal = true;
      this.itemOpenningData = {
        refID: '',
        finYear: '',
        locationId: '',
        itemId: '',
        receiptDate: '',
        receiptReference: '',
        openningQty: '',
        openningRate: '',
        remarks: ''
      };
      this.selectedItem = 0;
      this.searchItemResult = [];
      this.date = new Date().toISOString().substr(0, 10);
      this.itemValue; '';
      this.itemName = '';
      this.itemUOM = '';
      if (this.locationData.length == 0) {
        let selectedID = 0;
        const docID = localStorage.getItem('menuDocId') || 0;

        httpClient({
          method: 'GET',
          url: `${process.env.VUE_APP_API_BASE}ItemOpenningBalance?selectedId=${selectedID}&docID=${docID}`,
        })
          .then((result) => {
            if (result.status === 200) {
              this.locationData = result.data.locationData;
            }
          }).catch((err) => {
            this.showSnackBar('error', err.response.data);
          });
      }
    },
    saveNewItemOpenningBalanceRecord() {
      let updateData = this.itemOpenningData;
      updateData.receiptDate = this.parseAsDBDate(this.dateFormatted);
      let financialYear = (localStorage.getItem('financialYear')).split(" - ");
      updateData.finYear = financialYear[0].substring(financialYear[0].length - 2, financialYear[0].length);
      if (this.$refs.NewRecordForm.validate()) {
        httpClient({
          method: 'POST',
          url: `${process.env.VUE_APP_API_BASE}ItemOpenningBalance`,
          data: updateData
        })
          .then((result) => {
            this.loadItemOpenningBalanceTableData();
            this.addItemOpenningBalanceModal = false;
            this.showSnackBar('success', result.data);
          }).catch((err) => {
            this.showSnackBar('error', err.response.data);
          });
      }
    },
    editItemOpenningBalance(params) {
      this.editItemOpenningBalanceModal = true;
      let selectedID = params[Object.keys(params)[0]];
      const docID = localStorage.getItem('menuDocId') || 0;

      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}ItemOpenningBalance?selectedId=${selectedID}&docID=${docID}`,
      })
        .then((result) => {
          if (result.status === 200) {
            this.locationData = result.data.locationData;

            let openningItemData = result.data;
            this.itemOpenningData.refID = openningItemData.refID;
            this.itemOpenningData.finYear = openningItemData.finYear;
            this.itemOpenningData.locationId = openningItemData.locationId;
            this.selectedItem = openningItemData.itemId;
            this.itemOpenningData.receiptReference = openningItemData.receiptReference;
            this.itemOpenningData.openningQty = openningItemData.openningQty;
            this.itemOpenningData.openningRate = openningItemData.openningRate;
            this.itemOpenningData.remarks = openningItemData.remarks;

            this.itemName = openningItemData.itemName;
            this.itemUOM = openningItemData.itemUOM;
            this.date = new Date(this.parseDate(openningItemData.receiptDate)).toISOString().substr(0, 10);

            this.searchItemResult = [
              {
                itemId: openningItemData.itemId,
                itemCode: openningItemData.itemCode,
                itemName: openningItemData.itemName,
                UOMID: openningItemData.itemUOM,
                UOM: openningItemData.itemUOM
              }];


          }
        }).catch((err) => {
          this.showSnackBar('error', err.response.data);
        });
    },
    updateItemOpenningBalanceData() {

      let updateData = this.itemOpenningData;
      updateData.receiptDate = this.parseAsDBDate(this.dateFormatted);
      if (this.$refs.UpdateRecordForm.validate()) {
        httpClient({
          method: 'PUT',
          url: `${process.env.VUE_APP_API_BASE}ItemOpenningBalance`,
          data: updateData
        })
          .then((result) => {
            this.loadItemOpenningBalanceTableData();
            this.showSnackBar('success', result.data);
          }).catch((err) => {
            this.showSnackBar('error', err.response.data);
          });
      }
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null
      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    parseAsDBDate(date) {
      if (!date) return null
      const [days, months, years] = date.split('/')
      return `${months}/${days}/${years}`
    },

  }
}
</script>

<style></style>