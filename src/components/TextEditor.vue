<template>
  <div id="app" style="width:auto; margin:auto" class="bg-white">
    <vue-editor @input ="testMethod(content)" class="bg-white" v-model="content"></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from "vue3-editor";

export default {
  data() {
    return {
      content: null,
    };
  }, 
  components: {
    VueEditor
  },
  watch: {
    content(newContent) {
      this.getData(newContent)
    }
  },
  props: {
    getData:Function,
  },
  methods:{
    testMethod(data)
    {
      console.log(data);
    }
  }
};
</script>
