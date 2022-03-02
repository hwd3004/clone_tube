<template>
  <div>
    <Videos />
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import Videos from "../components/Videos.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Videos,
  },
  setup() {
    const store = useStore();

    // const init = async () => {
    //   const url = `${location.pathname}${location.search}`;

    //   const res = await instance.get(url);
    //   console.log(res.data.videos);

    //   store.state.videos = res.data.videos;
    // };

    // init();

    const url = `${location.pathname}${location.search}`;

    store.dispatch("fetchVideos", { url });
  },
});
</script>
