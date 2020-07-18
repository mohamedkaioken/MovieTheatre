<template>
<div>
    <v-card dark class="mx-auto card elevation-12" min-width="600px">
        <v-toolbar color="grey darken-3" dark flat>
            <v-toolbar-title>Register form</v-toolbar-title>
            <v-spacer />
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field dark label="Username" name="Username" type="text" v-model="username" />
                <v-text-field dark label="Password" name="password" type="password" v-model="password" />
                <v-text-field dark label="firstName" name="firstName" type="text" v-model="firstName" />
                <v-text-field dark label="lastName" name="lastName" type="text" v-model="lastName" />
                <v-text-field dark label="sourceId" name="sourceId" type="text" v-model="sourceId" />
                <v-text-field dark label="factoryName" name="factoryName" type="text" v-model="factoryName" />
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn color="grey darken-3" @click="register">Confirm</v-btn>
            <v-btn text color="grey lighten-4" to="login">Back to Login</v-btn>
        </v-card-actions>

    </v-card>
    <v-snackbar
      v-model="snackbar"
      :timeout = "timeout"
    >
    Register is disabled
    </v-snackbar>
</div>
    
</template>

<script>
   
    export default {
        name: "register",
        data: () => ({
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            sourceId: '',
            factoryName: '',
            snackbar:false,
    timeout:1000,
        }),
        mounted() {
            console.log(this)
        },
        methods: {
            register(){
                this.snackbar = true
            },
            

        },
        
    };
</script>

<style>
</style>