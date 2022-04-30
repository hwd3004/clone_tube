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

    <br />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
} from "@vue/runtime-core";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const form = reactive({
      title: "",
      description: "",
      hashtags: "",
    });

    const store = useStore();

    const url = location.pathname;

    store.dispatch("fetchVideo", { url });

    const video = computed(function () {
      const data = store.getters["getVideo"];
      return data;
    });

    onMounted(function () {
      form.title = video.value.title;

      form.hashtags = video.value.hashtags;

      const temp: HTMLDivElement = document.querySelector(".ql-editor");
      temp.innerHTML = video.value.description || null;
      // form.description = video.value.description;
    });

    const handleSubmit = async () => {
      store.dispatch("editVideo", { url: location.pathname, form });
    };

    return { form, handleSubmit };
  },
});
</script>
