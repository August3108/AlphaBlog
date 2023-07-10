<template>
<div class="d-flex text-white py-6">
    <p v-if="item">Posted By: {{ item.creator }} on {{ item.created_date }} at {{ item.created_time }}</p>

    <v-spacer>

    </v-spacer>
    <v-btn @click="deleteBlog()" color="red" v-if="item && item.is_author" append-icon="mdi-delete"></v-btn>

</div>

<div style="min-height: 50vh; background-color: #808080;" class="text-white pa-5">
    <h2 v-if="item">{{ item.title }}</h2>
    <p v-if="item" v-html="item.body"></p>

</div>
<div>
    <v-btn v-if="isLoggedIn" color="black mt-3 mb-3 text-none" @click="openDialog">+ Add comments</v-btn>
    <CreateComment :itemId="itemId" :dialogVisible="dialogVisible" @close-dialog="closeDialog"></CreateComment>

</div>

<div>
    
    <ShowComment :itemId="itemId"   :blogCreator="item ? item.is_author : null"/>
</div>
<PageSnackbar :isGreen="isGreen" v-if="snackbarVisible" :location="'top'" :message="snackbarMessage" :timeout="5000" @close-snackbar="closeSnackbar" />

</template>

<script>
import {
    base_url
} from '@/API/index';
import CreateComment from '@/components/CreateComment.vue'
import ShowComment from './ShowComment.vue';
import PageSnackbar from '@/components/PageSnackbar.vue';

export default {
    data() {
        return {
            isLoggedIn: localStorage.getItem('access') ? 1 : 0,
            snackbarVisible: false,
            isGreen:true,
            snackbarMessage: '',
            dialogVisible: false,
            item: null,
            itemId: this.$route.query.id
        };
    },
    components: {
        CreateComment,
        ShowComment,
        PageSnackbar
    },
    mounted() {
        const itemId = this.$route.query.id;
        this.fetchItem(itemId);
    },
    methods: {
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
        openDialog() {
            this.dialogVisible = true;
        },
        closeDialog() {
            this.dialogVisible = false;
            
        },

        async deleteBlog() {
            const url = `${base_url}blog/delete/${this.itemId}/`;
            const token = localStorage.getItem('access');
            const userToken = `Bearer ${token}`;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': userToken
            };

            try {
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: headers
                });

                const data = await response.json();
                this.isGreen=false
                this.snackbarMessage = data.message;
                this.showSnackbar();
                this.$router.push({ path: '/' });

            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        },

        fetchItem(itemId) {
    let url = `${base_url}/blog/blog/${itemId}/`;
    const token = localStorage.getItem('access');
    const headers = {
        'Content-Type': 'application/json'
    };

    // Check if token exists in local storage
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    fetch(url, {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data) {
                this.item = {
                    title: data.data.title,
                    body: data.data.body,
                    created_date: data.data.created_date,
                    created_time: data.data.created_time,
                    creator: data.data.author,
                    is_author: data.data.is_author
                };
            }
        })
        .catch(error => console.log(error));
},


    },
};
</script>

<style scoped>
/* Styles for your component */
</style>
