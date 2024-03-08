<template>
  <div id="app">
    <v-app id="inspire" style="width: 400px;">
      <!-- START: Code for Customise Report Table data -->
      <v-card ref="form">
      <v-card-title aria-required="TO"> 
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
         <v-dialog v-model="dialog" scrollable max-width="500px" margin-left="1014px">
        <template v-slot:activator="{ on }">
           <v-btn class="mx-2" fab dark small color="primary" v-on="on" >
        <v-icon dark>add</v-icon>
      </v-btn>
           <!--<i class="material-icons" dark v-on="on" style="margin-right:5px;font-size: 40px;color:#1976d2;">add_box</i>-->
        </template>
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        <v-card>
          <v-toolbar color="rgb(57, 96, 130)" dark>
         <v-toolbar-title style="color:white;">Party Personal Information</v-toolbar-title>
      </v-toolbar>
          <v-divider></v-divider>
          
             <v-list three-line>
        <v-card-title> 
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        <v-text-field  v-model="tableSearch" append-icon="search"  label="Search" single-line  hide-details  ></v-text-field>
      </v-card-title>
           <v-divider></v-divider>
          <v-data-table :headers="headers" :search="tableSearch" :items="partypersonalTableData" :pagination.sync="pagination"  class="elevation-1">
         <template v-slot:items="props">
            <td class="text-xs-right"> <v-checkbox
          v-model="mobileno"
          v-bind:value="props.item.phoneNo"
        >
        </v-checkbox></td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.phoneNo }}</td>
            <td class="text-xs-left">{{ props.item.partyType }}</td>
        </template>
        <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
      </v-data-table>   
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer><v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          </v-card-actions>
          
           </v-list>
        </v-card>
      </v-dialog>
        
        
        <v-flex xs12 sm12 md12>
           <v-text-field
            outline
            ref="mobileno"
            v-model="mobileno"
            label="Mobile Nos"
            prepend-inner-icon="dialpad"
            hint="(For Multiple Use of mobile numbers use Comma(,))"
            persistent-hint
            box

           ></v-text-field>   
        <!--<v-autocomplete
          label="Party Name"
          v-model="mobileno"
          :items="states"
          :filter="activeFilter"
          filled
          outline
         ></v-autocomplete>-->
        </v-flex>
        </v-card-title>
        
      <v-card-title>
      <v-flex xs12 sm12 md12>
        <v-textarea
          outline
          ref="message"
          v-model="message"
          name="input-5-2"
          label="Enter Text Message.."
         ></v-textarea>
      </v-flex>
      </v-card-title>   
        <v-divider class="mt-2"></v-divider>
        <v-card-actions>
          <v-btn flat @click="resetForm">Clear</v-btn>
          <v-spacer></v-spacer>
          
          <v-btn color="primary" flat @click="send">Send</v-btn>
        </v-card-actions>

      </v-card>

      </v-app>
      </div>
      </template>

      <script>
      import httpClient from "@/services/httpClient.js"

        export default {
        data: function() {
        return {
        headers: [ { text: "", align: "left",value:"" },{ text: "name", align: "left",value:"name" },{ text: "phoneNo", align: "left",value:"phoneNo" },
        { text: "partyType", align: "left", value:"partyType" } ],
        pagination: {
        rowsPerPage: parseInt(localStorage.getItem('rowPerPageDataTable')) || 5
      },
        partypersonal: [],
        toggle: [],
        active: [],
        dialogm1: '',
        partypersonalTableData: [],
        tableSearch: '',
        dialog: false,
        mobileno: null,
        message: null,
        states: [
          'APPL', 'CISCO', 'ORACLE', 'IBM TECHNOLOGIES',
          'CAP GEMINI', 'WIPRO TECHNOLOGIES', 'Mind Tree', 'Infosys',
          'WIPRO', 'HGS', 'DELL',
          'Microsoft', 'LG', 'LG2', 'Softvision', 'RRK Enterprises',
          'vision care', 'Vivo', 'SONY', 'pavithra', 'raj and co',
          'Yashwanth Enterprises', 'Jyoti  Co', 'ramesh', 'Punith and Co',
          'cust', 'cust1', 'jyoti', 'Sameer',
          'Rajeev', 'Krishna', 'APPLE123', 'CIS',
          'Fortune Marketing Pvt Ltd', 'Toshiba', 'Samsung', 'Compaq',
          'Lenova', 'RedFox', 'Key Tronic', 'Network Infotech',
          'ICSA 2 International Limited', 'Howard Myers & Co', 'Coinc Ltd', 'Oswalds', 'Intel',
          'MI', 'Rajesh Ent', 'Lenovo1', 'Intel5',
          'Softvent', 'software', 'Kumal', 'Raju', 'Kiran Rajesh Co',
          'Lokesh and Co.', 'KK enterprises', 'Anil', 'DELLL',
        ],
         filters: [
          {
            value: 0,
            fn: (item, queryText, itemText) => item.indexOf(queryText) > -1,
            text: 'Exact Match',
          },
          {
            value: 1,
            fn: (item, queryText, itemText) => queryText.length > 2 && item.toLowerCase().indexOf(queryText) > -1,
            text: 'Search Length > 2 & Loose Match',
          },
        ],
        
    }
     },
     beforeMount: function() {
        this.Getpartypersonal();
        this.loadpartypersonal();
     },
        computed: {
        form () {
        return {
          mobileno: this.mobileno,
          message: this.message,
          
         }
      },
      activeFilter () {
        if (this.mobileno == null) return undefined
        return this.filters[this.mobileno].fn
      },
    },
         
   

  methods: {
    resetForm () {
        this.errorMessages = []
        this.formHasErrors = false
        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
     send () {
        this.formHasErrors = false
        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true
          this.$refs[f].validate(true)
        })
        if(!this.formHasErrors){
          httpClient({
          method: 'GET',
          url: `${process.env.VUE_APP_API_BASE}SMSNotification?message=${this.message}&toSMS=${this.mobileno}`
        })
          .then((result) => {
            alert('success');

            this.errorMessages = []
            this.formHasErrors = false
            Object.keys(this.form).forEach(f => {
              this.$refs[f].reset()
            })

          }).catch((err) => {
            alert('errors in api');

          });
        }
      },
      Getpartypersonal(){
         httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}PartyPersonalInformation`
      })
        .then((result) => {
           this.partypersonal = result.data;
           
        }).catch((err) => {
          /**
           * When API call failed: check error in browser console::
           */
          this.showSnackBar('error',err.response.data);
        });
    },
    loadpartypersonal: function() {

      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}PartyPersonalInformation`
      })
        .then((result) => {
            this.partypersonalTableData = result.data;
        }).catch((err) => {
          /**
           * When API call failed: check error in browser console::
           */
          this.showSnackBar('error',err.response.data);
        });
    },
    
  }
}
</script>
<style>
  .v-flex{
      align-items: center;
  }
  .theme--light.v-icon {
    color: rgba(0,0,0,.54);
    font-size: larger;
}
.v-input--selection-controls{
  margin-bottom: -50px;
}
</style>