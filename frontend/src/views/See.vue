<template>
  <div>
    <h1>See User</h1>
    <p>{{ user }}</p>
    <p>{{ videos }}</p>
  </div>
</template>

<script lang="ts">
import { instance } from "@/main";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const user = ref({});
    const videos = ref([]);

    const init = async () => {
      const res = await instance.get(location.pathname);
      console.log(res);

      // user.value = res.data.user;
      // videos.value = res.data.videos;
    };

    init();

    return { user, videos };
  },
});
</script>

