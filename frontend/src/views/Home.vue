<template>
  <div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <span>{{ state }}</span>
    <br />
    <router-link to="/videos/upload">upload</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import HelloWorld from "../components/HelloWorld.vue"; // @ is an alias to /src
import { instance } from "../main";

export default defineComponent({
  name: "Home",
  components: {
    // HelloWorld,
  },
  setup(props, context) {
    console.log("props : ", props);
    console.log("context : ", context);

    const state = reactive({
      data: null,
    });

    const fetch = {
      init: async () => {
        try {
          const res = await instance.get("/");
          console.log(res);
          state.data = res.data;
        } catch (error) {
          console.error(error);
        }
      },
    };

    fetch.init();

    return { state };
  },
});
</script>
