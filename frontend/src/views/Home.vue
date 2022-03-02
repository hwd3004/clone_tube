<template>
  <div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->

    <Videos />
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import { instance } from "../main";
import Videos from "../components/Videos.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Videos,
  },
  setup() {
    const store = useStore();

    // const init = async () => {
    //   try {
    //     const res = await instance.get("/");

    //     store.state.videos = res.data.videos;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // init();

    store.dispatch("fetchVideos", { url: "/" });
  },
});
</script>
