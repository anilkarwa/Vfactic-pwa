<template>
    <div id="app">
        <div class="filterBox" id="filterBox">
            <div class="filterToggleBtn" @click="toggleFilter()"><i class="material-icons">settings_input_component</i>
            </div>
        </div>
        <ag-grid-vue style="width: 100%; height: 500px;" class="ag-theme-balham " :columnDefs="columnDefs"
            :rowData="rowData" :defaultColDef="defaultColDef" :columnTypes="columnTypes" :floatingFilter="true"
            :groupDefaultExpanded="groupDefaultExpanded">
        </ag-grid-vue>
    </div>
</template>

<script src="./dynamicFilterReports.js"></script>

<style>
.filterBox {
    position: fixed;
    border-radius: 10px;
    right: -500px;
    width: 500px;
    height: 500px;
    z-index: 999;
    background-color: white;
    -webkit-box-shadow: -2px 3px 21px 7px rgba(224, 224, 224, 0.64);
    -moz-box-shadow: -2px 3px 21px 7px rgba(224, 224, 224, 0.64);
    box-shadow: -2px 3px 21px 7px rgba(224, 224, 224, 0.64);
}

.filterToggleBtn {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #3498DB;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: -50px;
    cursor: pointer;

}

.ag-row-hover {
    /* putting in !important so it overrides the theme's styling as it hovers the row also */
    background-color: #aed1f3 !important;
}

.ag-header-row {
    background-color: #3498DB;
}

.ag-header-cell-text {
    color: rgb(22, 22, 22);
    font-size: 16px;
}

.ag-theme-balham .ag-icon {
    color: rgb(10, 10, 10);
}

.ag-floating-filter-input {
    background-color: white;
}

select {
    border: 1px solid rgb(100, 100, 100)
}
</style>
