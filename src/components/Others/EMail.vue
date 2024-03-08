<template>
  <div id="app">
    <v-app id="inspire" style="width: 450px;">
      <!-- START: Code for Customise Report Table data -->
      <v-card ref="form">
      <v-card-title aria-required="TO"> 
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        <v-dialog v-model="dialog" scrollable max-width="600px" margin-left="1014px">
        <template v-slot:activator="{ on }">
           <v-btn class="mx-2" fab dark small color="primary" v-on="on" >
        <v-icon dark>add</v-icon>
      </v-btn>
           <!--<i class="material-icons" dark v-on="on" style="margin-right:5px;font-size: 40px;color:#1976d2;">add_circle</i>-->
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
          v-model="to"
          v-bind:value="props.item.email"
        >
        </v-checkbox></td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
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
            ref="to"
            v-model="to"
            :rules="[() => !!to || 'This field is required']"
            :error-messages="errorMessages"
            label="TO:"
            placeholder="Mail Address"
            required
          ></v-text-field>   
        </v-flex> 
        </v-card-title>
        <v-card-title>
        <v-flex xs12 sm12 md12>
          <v-text-field
            ref="subject"
            v-model="subject"
            :rules="[() => !!subject || 'This field is required']"
            :error-messages="errorMessages"
            label="SUBJECT:"
            placeholder="Enter Subject..."
            required
          ></v-text-field>   
        </v-flex> 
      </v-card-title>
      <v-card-title>
      <v-flex xs12 sm12 md12>
        <v-textarea
          ref="message"
            v-model="message"
            :rules="[() => !!message || 'This field is required']"
            :error-messages="errorMessages"
          name="input-7-1"
          label="Message..."
          value="Progressive Web App(PWA)....."
        ></v-textarea>
      </v-flex>
      </v-card-title>   
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          <v-btn flat @click="resetForm">Clear</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="my-0"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
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
        headers: [ { text: "", align: "left",value:"" },{ text: "name", align: "left",value:"name" },{ text: "email", align: "left",value:"email" },
        { text: "partyType", align: "left", value:"partyType" } ],
        pagination: {
        rowsPerPage: parseInt(localStorage.getItem('rowPerPageDataTable')) || 5
        },
        errorMessages: '',
        to: null,
        subject: null,
        message: null,
        formHasErrors: false,
        partypersonal: [],
        toggle: [],
        active: [],
        dialogm1: '',
        partypersonalTableData: [],
        tableSearch: '',
        dialog: false,
    }
     },
     beforeMount: function() {
        this.Getpartypersonal();
        this.loadpartypersonal();
     },
        computed: {
        form () {
        return {
          to: this.to,
          subject: this.subject,
          message: this.message,
         }
      }
    },
         watch: {
         to () {
        this.errorMessages = ''
      }
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
          url: `${process.env.VUE_APP_API_BASE}EmailNotification?subject=${this.subject}&message=${this.message}&toEmail=${this.to}`
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
</style>