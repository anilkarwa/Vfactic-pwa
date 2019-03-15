<template>
 <div id="app">
   <v-container fluid grid-list-md >
     <v-layout row wrap>
       <v-flex xs12 sm12 md12>
         <v-expansion-panel v-model="panel" expand >
           <v-expansion-panel-content
          v-for="(item,i) in items"
           :key="i">
           <template v-slot:header>
             <div v-if="i==0"><h2>Header</h2></div>
             <div v-if="i==1"><h2>Details</h2></div>
             <div v-if="i==2"><h2>Footer</h2></div>
           </template>
             <v-container fluid grid-list-xl v-if="i==0">
                <v-layout row justify-space-between>
                  <v-flex xs12 sm7 md7>
                    <p>{{prefix}} NO.</p>
                    <v-layout row>
                    <v-flex xs3 sm3 md3> <v-select v-model="selectedPrefix"  :items="prefixDropdown" label="Prefix" ></v-select></v-flex>
                    <v-flex xs2 sm2 md2> <v-text-field v-model="partyDOCID"  readonly ></v-text-field> </v-flex>
                    <v-flex xs3 sm3 md3> 
                        <v-menu  ref="datePickerModal" v-model="datePickerModal" :close-on-content-click="false" lazy transition="scale-transition" offset-y
                        full-width max-width="290px"  min-width="290px" >
                      <template v-slot:activator="{ on }">
                        <v-text-field v-model="dateFormatted"  label="Date" persistent-hint prepend-icon="event"  @blur="date = parseDate(dateFormatted)"  v-on="on"  ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title @input="datePickerModal = false"></v-date-picker>
                       </v-menu>
                    </v-flex>
                    <v-flex xs3 sm3 md3> <v-text-field v-model="partyDOCNumber"  readonly ></v-text-field></v-flex>
                    </v-layout>

                    <v-layout row>
                      <v-flex xs4 sm7 md7>
                        <p>Supplier</p>
                        <v-autocomplete  v-model="selectedSupplier" :loading="searchItemsLoading" :items="searchSupplierResult" clearable
                            :search-input.sync="searchSupplier" cache-items  flat  hide-no-data  hide-details  item-text="supplierCode" item-value="supplierId" >
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
                    <vue-form-generator id="Form-generator-css" ref="vfg" :schema="headerDynamicFieldSchema" :model="headerDynamicFieldModel" :options="formOptions" @validated="onValidated"  ></vue-form-generator>
                  </v-flex>
                 </v-layout>
              </v-container>
             <v-container fluid grid-list-xl v-if="i==2">
                <v-layout row justify-space-between>
                  <v-flex xs12 sm6 md6>
                    <vue-form-generator id="Form-generator-css" ref="vfg" :schema="footerDynamicFieldSchema" :model="footerDynamicFieldModel" :options="formOptions" @validated="onValidated"  ></vue-form-generator>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <vue-form-generator id="Form-generator-css" ref="vfg" :schema="totalDynamicFieldSchema" :model="totalDynamicFieldModel" :options="formOptions" @validated="onValidated"  ></vue-form-generator>
                  </v-flex>
                 </v-layout>
              </v-container>
              <v-container fluid grid-list-xl v-if="i==1">
                <div class="actionBlock">
                    <!-- add new row action -->
                      <v-dialog v-model="detailModal" persistent max-width="450px">
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
                                  <v-autocomplete  v-model="selectedItem" :loading="searchItemsLoading" :items="searchItemResult"
                                    :search-input.sync="searchItems" cache-items  flat  hide-no-data  hide-details label="Search Item" item-text="itemCode" item-value="itemId">

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
                                  <v-text-field label="item name" v-model="detailSectionModal.itemName"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                  <v-text-field label="UOM"  v-model="detailSectionModal.UOM"></v-text-field>
                                </v-flex>
                                 <v-flex xs12>
                                <vue-form-generator id="Form-generator-css" ref="vfg" :schema="detailSectionFieldSchema" :model="detailSectionModal" :options="formOptions" @validated="onValidated"  ></vue-form-generator>
                                 </v-flex>
                              </v-layout>
                            </v-container>
                            <small>*indicates required field</small>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="detailModal = false">Close</v-btn>
                            <v-btn color="blue darken-1" flat @click="detailModal = false;saveDetailData()">Save</v-btn>
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
                          <!-- <v-btn fab  dark  small color="green" @click="moveRowUpwared()">
                            <v-icon>arrow_upward</v-icon>
                          </v-btn>
                          <v-btn  fab  dark  small color="indigo" @click="moveRowDownwared()" >
                            <v-icon>arrow_downward</v-icon>
                          </v-btn> -->
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
                     item-key="slno"
                    class="elevation-1"
                    hide-actions
                  >
                    <template v-slot:headers="props">
                      <tr>
                        <th></th>
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
                        <td> <v-checkbox :input-value="props.selected" primary  hide-details ></v-checkbox>  </td>
                        <template v-for="header in Object.keys(detailSectionModal)">
                        <td class="text-xs-left" :key="header" v-if="header !='ITEMID'" >{{ props.item[header] }}</td>
                        </template>
                      </tr>
                    </template>
                  </v-data-table>
              </v-container>
           </v-expansion-panel-content>
         </v-expansion-panel>
       </v-flex>
     </v-layout>
   </v-container>
 </div>

</template>


<script>

import httpClient from "@/services/httpClient.js"
import VueFormGenerator from 'vue-form-generator'
import generateSchema from '@/DynamicProperty/generateScheme.js'
import generateGroupSchema from '@/DynamicProperty/generateGroupSchema.js'
import generateNewModal from '@/DynamicProperty/generateNewModal.js'
import customeValidaton from '@/DynamicProperty/customeValidation.js'

export default {
 name: 'app',
 data : vm => ({
   partyDOCID: 0,
   partyDOCNumber: 0,
   prefix: '',
   selectedPrefix: '',
   prefixDropdown: [],
   panel: [],
   items: 3,
   fab: false,
   selected: [],
   searchItemsLoading: false,
   searchItems: null,
   searchSupplier: null,
   searchItemResult: [],
   detailModal: false,
   datePickerModal: false,
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
   date: new Date().toISOString().substr(0, 10),
   dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
   formOptions: {
    validateAfterLoad: false,
    validateAfterChanged: true,
    validateAsync: true
    },
   headerDynamicFieldSchema: {
       fields: []
   },
   headerDynamicFieldModel: {},
   footerDynamicFieldSchema: {
       fields: []
   },
   footerDynamicFieldModel: {},
   totalDynamicFieldSchema: {
       fields: []
   },
   totalDynamicFieldModel: {},
   detailSectionHeader: [],
    detailSectionData: [],
    selectedItem:0,
    detailSectionModal:{
    },
    detailSectionFieldSchema: {
       fields: []
   },
    snackbar: false,
    color: '',
    mode: '',
    timeout: 5000,
    text: '',
  
 }),
 beforeMount() {
   this.panel = [...Array(this.items).keys()].map(_ => true);
   this.createTranscationPageView();
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
  searchItems(value){
    httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}getItemByCode?itemCode=${value}`
      })
        .then((result) => {
          this.searchItemResult = result.data;
        }).catch((err) => {

          this.showSnackBar('error',err.response.data);
        });
  },
  searchSupplier(value){
    httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}getSupplierByCode?supplierCode=${value}`
      })
        .then((result) => {
          this.searchSupplierResult = result.data;
        }).catch((err) => {

          this.showSnackBar('error',err.response.data);
        });
  },
  selectedSupplier: function(val){
    let supplierData = this.searchSupplierResult.find(e=> e.supplierId == val);
    if(supplierData != undefined && supplierData != null){
      this.supplier= supplierData;
    } else{
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
    if(itemData != undefined && itemData != null){
      this.detailSectionModal.ITEMID= itemData.itemId;
      this.detailSectionModal.ITEMCODE= itemData.itemCode;
      this.detailSectionModal.ITEMNAME= itemData.itemName;
      this.detailSectionModal.UOM= itemData.UOM;
    }
  },
 },
 methods:{
   formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    showSnackBar(type,message){
      this.snackbar = true;
      this.color = type;
      this.text = message;
    },
     createTranscationPageView(){
      const docID =  localStorage.getItem('menuDocId') || 0;

      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}PartyDocTranscation?selectedID=1005&docID=${docID}`
      })
        .then((result) => {
          this.prefix =result.data.prefix;

          const pageData = result.data;
          //console.log(JSON.stringify(pageData.headerFields.dynamicFieldModal.fieldProperties));
          this.headerDynamicFieldModel = pageData.headerFields.dynamicFieldModal.modal[0];
          this.headerDynamicFieldSchema.fields = generateSchema(pageData.headerFields.dynamicFieldModal.fieldProperties, this.headerDynamicFieldModel);

          this.detailSectionModal =pageData.detailFields.dynamicFieldModal.modal[0];
          this.detailSectionFieldSchema.fields = generateSchema(pageData.detailFields.dynamicFieldModal.fieldProperties, pageData.detailFields.dynamicFieldModal.modal[0]);
          // reset detail section modal
          this.resetDetailSectionModal(this.detailSectionModal);
          this.generateDetailSectionTableHeader(this.detailSectionModal);

          this.footerDynamicFieldModel = pageData.footerFields.dynamicFieldModal.modal[0];
          this.footerDynamicFieldSchema.fields = generateSchema(pageData.footerFields.dynamicFieldModal.fieldProperties, this.headerDynamicFieldModel);

          this.totalDynamicFieldModel = pageData.totalFields.dynamicFieldModal.modal[0];
          this.totalDynamicFieldSchema.fields = generateSchema(pageData.totalFields.dynamicFieldModal.fieldProperties, this.headerDynamicFieldModel);


        }).catch((err) => {

          this.showSnackBar('error',err.response.data);
        });
     },
     generateDetailSectionTableHeader(model){
        for (var property in model) {
          if(property != "ITEMID"){
            this.detailSectionHeader.push({text: property,value: property});
          }
        }
     },
     resetDetailSectionModal(model){
       for (var property in model) {
         if( typeof model[property] === "number"){
           model[property]= 0;
         }
         if(typeof model[property] === "string"){
           model[property] = "";
         }
       }
     },
    onValidated: function(isValid, errors) {
      console.log("Validation result: ", isValid, ", Errors:", errors);
      this.isDynamicFormValid = isValid;
    },
    validateOnclick: function($event) {
      var errors = this.$refs.vfg.validate();
    },
     saveDetailData(){
     this.detailSectionModal.SlNO = this.detailSectionData.length + 1;
     let data = JSON.parse(JSON.stringify(this.detailSectionModal));
     this.detailSectionData.push(data);
    },
    removeDetailRecord(){
      this.selected.forEach(element => {
        var item = this.detailSectionData.findIndex(x =>  x.slno == element.slno);
        if(item>=0){
          this.detailSectionData.splice(item,1);
        }
      });
      this.selected = [];
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
      let index = this.detailSectionData.findIndex(x => x.slno == this.selected[0].slno);
      if(index >=0 && this.detailSectionData.length > 0){
        let temp = this.detailSectionData[index-1];
        console.log('temp='+JSON.stringify(temp));
        this.detailSectionData[index-1] = this.detailSectionData[index];
        this.detailSectionData[index]= temp;
      }
      console.log('detail'+JSON.stringify(this.detailSectionData));
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
    },
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