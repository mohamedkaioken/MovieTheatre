<template>
  <v-row justify="center">
    
    <v-col v-if="Authenticated" cols="5">
      <div class="home">
        <h1>Hello</h1>
      </div>
    </v-col>
  </v-row>
</template>

<script>
//import ApiService from "../services/api.service";
export default {
  name: "Home",

  mounted() {

  },
  data: () => ({
   
  }),
  methods: {
    
    }
  }

</script>
<style scoped>
v-menu__content {
  overflow-y: hidden;
}
</style>