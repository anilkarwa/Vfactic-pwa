<template>
    <div id="app">
        <v-app id="inspire">
            <v-card>
                <v-card-title>
                </v-card-title>
                <v-data-table :headers="headers" :items="listOfPostDocEntries" class="elevation-1">
                    <template v-slot:items="props">
                        <td class="text-xs-center" style="cursor:pointer">
                            <v-icon small class="mr-2"
                                @click="postDocDialog = true; selectedPostDocId = props.item.postDocId; getPostDocData();">view_headline</v-icon>
                        </td>
                        <td class="text-xs-center ">{{ props.item.postDocName }}</td>
                        <td class="text-xs-center">{{ props.item.remarks }}</td>
                    </template>
                    <template slot="no-data">
                        <v-btn color="primary">Reset</v-btn>
                    </template>
                </v-data-table>
            </v-card>
            <!-- END: Code for Supplier Group Master Table data -->

            <v-dialog v-model="postDocDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar fixed dark color="primary">
                        <v-btn icon dark @click="postDocDialog = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>{{ $store.state.pageName }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <!-- <v-btn class="blue darken-1 white--text" @click="savePostDocData()">Save</v-btn> -->

                    </v-toolbar>
                    <v-card-title>
                    </v-card-title>
                    <v-container class="spaceFromTop" fluid grid-list-xl>
                        <v-layout wrap align-center>
                            <v-flex xs12 sm2 d-flex>
                                <v-checkbox v-model="isDateRange" label="Date Range"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm4 d-flex>
                                <v-menu reff="datePickerModal" v-model="datePickerModal" :close-on-content-click="false"
                                    lazy transition="scale-transition" offset-y full-width max-width="290px"
                                    min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="dateFormatted" label="From Date" persistent-hint
                                            prepend-icon="event" @blur="date = parseDate(dateFormatted)"
                                            v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date" no-title
                                        @input="datePickerModal = false"></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex xs12 sm4 d-flex>
                                <v-menu reff="datePickerModal" v-model="toDatePickerModal"
                                    :close-on-content-click="false" lazy transition="scale-transition" offset-y
                                    full-width max-width="290px" min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="toDateFormatted" label="To Date" persistent-hint
                                            prepend-icon="event" @blur="date2 = parseDate(toDateFormatted)"
                                            v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date2" no-title
                                        @input="toDatePickerModal = false"></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex xs12 sm4 d-flex>
                                <v-radio-group v-model="radioButtonData" column>
                                    <v-radio label="All" color="primary" value="A"></v-radio>
                                    <v-radio label="Pending" color="primary" value="P"></v-radio>
                                </v-radio-group>
                            </v-flex>
                            <v-flex xs12 sm2 d-flex>
                                <v-btn color="success" class="white--text" @click="getPostDocData()">
                                    Load
                                    <v-icon right dark>visibility</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-card>
                        <v-card-title>
                        </v-card-title>

                        <v-data-table :headers="selectedPostDocHeader" :items="selectedPostDocData" class="elevation-1"
                            hide-actions>
                            <template v-slot:headers="props">
                                <tr>
                                    <th>Edit</th>
                                    <th v-for="header in props.headers" :key="header.text"
                                        :class="['column sortable', 'active']">
                                        <b>{{ header.text.toUpperCase() }}</b>
                                    </th>
                                </tr>
                            </template>
                            <template v-slot:items="props">
                                <tr style="cursor:pointer" :active="props.selected"
                                    @click="props.selected = !props.selected">
                                    <td> <v-icon samll class="mr-2" @click="editPostDocRow(props.item)">edit</v-icon>
                                    </td>
                                    <template v-for="header of selectedPostDocHeader">
                                        <td :key="header.text">{{ props.item[header.text] }}</td>
                                    </template>
                                </tr>
                            </template>
                            <template slot="no-data">
                                <v-btn color="primary">Reset</v-btn>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-card>
            </v-dialog>

            <!-- Edit Post doc row modal -->

            <v-dialog v-model="detailModal" scrollable persistent max-width="450px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Edit Data</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <vue-form-generator id="Form-generator-css" ref="vfAddDetail"
                                        :schema="postDocDynamicSchema" :model="postDocDynamicModal"
                                        :options="formOptions"></vue-form-generator>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="detailModal = false">Close</v-btn>
                        <v-btn color="blue darken-1" flat @click="savePostDocData();">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="timeout"
                :vertical="mode === 'vertical'">{{
                    text }}
                <v-btn dark flat @click="snackbar = false"> Close </v-btn>
            </v-snackbar>
        </v-app>
    </div>
</template>

<script>
import httpClient from "@/services/httpClient.js";
import generatePostDocEntrySchema from "@/DynamicProperty/generatePostDocEntrySchema.js";
import convertDate from '@/DynamicProperty/dateFormat.js'
import convertDateWithSchema from '@/DynamicProperty/convertDateWithSchema.js';

export default {
    data: vm => ({
        headers: [{ text: "Select", align: "center", sortable: false, }, { text: "Post Document Name", align: "center" }, { text: "Remarks", align: "center" }],
        listOfPostDocEntries: [],
        snackbar: false,
        color: '',
        mode: '',
        timeout: 5000,
        text: '',
        detailModal: false,
        radioButtonData: 'A',
        isDateRange: true,
        datePickerModal: false,
        toDatePickerModal: false,
        date: new Date().toISOString().substr(0, 10),
        date2: new Date().toISOString().substr(0, 10),
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        toDateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        postDocDialog: false,
        selectedPostDocId: 0,
        selectedPostDocHeader: [],
        selectedPostDocData: [],
        postDocSchema: [],
        postDocDynamicSchema: {
            fields: [],
            groups: []
        },
        postDocDynamicModal: {},
        formOptions: {
            validateAfterLoad: true,
            validateAfterChanged: true,
            validateAsync: true,
            validationErrorCLass: "error"
        },
        postDocSaveQuery: ""

    }),
    beforeMount() {
        this.loadListOfPostDocEntries();
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
        loadListOfPostDocEntries() {
            this.listOfPostDocEntries = [];

            httpClient({
                method: 'GET',
                url: `${process.env.VUE_APP_API_BASE}PostDocEntry`
            })
                .then((result) => {
                    this.listOfPostDocEntries = result.data;

                }).catch((err) => {
                    this.showSnackBar('error', err.response.data);
                });
        },
        getPostDocData() {
            this.postDocSaveQuery = "";
            this.selectedPostDocData = [];
            this.selectedPostDocHeader = [];
            let isDate = this.isDateRange ? "Y" : "N";
            httpClient({
                method: 'GET',
                url: `${process.env.VUE_APP_API_BASE}PostDocEntry?postDocId=${this.selectedPostDocId}&PendingAll=${this.radioButtonData}&ApplyDateRange=${isDate}&fromDate=${this.parseAsDBDate(this.dateFormatted)}&toDate=${this.parseAsDBDate(this.toDateFormatted)}`
            })
                .then((result) => {
                    this.selectedPostDocData = result.data.tableData;
                    this.postDocSchema = result.data.fieldProperties;
                    this.postDocDynamicSchema.fields = generatePostDocEntrySchema(this.postDocSchema);
                    this.convertToDateFormate(false);
                    this.generateTableHeaderPostDoc();
                    this.getPostDocSaveQuery();
                }).catch((err) => {
                    this.showSnackBar('error', err.response.data);
                });
        },
        generateTableHeaderPostDoc() {
            this.selectedPostDocHeader = [];
            for (let key in this.selectedPostDocData[0]) {
                let index = this.postDocSchema.filter(e => e.FLDNAME.toUpperCase() == key);
                if (index != null && index != undefined) {
                    if (index[0].COLHIDE == "N") {
                        this.selectedPostDocHeader.push({ text: key, value: key });
                    }
                }
            }
            console.log("Table header=" + JSON.stringify(this.selectedPostDocHeader));
        },
        getPostDocSaveQuery() {
            httpClient({
                method: 'GET',
                url: `${process.env.VUE_APP_API_BASE}PostDocEntry?postDocId=${this.selectedPostDocId}`
            })
                .then((result) => {
                    this.postDocSaveQuery = result.data;
                }).catch((err) => {
                    this.showSnackBar('error', "Problem loading save query for post doc entry");
                });
        },
        editPostDocRow(rowData) {
            this.postDocDynamicModal = rowData;
            this.detailModal = true;
            console.log("row data=" + JSON.stringify(rowData));
        },
        convertToDateFormate(isDBConvert) {
            this.postDocDynamicSchema.fields.forEach(e => {
                if (e.type == "cleave") {
                    this.selectedPostDocData.forEach(p => {
                        if (p[e.model] != "" && p[e.model] != "1900-01-01T00:00:00") {
                            p[e.model] = convertDate(p[e.model], isDBConvert);
                        } else {
                            p[e.model] = "01/01/1900";
                        }

                    });
                }
            })
        },
        convertToDBDateFormate() {
            let data = JSON.parse(JSON.stringify(this.postDocDynamicModal));
            this.postDocDynamicSchema.fields.forEach(e => {
                if (e.type == "cleave") {

                    if (data[e.model] != "" && data[e.model] != "1900-01-01T00:00:00") {
                        data[e.model] = convertDate(data[e.model], true);
                    } else {
                        data[e.model] = "01/01/1900";
                    }
                }
            })
            return data;
        },

        savePostDocData() {
            let saveData = this.convertToDBDateFormate();
            //prepare save query
            let query = "";
            let fields = this.postDocSaveQuery.split("¦");

            for (let i = 0; i < fields.length; i++) {
                if (i % 2 == 0) {
                    query += fields[i] + " ";
                } else {
                    query += "'" + saveData[fields[i].toUpperCase()] + "' ";
                }
            }
            query += ";";

            console.log("query = " + query);
            httpClient({
                method: 'PUT',
                url: `${process.env.VUE_APP_API_BASE}PostDocEntry`,
                data: { query: query }
            })
                .then((result) => {
                    this.showSnackBar('success', result.data);
                    this.detailModal = false;
                }).catch((err) => {
                    this.showSnackBar('error', err.response.data);
                });

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