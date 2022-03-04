<template>
  <div>
    <div v-if="video">
      <p>{{ video.title }}</p>
      <p v-html="video.description"></p>
      <p>{{ video.hashtags }}</p>
      <p>{{ video.meta }}</p>
      <p>{{ video.createdAt }}</p>

      <router-link v-bind:to="`/videos/${video._id}/edit`"
        ><button>Edit</button></router-link
      >

      &nbsp;
      <button @click="deleteVideo">Delete</button>
    </div>
    <div v-else>
      <PageNotFound />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import PageNotFound from "../../components/PageNotFound.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    PageNotFound,
  },
  setup() {
    const router = useRouter();

    const store = useStore();

    const url = location.pathname;

    store.dispatch("fetchVideo", { url });

    const video = computed(() => {
      const data = store.getters["getVideo"];

      return data;
    });

    const deleteVideo = async () => {
      const { status, errorMsg } = await store.dispatch("deleteVideo", { url });

      if (status == 200) {
        router.push("/");
      } else {
        alert(errorMsg);
      }
    };

    return { video, deleteVideo };
  },
});
</script>