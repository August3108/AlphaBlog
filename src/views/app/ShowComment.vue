<template>
<v-card v-for="comment in commentList" :key="comment.id" color="grey" class="ma-auto mt-5 d-flex pa-3" max-width="95vw" min-height="10vh">
    <div>
        <!-- <h1 class="ml-5">{{ comment.body }}</h1> -->
        <small>{{ comment.author }} says,</small>
        <p v-html="comment.body"></p>
        <small>on {{ formatDate(comment.postedAt) }}</small>

    </div>
    <v-spacer></v-spacer>
    <v-btn v-if="comment.is_edit" variant="plain"  append-icon="mdi-comment-edit-outline"></v-btn>
    <v-btn variant v-if="blogCreator" color="red" append-icon="mdi-delete" @click="deleteComment(comment.id)"></v-btn>

</v-card>

<div ref="bottomMarker" style="background-color: inherit;"></div>
<br /><br /><br />
</template>

<script>
import {
    base_url
} from '@/API/index';

export default {
    data() {
        return {
            commentList: [],
            currentPage: 1,
            totalPages: null,
            nextUrl: null,
        };
    },
    props: {
        itemId: String,
        blogCreator: Boolean
    },

    mounted() {
        this.fetchComments();
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {

        fetchComments() {
            let records = 5; // Number of comments to fetch per request
            let blogID = this.itemId; // ID of the blog for which comments are fetched
            let url = `${base_url}/blog/comments/${blogID}?page=${this.currentPage}`;
            const token = localStorage.getItem('access');
            const userToken = `Bearer ${token}`;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': userToken
            };

            fetch(url, {
                    method: 'GET',
                    headers: headers,
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success && data.data.results && data.data.results.length) {
                        const results = data.data.results;
                        console.log(data);

                        this.commentList.push(...results);
                        this.totalPages = Math.ceil(data.data.count / records);
                        this.nextUrl = data.data.next;
                    }
                })
                .catch(error => console.log(error));
        },

        handleScroll() {
            const bottomMarker = this.$refs.bottomMarker;
            const rect = bottomMarker.getBoundingClientRect();

            if (rect.top <= window.innerHeight) {
                if ((this.currentPage < this.totalPages || this.nextUrl) && this.nextUrl !== null) {
                    this.currentPage++;
                    this.fetchComments();
                }
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        },

        async deleteComment(commentId) {
            const url = `${base_url}blog/comment/delete/${commentId}/`;
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
                this.commentList = [],
                    this.currentPage = 1
                this.totalPages = null,
                    this.nextUrl = null,
                    this.fetchComments(),
                    console.log(data);

            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        },

    },
};
</script>

<style scoped>
  
  </style>
