<template>
<div id="app">
<v-app id="inspire">
    <v-card>
      <v-card-title> 
      </v-card-title>
      <v-data-table :headers="headers" :items="listOfAuthorisationDoc" class="elevation-1">
         <template v-slot:items="props">
            <td class="text-xs-center">
              <v-icon small class="mr-2" @click="loadPendingAuthDocForSelectedDoc(props.item.docId,props.item.docName,props.item.hdrTableName,props.item.docPrefix)">view_headline</v-icon>
            </td>
            <td class="text-xs-center ">{{ props.item.docName }}</td>
            <td class="text-xs-center">{{ props.item.unAuthDocCount }}</td>
        </template>
        <template slot="no-data">
          <v-btn color="primary">Reset</v-btn>
        </template>
      </v-data-table>
      </v-card>
      <!-- END: Code for Supplier Group Master Table data -->

    <v-dialog v-model="authDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
       
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="authDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>{{docName}} - Authorise Document</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
             <v-btn dark flat @click="authoriseSelectedRow()">Authorise</v-btn>
              
            </v-toolbar-items>
          </v-toolbar>

           <v-data-table
              v-model="selected" :headers="authDocHeaders" :items="authDocTableData"
              select-all  :item-key="docPrefix+'ID'" class="elevation-1" hide-actions >
              <template v-slot:headers="props">
                <tr>
                 <th>
                  <v-checkbox
                    :input-value="props.all"
                    :indeterminate="props.indeterminate"
                    primary
                    hide-details
                    @click.stop="toggleAll"
                  ></v-checkbox>
                </th>
                  <th
                    v-for="header in props.headers"
                    :key="header.text"
                    :class="['column sortable', 'active']" >
                    <b>{{ header.text.toUpperCase() }}</b>
                  </th>
                </tr>
              </template>
              <template v-slot:items="props">
                 <tr style="cursor:pointer" :active="props.selected" @click="props.selected = !props.selected">
                  <td>
                    <v-checkbox
                      :input-value="props.selected"
                      primary
                      hide-details
                    ></v-checkbox>
                  </td>
                  <td v-for="values in props.item" :key="values.id" @dblclick="loadSelecteRowData(props.item)">
                    {{ values }}
                  </td>
                </tr>
              </template>
            </v-data-table>
            <v-dialog v-model="rowClickDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
              <v-card>
                <v-toolbar fixed dark color="primary">
                  <v-btn icon dark @click="rowClickDialog = false">
                    <v-icon>close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Document Preview</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                  <v-container class="spaceFromTop" fluid grid-list-md >
                <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                      <v-card>
                        <v-card-text>
                          <v-container fluid grid-list-x>
                          <v-layout row justify-space-between v-if="selectedRowData.hasOwnProperty('mainData')">
                            <v-flex xs12 sm7 md7>
                              <v-layout row>
                              <v-flex xs3 sm3 md3><b> {{docPrefix}}NO :   </b>{{selectedRowData.mainData[docPrefix+"NO"]}} </v-flex>
                              <v-flex xs2 sm2 md3> <b>{{docPrefix}}Date :</b> {{selectedRowData.mainData[docPrefix+"Date"]}}</v-flex>
                              </v-layout>

                              <v-layout row>
                                <v-flex xs4 sm7 md7>
                                  <p><b>Supplier : -</b>{{selectedRowData.mainData.partyName}}</p>
                                </v-flex>
                              </v-layout>
                              <v-layout row>
                                <v-flex xs4 sm4 md4>
                                <p><i>Billing address</i></p>
                                <p>{{selectedRowData.mainData.partyAddress1}}</p>
                                <p>{{selectedRowData.mainData.partyAddress2}}</p>
                                <p>{{selectedRowData.mainData.partyAddress3}} {{selectedRowData.mainData.partyAddress4}}</p>
                                <p>{{selectedRowData.mainData.city}} {{selectedRowData.mainData.PinCode}} {{selectedRowData.mainData.state}} {{selectedRowData.mainData.country}}</p> 
                                </v-flex>
                              </v-layout>

                            </v-flex>
                            <v-flex xs12 sm4 md4>
                              <template v-for="key in Object.keys(selectedRowData.headerFields.dynamicFieldModal.modal[0])">
                                <p :key="key"><b>{{key}} : </b> {{selectedRowData.headerFields.dynamicFieldModal.modal[0][key]}} </p>
                              </template>
                            </v-flex>
                          </v-layout>
                        </v-container>
                        </v-card-text>
                      </v-card>

                      <v-card>
                        <v-card-text>
                         <v-container fluid grid-list-xl>
                          <v-data-table
                              v-model="selected"
                              :headers="detailSectionHeader"
                              :items="detailSectionTableData"
                              select-all
                              item-key="SLNO"
                              class="elevation-1"
                              hide-actions
                            >
                              <template v-slot:headers="props">
                                <tr>
                                  <th
                                    v-for="header in props.headers"
                                    :key="header.text"
                                    :class="['column sortable', 'active']" >
                                    <b>{{ header.text.toUpperCase() }}</b>
                                  </th>
                                </tr>
                              </template>
                              <template v-slot:items="props">
                                <tr>
                                  <template v-for="header of detailSectionHeader">
                                  <td class="text-xs-left" :key="header.text" v-if="header !='ITEMID' && header !='UOMID' && header !='ITEMSLNO' " >{{ props.item[header.text] }}</td>
                                  </template>
                                </tr>
                              </template>
                            </v-data-table>
                        </v-container>
                        </v-card-text>
                      </v-card>

                      <v-card>
                        <v-card-text>
                          <v-container fluid grid-list-xl>
                          <v-layout row justify-space-between v-if="selectedRowData.hasOwnProperty('mainData')">
                            <v-flex xs12 sm6 md6>
                              <template v-for="key in Object.keys(selectedRowData.footerFields.dynamicFieldModal.modal[0])">
                                <p :key="key"><b>{{key}} : </b> {{selectedRowData.footerFields.dynamicFieldModal.modal[0][key]}} </p>
                              </template>
                            </v-flex>
                            <v-flex xs12 sm4 md4>
                                <template v-for="key in Object.keys(selectedRowData.totalFields.dynamicFieldModal.modal[0])">
                                <p :key="key"><b>{{key}} : </b> {{selectedRowData.totalFields.dynamicFieldModal.modal[0][key]}} </p>
                              </template>
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

        </v-card>
      </v-dialog>
    <v-snackbar
        v-model="snackbar"
        :color="color" :multi-line="true" :timeout="timeout" :vertical="mode === 'vertical'"  >{{ text }}
        <v-btn dark  flat   @click="snackbar = false"  >  Close </v-btn>
      </v-snackbar>
</v-app>
</div>
</template>

<script>
import httpClient from "@/services/httpClient.js"
import previewModalCalculation from '@/DynamicProperty/previewModalCalculation.js';

export default {
    name: "authorised",
    
    data: function() {
    return { 
      authDialog: false,
      headers: [ { text: "Select", align: "center",sortable: false, },{ text: "Document Name", align: "center" },{ text: "No. of document to authorise", align: "center" } ],
      listOfAuthorisationDoc : [],
      snackbar: false,
      color: '',
      mode: '',
      timeout: 5000,
      text: '',
      authDocHeaders: [],
      authDocTableData: [],
      selected: [],
      selectedDocTableName: '',
      docPrefix: '',
      selectedRowId: '',
      docID: 0,
      docName: '',
      menuAPILink : '',
      rowClickDialog: false,
      detailSectionHeader: [],
      detailSectionTableData : [],
      selectedRowData : [],
    }
  },
  beforeMount(){
    this.loadPendingAuthorisedDocuments();
  },
  methods: {
     showSnackBar(type,message){
       this.snackbar = true;
       this.color = type;
       this.text = message;
      },
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.authDocTableData.slice()
      },
      loadPendingAuthorisedDocuments(){
          this.listOfAuthorisationDoc = [];
          let userId = localStorage.getItem('userId') || 0;

          httpClient({
            method: 'GET',
            url: `${process.env.VUE_APP_API_BASE}AuthoriseDocument?userId=${userId}`
            })
            .then((result) => {
              this.listOfAuthorisationDoc = result.data;
           
            }).catch((err) => {
             this.showSnackBar('error',err.response.data);
            });
      },
      loadPendingAuthDocForSelectedDoc(docId,docName,hdrTableName,prefix){
        if(this.getCurrentUserRoles('viewRight') != '1'){
          this.showSnackBar('error','You do not have rights to view this document');
          return;
        }
        this.docID = docId;
        this.docName = docName;
        this.selectedDocTableName = hdrTableName;
        this.docPrefix = prefix;
        this.authDocHeaders= [],
        this.authDocTableData= [];
          this.authDialog = true;
          httpClient({
            method: 'GET',
            url: `${process.env.VUE_APP_API_BASE}AuthoriseDocument?docId=${docId}&type=0`
            })
            .then((result) => {
              this.menuAPILink = result.data.menuApiLink;
              let authDocHeadersKey = Object.keys(result.data.tableData[0]);
                 authDocHeadersKey.forEach(element => {
                this.authDocHeaders.push({ text: element, align: "center", value: element })
             })

             this.authDocTableData = result.data.tableData;
           
            }).catch((err) => {
             this.showSnackBar('error',err.response.data);
            });
      },
      authoriseSelectedRow(){
         if(this.getCurrentUserRoles('authRight') != '1'){
          this.showSnackBar('error','You do not have rights to authorize this document');
          return;
        }

        this.selectedRowId = '';
        this.selected.forEach(e =>{
          if(this.selectedRowId != ''){
            this.selectedRowId += ',';
          }
           this.selectedRowId += e[this.docPrefix+'ID'];
        });
        httpClient({
          method: 'Put',
          url: `${process.env.VUE_APP_API_BASE}AuthoriseDocument?hdrTableName=${this.selectedDocTableName}&selectedRowId=${this.selectedRowId}&authorisedBy=${localStorage.getItem('userName')}&prefix=${this.docPrefix}`
          })
          .then((result) => {
           this.sendEmailForAuthorisedDocuments();
           this.loadPendingAuthorisedDocuments();
           this.loadPendingAuthDocForSelectedDoc(this.docID,this.docName,this.selectedDocTableName,this.docPrefix);
           this.showSnackBar('success',result.data);
           
          }).catch((err) => {
            this.showSnackBar('error',err.response.data);
          });
      },
      loadSelecteRowData(item){
       let selectedID = item[this.docPrefix+'ID'];
       this.selectedRowData = [];
       this.detailSectionHeader=  [];
       this.detailSectionTableData = []; 
        httpClient({
          method: 'Get',
          url: `${process.env.VUE_APP_API_BASE}${this.menuAPILink}?selectedID=${selectedID}&docID=${this.docID}`
          })
          .then((result) => {
            this.selectedRowData = result.data;
            this.detailSectionTableData = this.selectedRowData.detailFields.dynamicFieldModal.modal;
            this.generateDetailSectionTableHeader(this.detailSectionTableData[0]);
            previewModalCalculation(this.selectedRowData.headerFields.dynamicFieldModal.fieldProperties,this.selectedRowData.headerFields.dynamicFieldModal.modal[0]);
            previewModalCalculation(this.selectedRowData.detailFields.dynamicFieldModal.fieldProperties,this.selectedRowData.detailFields.dynamicFieldModal.modal[0]);
            previewModalCalculation(this.selectedRowData.footerFields.dynamicFieldModal.fieldProperties,this.selectedRowData.footerFields.dynamicFieldModal.modal[0]);
            previewModalCalculation(this.selectedRowData.totalFields.dynamicFieldModal.fieldProperties,this.selectedRowData.totalFields.dynamicFieldModal.modal[0]);
            this.rowClickDialog = true;
            
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
        console.log('header='+JSON.stringify(this.detailSectionHeader));
     },
     sendEmailForAuthorisedDocuments(){
        this.selected.forEach(e =>{
           let records = e[this.docPrefix+'NO'];
           let message = "Your approver <b>"+localStorage.getItem('userName')+" </b> has authorised the selected record - "+records+" for "+this.docName;
           httpClient({
            method: 'GET',
            url: `${process.env.VUE_APP_API_BASE}AuthoriseDocument?message=${message}&selectedRowId=${e[this.docPrefix+'ID']}&hdrTableName=${this.selectedDocTableName}&prefix=${this.docPrefix}`
            })
            .then((result) => {

            }).catch((err) => {
              this.showSnackBar('error',err.response.data);
            });
          });
          this.selected = [];
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
  }
}

</script>
