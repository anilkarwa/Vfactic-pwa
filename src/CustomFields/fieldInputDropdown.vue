<!-- fieldAwesome.vue -->
<template>
  
    <div id="app">
    <input 
        class="form-control" 
        type="text" 
        v-model="value" 
        :list="schema.inputSelectId"
        :disabled="disabled"
        :maxlength="schema.max"
        :placeholder="schema.placeholder"
        :readonly="schema.readonly" >
        <datalist :id="schema.inputSelectId">
            <option v-for="data in schema.values" :key="data.id">{{data.id}}</option>
        </datalist>
</div>
</template>

<script>
   import { abstractField } from "vue-form-generator";

   export default {
         mixins: [ abstractField ]
   };
</script>