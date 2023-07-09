<template>
<v-dialog v-model="localDialogVisible" persistent max-width="60%" position="fixed" scrollable>

    <v-card>
        <v-card-title class="d-flex bg-black text-white">
            <h4>Add Comment</h4>{{ itemId }}
            <v-spacer></v-spacer>
            <v-icon @click="$emit('close-dialog')">mdi-window-close</v-icon>

        </v-card-title>

        <v-card-text class="text-white" elevation="2" variant="outlined" style="background-color:#808080;">
            Comment
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
    props: {
        dialogVisible: Boolean,
        itemId: String
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
            snackbarVisible: false,
            isGreen:true,
            snackbarMessage: '',
            blogData: null,
            title: null
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
            if (!this.blogData || this.blogData == '') {
                this.isGreen=false
                this.snackbarMessage = 'fill all fields';
                this.showSnackbar();
                return false;
            }
            return true;
        },
        showSnackbar() {
            this.snackbarVisible = true;
            this.localDialogVisible = false;

            setTimeout(() => {
                this.closeSnackbar();
            }, 5000);
        },

        closeSnackbar() {
            this.snackbarVisible = false;
            this.snackbarMessage = '';
            this.isGreen=true
        },

        async createPost() {

            try {

                const url = `${base_url}blog/comment/`;
                const commentData = {

                    blogId: this.itemId,
                    body: this.blogData

                };
                console.log(this.blogID)
                console.log(this.body)
                console.log(commentData)
                const token = localStorage.getItem('access');
                const userToken = `Bearer ${token}`;

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': userToken
                };

                const response = await axios.post(url, commentData, {
                    headers: headers
                });

                    if(this.response.data['success'] == false)
                    {
                        this.isGreen=false
                        
                    }
                    this.snackbarMessage = response.data['message'];
                    this.showSnackbar();
                    

                
                

            } catch (error) {
                console.error(error);

            }
        }

    },

}
</script>

<style>

</style>
