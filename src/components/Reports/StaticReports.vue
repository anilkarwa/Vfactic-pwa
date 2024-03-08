<template>
    <div id="app">
        <!-- Report tabs -->
        <div>
            <v-subheader>Sales Report</v-subheader>

            <div style="display:flex;justify-content: space-around;">
                <div class="reportSelectionBox" style="background-color:#82E0AA" @click="OpenSelectedReport('Stock Balance')">
                    <img src="../../assets/stock-report.png" style="width:50px;height:50px;" alt="">
                    <div class="reportTitle">Sales</div>
                </div>
                
            </div>
                
            <v-divider></v-divider>
            <v-subheader>Purchase Report</v-subheader>
            <div style="display:flex;justify-content: space-around;">
                <div class="reportSelectionBox" style="background-color:#82E0AA">
                    <img src="../../assets/stock-report.png" style="width:50px;height:50px;" alt="">
                    <div class="reportTitle">Sales</div>
                </div>
                
            </div>
            <v-divider></v-divider>
            <v-subheader>Stock Report</v-subheader>
            <div style="display:flex;justify-content: space-around;">
                <div class="reportSelectionBox" style="background-color:#82E0AA">
                    <img src="../../assets/stock-report.png" style="width:50px;height:50px;" alt="">
                    <div class="reportTitle">Stock Balance</div>
                </div>
                
            </div>
            <v-divider></v-divider>
            <v-subheader>Miscellaneous Utilities Report</v-subheader>
            <div style="display:flex;justify-content: space-around;">
                <div class="reportSelectionBox" style="background-color:#82E0AA">
                    <img src="../../assets/stock-report.png" style="width:50px;height:50px;" alt="">
                    <div class="reportTitle">Sales</div>
                </div>
                
            </div>
        
        </div>
<!-- Report tab End -->

<!-- Report Modal -->
      <v-dialog v-model="reportDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="reportDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>{{selectedReport}}</v-toolbar-title>
            <v-spacer></v-spacer>  
          </v-toolbar>
           <div style="padding-top:3%;padding-left:2%">
               <DynamicFilterReports></DynamicFilterReports>
           </div>
           
        </v-card>
      </v-dialog>
<!-- Report Modal End -->

    </div>
</template>


<script>
import DynamicFilterReports from './DynamicFilterReports/dynamicFilterReports.vue';

export default {
    data(){
        return{
            reportDialog:false,
            selectedReport:''
        }
    },
    components:{
        DynamicFilterReports
    },
    methods:{
        OpenSelectedReport(reportName){
            this.selectedReport = reportName;
            this.reportDialog= true;
        }
    }
}
</script>

<style>
 .reportSelectionBox{
     width: 110px;
     height: 110px;
     align-content: center;
     background-color: tomato;
     border-radius: 5px;
     margin: 3px;
     justify-content: center;
     padding-top: 10px;
     box-sizing: border-box;
     box-shadow: 0px 18px 18px rgba(0, 0, 0, 0.3);
 }
 .reportSelectionBox:hover{
    cursor: pointer;
    opacity: 1;
    background: #e2a9e5;
    background: -moz-linear-gradient(-45deg, #e2a9e5 15%, #2b94e5 100%);
    background: -webkit-linear-gradient(-45deg, #e2a9e5 15%,#2b94e5 100%);
    background: linear-gradient(135deg, #e2a9e5 15%,#2b94e5 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e2a9e5', endColorstr='#2b94e5',GradientType=1 );
 }
 .reportTitle{
     position: relative;
     display: block;
     text-transform: capitalize;
     color: white;
     font-size: 14px;
     padding-top: 10px; 
 }
</style>

