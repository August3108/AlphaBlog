<template>
<v-dialog v-model="localDialogVisible" persistent height="76%" max-width="60%" position="fixed" scrollable>

    <v-card>
        <v-card-title class="d-flex bg-black text-white">
            <h4>Create Blog Post</h4>
            <v-spacer></v-spacer>
            <v-icon @click="$emit('close-dialog')">mdi-window-close</v-icon>

        </v-card-title>

        <v-card-text class="text-white" elevation="2" variant="outlined" style="background-color:#808080;">

            Title
            <v-text-field bg-color="grey-lighten-4" density="compact" type="email" placeholder="Your title here" v-model="title" :rules="rules" variant="solo"></v-text-field>
            Body
            <TextEditor :getData="getBodydata" />

        </v-card-text>

        <v-card-actions class="bg-black">
            <v-spacer></v-spacer>
            <v-btn @click="pressBtnPost()" class="v-btnClass text-none" style="background-color:#808080;">
                Submit
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
<PageSnackbar :isGreen="isGreen" v-if="snackbarVisible" :location="'top'" :message="snackbarMessage" :timeout="5000" @close-snackbar="closeSnackbar" />
</template>

  
<script>
import TextEditor from './TextEditor.vue';
import PageSnackbar from './PageSnackbar.vue';
import axios from "axios"
import {
    base_url
} from '@/API/index'
export default {
    props: ['dialogVisible'],
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
            snackbarVisible: false,
            isGreen:true,
            snackbarMessage: '',
            blogData: null,
            title: null,
            haveTitle:false
        };
    },
    components: {
        TextEditor,
        PageSnackbar

    },
    emits: ['closeDialog'],
    methods: {
        getBodydata(data) {
            this.blogData = data;
        },
        pressBtnPost() {

            if (this.validatePost()) {
                this.createPost()
                this.$emit('close-dialog')


            }

        },
        validatePost() {
            if (!this.blogData || this.blogData == '' || this.title == '' || !this.title) {
                this.snackbarMessage = 'fill all fields';
                this.isGreen=false;
                this.showSnackbar();
                return false;
            }
            return true;
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
            window.location.reload();
        },

        async createPost() {

            try {

                const url = `${base_url}blog/create/`;
                const blogContent = {
                    description: 'nsbp',
                    title: this.title,
                    body: this.blogData
                };
                const token = localStorage.getItem('access');
                const userToken = `Bearer ${token}`;

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': userToken
                };

                const response = await axios.post(url, blogContent, {
                    headers: headers
                });

                    this.snackbarMessage = response.data['message'];
                    this.showSnackbar();
                    this.$router.push({ path: '/' });

                

            } catch (error) {
                console.error(error);

            }
        }

    },

}
</script>
  
  
<style>

  </style>
