<template>
  <div>
    <Videos />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Videos from "../components/Videos.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Videos,
  },
  setup() {
    const store = useStore();

    const url = `${location.pathname}${location.search}`;

    store.dispatch("fetchVideos", { url });
  },
});
</script>
