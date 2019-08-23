<template>
  <v-container grid-list-xl>
      <v-card>
    <v-layout
      flex-child
      wrap
    >
      <v-flex
        xl12
        md3
        d-flex
      >
        <v-sheet
          class="d-flex"
          color="yellow lighten-3"
          height="200"
          width="500"
        >
          <div class="title font-weight-light mb-2">Purchase Order</div>
          <v-icon large color="green darken-2" style="font-size: 80px;">business</v-icon>
        </v-sheet>
      </v-flex>
 
          <v-flex xl12
                md3
                d-flex>

            <v-sheet
              class="d-flex"
              color="red lighten-3"
              height="200"
              width="500"
            >
            
              <div class="title font-weight-light mb-2">Customer Report</div>
              <v-icon large color="blue darken-2" style="font-size: 80px;">folder_open</v-icon>
            </v-sheet>
          </v-flex>
        
    
      <v-flex
        xl12
        md3
        d-flex
      >
        <v-sheet
          class="d-flex"
          color="teal lighten-3"
          height="200"
          width="500"
        >
          <div class="title font-weight-light mb-2">Sales Report</div>
          <v-icon large color="purple darken-2" style="font-size: 80px;">folder_open</v-icon>
        </v-sheet>
      </v-flex>
      <v-flex
        xl12
        md3
        d-flex
      >
        <v-sheet
          class="d-flex mt-auto"
          color="purple lighten-3"
          height="200"
          width="500"
        >
          <div class="title font-weight-light mb-2">Vat Invoice</div>
          <v-icon large color="teal darken-2" style="font-size: 80px;">present_to_all</v-icon>
        </v-sheet>
      </v-flex>
    </v-layout>
    <v-layout>
     <v-card
    class="mt-3 mx-auto"
    max-width="500"
    width="400"
    >
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="cyan"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        :labels="labels"
        :value="value"
        color="white"
        line-width="2"
        padding="16"
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">Purchase Order</div>
      <div class="subheading font-weight-light grey--text">Last Campaign Performance</div>
      <v-divider class="my-2"></v-divider>
      <v-icon
        class="mr-2"
        small
      >
        mdi-clock
      </v-icon>
      <span class="caption grey--text font-weight-light">( fin year 01 Apr 2016 - 31 Mar 2017 )</span>
    </v-card-text>
  </v-card>
  <v-card
    class="mt-3 mx-auto"
    max-width="500"
    width="400"
  >
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="green"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        :labels="labels"
        :value="value"
        color="white"
        line-width="2"
        padding="16"
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">Sales Report</div>
      <div class="subheading font-weight-light grey--text">Last Campaign Performance</div>
      <v-divider class="my-2"></v-divider>
      <v-icon
        class="mr-2"
        small
      >
        mdi-clock
      </v-icon>
      <span class="caption grey--text font-weight-light">( fin year 01 Apr 2016 - 31 Mar 2017 )</span>
    </v-card-text>
  </v-card>
  </v-layout>
  </v-card>
  </v-container>
</template>

<script>
  export default {
    components: {
      SheetFooter: {
        functional: true,
        render (h, { children }) {
          return h('v-sheet', {
            staticClass: 'mt-auto align-center justify-center d-flex',
            props: {
              color: 'rgba(0, 0, 0, .36)',
              dark: true,
              height: 50
            }
          }, children)
        }
      }
    }
  }
</script>
<script>
  export default {
    data: () => ({
      labels: [
        '12am',
        '3am',
        '6am',
        '9am',
        '12pm',
        '3pm',
        '6pm',
        '9pm'
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240
      ]
    })
  }
</script>
<style>
.v-sheet--offset {
    top: -24px;
    position: relative;
  }
.mt-3, .my-3 {
    margin-top: 3rem !important;
}
.theme--light.v-icon {
    color: rgba(0,0,0,.54);
    font-size: -webkit-xxx-large;
}
</style>