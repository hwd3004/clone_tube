<template>
  <div>
    <div v-for="(videos, index) in videos" v-bind:key="index">
      <div>
        <p>
          <!-- https://goddino.tistory.com/117 - vue 동적 라우팅 -->
          <router-link v-bind:to="`/videos/${videos._id}`">{{
            videos.title
          }}</router-link>
        </p>
        <p>{{ videos.hashtags }}</p>
        <hr />
      </div>
    </div>
    <br />
    <router-link to="/videos/upload"><button>upload</button></router-link>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();

    const videos = computed(() => {
      const data = store.getters["getVideos"];
      return data;
    });

    return { videos };
  },
});
</script>

<style scoped>
</style>
