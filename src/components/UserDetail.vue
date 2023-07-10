<template>
<div class="text-center">
    <v-menu open-on-click>
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" prepend-icon="mdi-account-circle" append-icon="mdi-chevron-down" variant="plain" size="Large" class=" text-none">
                <template v-slot:prepend>
                    <v-icon>mdi-account</v-icon>
                </template>
                &nbsp; {{userName}} &nbsp;
            </v-btn>
        </template>

        <v-list bg-color="#808080" class="text-white mt-5">
            <v-list-item style="min-width: 145px; ">
                <div class="text-center">
                    <v-avatar size="55" class="px4">
                        <v-icon color="white">mdi-account</v-icon>
                    </v-avatar>
                    <hr>
                    <h3>{{ userName }}</h3>

                    <h5>{{ userEmail }}</h5>

                </div>
                <v-btn class="text-white text-none" @click="logOut()" style="background-color: inherit; width: 100%;">Logout</v-btn>
            </v-list-item>
        </v-list>
    </v-menu>
</div>
</template>

<script>
import {
    base_url
} from '@/API/index'

import axios from "axios"
export default {
    data() {
        return {
            userEmail: null,
            userName: null
        }
    },
    created() {
        this.userDetail();
    },

    methods: {
        logOut() {
            localStorage.removeItem('access');
            window.location.reload();
        },
        async userDetail() {
            try {
                const url = `${base_url}user/details/`;
                const token = localStorage.getItem('access');
                const st = `Bearer ${token}`;

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': st
                };

                const response = await axios.get(url, {
                    headers: headers
                });

                if (response.status == 200) {
                    if (response.data['success'] == true) {
                        this.userName = response.data['data']['first_name'];
                        this.userEmail = response.data['data']['email'];
                    } else {
                        this.handleError();
                    }
                }

                console.warn(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    },

}
</script>
