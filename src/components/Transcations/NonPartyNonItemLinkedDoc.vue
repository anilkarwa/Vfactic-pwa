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
        <v-data-table :headers="partyDocHeaders" :search="tableSearch" :items="partyDocTableData" :pagination.sync="pagination" class="elevation-1">
          <template slot="items" slot-scope="props">
            <tr>
            <td class="justify-center layout px-0">
              <v-icon small class="mr-2" v-if="getCurrentUserRoles('editRight') == '1'"  @click="editSelectedPartyDocTranscation(props.item)">edit</v-icon>
              <v-icon v-if="getCurrentUserRoles('viewRight') == '1'" small class="mr-2" @click="viewPdf(props.item)">picture_as_pdf</v-icon>
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
        <!-- Pdf viewer modal -->
          <v-dialog v-model="pdfDailog" fullscreen hide-overlay transition="dialog-bottom-transition">
              <v-card>
                <v-toolbar dark color="primary">
                  <v-btn icon dark @click="pdfDailog = false">
                    <v-icon>close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Document Preview</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                   <iframe 
                      :src="pdfUrl"
                      height="600"
                      width="100%"
                      type="application/pdf"
                      frameborder="0"
                    ></iframe>
                     <!-- <pdf :src="pdf" :page="1">
                      <template slot="loading">
                        loading content here...
                      </template>
                    </pdf> -->
              </v-card>
            </v-dialog>
      <!--End Pdf viewer modal -->

       <!-- Add PartyDoc Transcation Dialog -->
          <v-dialog  v-model="addPartyDocModal"   fullscreen  hide-overlay  transition="dialog-bottom-transition" >
           <v-card>
              <v-toolbar fixed dark color="primary">
                <v-btn icon dark @click="addPartyDocModal = false">
                  <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>{{$store.state.pageName}} - Add</v-toolbar-title>
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
                              <v-flex xs3 sm3 md3> <v-select v-model="selectedPrefix"  :items="prefixDropdown" item-value="prefix" item-text="prefix" label="Prefix" @change="getDocNumber()"></v-select></v-flex>
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
                             <v-layout>
                                 <v-flex xs4 sm5 md5>
                                  <v-btn round color="primary" dark  @click="loadPendingForTransactions()">Load Pending</v-btn>
                                  <v-dialog v-model="dialogLoadPening" scrollable persistent max-width="80%">
                                  
                                    <v-card>
                                      <v-card-title>
                                        <span class="headline">Pending Transactions</span>
                                      </v-card-title>
                                      <v-card-text>
                                       <div style="width:200px;margin-bottom:12px;">
                                        <v-text-field  v-model="pendingTableSearch"  append-icon="search"  label="Search" single-line  hide-details  ></v-text-field>
                                       </div>
                                        <v-data-table  :headers="loadPendingHeaders" :search="pendingTableSearch"  :items="loadPendingData"
                                            item-key="SLNO"   class="elevation-1"  hide-actions  >
                                            <template v-slot:headers="props">
                                              <tr>
                                                <th
                                                  v-for="header in props.headers"
                                                  :key="header.text"
                                                  :class="['column sortable', 'active']" >
                                                  <b>{{ header.text}}</b>
                                                </th>
                                              </tr>
                                            </template>
                                            <template v-slot:items="props">
                                              <tr>
                                                <template v-for="header in Object.keys(loadPendingData[0])">
                                                <td class="text-xs-left" :key="header" v-if="header !='ITEMID' && header !=dependentPrefix+'ID' && header !='ITEMSLNO' && header != 'ITEMROWID' && header != 'CONVFACT' && header !=dependentPrefix+'ITEMSLNO' "
                                                @click="selectPendingRowForCoping(props.item)" @dblclick="selectedSingleRowForPendingTransaction(props.item)" >
                                                {{ props.item[header] }}</td>
                                                </template>
                                              </tr>
                                            </template>
                                          </v-data-table>     

                                          <br/>
                                          <v-btn round color="primary" style="float:left" dark  @click="selectAllPendingTransactions()">Select All Items</v-btn>
                                          <v-btn round color="primary" style="float:left" dark  @click="SelectedAllTranscationForSelectedID()">Select All of {{selectedPendingRowID}}</v-btn>
                                          <br/>
                                         

                                          <v-data-table  :headers="loadPendingHeaders"  :items="loadPendingSelectedData"
                                            item-key="SLNO"   class="elevation-1"  hide-actions  >
                                            <template v-slot:headers="props">
                                              <tr>
                                                <th
                                                  v-for="header in props.headers"
                                                  :key="header.text"
                                                  :class="['column sortable', 'active']" >
                                                  <b>{{ header.text}}</b>
                                                </th>
                                              </tr>
                                            </template>
                                            <template v-slot:items="props">
                                              <tr>
                                                <template v-for="header in Object.keys(loadPendingData[0])">
                                                <td class="text-xs-left" :key="header" v-if="header !='ITEMID' && header !=dependentPrefix+'ID' && header !='ITEMSLNO' && header != 'ITEMROWID' && header !='CONVFACT' && header !=dependentPrefix+'ITEMSLNO' "
                                                 @dblclick="removeSelectedRowFromSelectedData(props.item)" >
                                                {{ props.item[header] }}</td>
                                                </template>
                                              </tr>
                                            </template>
                                          </v-data-table>       
                                            <br/>
                                          <v-btn round color="primary" dark style="float:left"  @click="removeAllRowForSelectedData()">Remove All Items</v-btn>
                                          <v-btn round color="primary" dark style="float:left"  @click="removeAllOfSelectedID()">Remove All of {{selectedPendingRowID}}</v-btn>
                                            <br/>
                                      </v-card-text>
                                      <v-card-actions>
                                        <v-btn color="blue darken-1" flat @click="dialogLoadPening = false">Close</v-btn>
                                        <v-btn color="blue darken-1" flat @click="copySelectedRowToDetailSection()">OK</v-btn>
                                      </v-card-actions>
                                    </v-card>
                                  </v-dialog>
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
                                    <!-- <v-btn fab dark small color="indigo" v-on="on"> <v-icon dark>add</v-icon> </v-btn> -->
                                  </template>
                                  <v-card>
                                    <v-card-title>
                                      <span class="headline">Item Details</span>
                                    </v-card-title>
                                    <v-card-text>
                                      <v-container grid-list-md>
                                        <v-layout wrap>
                                           <v-flex xs12>
                                            <v-text-field readonly :label="dependentPrefix+' No'"  v-model="detailSectionModal[dependentPrefix+'NO']"></v-text-field>
                                          </v-flex>
                                           <v-flex xs12>
                                            <v-text-field readonly :label="dependentPrefix+' Qty'"  v-model="detailSectionModal[dependentPrefix+'QTY']"></v-text-field>
                                          </v-flex>
                                           <v-flex xs12>
                                            <v-text-field readonly label="Cum Qty"  v-model="detailSectionModal['CUMQTY']"></v-text-field>
                                          </v-flex>
                                          <v-flex xs12>
                                            <v-text-field readonly label="Pending Qty"  v-model="detailSectionModal.PENDQTY"></v-text-field>
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
                                  <td class="text-xs-left" :key="header" v-if="header !='ITEMID' && header !='ITEMSLNO' && header !='UOMID' && header !=dependentPrefix+'ID' && header !='CONVFACT' && header !=dependentPrefix+'ITEMSLNO'  " >{{ props.item[header] }}</td>
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
                <v-toolbar-title>{{$store.state.pageName}} - Edit</v-toolbar-title>
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
                                    <!-- <v-btn fab dark small color="indigo" v-on="on"> <v-icon dark>add</v-icon> </v-btn> -->
                                  </template>
                                  <v-card>
                                    <v-card-title>
                                      <span class="headline">Item Details</span>
                                    </v-card-title>
                                    <v-card-text>
                                      <v-container grid-list-md>
                                        <v-layout wrap>
                                           <v-flex xs12>
                                            <v-text-field readonly :label="dependentPrefix+' No'"  v-model="detailSectionModal[dependentPrefix+'NO']"></v-text-field>
                                          </v-flex>
                                           <v-flex xs12>
                                            <v-text-field readonly :label="dependentPrefix+' Qty'"  v-model="detailSectionModal[dependentPrefix+'QTY']"></v-text-field>
                                          </v-flex>
                                           <v-flex xs12>
                                            <v-text-field readonly label="Cum Qty"  v-model="detailSectionModal['CUMQTY']"></v-text-field>
                                          </v-flex>
                                          <v-flex xs12>
                                            <v-text-field readonly label="Pending Qty"  v-model="detailSectionModal.PENDQTY"></v-text-field>
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
                                  <td class="text-xs-left" :key="header" v-if="header !='ITEMID' && header !='UOMID' && header !='ITEMSLNO' && header !=dependentPrefix+'ID' && header !='CONVFACT' && header !=dependentPrefix+'ITEMSLNO'" >{{ props.item[header] }}</td>
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
   pendingTableSearch: '',
   loadPendingSearch: '',
   loadPendingData: [],
   loadPendingHeaders: [],
   loadPendingSelectedData: [],
   selectedPendingRowID: 0,
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
   detailSectionDynamicModal: {},

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
    dependentPrefix: '',
    dialogLoadPening: false,
    loadPendingPartyWise: false,
    searchPartyPrefix: '',
    searchPartyTableName: '',
    pagination: {
        rowsPerPage: parseInt(localStorage.getItem('rowPerPageDataTable')) || 5
    },
    pdfDailog:false,
    pdfUrl :'',
  
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
   pagination: {
    handler () {
      localStorage.setItem('rowPerPageDataTable',this.pagination.rowsPerPage);
    },
    deep: true
  },
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
 },

 methods:{
     /* ******************* Main table functions ************************* */
     loadPartDocTableData(){
      const docID =  localStorage.getItem('menuDocId') || 0;
      this.partyDocHeaders= [ { text: "Action", align: "center",sortable: false } ],
      this.partyDocHeadersKey = [];
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}NonPartyNonItem?docID=${docID}`
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
        url: `${process.env.VUE_APP_API_BASE}NonPartyNonItemLinkedDoc?selectedID=${this.selectedID}&docID=${docID}`
      })
        .then((result) => {
          this.ediPartyDocModal = true;
          this.prefix =result.data.prefix;
          const pageData = result.data;
          this.selectedPrefix = pageData.mainData.docPrefix;
          this.prefixDropdown = pageData.prefixData;
          // main data load

          this.partyDOCNumber = pageData.mainData.printPONO;
          this.date = new Date(this.parseDate(pageData.mainData.PODate)).toISOString().substr(0, 10);
          this.loadPendingPartyWise= pageData.mainData.loadPendingPartyWise;
          this.dependentPrefix = pageData.mainData.dependentPrefix;
          this.searchPartyTableName = pageData.mainData.docPartyTableName;
          this.searchPartyPrefix = pageData.mainData.docPartyPrefix;

          //console.log(JSON.stringify(pageData.headerFields.dynamicFieldModal.fieldProperties));
          if(pageData.headerFields.dynamicFieldModal !=null ){
          this.headerDynamicFieldModel = pageData.headerFields.dynamicFieldModal.modal[0];
          this.headerDynamicFieldOriginalSchema = pageData.headerFields.dynamicFieldModal.fieldProperties;
          }
          
         
          let modalData = JSON.parse(JSON.stringify(pageData.detailFields.dynamicFieldModal.modal[0]));
          this.detailSectionModal =JSON.parse(JSON.stringify(generateNewModal(pageData.detailFields.dynamicFieldModal.fieldProperties,modalData)));
          this.detailSectionFieldOriginalSchema = pageData.detailFields.dynamicFieldModal.fieldProperties;
         

          this.generateDetailSectionTableHeader(this.detailSectionModal);
          this.detailSectionData = pageData.detailFields.dynamicFieldModal.modal;
          console.log('detail section data after load='+ JSON.stringify(this.detailSectionData));

         if(pageData.footerFields.dynamicFieldModal !=null){
          this.footerDynamicFieldModel = pageData.footerFields.dynamicFieldModal.modal[0];
          this.footerDynamicFieldOriginalSchema = pageData.footerFields.dynamicFieldModal.fieldProperties;
         }
          
          if(pageData.totalFields.dynamicFieldModal  !=null){
           this.totalDynamicFieldModel = pageData.totalFields.dynamicFieldModal.modal[0];
           this.totalDynamicFieldOriginalSchema = pageData.totalFields.dynamicFieldModal.fieldProperties;
          }
          

          //generate schemas
          if(pageData.headerFields.dynamicFieldModal  !=null){
           this.headerDynamicFieldSchema.fields =  generateSchemaForTransaction(pageData.headerFields.dynamicFieldModal.fieldProperties, this.headerDynamicFieldModel,pageData.detailFields.dynamicFieldModal.modal[0],this.footerDynamicFieldModel, this.totalDynamicFieldModel);
          }
          this.detailSectionFieldSchema.fields = generateSchemaForTransaction(pageData.detailFields.dynamicFieldModal.fieldProperties,this.headerDynamicFieldModel, pageData.detailFields.dynamicFieldModal.modal[0],this.footerDynamicFieldModel, this.totalDynamicFieldModel);
          if(pageData.footerFields.dynamicFieldModal !=null){
            this.footerDynamicFieldSchema.fields = generateSchemaForTransaction(pageData.footerFields.dynamicFieldModal.fieldProperties,this.headerDynamicFieldModel,pageData.detailFields.dynamicFieldModal.modal[0], this.footerDynamicFieldModel, this.totalDynamicFieldModel);
          }
          if(pageData.totalFields.dynamicFieldModal !=null){
            this.totalDynamicFieldSchema.fields = generateSchemaForTransaction(pageData.totalFields.dynamicFieldModal.fieldProperties,this.headerDynamicFieldModel,pageData.detailFields.dynamicFieldModal.modal[0],this.footerDynamicFieldModel, this.totalDynamicFieldModel);
          }

          if(pageData.headerFields.dynamicFieldModal !=null){
            convertDateWithSchema(this.headerDynamicFieldOriginalSchema,this.headerDynamicFieldModel, false);
          }
          if(pageData.footerFields.dynamicFieldModal !=null){
            convertDateWithSchema(this.footerDynamicFieldOriginalSchema,this.footerDynamicFieldModel,false);
          }
          if(pageData.totalFields.dynamicFieldModal !=null){
            convertDateWithSchema(this.totalDynamicFieldOriginalSchema,this.totalDynamicFieldModel,false);
          }

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
         ITEMSLNO:0
       };
      

       this.detailSectionHeader = [];
       this.detailSectionData = [];
       this.selectedID = 0;
       const docID =  localStorage.getItem('menuDocId') || 0;

      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}NonPartyNonItemLinkedDoc?docID=${docID}&type=0`
       })
        .then((result) => {
          this.addPartyDocModal = true;
          this.prefix =result.data.prefix;
          
          const pageData = result.data;
          this.prefixDropdown =  pageData.prefixData;
           this.dependentPrefix = pageData.mainData.dependentPrefix;
          this.loadPendingPartyWise = pageData.mainData.loadPendingPartyWise;
          this.searchPartyTableName = pageData.mainData.docPartyTableName;
          this.searchPartyPrefix = pageData.mainData.docPartyPrefix;

          this.detailSectionModal[this.dependentPrefix+"NO"] ="";
          this.detailSectionModal[this.dependentPrefix+"QTY"]="";
          this.detailSectionModal["CUMQTY"] = 0;
          this.detailSectionModal["PENDQTY"] = 0;
         
          if(pageData.headerFields.dynamicFieldModal.modal !=null ){
          this.headerDynamicFieldModel = generateNewModal(pageData.headerFields.dynamicFieldModal.fieldProperties,pageData.headerFields.dynamicFieldModal.modal);
          this.headerDynamicFieldOriginalSchema = pageData.headerFields.dynamicFieldModal.fieldProperties;
          
          }
          this.detailSectionDynamicModal = JSON.parse(JSON.stringify(generateNewModal(pageData.detailFields.dynamicFieldModal.fieldProperties,pageData.detailFields.dynamicFieldModal.modal)));
          this.detailSectionModal = {...this.detailSectionModal,...this.detailSectionDynamicModal};
          this.detailSectionFieldOriginalSchema = pageData.detailFields.dynamicFieldModal.fieldProperties;
          

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
          if(property != "ITEMID" && property != "UOMID" && property != "ITEMSLNO" && property != "CONVFACT" && property != this.dependentPrefix+"ID" && property != this.dependentPrefix+"ITEMSLNO"){
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
      console.log(JSON.stringify(row));
      this.detailSectionModal = row;
      
      if(isSaveNewRecord){
        this.detailModal = true;
      } else{
        this.editDetailModal = true;
      }
    },
    savePartyDocHDRTableData(){
      this.validateOnclickSaveNewRecord();
      if(this.validateStaticFields() && this.isDynamicHeaderFormValid && this.isDynamicFooterFormValid && this.isDynamicTotalFormValid && this.detailSectionData.length > 0){

        let partDocFixedFields ={};
        partDocFixedFields[this.prefix+"NO"] = this.partyDOCNumber;
        partDocFixedFields["Print"+this.prefix+"NO"] = this.partyDOCNumber;
        partDocFixedFields[this.prefix+"Date"]=this.parseAsDBDate(this.dateFormatted);

        
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
          url: `${process.env.VUE_APP_API_BASE}NonPartyNonItem`,
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
      const docID =  localStorage.getItem('menuDocId') || 0;

       httpClient({
        method: 'POST',
        url: `${process.env.VUE_APP_API_BASE}NonPartyNonItem?query=${query}&docID=${docID}&selectedId=${selectedId}`,
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
         else{
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
            url: `${process.env.VUE_APP_API_BASE}NonPartyNonItem`,
            data: updateParams
          })
          .then((result) => {
              this.loadPartDocTableData();
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
        else{
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
    loadPendingForTransactions(){
      const docID =  localStorage.getItem('menuDocId') || 0;
      let party=0;
      this.dialogLoadPening = true;
       httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}LoadPendingForTranscation?docID=${docID}&partyID=${party}&transactionID=${this.selectedID}`
      })
        .then((result) => {

            this.dependentPrefix = result.data.dependentPrefix;

            this.loadPendingHeaders = [];
            this.loadPendingData = [];
            this.loadPendingSelectedData =[];
            if(result.data.tableData.length > 0){
            let loadPendingHeadersKey = Object.keys(result.data.tableData[0]);
            
             loadPendingHeadersKey.forEach(element => {
                if(element != "ITEMID" && element != this.dependentPrefix+"ID" && element != "ITEMSLNO" && element !="ITEMROWID" && element != "CONVFACT"){
                  this.loadPendingHeaders.push({ text: element, align: "center", value: element })
                }
             });

             this.loadPendingData = result.data.tableData;
            } else{
               this.showSnackBar('success',"No pending record found for selected party.");
            }

          }).catch((err) => {

          this.showSnackBar('error',err.response.data);
        });
    },
    copySelectedRowToDetailSection(){
      debugger;
      this.dialogLoadPening = false;
      this.loadPendingSelectedData.forEach(e =>{
         this.detailSectionModal.SLNO = this.detailSectionData.length +1;
         this.detailSectionModal.ITEMSLNO= this.detailSectionData.length +1;
         this.detailSectionModal[this.dependentPrefix+ "NO"]= e[this.dependentPrefix+ "NO"];
         this.detailSectionModal[this.dependentPrefix+'ID'] = e[this.dependentPrefix+ "ID"];
         this.detailSectionModal[this.dependentPrefix+'ITEMSLNO'] = e.ITEMSLNO;
         this.detailSectionModal[this.dependentPrefix+ "QTY"]= e[this.dependentPrefix+ "QTY"] ;
         this.detailSectionModal.CUMQTY= e[this.prefix+ "CUMQTY"];
         this.detailSectionModal.PENDQTY= e.PENDQTY;

         this.detailSectionModal[this.prefix+"QTY"] = e.PENDQTY ;

         this.detailSectionData.push(JSON.parse(JSON.stringify(this.detailSectionModal)));
         this.updateValueDetailSectionFromQuery();
      })
    },
    updateValueDetailSectionFromQuery(){
      //get query from utlTransaction
      let docID = localStorage.getItem('menuDocId') || 0;
      var query = "";
      httpClient({
            method: 'GET',
            url: `${process.env.VUE_APP_API_BASE}MutliColumnQueryForDetailSection?docId=${docID}`
          })
          .then((result) => {
              query = result.data;
              this.detailSectionData.forEach(e =>{
               query= query.replace('#SRCDOCID#',e[this.dependentPrefix+'ID']);
               query= query.replace('#SRCITEMSLNO#',e[this.dependentPrefix+'ITEMSLNO']);
                let processedQuery = query;
                httpClient({
                method: 'GET',
                url: `${process.env.VUE_APP_API_BASE}MutliColumnQueryForDetailSection?query=${processedQuery}`
                  })
                  .then((result) => {
                    for(let key in result.data[0]){
                      e[key] = result.data[0][key];
                    }
                  }).catch((err) => {
                      
                  });
               });
              
            }).catch((err) => {
              
          });
    },
    selectPendingRowForCoping(params){
      this.selectedPendingRowID = params[Object.keys(params)[0]];
    },
    selectedSingleRowForPendingTransaction(selectedRow){
      let duplicate = false;
      this.loadPendingSelectedData.forEach(e => {
        if(e.ITEMROWID == selectedRow.ITEMROWID) duplicate= true;
      });
      if(!duplicate){
        this.loadPendingSelectedData.push(selectedRow);
      } else{
        this.showSnackBar('error',"Item already exists in list.");
      }

     
    },
    selectAllPendingTransactions(){
      this.loadPendingData.forEach(e => {
        let duplicate = false;
         this.loadPendingSelectedData.forEach( ld => {
           if(ld.ITEMROWID == e.ITEMROWID) duplicate = true;
         });
         if(!duplicate) this.loadPendingSelectedData.push(e);
      })
    },
    SelectedAllTranscationForSelectedID(){
      
      let filterData = this.loadPendingData.filter(element => element[Object.keys(element)[0]] == this.selectedPendingRowID);
      if(filterData){        
        filterData.forEach(e => {
          let duplicate = false;
            this.loadPendingSelectedData.forEach( ld => {
              if(ld.ITEMROWID == e.ITEMROWID) duplicate = true;
            });
            if(!duplicate) this.loadPendingSelectedData.push(e);
        });
      }
    },
    removeSelectedRowFromSelectedData(params){
      let rowID = params["ITEMROWID"];
      let rowIndex =  this.loadPendingSelectedData.findIndex( e => e.ITEMROWID ==  rowID);
      if(rowIndex > -1 && rowIndex != undefined && rowIndex != null){
        this.loadPendingSelectedData.splice(rowIndex,1);
      }
    },
    removeAllOfSelectedID(){
       let filterData = this.loadPendingData.filter(element => element[Object.keys(element)[0]] == this.selectedPendingRowID);
       if(filterData > -1 && filterData != undefined && filterData != null)
       filterData.splice(0,filterData.length);
    },
    removeAllRowForSelectedData(){
      this.loadPendingSelectedData = [];
    },
    validateStaticFields(){
      if(this.dateFormatted =="" || this.dateFormatted == null || this.dateFormatted == undefined){
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
          if(key !='ITEMCODE' && key !="ITEMNAME" && key !='UOM' && key !='QOH' && key !='CONVFACT' && key !=this.dependentPrefix+'QTY' && key !=this.dependentPrefix+'NO' && key !='CUMQTY' && key !='PENDQTY' && key !='ITEMROWID' && key !='DOCQTY'){
            if(key!='StkQty'){
              Columns+= key;
              Columns+=",";
              Values += "'"+element[key]+"'";
              Values += ","
            }else{
               Columns+= key;
               Columns+=",";
               Values += "'"+element[this.prefix+'QTY'] * element['CONVFACT'] +"'";
               Values += ","
            }
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
    },
   
    updateAllModalForValueChanges(callQueries){
      updateModalAfterChange(this.headerDynamicFieldOriginalSchema,this.headerDynamicFieldModel,this.detailSectionModal,this.footerDynamicFieldModel, this.totalDynamicFieldModel, this.detailSectionData,'header', '',callQueries);
      updateModalAfterChange(this.detailSectionFieldOriginalSchema,this.headerDynamicFieldModel,this.detailSectionModal,this.footerDynamicFieldModel, this.totalDynamicFieldModel, this.detailSectionData,'detail','',callQueries);
      updateModalAfterChange(this.footerDynamicFieldOriginalSchema,this.headerDynamicFieldModel,this.detailSectionModal,this.footerDynamicFieldModel, this.totalDynamicFieldModel, this.detailSectionData,'footer','',callQueries);
      updateModalAfterChange(this.totalDynamicFieldOriginalSchema,this.headerDynamicFieldModel,this.detailSectionModal,this.footerDynamicFieldModel, this.totalDynamicFieldModel, this.detailSectionData,'total','',callQueries);
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
    },
    viewPdf(props){
      console.log(JSON.stringify(props));
      let docId = localStorage.getItem('menuDocId') || 0;
      let docNumber = props[Object.keys(props)[1]] ;
      httpClient({
            method: 'GET',
            url: `${process.env.VUE_APP_API_BASE}getPdfFile?docId=${docId}&docNumber=${docNumber}`,
          })
          .then((result) => {
             ;
              this.pdfUrl = result.data;
              this.pdfDailog = true;
            }).catch((err) => {
              this.showSnackBar('error','File not available');
          });
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