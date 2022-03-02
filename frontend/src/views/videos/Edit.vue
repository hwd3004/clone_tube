<template>
  <div>
    <h1>Video Edit</h1>
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

    <br />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/runtime-core";
import { instance } from "../../main";

export default defineComponent({
  setup(props, context) {
    const state = reactive({
      data: null,
    });

    return { state };
  },
  data() {
    return {
      form: {
        title: "",
        description: "",
        hashtags: "",
      },
    };
  },
  mounted() {
    const fetch = {
      init: async () => {
        const res = await instance.get(location.pathname);

        const {
          title,
          description,
          hashtags,
        }: { title: string; description: string; hashtags: [] } =
          res.data.video;

        this.form.title = title;
        this.form.description = description;
        this.form.hashtags = hashtags.join();
      },
    };
    fetch.init();
  },
  methods: {
    handleSubmit(e: Event) {
      console.log(this.form);
      const post = async () => {
        const res = await instance.post(location.pathname, this.form);
        console.log(res);
      };
      post();
    },
  },
});
</script>