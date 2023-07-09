<template>
<div>

    <v-card>

        <v-layout>
            <v-app-bar id="linear-gradient" class="bg-black d-flex" prominent>
                <div @click="$router.push('/')">
                    <v-btn><v-icon>mdi-atlassian</v-icon><b>LPHA-BLOG</b></v-btn>
                    
                </div>

                <v-spacer></v-spacer>

                <v-btn @click="openDialog" v-if="isLoggedIn == true" class=" text-none text-white mr-6" style="background-color:#808080;">+
                    Create Post</v-btn>
                <span v-if="isLoggedIn == true" class=" bg-black text-none text-white mr-6">
                    <UserDetail />
                </span>
                <v-btn @click="openDialog" v-if="isLoggedIn == false" class=" text-none text-white mr-6" style="background-color:#808080;">Login/Signup</v-btn>
                <LoginMenu v-if="isLoggedIn == false" :dialogVisible="dialogVisible" @close-dialog="closeDialog"></LoginMenu>
                <CreateBlog v-if="isLoggedIn == true" :dialogVisible="dialogVisible" @close-dialog="closeDialog"></CreateBlog>
            </v-app-bar>
        </v-layout>
    </v-card>
</div>
</template>

<script>
import UserDetail from '../../components/UserDetail.vue'
import LoginMenu from '../auth/LoginMenu.vue'

import CreateBlog from '@/components/CreateBlog.vue';

export default {

    components: {
        UserDetail,
        LoginMenu,
        CreateBlog

    },
    data() {
        return {
            dialogVisible: false,
            isLoggedIn: localStorage.getItem('access') ? 1 : 0,

        };
    },
    methods: {
        openDialog() {
            this.dialogVisible = true;
        },
        closeDialog() {
            this.dialogVisible = false;
        },
    },
    props: {
        LoggedIn: Boolean
    },

}
</script>

<style scoped></style>
