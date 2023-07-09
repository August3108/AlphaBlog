<template>
    <div id="main" style="background-color: #323233; height: auto;">
      <PageNav :isLoggedIn="userLoggedIn" style="position: sticky;
        top: 0;
        z-index: 2;" />
  
      <div class="contentArea">
        <v-card elevation="0" style="background-color: inherit; margin: auto; width: 90%; height: 90%;">
          <router-view />
        </v-card>
      </div>
  
      
    </div>
    <PageFooter />
  </template>
  
  <script>
  import PageNav from './views/app/PageNav'
  import PageFooter from './views/app/PageFooter'
  
  export default {
    components: {
      PageNav,
      PageFooter
    },
    data() {
      return {
        userLoggedIn: false
      }
    }
  }
  </script>
  
  <style>
  .v-card {
    width: 99.6%;
    height: 99%;
  }
  
  .contentArea {
    margin-top: 70px;
  }
  </style>
  