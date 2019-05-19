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
            <td class="justify-center layout px-0">
              <v-icon v-if="getCurrentUserRoles('editRight') == '1'" small class="mr-2" @click="editSelectedPartyDocTranscation(props.item)">edit</v-icon>
            </td>
            <td v-for="values in props.item" :key="values.id">
              {{ values }}
            </td>
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
                <v-toolbar-items>
                  <v-btn dark flat @click="savePartyDocHDRTableData()">Save</v-btn>
                </v-toolbar-items>
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

                            </v-flex>
                          </v-layout>
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
                <v-toolbar-title>Edit Information</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark flat @click="updatePartyDoc()">Save</v-btn>
                </v-toolbar-items>
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
                              
                            </v-flex>
                          </v-layout>
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
    searchPartyTableName: ''
  
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
              that.updatedingAnyModal= that.updateAllModalForValueChanges(true);
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
      this.partyDocHeaders= [ { text: "Edit", align: "center" } ],
      this.partyDocHeadersKey = [];
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}PartyDocWityOnlyHeader?docID=${docID}`
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

       this.selectedID = params[Object.keys(params)[0]];
       const docID =  localStorage.getItem('menuDocId') || 0;

      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}PartyDocWityOnlyHeader?selectedID=${this.selectedID}&docID=${docID}`
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
        url: `${process.env.VUE_APP_API_BASE}PartyDocWityOnlyHeader?docID=${docID}&type=0`
       })
        .then((result) => {
          this.addPartyDocModal = true;
          this.prefix =result.data.prefix;
          
          const pageData = result.data;

          this.prefixDropdown =  pageData.prefixData;

         
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
          url: `${process.env.VUE_APP_API_BASE}PartyDocWityOnlyHeader`,
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
            url: `${process.env.VUE_APP_API_BASE}PartyDocWityOnlyHeader`,
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
    

    /* ****************** End Update Record Funtion *********************** */

    /* ***************** Common Methods ********************************* */
    validateStaticFields(){
      if(this.dateFormatted =="" || this.dateFormatted == null || this.dateFormatted == undefined){
        return false;
      }
      return true;
    },
    
     resetFromVariable(){
      this.partyDOCID = "";
      this.partyDOCNumber = "";
      this.prefixDropdown = [];
      this.preFix= "";


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
      updateModalSingleSchema(this.headerDynamicFieldOriginalSchema,this.headerDynamicFieldModel,callQueries);
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