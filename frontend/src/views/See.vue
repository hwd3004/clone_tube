<template>
  <div>
    <h1>See User</h1>
    <p>{{ user.username }}</p>
    <br />
    <div v-for="(video, index) in user.videos" v-bind:key="index">
      <router-link v-bind:to="`/videos/${video._id}`">{{ video.title }}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import { instance } from "@/main";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const user = ref({});

    const init = async () => {
      const res = await instance.get(location.pathname);

      user.value = res.data.user;
    };

    init();

    return { user };
  },
});
</script>

