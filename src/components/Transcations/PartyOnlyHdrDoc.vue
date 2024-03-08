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
              <v-icon v-if="getCurrentUserRoles('editRight') == '1'" small class="mr-2" @click="editSelectedPartyDocTranscation(props.item)">edit</v-icon>
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

                                <v-layout row>
                                <v-flex xs4 sm7 md7>
                                  <p v-if="searchPartyPrefix =='SUPP'">Supplier</p>
                                  <p v-if="searchPartyPrefix =='CUST'">Customer</p>
                                  <p v-if="searchPartyPrefix !='SUPP' && searchPartyPrefix !='CUST'">{{searchPartyPrefix}}</p>
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
                          </v-layout>
                          <hr><br/><br/>
                          <v-layout row justify-space-between>
                          <v-flex xs12 sm4 md4>
                               <vue-form-generator id="Form-generator-css" ref="vfAddHeader" :schema="headerDynamicFieldSchema" :model="headerDynamicFieldModel" :options="formOptions" @validated="onValidatedAddHeader"  ></vue-form-generator> 
                            </v-flex>
                        </v-layout>
                        </v-container>
                        </v-card-text>
                      </v-card>
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
                                  <p v-if="searchPartyPrefix !='SUPP' && searchPartyPrefix !='CUST'">{{searchPartyPrefix}}</p>
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

                              
                            </v-flex>
                          </v-layout>
                          <hr><br/><br/>
                        <v-layout row justify-space-between>
                          <v-flex xs12 sm4 md4>
                              <vue-form-generator id="Form-generator-css" ref="vfEditHeader" :schema="headerDynamicFieldSchema" :model="headerDynamicFieldModel" :options="formOptions" @validated="onValidatedHeader"  ></vue-form-generator>
                            </v-flex>
                        </v-layout>
                        </v-container>
                     
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
import generateSchema from '@/DynamicProperty/generateScheme.js'
import generateNewModal from '@/DynamicProperty/generateNewModal.js'
import customeValidaton from '@/DynamicProperty/customeValidation.js'
import updateModalSingleSchema from '@/DynamicProperty/updateModalSingleSchema.js'
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
              that.updatedingAnyModal= that.updateAllModalForValueChanges(true);
            }
        //  }, 2000);
        },
    deep: true
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
 },

 methods:{
     /* ******************* Main table functions ************************* */
     loadPartDocTableData(){
      const docID =  localStorage.getItem('menuDocId') || 0;
      this.partyDocHeaders= [ { text: "Action", align: "center",sortable: false } ],
      this.partyDocHeadersKey = [];
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}WithPartyOnlyHeader?docID=${docID}`
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

       this.selectedID = params[Object.keys(params)[0]];
       const docID =  localStorage.getItem('menuDocId') || 0;

      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}WithPartyOnlyHeader?selectedID=${this.selectedID}&docID=${docID}`
      })
        .then((result) => {
          this.ediPartyDocModal = true;
          this.prefix =result.data.prefix;
          
          const pageData = result.data;
          this.selectedPrefix = pageData.mainData.docPrefix;
          this.prefixDropdown = pageData.prefixData;
          // main data load
          this.searchSupplierResult = [{supplierId:pageData.mainData.supplierId,supplierCode: pageData.mainData.partyName,supplierName:pageData.mainData.partyName,address1:pageData.mainData.partyAddress1,address2:pageData.mainData.partyAddress2,addres3:pageData.mainData.partyAddress3,address4:pageData.mainData.partyAddress4,city: pageData.mainData.city,pincode:pageData.mainData.PinCode,state:pageData.mainData.state,country: pageData.mainData.country }];
          this.selectedSupplier = pageData.mainData.supplierId;
          this.loadPendingPartyWise= pageData.mainData.loadPendingPartyWise;
          this.searchPartyTableName = pageData.mainData.docPartyTableName;
          this.searchPartyPrefix = pageData.mainData.docPartyPrefix;

          this.partyDOCNumber = pageData.mainData.printPONO;
          this.date = new Date(this.parseDate(pageData.mainData.PODate)).toISOString().substr(0, 10);

          //console.log(JSON.stringify(pageData.headerFields.dynamicFieldModal.fieldProperties));
          if(pageData.headerFields.dynamicFieldModal.modal.length > 0){
          this.headerDynamicFieldModel = pageData.headerFields.dynamicFieldModal.modal[0];
          this.headerDynamicFieldOriginalSchema = pageData.headerFields.dynamicFieldModal.fieldProperties;
          this.headerDynamicFieldSchema.fields = generateSchema(pageData.headerFields.dynamicFieldModal.fieldProperties, this.headerDynamicFieldModel);
          }      

          convertDateWithSchema(this.headerDynamicFieldOriginalSchema,this.headerDynamicFieldModel, false);

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
         ITEMSLNO:0,    
       };
       this.detailSectionHeader = [];
       this.detailSectionData = [];
       this.selectedID = 0;
       const docID =  localStorage.getItem('menuDocId') || 0;

      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}WithPartyOnlyHeader?docID=${docID}&type=0`
       })
        .then((result) => {
          this.addPartyDocModal = true;
          this.prefix =result.data.prefix;
          
          const pageData = result.data;

          this.prefixDropdown =  pageData.prefixData;
          this.loadPendingPartyWise = pageData.mainData.loadPendingPartyWise;
          this.searchPartyTableName = pageData.mainData.docPartyTableName;
          this.searchPartyPrefix = pageData.mainData.docPartyPrefix;

         
          if(pageData.headerFields.dynamicFieldModal.modal !=null ){
          this.headerDynamicFieldModel = generateNewModal(pageData.headerFields.dynamicFieldModal.fieldProperties,pageData.headerFields.dynamicFieldModal.modal);
          this.headerDynamicFieldOriginalSchema = pageData.headerFields.dynamicFieldModal.fieldProperties;
          this.headerDynamicFieldSchema.fields = generateSchema(pageData.headerFields.dynamicFieldModal.fieldProperties, this.headerDynamicFieldModel);
          }


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

    savePartyDocHDRTableData(){
      this.validateOnclickSaveNewRecord();
      if(this.validateStaticFields() && this.isDynamicHeaderFormValid ){

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
        convertDateWithSchema(this.headerDynamicFieldOriginalSchema,header, true);


          partDocFixedFields = {...partDocFixedFields,...header};
        
        const updateParams = {
          docID: localStorage.getItem('menuDocId') || 0, 
          userID: localStorage.getItem('userId') || 0,
          hdrFields: partDocFixedFields
        }

        httpClient({
          method: 'POST',
          url: `${process.env.VUE_APP_API_BASE}WithPartyOnlyHeader`,
          data: updateParams
        })
        .then((result) => {
             this.addPartyDocModal = false;
             this.loadPartDocTableData();
             this.showSnackBar('success','Record saved successfullly');
          }).catch((err) => {
            this.showSnackBar('error',err.response.data);
        });
      }else{
        this.showSnackBar('error','Please fill all mandatory fields');
      }

    },
   

    onValidatedAddHeader: function(isValid, error) {
      console.log("Validation add header result: ", isValid, ", Errors:", error);
       if(this.headerDynamicFieldOriginalSchema != null){
           customeValidaton(this.headerDynamicFieldOriginalSchema,this.headerDynamicFieldSchema.fields,this.headerDynamicFieldSchema.groups,this.headerDynamicFieldModel);
       }
      this.isDynamicHeaderFormValid = isValid;
    },
   


    /* ****************** End New Record Save Functions *********************  */


    /* ****************** Update Record Function ************************** */
    updatePartyDoc(){

     this.validateOnclickUpdateRecord();
      if(this.validateStaticFields() && this.isDynamicHeaderFormValid ){

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
          convertDateWithSchema(this.headerDynamicFieldOriginalSchema,header, true);


          partDocFixedFields = {...partDocFixedFields,...header};
          
          const updateParams = {
            docID: localStorage.getItem('menuDocId') || 0, 
            userID: localStorage.getItem('userId') || 0,
            selectedId : this.selectedID,
            hdrFields: partDocFixedFields,
          }

          httpClient({
            method: 'PUT',
            url: `${process.env.VUE_APP_API_BASE}WithPartyOnlyHeader`,
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
    
     resetFromVariable(){
      this.partyDOCID = "";
      this.partyDOCNumber = "";
      this.prefixDropdown = [];
      this.preFix= "";
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

    validateOnclickSaveNewRecord: function($event) {
     console.log('Validating', this.$refs);
      this.$refs.vfAddHeader.validate();
    },
    validateOnclickDetailSaveNewRecord(){
      var error = this.$refs.vfAddDetail.validate();
    },
    validateOnclickUpdateRecord: function($event) {
     console.log('Validating', this.$refs);
      this.$refs.vfEditHeader.validate();
    },
    updateAllModalForValueChanges(callQueries){
      updateModalSingleSchema(this.headerDynamicFieldOriginalSchema,this.headerDynamicFieldModel,callQueries, this.supplier.supplierCode);
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