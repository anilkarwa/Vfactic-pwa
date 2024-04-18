<template>
  <div>
    <div class="overlay" v-if="$store.state.loader"></div>
    <v-dialog v-model="$store.state.loader" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
.overlay {
  position: fixed;
  /* Sit on top of the page content */
  width: 100%;
  /* Full width (cover the whole page) */
  height: 100%;
  /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  /* Black background with opacity */
  z-index: 1;
  /* Specify a stack order in case you're using a different order for other elements */
}
</style>
