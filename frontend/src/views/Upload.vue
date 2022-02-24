<template>
  <div>
    <form id="form" v-on:submit.prevent="handleSubmit">
      <input
        type="text"
        name="title"
        placeholder="title"
        required
        maxlength="80"
        v-model="form.title"
      />
      <br />
      <input
        type="text"
        name="description"
        placeholder="description"
        required
        minlength="20"
        v-model="form.description"
      />
      <br />
      <input
        type="text"
        name="hashtags"
        placeholder="hashtags, separated by comma"
        required
        v-model="form.hashtags"
      />
      <br />
      <input type="submit" value="upload" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/runtime-core";
import { instance } from "../main";

export default defineComponent({
  name: "Upload",
  setup(props, context) {
    const state = reactive({
      data: null,
    });

    return { state };
  },
  data() {
    return {
      form: {
        title: "dummy title",
        description:
          "dummy description dummy description dummy description dummy description",
        hashtags: "dummy hashtags",
      },
    };
  },
  methods: {
    handleSubmit(e: Event) {
      console.log(this.form);

      const post = async () => {
        const res = await instance.post("/videos/upload", this.form);
        console.log(res);
      };

      post();
    },
  },
});
</script>