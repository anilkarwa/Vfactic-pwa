<template>
    <div class="ag-theme-alpine">
        <ag-grid-vue style="height: 616px;" :columnDefs="columnDefs" :rowData="rowData" :rowHeight="rowHeight"
            :gridOptions="gridOptions" :enableColResize="true" :enableSorting="true" :pagination="pagination"
            :paginationPageSize="paginationPageSize" :enableFilter="true" @columnMoved="onColumnStateChange"
            @columnVisible="onColumnStateChange" @grid-ready="onGridReady"></ag-grid-vue>
    </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import { transformColumnState, transformHeader } from "../../Utils/common";
import EditDeleteIconRender from "./EditDeleteIconRender.vue";
import './customAgGrid.css'

export default {
    name: "AgGridWrapper",
    components: {
        AgGridVue,
        EditDeleteIconRender,
    },
    data() {
        return {
            columnDefs: [],
            rowData: [],
            gridOptions: {},
            rowHeight: 50,
        }
    },
    props: {
        columns: {
            type: Array,
            required: true
        },
        rows: {
            type: Array,
            required: true
        },
        editRowData: Function,
        deleteConfirmation: Function,
        pagination: {
            type: Boolean,
            default: true,
        },
        paginationPageSize: {
            type: Number,
            default: 10,
        },
        paginationPageSizeSelector: {
            type: Array,
            default() {
                return [10, 20, 30, 50, 100]; // Default page size options
            }
        },
    },
    mounted() {
        console.log("mounted called!!!", this);
    },
    watch: {
        columns(newVal) {
            const columnState = JSON.parse(localStorage.getItem(`${this.$store.state.pageName}-tableColumn`));
            if (columnState) {
                this.columnDefs = transformColumnState(columnState);
            } else {
                let headers = [...newVal];
                headers = transformHeader(headers);
                this.columnDefs = headers;
            }
            this.columnDefs = this.columnDefs.map(col => {
                console.log('col.field :', col.field);
                if (col.field === 'Action' || col.field === 'Edit') {
                    col.cellRenderer = "EditDeleteIconRender";
                    col.cellRendererParams = {
                        onEditClicked: this.handleEditClick,
                        onDeleteClicked: this.handleDeleteClick,
                    };
                }
                return col;
            });
        },
        rows(newVal) {
            this.rowData = [...newVal];
        }
    },
    methods: {
        onGridReady(params) {
            this.gridOptions.api = params.api;
            this.gridOptions.columnApi = params.columnApi;

            if (this.gridOptions.columnApi) {
                const columnState = JSON.parse(localStorage.getItem(`${this.$store.state.pageName}-tableColumn`));
                if (columnState) {
                    this.gridOptions.columnApi.applyColumnState({ state: columnState, applyOrder: true });
                }
            }
        },
        onColumnStateChange() {
            const columnState = this.gridOptions.columnApi.getColumnState();
            localStorage.setItem(`${this.$store.state.pageName}-tableColumn`, JSON.stringify(columnState));
        },
        handleEditClick(rowData) {
            console.log('Edit:', rowData);
            this.editRowData(rowData);
        },
        handleDeleteClick(rowData) {
            console.log('Delete:', rowData);
            this.deleteConfirmation(rowData);
        }
    },
};
</script>
