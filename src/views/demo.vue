<template>
  
</template>
<script>
import httpClient from "@/services/httpClient.js";

export default {
  name: 'Demo',
  created() {
    this.testAPI()
  },
  methods: {
    testAPI() {
      httpClient({
        method: 'POST',
        url: 'https://api.v1.ctxdev.com/users/ms/auth/magic-link',
        payload: {
             data:{  
                  attributes:{  
                phone: "+91 9660009901"
                  }
              }
        }
      })
    }
  }
}
</script>
