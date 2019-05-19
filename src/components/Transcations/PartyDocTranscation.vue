<template>
 <div id="app">
   <v-app id="inspire">
     <div class="text-md-center text-lg-center">
          <v-btn fab dark small color="indigo" @click="loadSchemaForNewPartyDocTranscation" v-if="getCurrentUserRoles('addRight') == '1'"> <v-icon dark>add</v-icon></v-btn>
        </div>
       <span v-if="getCurrentUserRoles('addRight') == '1'"> Add New Record</span><br/>
    <!-- START: Code for Data table -->
    <v-card>
      <v-card-title> 
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        <v-text-field  v-model="tableSearch" append-icon="search"  label="Search" single-line  hide-details  ></v-text-field>
      </v-card-title>
        <v-data-table :headers="partyDocHeaders" :search="tableSearch" :items="partyDocTableData" class="elevation-1">
          <template slot="items" slot-scope="props">
            <tr @click="editSelectedPartyDocTranscation(props.item)">
            <td class="justify-center layout px-0">
              <v-icon v-if="getCurrentUserRoles('editRight') == '1'" small class="mr-2" @click="editSelectedPartyDocTranscation(props.item)">edit</v-icon>
            </td>
            <td v-for="values in props.item" :key="values.id">
              {{ values }}
            </td>
            </tr>
          </template>
          <template slot="no-data">
            <v-btn color="primary">Reset</v-btn>
          </template>
        </v-data-table>
      </v-card>
        <!-- END: Code for Data table -->
       <!-- Add PartyDoc Transcation Dialog -->
          <v-dialog  v-model="addPartyDocModal"   fullscreen  hide-overlay  transition="dialog-bottom-transition" >
           <v-card>
              <v-toolbar fixed dark color="primary">
                <v-btn icon dark @click="addPartyDocModal = false">
                  <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Add Information</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn class="blue darken-1 white--text" @click="savePartyDocHDRTableData()">Add</v-btn>

              </v-toolbar>
              <v-container class="spaceFromTop" fluid grid-list-md >
                <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  <v-expansion-panel expand>
                    <v-expansion-panel-content>
                      <template v-slot:header>
                        <div><h2>Header</h2></div>
                      </template>
                      <v-card>
                        <v-card-text>
                          <v-container fluid grid-list-x>
                          <v-layout row justify-space-between>
                            <v-flex xs12 sm7 md7>
                              <p>{{prefix}} NO.</p>
                              <v-layout row>
                              <v-flex xs3 sm3 md3> <v-select v-model="selectedPrefix"  :items="prefixDropdown" label="Prefix" @change="getDocNumber()"  item-text="prefix" item-value="prefix"></v-select></v-flex>
                              <v-flex xs2 sm2 md2> <v-text-field v-model="partyDOCID"  ></v-text-field> </v-flex>
                              <v-flex xs3 sm3 md3> 
                                   <v-menu  reff="datePickerModal" v-model="datePickerModal" :close-on-content-click="false" lazy transition="scale-transition" offset-y
                                  full-width max-width="290px"  min-width="290px" >
                                <template v-slot:activator="{ on }">
                                  <v-text-field v-model="dateFormatted"  label="Date" persistent-hint prepend-icon="event"  @blur="date = parseDate(dateFormatted)"  v-on="on"   ></v-text-field>
                                </template>
                                <v-date-picker v-model="date" no-title @input="datePickerModal = false"></v-date-picker>
                                </v-menu> 
                              </v-flex>
                              <v-flex xs3 sm3 md3> <v-text-field v-model="partyDOCNumber"  readonly ></v-text-field></v-flex>
                              </v-layout>

                              <v-layout row>
                                <v-flex xs4 sm7 md7>
                                  <p v-if="searchPartyPrefix =='SUPP'">Supplier</p>
                                  <p v-if="searchPartyPrefix =='CUST'">Customer</p>
                                  <v-autocomplete  v-model="selectedSupplier" :loading="searchItemsLoading" :items="searchSupplierResult" clearable 
                                      :search-input.sync="addSearchSupplier" auto-select-first flat  hide-no-data  hide-details  item-text="supplierCode" item-value="supplierId" >
                                  <template v-slot:no-data>
                                      <v-list-tile>
                                        <v-list-tile-title>
                                          Search for
                                          <strong>supplier</strong>
                                        </v-list-tile-title>
                                      </v-list-tile>
                                    </template>
                                    <template v-slot:selection="{ item, selected }" >
                                      <v-chip :selected="selected" color="blue-grey"  class="white--text"
                                      >
                                        <v-icon left>supervised_user_circle</v-icon>
                                        <span v-text="item.supplierCode"></span>
                                      </v-chip>
                                    </template>
                                    <template v-slot:item="{ item }">
                                      <v-list-tile-avatar
                                        color="indigo"
                                        class=" font-weight-light white--text"
                                      >
                                      </v-list-tile-avatar>
                                      <v-list-tile-content>
                                        <v-list-tile-title v-text="item.supplierCode"></v-list-tile-title>
                                        <v-list-tile-sub-title v-text="item.supplierName"></v-list-tile-sub-title>
                                      </v-list-tile-content>
                                      <v-list-tile-action>
                                        <v-icon>supervised_user_circle</v-icon>
                                      </v-list-tile-action>
                                    </template>   
                                  </v-autocomplete>
                                </v-flex>
                              </v-layout>
                              <v-layout row>
                                <v-flex xs4 sm4 md4>
                                <p><i>Billing address</i></p>
                                <p>{{supplier.supplierCode}}</p>
                                <p>{{supplier.address1}}</p>
                                <p>{{supplier.address2}}</p>
                                <p>{{supplier.address3}} {{supplier.address4}} </p>
                                <p>{{supplier.city}} {{supplier.pincode}} {{supplier.state}} {{supplier.country}}</p>
                                </v-flex>
                              </v-layout>
                              
                            </v-flex>
                            <v-flex xs12 sm4 md4>
                               <vue-form-generator id="Form-generator-css" ref="vfAddHeader" :schema="headerDynamicFieldSchema" :model="headerDynamicFieldModel" :options="formOptions" @validated="onValidatedAddHeader"  ></vue-form-generator> 
                            </v-flex>
                          </v-layout>
                        </v-container>
                        </v-card-text>
                      </v-card>
                    </v-expansion-panel-content>


                    <v-expansion-panel-content>
                      <template v-slot:header>
                        <div><h2>Detail</h2></div>
                      </template>
                      <v-card>
                        <v-card-text>
                         <v-container fluid grid-list-xl>
                          <div class="actionBlock">
                              <!-- add new row action -->
                                <v-dialog v-model="detailModal" scrollable persistent max-width="450px">
                                  <template v-slot:activator="{ on }">
                                    <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
                                    <v-tooltip top>
                                      <template v-slot:activator="{ on }">
                                        <v-btn fab dark small color="indigo" v-on="on"> <v-icon dark>add</v-icon> </v-btn>
                                      </template>
                                      <span>Tooltip</span>
                                    </v-tooltip>
                                    
                                  </template>
                                  <v-card>
                                    <v-card-title>
                                      <span class="headline">Item Details</span>
                                    </v-card-title>
                                    <v-card-text>
                                      <v-container grid-list-md>
                                        <v-layout wrap>
                                          <v-flex xs12>
                                            <v-autocomplete  v-model="selectedItem" :loading="searchItemsLoading" :items="searchItemResult" clearable
                                              :search-input.sync="addSearchItems"   flat  hide-no-data  hide-details label="Search Item" item-text="itemCode" item-value="itemId">

                                              <template v-slot:no-data>
                                                <v-list-tile>
                                                  <v-list-tile-title>
                                                    Search for
                                                    <strong>items</strong>
                                                  </v-list-tile-title>
                                                </v-list-tile>
                                              </template>
                                              <template v-slot:selection="{ item, selected }" >
                                                <v-chip :selected="selected" color="blue-grey"  class="white--text"
                                                >
                                                  <v-icon left>view_list</v-icon>
                                                  <span v-text="item.itemCode"></span>
                                                </v-chip>
                                              </template>
                                              <template v-slot:item="{ item }">
                                                <v-list-tile-avatar
                                                  color="indigo"
                                                  class=" font-weight-light white--text"
                                                >
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
                                          <v-flex xs12>
                                            <v-text-field label="Item Name" v-model="detailSectionModal.ITEMNAME"></v-text-field>
                                          </v-flex>
                                          <v-flex xs12>
                                            <v-text-field label="UOM"  v-model="detailSectionModal.UOM"></v-text-field>
                                          </v-flex>
                                          <v-flex xs12>
                                           <vue-form-generator id="Form-generator-css" ref="vfAddDetail" :schema="detailSectionFieldSchema" :model="detailSectionModal" :options="formOptions" @validated="onValidatedAddDetailSection"  ></vue-form-generator>
                                          </v-flex>
                                        </v-layout>
                                      </v-container>
                                      <small>*indicates required field</small>
                                    </v-card-text>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn color="blue darken-1" flat @click="detailModal = false">Close</v-btn>
                                      <v-btn color="blue darken-1" flat @click="validateOnclickDetailSaveNewRecord(); saveDetailData(true)">Save</v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              <!-- speed dial code -->
                              <div id="create">
                                  <v-speed-dial v-model="fab" top  direction="right"
                                    transition="slide-x-reverse-transition" >
                                    <template v-slot:activator>
                                      <v-btn v-model="fab" color="blue darken-2" dark small fab  >
                                        <v-icon>settings_input_composite</v-icon>
                                        <v-icon>close</v-icon>
                                      </v-btn>
                                    </template>
                                    <v-tooltip top>
                                      <template v-slot:activator="{ on }">
                                        <v-btn fab  dark  small color="green" @click="moveRowUpwared()">
                                          <v-icon>arrow_upward</v-icon>
                                        </v-btn>
                                      </template>
                                      <span>Tooltip</span>
                                    </v-tooltip>
                                    
                                     <v-tooltip top>
                                      <template v-slot:activator="{ on }">
                                        <v-btn  fab  dark  small color="indigo" @click="moveRowDownwared()" >
                                           <v-icon>arrow_downward</v-icon>
                                         </v-btn> 
                                      </template>
                                      <span>Tooltip</span>
                                    </v-tooltip>
                                    
                                     <v-tooltip top>
                                      <template v-slot:activator="{ on }">
                                        <v-btn fab  dark small color="red" @click="removeDetailRecord()">
                                          <v-icon>delete</v-icon>
                                        </v-btn>
                                      </template>
                                      <span>Tooltip</span>
                                    </v-tooltip>
                                    
                                  </v-speed-dial>
                                  <!--End speed dial code -->
                              </div>
                          </div>
                          <v-data-table
                              v-model="selected"
                              :headers="detailSectionHeader"
                              :items="detailSectionData"
                              select-all
                              item-key="SLNO"
                              class="elevation-1"
                              hide-actions
                            >
                              <template v-slot:headers="props">
                                <tr>
                                  <th></th>
                                  <th>Edit</th>
                                  <th
                                    v-for="header in props.headers"
                                    :key="header.text"
                                    :class="['column sortable', 'active']" >
                                    <b>{{ header.text.toUpperCase() }}</b>
                                  </th>
                                </tr>
                              </template>
                              <template v-slot:items="props">
                                <tr :active="props.selected" @click="props.selected = !props.selected">
                                  <td> <v-checkbox :input-value="props.selected"   primary  hide-details ></v-checkbox>  </td>
                                  <td> <v-icon samll class="mr-2" @click="editDetailRow(props.item, true)">edit</v-icon></td>
                                  <template v-for="header in Object.keys(detailSectionModal)">
                                  <td class="text-xs-left" :key="header" v-if="header !='ITEMID' && header !='UOMID' && header !='ITEMSLNO' " >{{ props.item[header] }}</td>
                                  </template>
                                </tr>
                              </template>
                            </v-data-table>
                        </v-container>
                        </v-card-text>
                      </v-card>
                    </v-expansion-panel-content>

                    <v-expansion-panel-content>
                      <template v-slot:header>
                        <div><h2>Footer</h2></div>
                      </template>
                      <v-card>
                        <v-card-text>
                          <v-container fluid grid-list-xl>
                          <v-layout row justify-space-between>
                            <v-flex xs12 sm6 md6>
                              <vue-form-generator id="Form-generator-css" ref="vfAddFooter" :schema="footerDynamicFieldSchema" :model="footerDynamicFieldModel" :options="formOptions" @validated="onValidatedAddFooter"  ></vue-form-generator>
                            </v-flex>
                            <v-flex xs12 sm4 md4>
                              <vue-form-generator id="Form-generator-css" ref="vfAddTotal" :schema="totalDynamicFieldSchema" :model="totalDynamicFieldModel" :options="formOptions" @validated="onValidatedAddTotal"  ></vue-form-generator>
                            </v-flex>
                          </v-layout>
                        </v-container>
                        </v-card-text>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                </v-flex>
              </v-layout>
            </v-container>
           </v-card>
          </v-dialog>
          <!-- End Add Edit PartyDoc Transcation Dialog -->

           <!-- Edit PartyDoc Transcation Dialog -->
          <v-dialog  v-model="ediPartyDocModal"   fullscreen  hide-overlay  transition="dialog-bottom-transition" >
           <v-card>
              <v-toolbar fixed dark color="primary">
                <v-btn icon dark @click="ediPartyDocModal = false">
                  <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Edit Information</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn class="blue darken-1 white--text" @click="updatePartyDoc()">Save</v-btn>
              </v-toolbar>
              <v-container  class="spaceFromTop" fluid grid-list-md >
                <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  <v-expansion-panel v-model="panel" expand >
                     <v-expansion-panel-content>
                       <v-container fluid grid-list-xl>
                          <v-layout row justify-space-between>
                            <v-flex xs12 sm7 md7>
                              <p>{{prefix}} NO.</p>
                              <v-layout row>
                              <v-flex xs3 sm3 md3> <v-select v-model="selectedPrefix"  :items="prefixDropdown" item-value="prefix" item-text="prefix" label="Prefix" readonly ></v-select></v-flex>
                              <v-flex xs2 sm2 md2> <v-text-field v-model="partyDOCID"  ></v-text-field> </v-flex>
                              <v-flex xs3 sm3 md3> 
                                  <!-- <v-menu  ref="datePickerModal" v-model="datePickerModal" :close-on-content-click="false" lazy transition="scale-transition" offset-y
                                  full-width max-width="290px"  min-width="290px" >
                                <template v-slot:activator="{ on }"> -->
                                  <v-text-field v-model="dateFormatted"  label="Date" readonly  ></v-text-field>
                                <!-- </template>
                                <v-date-picker v-model="date" no-title @input="datePickerModal = false"></v-date-picker>
                                </v-menu> -->
                              </v-flex>
                              <v-flex xs3 sm3 md3> <v-text-field v-model="partyDOCNumber"  readonly ></v-text-field></v-flex>
                              </v-layout>

                              <v-layout row>
                                <v-flex xs4 sm7 md7>
                                  <p v-if="searchPartyPrefix =='SUPP'">Supplier</p>
                                  <p v-if="searchPartyPrefix =='CUST'">Customer</p>
                                  <v-autocomplete  v-model="selectedSupplier" :loading="searchItemsLoading" :items="searchSupplierResult" clearable 
                                      :search-input.sync="searchSupplier"   auto-select-first flat  hide-no-data  hide-details  item-text="supplierCode" item-value="supplierId" >
                                  <template v-slot:no-data>
                                      <v-list-tile>
                                        <v-list-tile-title>
                                          Search for
                                          <strong>supplier</strong>
                                        </v-list-tile-title>
                                      </v-list-tile>
                                    </template>
                                    <template v-slot:selection="{ item, selected }" >
                                      <v-chip :selected="selected" color="blue-grey"  class="white--text"
                                      >
                                        <v-icon left>supervised_user_circle</v-icon>
                                        <span v-text="item.supplierCode"></span>
                                      </v-chip>
                                    </template>
                                    <template v-slot:item="{ item }">
                                      <v-list-tile-avatar
                                        color="indigo"
                                        class=" font-weight-light white--text"
                                      >
                                      </v-list-tile-avatar>
                                      <v-list-tile-content>
                                        <v-list-tile-title v-text="item.supplierCode"></v-list-tile-title>
                                        <v-list-tile-sub-title v-text="item.supplierName"></v-list-tile-sub-title>
                                      </v-list-tile-content>
                                      <v-list-tile-action>
                                        <v-icon>supervised_user_circle</v-icon>
                                      </v-list-tile-action>
                                    </template>   
                                  </v-autocomplete>
                                </v-flex>
                              </v-layout>
                              <v-layout row>
                                <v-flex xs4 sm4 md4>
                                <p><i>Billing address</i></p>
                                <p>{{supplier.supplierCode}}</p>
                                <p>{{supplier.address1}}</p>
                                <p>{{supplier.address2}}</p>
                                <p>{{supplier.address3}} {{supplier.address4}} </p>
                                <p>{{supplier.city}} {{supplier.pincode}} {{supplier.state}} {{supplier.country}}</p>
                                </v-flex>
                              </v-layout>
                              <v-layout>
                                <v-flex xs4 sm3 md4>
                                  <v-dialog v-model="amendmentModal" persistent max-width="600px">
                                      <template v-slot:activator="{ on }">
                                        <v-btn color="primary" dark v-on="on" >Amendment</v-btn>
                                      </template>
                                      <v-card>
                                        <v-card-title>
                                          <span class="headline">Add amendment</span>
                                        </v-card-title>
                                        <v-card-text>
                                          <v-container grid-list-md>
                                            <v-layout wrap>
                                              
                                              <v-flex xs12 sm6>
                                                <v-text-field label="Date" type="text" readonly></v-text-field>
                                              </v-flex>
                                              <v-flex xs12 sm6>
                                                <v-text-field label="Number" type="text" readonly ></v-text-field>
                                              </v-flex>
                                              <v-flex xs12 sm12>
                                               <v-textarea
                                                  solo
                                                  name="input-10-4"
                                                  label="Description"
                                                  
                                                ></v-textarea>
                                              </v-flex>
                                              
                                            </v-layout>
                                          </v-container>
                                          
                                        </v-card-text>
                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn color="blue darken-1" flat @click="amendmentModal = false">Close</v-btn>
                                          <v-btn color="blue darken-1" flat @click="addAmendment()">Save</v-btn>
                                        </v-card-actions>
                                      </v-card>
                                    </v-dialog>
                                </v-flex>
                              </v-layout>


                            </v-flex>
                            <v-flex xs12 sm4 md4>
                              <vue-form-generator id="Form-generator-css" ref="vfEditHeader" :schema="headerDynamicFieldSchema" :model="headerDynamicFieldModel" :options="formOptions" @validated="onValidatedHeader"  ></vue-form-generator>
                            </v-flex>
                          </v-layout>
                        </v-container>
                     </v-expansion-panel-content>

                     <v-expansion-panel-content>
                       <v-container fluid grid-list-xl>
                          <div class="actionBlock">
                              <!-- add new row action -->
                                <v-dialog v-model="editDetailModal" scrollable persistent max-width="450px">
                                  <template v-slot:activator="{ on }">
                                    <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
                                    <v-btn fab dark small color="indigo" v-on="on"> <v-icon dark>add</v-icon> </v-btn>
                                  </template>
                                  <v-card>
                                    <v-card-title>
                                      <span class="headline">Item Details</span>
                                    </v-card-title>
                                    <v-card-text>
                                      <v-container grid-list-md>
                                        <v-layout wrap>
                                          <v-flex xs12>
                                            <v-autocomplete  v-model="selectedItem" :loading="searchItemsLoading" :items="searchItemResult" clearable
                                              :search-input.sync="searchItems"   flat  hide-no-data  hide-details label="Search Item" item-text="itemCode" item-value="itemId">

                                              <template v-slot:no-data>
                                                <v-list-tile>
                                                  <v-list-tile-title>
                                                    Search for
                                                    <strong>items</strong>
                                                  </v-list-tile-title>
                                                </v-list-tile>
                                              </template>
                                              <template v-slot:selection="{ item, selected }" >
                                                <v-chip :selected="selected" color="blue-grey"  class="white--text"
                                                >
                                                  <v-icon left>view_list</v-icon>
                                                  <span v-text="item.itemCode"></span>
                                                </v-chip>
                                              </template>
                                              <template v-slot:item="{ item }">
                                                <v-list-tile-avatar
                                                  color="indigo"
                                                  class=" font-weight-light white--text"
                                                >
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
                                          <v-flex xs12>
                                            <v-text-field label="Item Name" v-model="detailSectionModal.ITEMNAME"></v-text-field>
                                          </v-flex>
                                          <v-flex xs12>
                                            <v-text-field label="UOM"  v-model="detailSectionModal.UOM"></v-text-field>
                                          </v-flex>
                                          <v-flex xs12>
                                          <vue-form-generator id="Form-generator-css" ref="vfEditDetail" :schema="detailSectionFieldSchema" :model="detailSectionModal" :options="formOptions" @validated="onValidatedDetailSection"  ></vue-form-generator>
                                          </v-flex>
                                        </v-layout>
                                      </v-container>
                                      <small>*indicates required field</small>
                                    </v-card-text>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn color="blue darken-1" flat @click="editDetailModal = false">Close</v-btn>
                                      <v-btn color="blue darken-1" flat @click="validateOnclickDetailUpdateRecord();saveDetailData(false)">Save</v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              <!-- speed dial code -->
                              <div id="create">
                                  <v-speed-dial v-model="fab" top  direction="right"
                                    transition="slide-x-reverse-transition" >
                                    <template v-slot:activator>
                                      <v-btn v-model="fab" color="blue darken-2" dark small fab  >
                                        <v-icon>settings_input_composite</v-icon>
                                        <v-icon>close</v-icon>
                                      </v-btn>
                                    </template>
                                     <v-btn fab  dark  small color="green" @click="moveRowUpwared()">
                                      <v-icon>arrow_upward</v-icon>
                                    </v-btn>
                                    <v-btn  fab  dark  small color="indigo" @click="moveRowDownwared()" >
                                      <v-icon>arrow_downward</v-icon>
                                    </v-btn> 
                                    <v-btn fab  dark small color="red" @click="removeDetailRecord()">
                                      <v-icon>delete</v-icon>
                                    </v-btn>
                                  </v-speed-dial>
                                  <!--End speed dial code -->
                              </div>
                          </div>
                          <v-data-table
                              v-model="selected"
                              :headers="detailSectionHeader"
                              :items="detailSectionData"
                              select-all
                              item-key="SLNO"
                              class="elevation-1"
                              hide-actions
                            >
                              <template v-slot:headers="props">
                                <tr>
                                  <th></th>
                                  <th>Edit</th>
                                  <th
                                    v-for="header in props.headers"
                                    :key="header.text"
                                    :class="['column sortable', 'active']" >
                                    <b>{{ header.text.toUpperCase() }}</b>
                                  </th>
                                </tr>
                              </template>
                              <template v-slot:items="props">
                                <tr :active="props.selected" @click="props.selected = !props.selected">
                                  <td> <v-checkbox :input-value="props.selected"  primary  hide-details ></v-checkbox></td>
                                 <td> <v-icon small class="mr-2" @click="editDetailRow(props.item, false)">edit</v-icon></td>
                                    
                                  <template v-for="header in Object.keys(detailSectionModal)">
                                  <td class="text-xs-left" :key="header" v-if="header !='ITEMID' && header !='UOMID' && header !='ITEMSLNO'" >{{ props.item[header] }}</td>
                                  </template>
                                </tr>
                              </template>
                            </v-data-table>
                        </v-container>
                     </v-expansion-panel-content>

                     <v-expansion-panel-content>
                       <v-container fluid grid-list-xl>
                          <v-layout row justify-space-between>
                            <v-flex xs12 sm6 md6>
                              <vue-form-generator id="Form-generator-css" ref="vfEditFooter" :schema="footerDynamicFieldSchema" :model="footerDynamicFieldModel" :options="formOptions" @validated="onValidatedFooter"  ></vue-form-generator>
                            </v-flex>
                            <v-flex xs12 sm4 md4>
                              <vue-form-generator id="Form-generator-css" ref="vfEditTotal" :schema="totalDynamicFieldSchema" :model="totalDynamicFieldModel" :options="formOptions" @validated="onValidatedTotal"  ></vue-form-generator>
                            </v-flex>
                          </v-layout>
                        </v-container>
                     </v-expansion-panel-content>


                  </v-expansion-panel>
                </v-flex>
              </v-layout>
            </v-container>
           </v-card>
          </v-dialog>
          <!--End Edit PartyDoc Transcation Dialog -->

         <v-snackbar
        v-model="snackbar"
        :color="color"
        :multi-line="true"
        :timeout="timeout"
        :vertical="mode === 'vertical'"
      >{{ text }}
        <v-btn
          dark
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
   </v-app>
 </div>

 </template>

<script>

import httpClient from "@/services/httpClient.js"
import generateSchemaForTransaction from '@/DynamicProperty/generateSchemaForTransaction.js'
import generateNewModal from '@/DynamicProperty/generateNewModal.js'
import customeValidaton from '@/DynamicProperty/customeValidation.js'
import updateModalAfterChange from '@/DynamicProperty/updateModalAfterChange.js'
import convertDateWithSchema from '@/DynamicProperty/convertDateWithSchema.js';

export default {

 data : vm => ({
   tableSearch: '',
   partyDOCID: 0,
   partyDOCNumber: 0,
   prefix: '',
   selectedPrefix: '',
   prefixDropdown: [],
   panel: [true, true, true],
   items: 3,
   fab: false,
   date: new Date().toISOString().substr(0, 10),
   dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
   selected: [],
   partyDocHeaders: [ { text: "Edit", align: "center" } ],
   partyDocTableData: [],
   searchItemsLoading: false,
   searchItems: null,
   addSearchItems: null,
   searchSupplier: null,
   addSearchSupplier:null,
   searchItemResult: [],
   detailModal: false,
   editDetailModal: false,
   datePickerModal: false,
   addPartyDocModal: false,
   ediPartyDocModal:false,
   selectedSupplier:0,
   supplier:{
     supplierId:0,
     supplierCode:'',
     supplierName: '',
     address1:'',
     address2: '',
     address3: '',
     address4: '',
     city: '',
     pincode: '',
     state: '',
     country: ''
   },
   searchSupplierResult: [],
  formOptions: {
      validateAfterLoad: true,
      validateAfterChanged: true,
      validateAsync: true,
      validationErrorCLass :"error"
    },
    headerDynamicFieldOriginalSchema:{},
    detailSectionFieldOriginalSchema: {},
    footerDynamicFieldOriginalSchema: {},
    totalDynamicFieldOriginalSchema: {},
   headerDynamicFieldSchema: {
       fields: [],
       groups:[]
   },
   headerDynamicFieldModel: {},
   footerDynamicFieldSchema: {
       fields: [],
       groups:[]
   },
   footerDynamicFieldModel: {},
   totalDynamicFieldSchema: {
       fields: [],
       groups:[]
   },
   totalDynamicFieldModel: {},
   detailSectionHeader: [],
   detailSectionData: [],
   selectedItem:0,
   detailSectionModal:{},
   detailSectionFieldSchema: {
    fields: [],
    groups:[]
   },
    snackbar: false,
    color: '',
    mode: '',
    timeout: 5000,
    text: '',
    updatedingAnyModal:false,
    selectedID:0,
    isDynamicHeaderFormValid: true,
    isDynamicFooterFormValid: true,
    isDynamicTotalFormValid: true,
    isDetailSectionValid: true,
    isDetailRowEditing : false,
    searchPartyPrefix: '',
    searchPartyTableName: '',
    amendmentModal: false
  
 }),

  beforeMount() {
   this.panel = [...Array(this.items).keys()].map(_ => true);
   this.loadPartDocTableData();
 },
 computed: {
 computedDateFormatted () {
      return this.formatDate(this.date)
    }
 },
  watch: {
  date (val) {
      this.dateFormatted = this.formatDate(this.date)
  },
   headerDynamicFieldModel:{
     handler(val, oldVal){
       let that = this;
          //setTimeout(function () {
            if(!that.updatedingAnyModal){
              that.updatedingAnyModal = true;
              that.updatedingAnyModal= that.updateAllModalForValueChanges(false);
            }
        //  }, 2000);
        },
    deep: true
   },
   detailSectionModal:{
     handler(val, oldVal){
       let that = this;
          //setTimeout(function () {
            if(!that.updatedingAnyModal){
              that.updatedingAnyModal = true;
              that.updatedingAnyModal= that.updateAllModalForValueChanges(false);
            }
         // }, 2000);
        },
    deep: true
   },
   footerDynamicFieldModel:{
     handler(val, oldVal){
       let that = this;
         // setTimeout(function () {
            if(!that.updatedingAnyModal){
              that.updatedingAnyModal = true;
              that.updatedingAnyModal= that.updateAllModalForValueChanges(false);
            }
         // }, 2000);
        },
    deep: true
   },
   totalDynamicFieldModel: {
     handler(val, oldVal){
       let that = this;
         // setTimeout(function () {
            if(!that.updatedingAnyModal){
              that.updatedingAnyModal = true;
              that.updatedingAnyModal= that.updateAllModalForValueChanges(false);
            }
        //  }, 2000);
        },
    deep: true
   },
  searchItems(value){
    if(this.selectedSupplier == 0){
      this.showSnackBar('error','Please select supplier first');
      return false;
    }
    if(value != undefined && value != null && value != ''){
    httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}getItemByCode?itemCode=${value}`
      })
        .then((result) => {
          this.searchItemResult = result.data;
        }).catch((err) => {

          this.showSnackBar('error',err.response.data);
        });
    }
  },
  addSearchItems(value){
    if(this.selectedSupplier == 0){
      this.showSnackBar('error','Please select supplier first');
      return false;
    }
    if(value != undefined && value != null && value != ''){
    httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}getItemByCode?itemCode=${value}`
      })
        .then((result) => {
          this.searchItemResult = result.data;
        }).catch((err) => {

          this.showSnackBar('error',err.response.data);
        });
    }
  },
  searchSupplier(value){
    if(value != null && value != undefined && value != ''){
    httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}getSupplierByCode?supplierCode=${value}&partyTableName=${this.searchPartyTableName}&partyPrefix=${this.searchPartyPrefix}`
      })
        .then((result) => {
          this.searchSupplierResult = result.data;
        }).catch((err) => {

          this.showSnackBar('error',err.response.data);
        });
    }
  },
  addSearchSupplier(value){
   if(value != null && value != undefined && value != ''){
      httpClient({
          method: 'GET',
          url: `${process.env.VUE_APP_API_BASE}getSupplierByCode?supplierCode=${value}&partyTableName=${this.searchPartyTableName}&partyPrefix=${this.searchPartyPrefix}`
        })
          .then((result) => {
            this.searchSupplierResult = result.data;
          }).catch((err) => {

            this.showSnackBar('error',err.response.data);
          });
      }
  },
  selectedSupplier: function(val){
    let supplierData = this.searchSupplierResult.find(e=> e.supplierId == val);
    if(supplierData != undefined && supplierData != null){
      this.supplier= supplierData;
      console.log('selected supplier='+ JSON.stringify(this.supplier));
      this.updateAllModalForValueChanges(true);
    } else{
      this.selectedSupplier =0;
      this.supplier = {
        supplierId:0,
        supplierCode:'',
        supplierName: '',
        address1:'',
        address2: '',
        address3: '',
        address4: '',
        city: '',
        pincode: '',
        state: '',
        country: ''
      };
    }
  },
  selectedItem: function(val){
    let itemData = this.searchItemResult.find(e => e.itemId == val);
    console.log('selected item='+JSON.stringify(itemData));
    this.updateAllModalForValueChanges(true);
    if(itemData != undefined && itemData != null){
      this.detailSectionModal.ITEMID= itemData.itemId;
      this.detailSectionModal.ITEMCODE= itemData.itemCode;
      this.detailSectionModal.ITEMNAME= itemData.itemName;
      this.detailSectionModal.UOMID = itemData.UOMID;
      this.detailSectionModal.UOM= itemData.UOM;
    } else{
      this.selectedItem = 0;
      if(this.detailSectionModal.hasOwnProperty('ITEMNAME')){
        this.detailSectionModal.ITEMNAME = '';
        this.detailSectionModal.UOMID = 0;
        this.detailSectionModal.UOM = '';
      }
    }
  },
 },

 methods:{
     /* ******************* Main table functions ************************* */
     loadPartDocTableData(){
      const docID =  localStorage.getItem('menuDocId') || 0;
      this.partyDocHeaders= [ { text: "Edit", align: "center",sortable: false } ],
      this.partyDocHeadersKey = [];
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}PartyDocTranscation?docID=${docID}`
      })
        .then((result) => {
            if (result.status === 200) {
            const pageData = result.data;
            /**
             * Logic for putting data into data table::
             */
            this.preFix = pageData.prefix;
            let partyDocHeadersKey = Object.keys(pageData.tableData[0]);
            partyDocHeadersKey.forEach(element => {
            this.partyDocHeaders.push({ text: element, align: "center", value: element })
            })
            this.partyDocTableData = pageData.tableData;
          }
        }).catch((err) => {

          this.showSnackBar('error',err.response.data);
        });
    },
     editSelectedPartyDocTranscation(params){

       if(this.getCurrentUserRoles('editRight') != '1')
       {
         this.showSnackBar('error',"You do not have edit rights on the page.");
         return
       }
       this.resetFromVariable();
       this.detailSectionModal = {};
       this.detailSectionHeader = [];
       this.detailSectionData = [];
       this.selectedID = params[Object.keys(params)[0]];
       const docID =  localStorage.getItem('menuDocId') || 0;

      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}PartyDocTranscation?selectedID=${this.selectedID}&docID=${docID}`
      })
        .then((result) => {
          this.ediPartyDocModal = true;
          this.prefix =result.data.prefix;
          
          const pageData = result.data;
          // main data load
          this.searchSupplierResult = [{supplierId:pageData.mainData.supplierId,supplierCode: pageData.mainData.partyName,supplierName:pageData.mainData.partyName,address1:pageData.mainData.partyAddress1,address2:pageData.mainData.partyAddress2,addres3:pageData.mainData.partyAddress3,address4:pageData.mainData.partyAddress4,city: pageData.mainData.city,pincode:pageData.mainData.PinCode,state:pageData.mainData.state,country: pageData.mainData.country }];
          this.selectedSupplier = pageData.mainData.supplierId;
          this.partyDOCNumber = pageData.mainData.printPONO;
          this.searchPartyTableName = pageData.mainData.docPartyTableName;
          this.searchPartyPrefix = pageData.mainData.docPartyPrefix;
          this.date = new Date(this.parseDate(pageData.mainData.PODate)).toISOString().substr(0, 10);
          this.selectedPrefix = pageData.mainData.docPrefix;
          this.prefixDropdown = pageData.prefixData;

          //console.log(JSON.stringify(pageData.headerFields.dynamicFieldModal.fieldProperties));
          if(pageData.headerFields.dynamicFieldModal.modal.length > 0){
          this.headerDynamicFieldModel = pageData.headerFields.dynamicFieldModal.modal[0];
          this.headerDynamicFieldOriginalSchema = pageData.headerFields.dynamicFieldModal.fieldProperties;
          }
          
         
          let modalData = JSON.parse(JSON.stringify(pageData.detailFields.dynamicFieldModal.modal[0]));
          this.detailSectionModal =JSON.parse(JSON.stringify(generateNewModal(pageData.detailFields.dynamicFieldModal.fieldProperties,modalData)));
          this.detailSectionFieldOriginalSchema = pageData.detailFields.dynamicFieldModal.fieldProperties;
          
          // reset detail section modal
          this.resetDetailSectionModal(this.detailSectionModal);
          this.generateDetailSectionTableHeader(this.detailSectionModal);
          this.detailSectionData = pageData.detailFields.dynamicFieldModal.modal;
          console.log('detail section data after load='+ JSON.stringify(this.detailSectionData));

          this.footerDynamicFieldModel = pageData.footerFields.dynamicFieldModal.modal[0];
          this.footerDynamicFieldOriginalSchema = pageData.footerFields.dynamicFieldModal.fieldProperties;
          

          this.totalDynamicFieldModel = pageData.totalFields.dynamicFieldModal.modal[0];
          this.totalDynamicFieldOriginalSchema = pageData.totalFields.dynamicFieldModal.fieldProperties;
          

          //generate schemas
          this.headerDynamicFieldSchema.fields =  generateSchemaForTransaction(pageData.headerFields.dynamicFieldModal.fieldProperties, this.headerDynamicFieldModel,pageData.detailFields.dynamicFieldModal.modal[0],this.footerDynamicFieldModel, this.totalDynamicFieldModel);
          this.detailSectionFieldSchema.fields = generateSchemaForTransaction(pageData.detailFields.dynamicFieldModal.fieldProperties,this.headerDynamicFieldModel, pageData.detailFields.dynamicFieldModal.modal[0],this.footerDynamicFieldModel, this.totalDynamicFieldModel);
          this.footerDynamicFieldSchema.fields = generateSchemaForTransaction(pageData.footerFields.dynamicFieldModal.fieldProperties,this.headerDynamicFieldModel,pageData.detailFields.dynamicFieldModal.modal[0], this.footerDynamicFieldModel, this.totalDynamicFieldModel);
          this.totalDynamicFieldSchema.fields = generateSchemaForTransaction(pageData.totalFields.dynamicFieldModal.fieldProperties,this.headerDynamicFieldModel,pageData.detailFields.dynamicFieldModal.modal[0],this.footerDynamicFieldModel, this.totalDynamicFieldModel);
          
          convertDateWithSchema(this.headerDynamicFieldOriginalSchema,this.headerDynamicFieldModel, false);
          convertDateWithSchema(this.footerDynamicFieldOriginalSchema,this.footerDynamicFieldModel,false);
          convertDateWithSchema(this.totalDynamicFieldOriginalSchema,this.totalDynamicFieldModel,false);

        }).catch((err) => {

          this.showSnackBar('error',err.response.data);
        });
     },

    /* *******************End  Main table functions ************************* */


    /* ****************** New Record Save Functions ************************* */

  loadSchemaForNewPartyDocTranscation(){
       this.getDocNumber();
       this.resetFromVariable();
       this.detailSectionModal = {
         SLNO: 0,
         ITEMID: 0,
         ITEMCODE: '',
         ITEMNAME: '',
         UOMID:0,
         ITEMSLNO:0,
         UOM:''
         
       };
       this.detailSectionHeader = [];
       this.detailSectionData = [];
       this.selectedID = 0;
       const docID =  localStorage.getItem('menuDocId') || 0;

      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}PartyDocTranscation?docID=${docID}&type=0`
      })
        .then((result) => {
          this.addPartyDocModal = true;
          this.prefix =result.data.prefix;
          
          const pageData = result.data;

          this.prefixDropdown =  pageData.prefixData;
          this.searchPartyTableName = pageData.mainData.docPartyTableName;
          this.searchPartyPrefix = pageData.mainData.docPartyPrefix;
         
          if(pageData.headerFields.dynamicFieldModal.modal !=null ){
          this.headerDynamicFieldModel = generateNewModal(pageData.headerFields.dynamicFieldModal.fieldProperties,pageData.headerFields.dynamicFieldModal.modal);
          this.headerDynamicFieldOriginalSchema = pageData.headerFields.dynamicFieldModal.fieldProperties;
          
          }
          
          this.detailSectionModal ={ ...this.detailSectionModal,...JSON.parse(JSON.stringify(generateNewModal(pageData.detailFields.dynamicFieldModal.fieldProperties,pageData.detailFields.dynamicFieldModal.modal)))};
          this.detailSectionFieldOriginalSchema = pageData.detailFields.dynamicFieldModal.fieldProperties;
          
          // reset detail section modal
          this.resetDetailSectionModal(this.detailSectionModal);
          this.generateDetailSectionTableHeader(this.detailSectionModal);


         if(pageData.footerFields.dynamicFieldModal.modal !=null){
          
          this.footerDynamicFieldModel =generateNewModal(pageData.footerFields.dynamicFieldModal.fieldProperties, pageData.footerFields.dynamicFieldModal.modal);
          this.footerDynamicFieldOriginalSchema = pageData.footerFields.dynamicFieldModal.fieldProperties;
          
         }
         if(pageData.totalFields.dynamicFieldModal.modal !=null){
          this.totalDynamicFieldModel =generateNewModal(pageData.totalFields.dynamicFieldModal.fieldProperties,pageData.totalFields.dynamicFieldModal.modal);
          this.totalDynamicFieldOriginalSchema = pageData.totalFields.dynamicFieldModal.fieldProperties;
          
         }


         //generate schemas
          this.headerDynamicFieldSchema.fields = generateSchemaForTransaction(pageData.headerFields.dynamicFieldModal.fieldProperties, this.headerDynamicFieldModel,pageData.detailFields.dynamicFieldModal.modal, this.footerDynamicFieldModel, this.totalDynamicFieldModel);
          this.detailSectionFieldSchema.fields = generateSchemaForTransaction(pageData.detailFields.dynamicFieldModal.fieldProperties,this.headerDynamicFieldModel, pageData.detailFields.dynamicFieldModal.modal, this.footerDynamicFieldModel, this.totalDynamicFieldModel);
          this.footerDynamicFieldSchema.fields = generateSchemaForTransaction(pageData.footerFields.dynamicFieldModal.fieldProperties,this.headerDynamicFieldModel,pageData.detailFields.dynamicFieldModal.modal, this.footerDynamicFieldModel, this.totalDynamicFieldModel);
          this.totalDynamicFieldSchema.fields = generateSchemaForTransaction(pageData.totalFields.dynamicFieldModal.fieldProperties,this.headerDynamicFieldModel,pageData.detailFields.dynamicFieldModal.modal, this.footerDynamicFieldModel, this.totalDynamicFieldModel);


        }).catch((err) => {

          this.showSnackBar('error',err.response.data);
        });
     },
     getDocNumber(){
       const docID =  localStorage.getItem('menuDocId') || 0;

        httpClient({
          method: 'GET',
          url: `${process.env.VUE_APP_API_BASE}getDocNumber?docID=${docID}&prefix=${this.selectedPrefix}`
        })
        .then((result) => {

            this.partyDOCNumber = result.data;

            }).catch((err) => {

            this.showSnackBar('error',err.response.data);
        });
     },
     generateDetailSectionTableHeader(model){
        for (var property in model) {
          if(property != "ITEMID" && property != "UOMID" && property != "ITEMSLNO"){
            this.detailSectionHeader.push({text: property,value: property});
          }
        }
     },
     saveDetailData(isSaveNewRecord){
       if(!this.isDetailRowEditing){
         this.detailSectionModal.SLNO = this.detailSectionData.length + 1;
        this.detailSectionModal.ITEMSLNO = this.detailSectionData.length + 1;
       }
     
      let data = JSON.parse(JSON.stringify(this.detailSectionModal));
      let that = this;
      setTimeout(function(){
        if(that.isDetailSectionValid){
              if(isSaveNewRecord){
                that.detailModal = false;
              } else{ 
                that.editDetailModal = false;
              }
              if(!that.isDetailRowEditing){
                that.detailSectionData.push(data);
              } else{
                that.isDetailRowEditing = false;
                that.selected = [];
                that.detailSectionData =JSON.parse(JSON.stringify(that.detailSectionData));
              }
            
            that.resetDetailSectionModal(that.detailSectionModal);
            } else{
            that.showSnackBar('error','Please fill all mandatory fields');
            }
      }, 500);     
    },
    editDetailRow(row, isSaveNewRecord){
      this.isDetailRowEditing = true;
      this.detailSectionModal = row;
      this.selectedItem = row.ITEMID;
      this.searchItemResult = [
        {
          itemId: row.ITEMID,
          itemCode:row.ITEMNAME,
          itemName:row.ITEMNAME,
          UOMID:row.UOMID,
          UOM:row.UOM
        }];

      if(isSaveNewRecord){
        this.detailModal = true;
      } else{
        this.editDetailModal = true;
      }
    },
    removeDetailRecord(){
      if(this.selected.length == 0){
        alert('select a row');
        return false;
      }
      this.selected.forEach(element => {
        var item = this.detailSectionData.findIndex(x =>  x.SLNO == element.SLNO);
        if(item>=0){
          this.detailSectionData.splice(item,1);
        }
      });
      this.detailSectionData.forEach(function (value, i) {
         value.SLNO = i+1;
         value.ITEMSLNO = i+1;
      });

      this.selected = [];
      this.updateAllModalForValueChanges(false);
    },
    moveRowUpwared(){
      if(this.selected.length > 1){
        alert('selecte only one row');
        return false;
      }
      if(this.selected.length == 0){
        alert('select a row');
        return false;
      }
      let index = this.detailSectionData.findIndex(x => x.SLNO == this.selected[0].SLNO);
      if(index >=0 && this.detailSectionData.length > 0){
        let temp = this.detailSectionData[index-1];
        let temp1 = this.detailSectionData[index];
        console.log('row uptemp='+JSON.stringify(temp));
        this.detailSectionData[index-1] = temp1;
        this.detailSectionData[index]= temp;
      }
       this.detailSectionData.forEach(function (value, i) {
         value.SLNO = i+1;
         value.ITEMSLNO = i+1;
      });
      let tempData = JSON.parse(JSON.stringify(this.detailSectionData));
      this.detailSectionData = [];
      this.detailSectionData = tempData;
      this.selected = [];

    },
    moveRowDownwared(){
     if(this.selected.length > 1){
        alert('selecte only one row');
        return false;
      }
      if(this.selected.length == 0){
        alert('select a row');
        return false;
      }
      let index = this.detailSectionData.findIndex(x => x.slno == this.selected[0].slno);
       if(index >=0 && this.detailSectionData.length > 0){
          let temp = this.detailSectionData[index+1];
          this.detailSectionData[index+1] = this.detailSectionData[index];
          this.detailSectionData[index]= temp;
       }
      this.detailSectionData.forEach(function (value, i) {
         value.SLNO = i+1;
         value.ITEMSLNO = i+1;
      });
      console.log('detail'+JSON.stringify(this.detailSectionData));
      let tempData = JSON.parse(JSON.stringify(this.detailSectionData));
      this.detailSectionData = [];
      this.detailSectionData = tempData;
      this.selected = [];
    },
    savePartyDocHDRTableData(){
      this.validateOnclickSaveNewRecord();
      if(this.validateStaticFields() && this.isDynamicHeaderFormValid && this.isDynamicFooterFormValid && this.isDynamicTotalFormValid && this.detailSectionData.length > 0){

        let partDocFixedFields ={};
        partDocFixedFields[this.prefix+"NO"] = this.partyDOCNumber;
        partDocFixedFields["Print"+this.prefix+"NO"] = this.partyDOCNumber;
        partDocFixedFields[this.prefix+"Date"]=this.parseAsDBDate(this.dateFormatted);
        partDocFixedFields[this.searchPartyPrefix+"ID"]= this.supplier.supplierId;
        partDocFixedFields["PartyName"] = this.supplier.supplierName;
        partDocFixedFields["PartyAdd1"] = this.supplier.address1;
        partDocFixedFields["PartyAdd2"] = this.supplier.address2;
        partDocFixedFields["PartyAdd3"] = this.supplier.address3;
        partDocFixedFields["PartyAdd4"] = this.supplier.address4;
        partDocFixedFields["PartyCity"] = this.supplier.city;
        partDocFixedFields["PartyState"] = this.supplier.state;
        partDocFixedFields["PartyPinCode"] = this.supplier.pincode;
        partDocFixedFields["PartyCountry"] = this.supplier.country;

        
        let header =JSON.parse(JSON.stringify(this.headerDynamicFieldModel));
        let footer =JSON.parse(JSON.stringify(this.footerDynamicFieldModel));
        let total = JSON.parse(JSON.stringify(this.totalDynamicFieldModel));
        convertDateWithSchema(this.headerDynamicFieldOriginalSchema,header, true);
        convertDateWithSchema(this.footerDynamicFieldOriginalSchema, footer,true);
        convertDateWithSchema(this.totalDynamicFieldOriginalSchema,total,true);

          partDocFixedFields = {...partDocFixedFields,...header,...footer,...total};
        
        const updateParams = {
          docID: localStorage.getItem('menuDocId') || 0, 
          userID: localStorage.getItem('userId') || 0,
          hdrFields: partDocFixedFields
        }

        httpClient({
          method: 'POST',
          url: `${process.env.VUE_APP_API_BASE}PartyDocTranscation`,
          data: updateParams
        })
        .then((result) => {
            this.savePartyDocDTLTableData(result.data);
          }).catch((err) => {
            this.showSnackBar('error',err.response.data);
        });
      }else{
        this.showSnackBar('error','Please fill all mandatory fields');
      }

    },
    savePartyDocDTLTableData(selectedId){

       let query= this.createDetailSectionQueries(selectedId)
      

       httpClient({
        method: 'POST',
        url: `${process.env.VUE_APP_API_BASE}PartyDocTranscation?query=${query}`,
       })
       .then((result) => {
          this.showSnackBar('success',result.data);
          this.addPartyDocModal = false;
          this.loadPartDocTableData();
        }).catch((err) => {
          this.showSnackBar('error',err.response.data);
       });
    },
     onValidatedAddDetailSection:function(isValid,error){
        console.log("Validation detil section result: ", isValid, ", Errors:", error);
      if(this.detailSectionFieldOriginalSchema != null){
           customeValidaton(this.detailSectionFieldOriginalSchema,this.detailSectionFieldSchema.fields,this.detailSectionFieldSchema.groups,this.detailSectionModal);
       }

       if(this.detailSectionModal.hasOwnProperty('SLNO')){
        if(this.detailSectionModal.SLNO == 0   && !this.detailModal){ this.isDetailSectionValid = true;}
        else if((this.detailSectionModal.ITEMID == 0 ||this.detailSectionModal.ITEMID == '' || this.detailSectionModal.ITEMID ==null || this.detailSectionModal.ITEMID == undefined)
        ||(this.detailSectionModal.ITEMNAME == '' || this.detailSectionModal.ITEMNAME == null || this.detailSectionModal.ITEMNAME == undefined)
        ||(this.detailSectionModal.UOM =='' || this.detailSectionModal.UOM == null || this.detailSectionModal.UOM == undefined) || isValid == false ){
          this.isDetailSectionValid = false;
        } else{
          this.isDetailSectionValid = true;
        }
      }  else{
        if(this.detailSectionData.length == 0){
          this.isDetailSectionValid = false;
        }else{
          this.isDetailSectionValid = true;
        }
        
      }
      return this.isDetailSectionValid;
    },
    onValidatedAddHeader: function(isValid, error) {
      console.log("Validation add header result: ", isValid, ", Errors:", error);
       if(this.headerDynamicFieldOriginalSchema != null){
           customeValidaton(this.headerDynamicFieldOriginalSchema,this.headerDynamicFieldSchema.fields,this.headerDynamicFieldSchema.groups,this.headerDynamicFieldModel);
       }
      this.isDynamicHeaderFormValid = isValid;
    },
    onValidatedAddFooter: function(isValid, error) {
      console.log("Validation add footer result: ", isValid, ", Errors:", error);
       if(this.footerDynamicFieldOriginalSchema != null){
           customeValidaton(this.footerDynamicFieldOriginalSchema,this.footerDynamicFieldSchema.fields,this.footerDynamicFieldSchema.groups,this.footerDynamicFieldModel);
       }
      this.isDynamicFooterFormValid = isValid;
    },
    onValidatedAddTotal: function(isValid, error) {
      console.log("Validation add total result: ", isValid, ", Errors:", error);
       if(this.totalDynamicFieldOriginalSchema != null){
           customeValidaton(this.totalDynamicFieldOriginalSchema,this.totalDynamicFieldSchema.fields,this.totalDynamicFieldSchema.groups,this.totalDynamicFieldModel);
       }
      this.isDynamicTotalFormValid = isValid;
    },


    /* ****************** End New Record Save Functions *********************  */


    /* ****************** Update Record Function ************************** */
    updatePartyDoc(){

     this.validateOnclickUpdateRecord();
      if(this.validateStaticFields() && this.isDynamicHeaderFormValid && this.isDynamicFooterFormValid  && this.isDynamicTotalFormValid  && this.detailSectionData.length > 0){

          let partDocFixedFields ={};
          partDocFixedFields[this.searchPartyPrefix+"ID"]= this.supplier.supplierId;
          partDocFixedFields["PartyName"] = this.supplier.supplierName;
          partDocFixedFields["PartyAdd1"] = this.supplier.address1;
          partDocFixedFields["PartyAdd2"] = this.supplier.address2;
          partDocFixedFields["PartyAdd3"] = this.supplier.address3;
          partDocFixedFields["PartyAdd4"] = this.supplier.address4;
          partDocFixedFields["PartyCity"] = this.supplier.city;
          partDocFixedFields["PartyState"] = this.supplier.state;
          partDocFixedFields["PartyPinCode"] = this.supplier.pincode;
          partDocFixedFields["PartyCountry"] = this.supplier.country;

          let header =JSON.parse(JSON.stringify(this.headerDynamicFieldModel));
          let footer =JSON.parse(JSON.stringify(this.footerDynamicFieldModel));
          let total = JSON.parse(JSON.stringify(this.totalDynamicFieldModel));
          convertDateWithSchema(this.headerDynamicFieldOriginalSchema,header, true);
          convertDateWithSchema(this.footerDynamicFieldOriginalSchema, footer,true);
          convertDateWithSchema(this.totalDynamicFieldOriginalSchema,total,true);

          partDocFixedFields = {...partDocFixedFields,...header,...footer,...total};
          
          const updateParams = {
            docID: localStorage.getItem('menuDocId') || 0, 
            userID: localStorage.getItem('userId') || 0,
            selectedId : this.selectedID,
            hdrFields: partDocFixedFields,
            dtlFields: this.createDetailSectionQueries(this.selectedID)
          }

          httpClient({
            method: 'PUT',
            url: `${process.env.VUE_APP_API_BASE}PartyDocTranscation`,
            data: updateParams
          })
          .then((result) => {
              this.showSnackBar('success',result.data);
            }).catch((err) => {
              this.showSnackBar('error',err.response.data);
          });
      } else{
        this.showSnackBar('error','Please fill all mandatory fields!');
      }

    },
    onValidatedHeader: function(isValid, error) {
      console.log("Validation result: ", isValid, ", Errors:", error);
       if(this.headerDynamicFieldOriginalSchema != null){
           customeValidaton(this.headerDynamicFieldOriginalSchema,this.headerDynamicFieldSchema.fields,this.headerDynamicFieldSchema.groups,this.headerDynamicFieldModel);
       }
      this.isDynamicHeaderFormValid = isValid;
    },
    onValidatedFooter: function(isValid, error) {
      console.log("Validation result: ", isValid, ", Errors:", error);
       if(this.footerDynamicFieldOriginalSchema != null){
           customeValidaton(this.footerDynamicFieldOriginalSchema,this.footerDynamicFieldSchema.fields,this.footerDynamicFieldSchema.groups,this.footerDynamicFieldModel);
       }
      this.isDynamicFooterFormValid = isValid;
    },
    onValidatedTotal: function(isValid, error) {
      console.log("Validation result: ", isValid, ", Errors:", error);
       if(this.totalDynamicFieldOriginalSchema != null){
           customeValidaton(this.totalDynamicFieldOriginalSchema,this.totalDynamicFieldSchema.fields,this.totalDynamicFieldSchema.groups,this.totalDynamicFieldModel);
       }
      this.isDynamicTotalFormValid = isValid;
    },
    onValidatedDetailSection:function(isValid,error){
      console.log('detail section validation='+isValid);
      if(this.detailSectionFieldOriginalSchema != null){
           customeValidaton(this.detailSectionFieldOriginalSchema,this.detailSectionFieldSchema.fields,this.detailSectionFieldSchema.groups,this.detailSectionModal);
       }
      if(this.detailSectionModal.hasOwnProperty('SLNO')){
        if(this.detailSectionModal.SLNO == 0   && !this.editDetailModal){ this.isDetailSectionValid = true;}
        else if((this.detailSectionModal.ITEMID == 0 ||this.detailSectionModal.ITEMID == '' || this.detailSectionModal.ITEMID ==null || this.detailSectionModal.ITEMID == undefined)
        ||(this.detailSectionModal.ITEMNAME == '' || this.detailSectionModal.ITEMNAME == null || this.detailSectionModal.ITEMNAME == undefined)
        ||(this.detailSectionModal.UOM =='' || this.detailSectionModal.UOM == null || this.detailSectionModal.UOM == undefined) || isValid == false ){
          this.isDetailSectionValid = false;
        } else{
          this.isDetailSectionValid = true;
        }
      } else{
        if(this.detailSectionData.length == 0){
          this.isDetailSectionValid = false;
        }else{
          this.isDetailSectionValid = true;
        }
      }
      return this.isDetailSectionValid;
    },

    /* ****************** End Update Record Funtion *********************** */

    /* ***************** Common Methods ********************************* */
    validateStaticFields(){
      if(this.dateFormatted =="" || this.dateFormatted == null || this.dateFormatted == undefined){
        return false;
      }
      if(this.selectedSupplier == 0 || this.selectedSupplier =='' || this.selectedSupplier == null || this.selectedSupplier == undefined){
        return false;
      }
      return true;
    },
    createDetailSectionQueries(selecteId){
      let finalQuery ="";
      this.detailSectionData.forEach(element => {
        let Columns="",Values="";
       let query="insert into TrnDtl"+this.prefix+" (";
        for (var key in element) {
          if(key !='ITEMCODE' && key !="ITEMNAME" && key !='UOM' ){
            Columns+= key;
            Columns+=",";
            Values += "'"+element[key]+"'";
            Values += ","
          }
        }
        query += Columns+" "+ this.prefix+"ID) values("+Values+""+selecteId+");"
        finalQuery +=query;
      });

      return finalQuery;
    },
    resetDetailSectionModal(model){
      this.selectedItem= 0;
       if(model){
        for (var property in model) {
          if( typeof model[property] === "number"){
            model[property]= 0;
          }
          if(typeof model[property] === "string"){
            model[property] = "";
          }
        }
       }
     },
     resetFromVariable(){
      this.partyDOCID = "";
      this.partyDOCNumber = "";
      this.prefixDropdown = [];
      this.preFix= "";
      this.selectedItem =0;
      this.searchItemResult = [];
      this.searchSupplierResult = [];
      this.selectedSupplier ="";
      this.supplier = {
        supplierId:0,
        supplierCode:'',
        supplierName: '',
        address1:'',
        address2: '',
        address3: '',
        address4: '',
        city: '',
        pincode: '',
        state: '',
        country: ''
      };
    },
    addAmendment(){
      
    },
    updateAllModalForValueChanges(callQueries){
      updateModalAfterChange(this.headerDynamicFieldOriginalSchema,this.headerDynamicFieldModel,this.detailSectionModal,this.footerDynamicFieldModel, this.totalDynamicFieldModel, this.detailSectionData,'header', this.supplier.supplierCode,callQueries);
      updateModalAfterChange(this.detailSectionFieldOriginalSchema,this.headerDynamicFieldModel,this.detailSectionModal,this.footerDynamicFieldModel, this.totalDynamicFieldModel, this.detailSectionData,'detail', this.supplier.supplierCode,callQueries);
      updateModalAfterChange(this.footerDynamicFieldOriginalSchema,this.headerDynamicFieldModel,this.detailSectionModal,this.footerDynamicFieldModel, this.totalDynamicFieldModel, this.detailSectionData,'footer', this.supplier.supplierCode,callQueries);
      updateModalAfterChange(this.totalDynamicFieldOriginalSchema,this.headerDynamicFieldModel,this.detailSectionModal,this.footerDynamicFieldModel, this.totalDynamicFieldModel, this.detailSectionData,'total', this.supplier.supplierCode,callQueries);
    },
    validateOnclickSaveNewRecord: function($event) {
     console.log('Validating', this.$refs);
      this.$refs.vfAddHeader.validate();
      this.$refs.vfAddFooter.validate();
      this.$refs.vfAddTotal.validate();
    },
    validateOnclickDetailSaveNewRecord(){
      var error = this.$refs.vfAddDetail.validate();
    },
    validateOnclickUpdateRecord: function($event) {
     console.log('Validating', this.$refs);
      this.$refs.vfEditHeader.validate();
      this.$refs.vfEditFooter.validate();
      this.$refs.vfEditTotal.validate();
    },
    validateOnclickDetailUpdateRecord(){
      var error = this.$refs.vfEditDetail.validate();
    },
    showSnackBar(type,message){
      this.snackbar = true;
      this.color = type;
      this.text = message;
    },
   formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null
      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    parseAsDBDate(date){
      if (!date) return null
      const [days, months, years] = date.split('/')
      return `${months}/${days}/${years}`
    },
    getCurrentUserRoles(type){
      switch(type){
        case "addRight": return localStorage.getItem('addRight') || 0;
          break;
        case "editRight": return localStorage.getItem('editRight') || 0;
          break;
        case "deleteRight": return localStorage.getItem('deleteRight') || 0;
          break;
        case "printRight": return localStorage.getItem('printRight') || 0;
          break;
        case "viewRight": return localStorage.getItem('viewRight') || 0;
          break;
        case "authRight": return localStorage.getItem('authRight') || 0;
          break;
        case "auth1Right": return localStorage.getItem('auth1Right') || 0;
          break;
        case "option1Right": return localStorage.getItem('option1Right') || 0;
          break;
        case "option2Right": return localStorage.getItem('option2Right') || 0;
          break;
        case "option3Right": return localStorage.getItem('option3Right') || 0;
          break;
        case "option4Right": return localStorage.getItem('option4Right') || 0;
          break;
        case "option5Right": return localStorage.getItem('option5Right') || 0;
          break;
      }
    }

    /* ***************** End Common Methods ***************************** */
 }

}

</script>

<style>

.actionBlock{
 position: relative;
}

#create .v-speed-dial {
 position: absolute;
 top: 0px;
 left: 68px;
}

#create .v-btn--floating {
 position: relative;

}

</style>