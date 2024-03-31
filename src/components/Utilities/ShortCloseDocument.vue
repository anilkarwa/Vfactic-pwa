<template>
  <div id="app">
    <v-app id="inspire">
      <v-card>
        <v-card-title>
        </v-card-title>
        <v-container fluid grid-list-xl>
          <v-layout wrap align-center>
            <v-flex xs12 sm6 d-flex>
              <v-select v-model="selectedDocument" :items="documentList" item-text="docName" item-value="docId"
                label="Document" solo></v-select>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-radio-group v-model="radioButtonData" column>
                <v-radio label="ShortClosed" color="primary" value="shortclose"></v-radio>
                <v-radio label="Pending" color="primary" value="pending"></v-radio>
                <v-radio label="Both" color="primary" value="both"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 sm2 d-flex>
              <v-checkbox v-model="isDateRange" label="Date Range"></v-checkbox>
            </v-flex>
            <v-flex xs12 sm4 d-flex>
              <v-menu reff="datePickerModal" v-model="datePickerModal" :close-on-content-click="false" lazy
                transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="dateFormatted" label="From Date" persistent-hint prepend-icon="event"
                    @blur="date = parseDate(dateFormatted)" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title @input="datePickerModal = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm4 d-flex>
              <v-menu reff="datePickerModal" v-model="toDatePickerModal" :close-on-content-click="false" lazy
                transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="toDateFormatted" label="To Date" persistent-hint prepend-icon="event"
                    @blur="date2 = parseDate(toDateFormatted)" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="date2" no-title @input="toDatePickerModal = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm2 d-flex>
              <v-btn color="success" class="white--text" @click="loadShortCloseData()">
                Load
                <v-icon right dark>visibility</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card>
          <v-card-title>
          </v-card-title>
          <v-btn color="error" v-if="selected.length > 0" class="white--text" @click="shortCloseSelecteRowData()">
            Short Close
            <v-icon right dark>cancel</v-icon>
          </v-btn>
          <v-data-table v-model="selected" :headers="shortCloseTableHeader" :item-key="prefix + 'DTLID'"
            :items="shortCloseTableData" select-all class="elevation-1" hide-actions>
            <template v-slot:headers="props">
              <tr>
                <th>
                  <v-checkbox :input-value="props.all" :indeterminate="props.indeterminate" primary hide-details
                    @click.stop="toggleAll"></v-checkbox>
                </th>
                <th v-for="header in props.headers" :key="header.text" :class="['column sortable', 'active']">
                  <b>{{ header.text.toUpperCase() }}</b>
                </th>
              </tr>
            </template>
            <template v-slot:items="props">
              <tr style="cursor:pointer" :active="props.selected" @click="props.selected = !props.selected">
                <td>
                  <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
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
      </v-card>
      <!-- END: Code for Supplier Group Master Table data -->

      <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="timeout"
        :vertical="mode === 'vertical'">{{
                text }}
        <v-btn dark flat @click="snackbar = false"> Close </v-btn>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import httpClient from "@/services/httpClient.js"
import previewModalCalculation from '@/DynamicProperty/previewModalCalculation.js';

export default {
  name: "shortclose",

  data: vm => ({
    snackbar: false,
    color: '',
    mode: '',
    timeout: 5000,
    text: '',
    radioButtonData: '',
    isDateRange: true,
    selectedDocument: '',
    selectedDocumentNo: '',
    datePickerModal: false,
    toDatePickerModal: false,
    date: new Date().toISOString().substr(0, 10),
    date2: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    toDateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    documentList: [],
    shortCloseTableHeader: [],
    shortCloseTableData: [],
    selectedRowData: [],
    detailSectionHeader: [],
    detailSectionTableData: [],
    prefix: '',
    selected: [],
  }),
  beforeMount() {
    this.loadShortCloseDropdownList();
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);

    },
    date2() {
      this.toDateFormatted = this.formatDate(this.date2);
    }
  },
  methods: {
    showSnackBar(type, message) {
      this.snackbar = true;
      this.color = type;
      this.text = message;
    },
    loadShortCloseDropdownList() {
      this.documentList = [];
      let userId = localStorage.getItem('userId') || 0;
      httpClient({
        method: "GET",
        url: `${process.env.VUE_APP_API_BASE}shortClose?userId=${userId}`
      }).then(res => {
        if (res.status === 200 && res.data) {
          this.documentList = res.data;
        }
      });
    },
    loadShortCloseData() {
      if (this.getCurrentUserRoles('viewRight') != '1') {
        this.showSnackBar('error', 'You do not have rights to view this document');
        return;
      }
      httpClient({
        method: "GET",
        url: `${process.env.VUE_APP_API_BASE}shortClose?docId=${this.selectedDocument}&docType=${this.radioButtonData}&selectedDocNo=${this.selectedDocumentNo}&isDateRange=${this.isDateRange}&fromDate=${this.dateFormatted}&toDate=${this.toDateFormatted}`
      }).then(res => {
        if (res.status === 200 && res.data) {
          this.prefix = res.data.prefix;
          this.menuAPILink = res.data.menuApiLink;
          this.generateShortCloseTableHeader(res.data.tableData[0]);
          this.shortCloseTableData = res.data.tableData;
        }
      });
    },
    shortCloseSelecteRowData() {
      if (this.getCurrentUserRoles('authRight') != '1') {
        this.showSnackBar('error', 'You do not have rights to short close this document');
        return;
      }
      let selecteRow = this.selected.map(e => {
        return { userId: localStorage.getItem('userId'), dtlId: e[this.prefix + "DTLID"], shortCloseQty: e.PENDQTY, prefix: this.prefix };
      });
      httpClient({
        method: "PUT",
        url: `${process.env.VUE_APP_API_BASE}shortClose`,
        data: selecteRow
      }).then(res => {
        if (res.status === 200 && res.data) {
          this.loadShortCloseData();
          this.selected = [];
          this.showSnackBar('success', res.data);
        }
      });
    },
    generateDetailSectionTableHeader(model) {
      for (var property in model) {
        if (property != "ITEMID" && property != "UOMID" && property != "ITEMSLNO") {
          this.detailSectionHeader.push({ text: property, value: property });
        }
      }
    },
    generateShortCloseTableHeader(model) {
      for (var property in model) {
        this.shortCloseTableHeader.push({ text: property, value: property });
      }
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null
      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    parseAsDBDate(date) {
      if (!date) return null
      const [days, months, years] = date.split('/')
      return `${months}/${days}/${years}`
    },
    toggleAll() {
      if (this.selected.length) this.selected = []
      else this.selected = this.shortCloseTableData.slice()
    },
    getCurrentUserRoles(type) {
      switch (type) {
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
