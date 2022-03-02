<template>
  <div>
    <div v-for="(videos, index) in getVideos" v-bind:key="index">
      <div>
        <p>{{ videos._id }}</p>
        <p>
          <!-- https://goddino.tistory.com/117 - vue 동적 라우팅 -->
          <router-link v-bind:to="`/videos/${videos._id}`">{{
            videos.title
          }}</router-link>
        </p>
        <p>{{ videos.description }}</p>
        <p>{{ videos.hashtags }}</p>
        <hr />
      </div>
    </div>
    <br />
    <router-link to="/videos/upload"><button>upload</button></router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  // computed: mapGetters({
  //   getVideos: "getVideos",
  // }),
  computed: { ...mapGetters(["getVideos"]) },
});
</script>

<style scoped>
</style>
