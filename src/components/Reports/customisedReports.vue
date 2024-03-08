<template>
  <div id="app">
    <v-app id="inspire">
      <!-- START: Code for Customise Report Table data -->
      <v-card>
      <v-card-title> 
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        <v-text-field  v-model="tableSearch" append-icon="search"  label="Search" single-line  hide-details  ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :search="tableSearch" :items="customisedReportsTableData" :pagination.sync="pagination"  class="elevation-1">
         <template v-slot:items="props">
            <td class="text-xs-right">{{ props.item.slno }}</td>
            <td class="text-xs-right">{{ props.item.categories }}</td>
            <td class="text-xs-right">{{ props.item.reportName }}</td>
            <td class="text-xs-center" style="width: 300px;">{{ props.item.reportDescription }}</td>
            <td class="text-xs-right"><v-icon small class="mr-2" @click="openSelectedFile(props.item.fileName)">picture_as_pdf</v-icon></td>
        </template>
        <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
      </v-data-table>
      </v-card>
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
                      :src="selectedFilePath"
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
      </v-app>
      </div>
      </template>

      <script>
      import httpClient from "@/services/httpClient.js"

        export default {
        data: function() {
        return {
        headers: [ { text: "SlNo", align: "left",value:"slno" },{ text: "Categories", align: "left",value:"categroies" },
        { text: "Report Name", align: "left", value:"reportName" },{ text: "Report Description", align: "left",value:"reportDescription" },
        { text: "View File", align: "left",sortable: false } ],
      customisedReportsTableData: [],
      tableSearch: '',
      customisedReportsModel: false,
      selectedFilePath :'',
      snackbar: false,
      color: '',
      mode: '',
      timeout: 5000,
      text: '',
      pdfDailog:false,
      pagination: {
        rowsPerPage: parseInt(localStorage.getItem('rowPerPageDataTable')) || 5
      },
    }
     },
     beforeMount: function() {
         this.loadCustomisedReport();
    },

  methods: {
    showSnackBar(type,message){
      this.snackbar = true;
      this.color = type;
      this.text = message;
    },
    loadCustomisedReport: function() {

      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}getCustomiseReports`
      })
        .then((result) => {
            this.customisedReportsTableData = result.data;
        }).catch((err) => {
          /**
           * When API call failed: check error in browser console::
           */
          this.showSnackBar('error',err.response.data);
        });
    },
    openSelectedFile(fileName){
        httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}getCustomiseReports?fileName=${fileName}`
      })
        .then((result) => {
           this.selectedFilePath = result.data;
           this.pdfDailog = true;
        }).catch((err) => {
          /**
           * When API call failed: check error in browser console::
           */
          this.showSnackBar('error',err.response.data);
        });
    }
    
  }
}
</script>
<style>
  
</style>