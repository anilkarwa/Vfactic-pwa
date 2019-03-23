<template>
  <div id="app">
    <v-app id="inspire">
        <!-- START: Code for Supplier Group Master Table data -->
      <v-data-table :headers="headers" :items="generalMasterTableData" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editGeneralMasterData(props.item)">edit</v-icon>
            <v-icon small @click="deleteGeneralMasterRequest(props.item)">delete</v-icon>
          </td>
          <td v-for="values in props.item" :key="values.id">
            {{ values }}
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary">Reset</v-btn>
        </template>
      </v-data-table>
      <!-- END: Code for Supplier Group Master Table data -->
    </v-app>
 </div>
 </template>

 <script>
 export default{
    data: function(){
        return{

        }
    },
    methods:{

    }
 }
 </script>

 <style>
 </style>