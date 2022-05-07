<template>
  <div>
    <h1>Video Edit</h1>
    <form id="form" v-on:submit.prevent="handleSubmit">
      <input type="text" name="title" placeholder="title" required maxlength="80" v-model="form.title" />
      <br />
      <input type="text" name="hashtags" placeholder="hashtags, separated by comma" required v-model="form.hashtags" />
      <br />
      <div id="ckeditor">
        <ckeditor :editor="editor" v-model="form.description" />
      </div>
      <br />
      <input type="submit" />
    </form>

    <br />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/runtime-core";
import { useStore } from "vuex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ref } from "vue";
import { instance } from "../../main";

export default defineComponent({
  setup() {
    const form = reactive({
      title: "",
      description: "",
      hashtags: "",
    });

    const editor = ref(ClassicEditor);

    const store = useStore();

    const url = location.pathname;

    const init = async () => {
      const res = await instance.get(`${url}`);

      for (const key in form) {
        form[key] = res.data.video[key];
      }
    };

    init();

    const handleSubmit = async () => {
      store.dispatch("editVideo", { url: location.pathname, form });
    };

    return { form, handleSubmit, editor };
  },
});
</script>
