    <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="exampleInputGroup1"
        label="Email address:"
        label-for="exampleInput1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="exampleInput1"
          type="email"
          v-model="form.email"
          required
          placeholder="Enter email"
          />
      </b-form-group>

      <b-form-group>
        <b-form-input
          id="inputLive"
          v-model="form.name2"
          trim
          type="text"
          :state="nameState"
          aria-describedby="inputLiveHelp inputLiveFeedback"
          placeholder="Enter your name"
          required
        />
      </b-form-group>

      <b-form-group id="exampleInputGroup2" label="Your Name:" label-for="exampleInput2">
        <b-form-input
          id="exampleInput2"
          type="text"
          v-model="form.name"
          required
          placeholder="Enter name" />
      </b-form-group>

      <b-form-group id="exampleInputGroup3" label="Food:" label-for="exampleInput3">
        <b-form-select id="exampleInput3" :options="foods" required v-model="form.food" />
      </b-form-group>

      <b-form-group id="exampleGroup4">
        <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form> -->

<template id="comment-form"> 
  <div class="form-wrap container">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="email">Email address</label>
        <input 
           v-model="email" 
           v-bind:class="{'form-control':true, 'is-invalid' : !validEmail(email) && emailBlured}"
           v-on:blur="emailBlured = true">
        <div class="invalid-feedback">A valid email is required</div>
      </div>           
      <div class="form-group">
        <a type="submit" href="#" v-on:click.stop.prevent="submit" class="btn btn-lg btn-success">Submit</a>
      </div>    
    </div>
    <div v-else class="alert alert-success" role="alert">
      <h5>Thank you</h5>
      <p>Your validation was a success!</p>
    </div>
  </div><!--end form-wrapper-->
</template>
<script>
import httpClient from "@/services/httpClient.js"

  export default {
    data() {
      return {
        form: {
          email: '',
          name2: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
      }
    },
    computed: {
      nameState() {
        return this.form.name2.length > 2 ? true : false
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      TestAPI() {
        const payload = {  
            data:{  
                attributes:{  
                phone: '+1 9660009901'
              }
            }
          }
        httpClient({
          method: 'POST',
          url: `https://api.v1.ctxdev.com/users/ms/auth/magic-link`,
          data: payload
        })
          .then((result) => {
            console.log('Result', result);
          }).catch((err) => {
            console.error('Error Occured', err);
          });
      }
    }
  }
</script>
<style>

</style>
