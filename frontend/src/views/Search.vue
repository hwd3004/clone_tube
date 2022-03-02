<template>
  <div>
    <h1>search</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { instance } from "../main";

export default defineComponent({
  setup() {
    const init = async () => {
      const url = `${location.pathname}${location.search}`;

      const res = await instance.get(url);
      console.log(res);
    };

    init();
  },
});
</script>
