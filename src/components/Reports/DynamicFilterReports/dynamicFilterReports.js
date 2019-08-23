import JQuery from 'jquery'
import {AgGridVue} from "ag-grid-vue";

var $ = JQuery

export default {
    data(){
        return{
            message:'heelo',
            toggle:false,
            columnDefs: null,
            rowData: null,
            sideBar: null,
            defaultColDef: null,
            columnTypes: null,
            groupDefaultExpanded:null
            
        }
    },
    components: {
        "ag-grid-vue": AgGridVue
    },
    beforeMount() {
        this.groupDefaultExpanded = -1;
        this.defaultColDef = {
            width: 150,
            editable: false,
            filter: "agTextColumnFilter"
          };
        this.columnDefs = [
            {headerName: 'Make', field: 'make',sortable: true, filter: true,rowGroup: true,filter: 'agTextColumnFilter', cellStyle: {'text-align': "left" }},
            {headerName: 'Model', field: 'model',sortable: true, filter: true,filter: 'agTextColumnFilter', cellStyle: {'text-align': "left" }},
            {headerName: 'Price', field: 'price',sortable: true, filter: true,filter: 'agTextColumnFilter', cellStyle: {'text-align': "left" }}
        ];

        this.rowData = [
            {make: 'Toyota', model: 'Celica', price: 35000},
            {make: 'Ford', model: 'Mondeo', price: 32000},
            {make: 'Porsche', model: 'Boxter', price: 72000},
            {make: 'Toyota', model: 'Celica', price: 35000},
            {make: 'Ford', model: 'Mondeo', price: 32000},
            {make: 'Porsche', model: 'Boxter', price: 72000},
            {make: 'Toyota', model: 'Celica', price: 35000},
            {make: 'Ford', model: 'Mondeo', price: 32000},
            {make: 'Porsche', model: 'Boxter', price: 72000},
            {make: 'Toyota', model: 'Celica', price: 35000},
            {make: 'Ford', model: 'Mondeo', price: 32000},
            {make: 'Porsche', model: 'Boxter', price: 72000},
            {make: 'Toyota', model: 'Celica', price: 35000},
            {make: 'Ford', model: 'Mondeo', price: 32000},
            {make: 'Porsche', model: 'Boxter', price: 72000},
            {make: 'Toyota', model: 'Celica', price: 35000},
            {make: 'Ford', model: 'Mondeo', price: 32000},
            {make: 'Porsche', model: 'Boxter', price: 72000},
            {make: 'Toyota', model: 'Celica', price: 35000},
            {make: 'Ford', model: 'Mondeo', price: 32000},
            {make: 'Porsche', model: 'Boxter', price: 72000},
            {make: 'Toyota', model: 'Celica', price: 35000},
            {make: 'Ford', model: 'Mondeo', price: 32000},
            {make: 'Porsche', model: 'Boxter', price: 72000},
            {make: 'Toyota', model: 'Celica', price: 35000},
            {make: 'Ford', model: 'Mondeo', price: 32000},
            {make: 'Porsche', model: 'Boxter', price: 72000},
            {make: 'Toyota', model: 'Celica', price: 35000},
            {make: 'Ford', model: 'Mondeo', price: 32000},
            {make: 'Porsche', model: 'Boxter', price: 72000},
            {make: 'Toyota', model: 'Celica', price: 35000},
            {make: 'Ford', model: 'Mondeo', price: 32000},
            {make: 'Porsche', model: 'Boxter', price: 72000},
            {make: 'Toyota', model: 'Celica', price: 35000},
            {make: 'Ford', model: 'Mondeo', price: 32000},
            {make: 'Porsche', model: 'Boxter', price: 72000}
        ];
    },
    methods:{
        showMessage(){
            this.message ='hi';
        },
        toggleFilter(){
            this.toggle = !this.toggle;
            console.log('hi');
            if(this.toggle){
                $("#filterBox").animate({right: '0px'});
            }else{
                $("#filterBox").animate({right: '-500px'});
            }
        }
    }
    
}