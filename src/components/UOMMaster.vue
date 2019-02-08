<template>
  <div id="app">
    <v-app id="inspire">
      <!-- START: Code for UOM master LIST -->
      <v-data-table :headers="headers" :items="UOMMasterList" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="EditUOMMaster(props.item)">edit</v-icon>
            <v-icon small @click="DeleteUOMMaster(props.item)">delete</v-icon>
          </td>
          <td>{{ props.item.UOMID }}</td>
          <td>{{ props.item.UOMCode }}</td>
          <td>{{ props.item.UOMName }}</td>
          <td>{{ props.item.inActive }}</td>
          <td>{{ props.item.addedBy }}</td>
          <td>{{ props.item.addedOn }}</td>
          <td>{{ props.item.changeOn }}</td>
          <td>{{ props.item.changedBy }}</td>
          <td>{{ props.item.Authorised }}</td>
        </template>
        <template slot="no-data">
          <v-btn color="primary">Reset</v-btn>
        </template>
      </v-data-table>
      <!-- END: Code for UOM master LIST -->
    </v-app>
  </div>
</template>
<script>
import httpClient from "@/services/httpClient.js";

export default {
  name: 'UOMMaster',
  data: function() {
    return {
      headers: [
        { text: "Edit", align: "center" },
        { text: "UOMID", align: "center", value: "UOMID"},
        { text: "UOMCode", align: "center", value: "UOMCode"},
        { text: "UOMName", align: "center", value: "UOMName"},
        { text: "inActive", align: "center", value: "inActive"},
        { text: "addedBy", align: "center", value: "addedBy"},
        { text: "addedOn", align: "center", value: "addedOn"},
        { text: "changeOn", align: "center", value: "changeOn"},
        { text: "changedBy", align: "center", value: "changedBy"},
        { text: "Authorised", align: "center", value: "Authorised"}
      ],
      UOMMasterList: []
    }
  },
  beforeMount: function() {
    this.fetchUOMMaster();
  },
  methods: {
    fetchUOMMaster: function() {
      httpClient({
        method: 'GET',
        url: `${process.env.VUE_APP_API_BASE}UOMMaster`
      }).then((res) => {
        console.log('Response from server', res);
        this.UOMMasterList = res.data;
      })
    },
    EditUOMMaster: function(UOMData) {
      console.log('UOM Master data', UOMData);
    },
    DeleteUOMMaster: function(UOMData) {
      console.log('UOM Master data', UOMData);
    }
  }
}
</script>
<style>

</style>
