<template>
<v-dialog v-model="localDialogVisible" persistent max-width="450px" position="fixed" scrollable>
    <v-card>
        <v-card-title class="d-flex bg-black text-white">
            <h4 v-if="signUp == false">Login</h4>

            <h4 v-if="signUp == true">
                <v-icon size="30" v-if="signUp == true" @click="this.signUp = false">mdi-arrow-left</v-icon>&nbsp;SignUp
            </h4>

            <v-spacer></v-spacer>

            <!-- <v-btn color="primary" @close-dialog="$parent.closeDialog">Close Dialog</v-btn> -->
            <v-icon @click="$emit('close-dialog')" small>mdi-window-close</v-icon>

        </v-card-title>

        <!-- form content -->
        <v-card-text class="text-white" elevation="2" variant="outlined" style="background-color:#808080;">
            <div v-if="signUp == true">
                Name:
                <v-text-field bg-color="grey-lighten-4" density="compact" type="text" variant="solo" placeholder="E.G. abc@xyz.co.in" v-model="user.name" :rules="[rules.name]">
                </v-text-field>
            </div>

            Email:
            <v-text-field bg-color="grey-lighten-4" density="compact" type="email" placeholder="E.G. abc@xyz.co.in" v-model="user.email" :rules="[rules.required, rules.email]" variant="solo">
            </v-text-field>

            Password:
            <v-text-field bg-color="grey-lighten-4" density="compact" :type="showPass ? 'text' : 'password'" placeholder="Password" variant="solo" v-model="user.password" :append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="blink()" :rules="[rules.password ]" :error-messages="rules.password.v">
            </v-text-field>

            <div v-if="signUp == true">
                Confirm Password:
                <v-text-field bg-color="grey-lighten-4" density="compact" :type="showPass ? 'text' : 'password'" placeholder="Confirm Password" variant="solo" v-model="user.cpassword" :append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="blink()" :rules="[rules.required, (v) => rules.confirmPassword(v, user.password)]"></v-text-field>
            </div>

            <div class="toggle" v-if="signUp == false" @click="this.signUp = true">Not a
                member? signup</div>

        </v-card-text>

        <!-- buttons -->

        <v-card-actions class="bg-black">
            <v-spacer></v-spacer>
            <v-btn v-if="signUp == false" @click="pressBtnLogin()" class="login v-btnClass text-none" style="background-color:#808080;" id="addLead" variant="text">
                Login
            </v-btn>
            <v-btn v-if="signUp == true" @click="pressBtnSignup()" class="v-btnClass text-none" style="background-color:#808080;" id="addLead" variant="text">
                SignUp
            </v-btn>

        </v-card-actions>
    </v-card>
</v-dialog>

<!-- calling snackbar -->
<PageSnackbar  v-if="snackbarVisible" :message="snackbarMessage" :isGreen="isGreen" :timeout="5000" @close-snackbar="closeSnackbar" :location="'top'" />
</template>

<script>
import RULES from "@/utils/rules.js"

import PageSnackbar from '../../components/PageSnackbar.vue'
import {
    base_url
} from '../../API/index'

import axios from "axios"
export default {

    props: ['dialogVisible'],
    components: {
        PageSnackbar
    },
    computed: {
        localDialogVisible: {
            get() {
                return this.dialogVisible;
            },
            set(value) {
                this.$emit('update:dialogVisible', value);
            }
        }
    },
    data() {
        return {
            rules: RULES,
            isGreen:true,
            test: 'asjdnkjas',
            test1: 'asjkfdnaskjdnkjbg',
            showPass: false,
            signUp: false,
            snackbarVisible: false,
            snackbarMessage: '',
            user: {
                name: null,
                email: null,
                password: null,
                cpassword: null,

            }
        };
    },

    methods: {
        blink() {
            this.showPass = !this.showPass
        },
        pressBtnLogin() {

            if(this.validateForm()){
            this.userLogin();}
        },
        pressBtnSignup() {

            if (this.validateForm()) {

                this.userRegistration();
                this.showSnackbar();
                this.snackbarMessage = 'Registration done';
            }
        },

        validateForm() {
            if (this.signUp) {
                if (!this.user.name || !this.user.email || !this.user.password || !this.user.cpassword) {
                    this.isGreen=false;
                    this.showSnackbar();
                    this.snackbarMessage = 'Please fill in all fields';
                    return false;
                }
                return true;
            } else {
                if (!this.user.email || !this.user.password) {
                    this.isGreen=false;
                    this.showSnackbar();
                    this.snackbarMessage = 'Please fill in all fields';
                    return false;
                }
                return true;
            }
        },

        showSnackbar() {
            this.snackbarVisible = true;

            setTimeout(() => {
                this.closeSnackbar();
            }, 5000);
        },

        closeSnackbar() {
            this.snackbarVisible = false;
            this.snackbarMessage = '';
            this.isGreen=true;
        },
        handleError() {

            if (this.response.status == 200 && this.response.data['success'] == false) {
                this.snackbarMessage = 'this.test + this.test1';
                this.showSnackbar();
            } else {
                this.snackbarMessage = '';
                this.showSnackbar();

            }

        },

        async userLogin() {

            try {
                const url = `${base_url}user/login/`;
                const userDetail = {
                    email: this.user.email,
                    password: this.user.password,
                };
                const headers = {
                    'Content-Type': 'application/json',
                };
                const response = await axios.post(url, userDetail, {
                    headers
                });

                if (response.status == 200) {
                    this.snackbarMessage = response.data['message']
                    if (response.data['success'] == true) {
                        // Store user token in local storage
                        localStorage.setItem('access', response.data['data']['access']);
                        localStorage.setItem('refresh', response.data['data']['refresh']);
                        window.location.reload();
                    } else {

                        this.isGreen=false
                        
                        this.showSnackbar();
                    }

                    console.warn(response.data);
                }

                console.log("printing response")
            } catch (error) {
                console.error(error);

                console.warn("printing response")
            }
        },

        async userRegistration() {

            try {
                const url = `${base_url}user/register/`; // Replace with your API endpoint

                // JSON data to send in the request body
                const userData = {
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password,
                    rePassword: this.user.cpassword
                };

                // Custom headers to send in the request
                const headers = {
                    'Content-Type': 'application/json',
                    //   Authorization: 'Bearer YourAuthToken' // Replace with your authentication token
                };

                // Make POST request using Axios
                const response = await axios.post(url, userData, {
                    headers
                });

                if (response.status == 200) {
                    console.warn(response.data); // Process the response data as needed

                    if (response.data['success'] == true) {
                        // Store user token in local storage
                        localStorage.setItem('access', response.data['access']);
                        localStorage.setItem('refresh', response.data['refresh']);
                        this.snackbarMessage=response.data['success'];
                        this.showSnackbar();
                        // Perform automatic login by calling userLogin() function or any other login logic you have implemented.
                        this.userLogin();
                    } else {
                        // Handle registration failure
                        console.log(response.data['message']);
                    }

                }

                console.log("printing response")
            } catch (error) {
                console.error(error);

                console.warn("printing response")
            }
        }

    }
}
</script>

<style></style>
