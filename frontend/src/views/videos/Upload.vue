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
        name="hashtags"
        placeholder="hashtags, separated by comma"
        required
        v-model="form.hashtags"
      />
      <br />

      <!-- https://stackoverflow.com/questions/67806814/how-to-use-v-model-in-quill-editor -->
      <QuillEditor
        theme="snow"
        toolbar="full"
        v-model:content="form.description"
        contentType="html"
      />
      <br />
      <input type="submit" value="upload" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/runtime-core";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const form = reactive({
      title: "dummy title",
      description:
        "<p>dummy description</p><p>dummy description</p><p>dummy description</p>",
      hashtags: "dummy hashtags",
    });

    const store = useStore();

    const handleSubmit = async (e: Event) => {
      store.dispatch("uploadVideo", form);
    };

    return { form, handleSubmit };
  },
});
</script>