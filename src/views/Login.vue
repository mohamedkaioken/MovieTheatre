<template>
    <div>
      <v-card dark class="mx-auto card elevation-12" min-width="600px">
          <v-toolbar color="grey darken-3" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer />
            
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field dark label="Username" name="Username" prepend-icon="mdi-account" type="text" v-model="username" />
              <v-text-field dark label="Password" name="password" prepend-icon="mdi-lock" type="password" v-model="password" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="grey darken-3" @click="TryLogin" :loading="loading">Login</v-btn>
            <v-btn text color="grey lighten-4" to="register">Register</v-btn>
          </v-card-actions>
          
        </v-card>
        <v-snackbar
      v-model="snackbar"
      :timeout = "timeout"
    >
    Wrong Username or Password
    </v-snackbar>
    </div>
        
        

</template>

<script>
import { mapGetters, mapActions } from "vuex";
  export default {
    name: "login",
    data: () => ({
      username: '',
      password: '',
      loading:false,
      snackbar:false,
    timeout:1000,
    }),
    mounted(){
      console.log(this)
    },
    methods:{
      ...mapActions('auth', ['login']),
        TryLogin() {
          this.loading = true
            // Perform a simple validation that email and password have been typed in
            if (this.username != '' && this.password != '') {
                this.login({username: this.username, password: this.password})
                .then(r => {
                  if(!r){
                    this.snackbar = true
                    this.loading = false
                  }
                }) 
                
            }
        }
      
    },
    computed: {
        ...mapGetters('auth', [
            'authenticating',
            'authenticationError',
            'authenticationErrorCode',
            'authenticationSuccess'
        ])
    },
  };
</script>

<style>
</style>