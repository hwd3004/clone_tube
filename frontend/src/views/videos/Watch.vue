<template>
  <div>
    <p>{{ video.title }}</p>
    <p v-html="video.description"></p>
    <p>{{ video.hashtags }}</p>
    <p>{{ video.meta }}</p>
    <p>{{ video.createdAt }}</p>
    <p>uploaded by {{ video.owner.name }}</p>
    <p>{{ video.owner._id }}</p>

    <div v-if="currentUserId == video.owner._id">
      <router-link v-bind:to="`/videos/${video._id}/edit`"
        ><button>Edit</button></router-link
      >
      &nbsp;
      <button @click="deleteVideo">Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import { instance } from "@/main";
import { defineComponent, reactive, ref } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    const video = ref({});
    const currentUserId = ref("");

    const init = async () => {
      const url = location.pathname;
      const { data } = await instance.get(url);

      const initVideo = data.video;
      initVideo.hashtags = initVideo.hashtags.join();
      video.value = initVideo;

      currentUserId.value = data.currentUserId;
    };

    init();

    return { video, currentUserId };
  },
});
</script>
