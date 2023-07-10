<template>
<v-card v-for="item in itemList" :key="item.id" color="grey" class="ma-auto mt-5 d-flex" max-width="95vw" min-height="30vh">
    <div>
        <h1 class="ml-5">{{ item.title }}</h1>
        <p class="ml-5">{{ truncateText(item.body, 600) }}</p>
    </div>
    <v-spacer></v-spacer>
    <v-card-actions class="mt-auto">
        <v-btn @click="navigateToPage(item.id)" class="text-none  text-start bg-black ml-6" dark align-start> See More </v-btn>
    </v-card-actions>
</v-card>

<div ref="bottomMarker" style="height: 5vh; background-color: inherit;"></div>
</template>

<script>
import {
    base_url
} from '@/API/index';

export default {
    data() {
        return {

            itemList: [],
            currentPage: 1,
            totalPages: null,
            nextPageUrl: null,
        };
    },
    mounted() {
        this.fetchData();
        window.addEventListener('scroll', this.handleScroll);
        
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        reloadsiblingb() {
            alert("function passed")
            this.itemList= [],
            this.currentPage= 1,
            this.totalPages= null,
            this.nextPageUrl= null,
            this.fetchData()
        },
        truncateText(text, maxLength) {
            // Remove HTML tags from text
            const strippedText = text.replace(/(<([^>]+)>)/gi, '');

            if (strippedText.length > maxLength) {
                return strippedText.substr(0, maxLength) + '...';
            }

            return strippedText;
        },

        navigateToPage(itemId) {
            this.$router.push({
                path: 'blog/ShowMore',
                query: {
                    id: itemId
                }
            });
        },

        fetchData() {
            let limit = 2; // Number of items to fetch per request
            let url = `${base_url}/blog/list/?limit=${limit}&page=${this.currentPage}`;

            fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',

                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success && data.data.results && data.data.results.length) { // Check if results is not null or empty
                        const results = data.data.results; // Get the results array directly
                        console.log(data);

                        this.itemList.push(...results); // Use spread operator to push all items at once
                        this.totalPages = Math.ceil(data.data.count / limit);
                        this.nextPageUrl = data.data.next;
                    }
                })
                .catch(error => console.log(error));
        },
        handleScroll() {
            const bottomMarker = this.$refs.bottomMarker;
            const rect = bottomMarker.getBoundingClientRect();

            if (rect.top <= window.innerHeight) { // When marker is visible at or below viewport
                if ((this.currentPage < this.totalPages || this.nextPageUrl) && this.nextPageUrl !== null) { // Check if there are more pages to load and the nextPageUrl is not null
                    this.currentPage++;
                    this.fetchData();
                }
            }
        },

    },
};
</script>

<style scoped>

</style>
