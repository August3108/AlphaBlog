<template>
  <v-snackbar  :color="isGreen ? 'green' : 'red'" v-model="snackbarVisible" :timeout="timeout" >
    {{ message }}
    
    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="closeSnackbar">
        Close
      </v-btn>
      
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    message: String,
    timeout: Number,
    isGreen: Boolean
  },
  
  data() {
    return {

      snackbarVisible: true
    };
  },
  
  methods: {
    closeSnackbar() {
      this.snackbarVisible = false;
      this.$emit('close-snackbar');
    }
  }
}
</script>

<style scoped>
.v-snackbar {
  top: 0;
}
</style>
