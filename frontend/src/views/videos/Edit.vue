<template>
  <div>
    <h1>Video Edit</h1>
    <!-- {{ video }} -->
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
  watchEffect,
} from "@vue/runtime-core";
import { useStore } from "vuex";
import { instance } from "../../main";

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

    const video = computed(() => {
      const data = store.getters["getVideo"];
      return data;
    });

    onMounted(() => {
      form.title = video.value.title;
      form.description = video.value.description;
      form.hashtags = video.value.hashtags;
    });

    const handleSubmit = async (e: Event) => {
      await instance.post(location.pathname, form);
    };

    watchEffect(() => {
      // console.log(video);
    });

    return { form, handleSubmit, video };
  },
});
</script>