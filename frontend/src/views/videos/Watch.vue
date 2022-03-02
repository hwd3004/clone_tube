<template>
  <div v-if="state.status == 200">
    <p>{{ state.video.title }}</p>
    <p>{{ state.video.description }}</p>
    <p>{{ state.video.hashtags }}</p>
    <p>{{ state.video.meta }}</p>
    <p>{{ state.video.createdAt }}</p>

    <router-link v-bind:to="`/videos/${state.video._id}/edit`"
      ><button>Edit</button></router-link
    >
    &nbsp;
    <button @click="fetch.delete">Delete</button>
  </div>
  <div v-else>
    <PageNotFound />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/runtime-core";
import { instance } from "../../main";
import PageNotFound from "../../components/PageNotFound.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    PageNotFound,
  },
  setup(props, context) {
    const state = reactive({
      video: {
        type: Object,
        _id: 0,
        hashtags: "",
      },
      status: 200,
    });

    const router = useRouter();

    const fetch = {
      init: async () => {
        try {
          const res = await instance.get(location.pathname);

          const {
            data: { status },
          } = res;

          state.status = status;

          state.video = res.data.video;

          const { hashtags }: { hashtags: [] } = res.data.video;

          state.video.hashtags = hashtags.join();

          // const title = document.querySelector("title");
          // title.text = `${res.data.pageTitle} | frontend`;
        } catch (error) {
          console.log(error);
        }
      },
      delete: async () => {
        try {
          // https://youtu.be/hY7F7U8qDPA?t=215 - Building a Web app with Vue Router, Typescript and Vue Composition API
          // https://sunny921.github.io/posts/vuejs-router-03/
          const res = await instance.get(`/videos/${state.video._id}/delete`);
          if (res.data.status == 200) {
            router.push({ path: "/" });
          } else {
            console.log(res.data);
          }
        } catch (error) {
          console.log(error);
        }
      },
    };

    fetch.init();

    return { state, fetch };
  },
});
</script>