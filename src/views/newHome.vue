<template>
<div id="app">
  <v-app id="inspire">
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
      color="blue darken-1"
    >
      <v-list dense>
         <!-- START: Search bar panel -->
            <v-text-field
              flat
              solo-inverted
              prepend-icon="search"
              label="Search"
            ></v-text-field>
          <!-- END: Search bar panel -->
          <!-- START: Tree style list -->
           <v-treeview 
           activatable
           open-on-click
           transition
           :items="menu">
           </v-treeview>
          <!-- END: Tree style list -->
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left color="blue darken-1">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid >
        <v-layout justify-center align-center>
          <v-flex shrink>
            <div>
              <h1>Supplier Master</h1>
              <v-data-table
                :headers="headers"
                :items="comapyMasterList"
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td class="justify-center layout px-0">
                    <v-icon
                      small
                      class="mr-2"
                      @click="editItem(props.item)"
                    >
                      edit
                    </v-icon>
                    <v-icon
                      small
                      @click="DeleteSupplierRequest(props.item)"
                    >
                      delete
                    </v-icon>
                  </td>
                  <td>{{ props.item.supplierName }}</td>
                  <td>{{ props.item.supplierCode }}</td>
                  <td>{{ props.item.supplierGroupID }}</td>
                  <td>{{ props.item.supplierAddrLine1 }}{{props.item.supplierAddrLine2}}{{props.item.supplierAddrLine3}}{{props.item.supplierAddrLine4}}{{props.item.supplierCity}}{{props.item.supplierState}}{{props.item.supplierCountry}}{{props.item.supplierPincode}}</td>
                  <!-- <td class="text-xs-right">{{ props.item.protein }}</td> -->
                </template>
                <template slot="no-data">
                  <v-btn color="primary" @click="">Reset</v-btn>
                </template>
              </v-data-table>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed color="blue darken-1">
      <span>NitinAgarwal &copy; 2019</span>
    </v-footer>
    <!-- START: dialog box model code -->
    <v-dialog v-model="compantMasterDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="compantMasterDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="updateItem()">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
            <v-layout row wrap>
            <v-flex xs12>
              <v-expansion-panel popout>
              <v-expansion-panel-content>
                  <div slot="header">Supplier Details</div>
                  <v-card>
                    <v-card-text>
                      <!-- START: Supplier detail form code -->
                        <v-container grid-list-md>
                          <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                              <v-text-field v-model="editedItem.supplierName" label="Supplier Name" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <v-text-field v-model="editedItem.supplierCode" label="Supplier Code" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <!-- <v-text-field v-model="editedItem.supplierGroupID" label="Supplier Group" required></v-text-field> -->
                              <v-select
                                v-model="editedItem.supplierGroupID"
                                menu-props="auto"
                                :items="supplierGroupIdList"
                                item-text="supplierGroupName"
                                item-value="supplierGroupID"
                              ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <v-text-field v-model="editedItem.Address.line1" label="Address Line 1:" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <v-text-field v-model="editedItem.Address.line2" label="Address Line 2:" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <v-text-field v-model="editedItem.Address.line3" label="Address Line 3:" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <v-text-field v-model="editedItem.Address.line4" label="Address Line 4:" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <!-- <v-autocomplete
                                v-model="editedItem.Address.city"
                                :items="states"
                                persistent-hint
                                prepend-icon="mdi-city"
                                required
                              >
                                <v-slide-x-reverse-transition
                                  slot="append-outer"
                                  mode="out-in"
                                >
                                  <v-icon
                                    :color="'info'"
                                    :key="`icon-${isEditing}`"
                                    v-text="'mdi-circle-edit-outline'"
                                  ></v-icon>
                                </v-slide-x-reverse-transition>
                              </v-autocomplete> -->
                              <v-text-field v-model="editedItem.Address.city" label="City:"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <!-- <v-autocomplete
                                  :loading="loading"
                                  :items="stateList"
                                  :search-input.sync="searchState"
                                  item-text="countryName"
                                  item-value="countryName"
                                  v-model="editedItem.Address.country"
                                  cache-items
                                  class="mx-3"
                                  flat
                                ></v-autocomplete> -->
                                <v-text-field v-model="editedItem.Address.state" label="State:"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                 <!-- <v-autocomplete
                                  :loading="loading"
                                  :items="countryList"
                                  :search-input.sync="search"
                                  item-text="countryName"
                                  item-value="countryName"
                                  v-model="editedItem.Address.country"
                                  cache-items
                                  class="mx-3"
                                  flat
                                ></v-autocomplete> -->
                                 <v-text-field v-model="editedItem.Address.country" label="Country:"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <v-text-field v-model="editedItem.Address.pinCode" label="Pin Code:"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <v-checkbox
                                v-model="editedItem.inActive"
                                label="inActive ?"
                              ></v-checkbox>
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
                    <v-card-text>Coming soon....</v-card-text>
                  </v-card>
              </v-expansion-panel-content>
              </v-expansion-panel>
            </v-flex>
          </v-layout>


        </v-card>
      </v-dialog>
    <!-- END: dialog box model code -->
    <!-- START: Code for snackBar -->
      <v-snackbar
          v-model="snackbar"
          :color="snackbarColor"
        >
          {{ snackbarText }}
          <v-btn
            dark
            flat
            @click="snackbar = false"
          >
            Close
          </v-btn>
      </v-snackbar>
    <!-- END: Code for snackBar -->
    <!-- START: warning model dialog box -->
    <v-dialog
        v-model="warningDialog"
        max-width="290"
        justify-center
        align-center
      >
        <v-card>
          <v-card-title class="headline">Delete Supplier ?</v-card-title>
  
          <v-card-text>
            Are you sure? you wanna delete this supplier.
          </v-card-text>
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              color="green darken-1"
              flat="flat"
              @click="warningDialog = false"
            >
              No
            </v-btn>
  
            <v-btn
              color="green darken-1"
              flat="flat"
              @click="DeleteSupplier()"
            >
              Yes
            </v-btn>
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
  name: 'home',
  components: {
    
  },
  data: function() {
    return {
      warningDialog: false,
      drawer: true,
      snackbar: false,
      snackbarColor: '',
      snackbarText: '',
      menu: [],
      menuChildren: [],
      createATree: {},
      comapyMasterList: [],
      headers: [
        { text: 'Edit', align: 'center'},
        { text: 'supplierName', align: 'center', value: 'supplierName' },
        { text: 'supplierCode', align: 'center', value: 'supplierCode' },
        { text: 'supplierGroupID', align: 'center', value: 'supplierGroupID' },
        { text: 'Address', align: 'center', value: 'Address' }
      ],
      compantMasterDialog: false,
      editedItem: {
        supplierID: '',
        supplierName: '',
        supplierCode: '',
        supplierGroupID: [],
        Address: {
          line1: '',
          line2: '',
          line3: '',
          line4: '',
          city: '',
          state: '',
          country: '',
          pinCode: ''
        },
        inActive: null,
        tallyAlias: ''
      },
      deleteItem: {
        supplierID: 0
      },
      defaultOpen: [true, false],
      countryList: [],
      items: [],
      select: null,
      search: null,
      loading: false,
      stateList: [],
      searchState: null,
      supplierGroupIdList: []
    }
  },
  watch: {
    search (val) {
      val && val !== this.select && this.fetchCountry(val)
    },
    searchState(val) {
      val && val !== this.editedItem.Address.state && this.fetchState(val)
    }
  },
  beforeMount: function() {
    this.fetchMenu();
    this.fetchCompanyMaster();
  },
  methods: {
    fetchMenu: function() {
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}mainMenu?userID=5`
      }).then((res) => {
        console.log('Response from server', res);
        if (res.status === 200 && res.data) {
          res.data.forEach(element => {
              const children = {
                id: element.menuId,
                name: element.menuItemCapiton
              }
              // this.createATree.id = element.menuId
              // this.createATree.name = element.menuItemCapiton
              console.log('Tree', children);
              this.menuChildren.push(children)
              console.log('After pushing the value', this.menu);
            // console.log('Element', element);
          });
          const menuItem = {
            id: 1,
            name: 'Master',
            children: this.menuChildren
          }
          this.menu.push(menuItem);
          console.log('Menu', this.menu);
        }
      })
    },
    fetchCompanyMaster: function() {
      console.log('calolinf fetchCompanyMaster');
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}supplyMaster`
      }).then((res) => {
        console.log('Response from server', res.data);
        // supplierCode
        // supplierName
        // supplierGroupID
        // res.data.forEach(element => {
          // const childElement = {
          //   supplierName: element.supplierName,
          //   supplierCode: element.supplierCode,
          //   supplierGroupID: element.supplierGroupID,
          //   Address: `${element.supplierAddrLine1},${element.supplierAddrLine2},${element.supplierAddrLine3}${element.supplierAddrLine4}${element.supplierCity}${element.supplierState}${element.supplierCountry}${element.supplierPincode}`
          // }
          // this.comapyMasterList.push(element);
        // });
        this.comapyMasterList = res.data;
        console.log('this.comapyMasterList', this.comapyMasterList);
      })
    },
    editItem: function(item) {
      console.log(item);
      const supplierId = item.supplierID;
      this.editedItem.supplierID = item.supplierID;
      console.log('supplierId', supplierId);
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}supplyMaster?supplierID=${supplierId}`
      }).then((res) => {
        console.log('Response for Edit data', res.data[0]);
        const supplierData = res.data[0].supplierData;
        const supplierGroupList = res.data[0].supplierGroupList;
        this.supplierGroupIdList = supplierGroupList;

        this.editedItem.supplierGroupID = supplierGroupList.find(value => value.supplierGroupID == supplierData.supplierGroupID);
        console.log('Supplier Data', this.editedItem.supplierGroupID);
        this.editedItem.supplierName = supplierData.supplierName;
        this.editedItem.tallyAlias = supplierData.tallyAlias;
        this.editedItem.supplierCode = supplierData.supplierCode;
        this.editedItem.Address.line1 = supplierData.supplierAddrLine1;
        this.editedItem.Address.line2 = supplierData.supplierAddrLine2;
        this.editedItem.Address.line3 = supplierData.supplierAddrLine3;
        this.editedItem.Address.line4 = supplierData.supplierAddrLine4;
        this.editedItem.Address.city = supplierData.supplierCity;
        this.editedItem.Address.state = supplierData.supplierState;
        this.editedItem.Address.country = supplierData.supplierCountry;
        this.editedItem.Address.pinCode = supplierData.supplierPincode;
        this.editedItem.inActive = supplierData.inActive;
      this.countryList = [{
        countryID: 1,
        countryName: supplierData.supplierCountry
      }]
      })
      // this.editedItem.supplierName = item.supplierName;
      // this.editedItem.supplierCode = item.supplierCode;
      // this.editedItem.supplierGroupID = item.supplierGroupID;
      // this.editedItem.Address.line1 = item.supplierAddrLine1;
      // this.editedItem.Address.line2 = item.supplierAddrLine2;
      // this.editedItem.Address.line3 = item.supplierAddrLine3;
      // this.editedItem.Address.line4 = item.supplierAddrLine4;
      // this.editedItem.Address.city = item.supplierCity;
      // this.editedItem.Address.state = item.supplierState;
      // this.editedItem.Address.country = item.supplierCountry;
      // this.editedItem.Address.pinCode = item.supplierPincode;
      // this.countryList = [{
      //   countryID: 1,
      //   countryName: item.supplierCountry
      // }]
      this.compantMasterDialog = true;
    },
    updateItem() {
      console.log('this.editedItem.supplierGroupID', this.editedItem.supplierGroupID);
      const updateParam = {
        supplierID: this.editedItem.supplierID,
        supplierCode: this.editedItem.supplierCode,
        supplierName: this.editedItem.supplierName,
        tallyAlias: this.editedItem.tallyAlias,
        supplierGroupID: this.editedItem.supplierGroupID,
        supplierAddrLine1: this.editedItem.Address.line1,
        supplierAddrLine2: this.editedItem.Address.line2,
        supplierAddrLine3: this.editedItem.Address.line3,
        supplierAddrLine4: this.editedItem.Address.line4,
        supplierCity: this.editedItem.Address.city,
        supplierState: this.editedItem.Address.state,
        supplierCountry: this.editedItem.Address.country,
        supplierPincode: this.editedItem.Address.pinCode,
        inActive: this.editedItem.inActive
      }
      httpClient({
        method: 'PUT',
        url: `${process.env.VUE_APP_API_BASE}supplyMaster`,
        data: updateParam
      }).then((res) => {
        console.log('res', res);
        if(res.status == 200) {
          this.snackbarColor = 'green';
          this.snackbarText = 'Updated Successfully';
          this.snackbar = true;
          this.compantMasterDialog = false;
          this.fetchCompanyMaster();
        }
      })
    },
    deleteItem: function(item) {
      console.log(item);
      // this.deleteItem.supplierID = item.supplierID;
      // this.warningDialog = true;
    },
    DeleteSupplierRequest(item) {
      console.log(item);
      this.deleteItem.supplierID = item.supplierID;
      console.log('Supplier Id', this.deleteItem.supplierID);
      this.warningDialog = true;
    },
    fetchCountry(searchKey) {
      console.log('Calling....');
      httpClient({
        method: 'GET',
        url: `http://47.23.106.203/CountryList/api/GetContries?searchValue=${searchKey}`
      }).then((res) => {
        console.log('res');
        console.log('res', res.data);
        this.countryList = res.data;
      })
    },
    fetchState(searchKey) {
      httpClient({
        method: 'GET',
        url: ``
      })
    },
    updateCompanyMaster() {
      this.editedItem.supplierName;
      this.editedItem.supplierCode;
      this.editedItem.supplierGroupID;
      this.editedItem.Address.line1;
      this.editedItem.Address.line2;
      this.editedItem.Address.line3;
      this.editedItem.Address.line4;
      this.editedItem.Address.city;
      this.editedItem.Address.state;
      this.editedItem.Address.country;
      this.editedItem.Address.pinCode;

    },
    DeleteSupplier() {
      const supplierID = this.deleteItem.supplierID;
      httpClient({
        method: 'DELETE',
        url: `${process.env.VUE_APP_API_BASE}supplyMaster?supplierID=${supplierID}`
      }).then((res) => {
        console.log('Response from server', res);
        if(res.status === 200) {
          this.fetchCompanyMaster();
          this.snackbarColor = 'green';
          this.snackbarText = 'Supplier deleted succcessfully!';
          this.snackbar = true;
        } else {
          this.snackbarColor = 'red';
          this.snackbarText = 'Opps! error occured please try again.';
          this.snackbar = true;
        }
      })
    }
  }
}
</script>
<style>

</style>
