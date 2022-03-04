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
import {
  defineComponent,
  onMounted,
  onUpdated,
  reactive,
  watchEffect,
} from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { instance } from "../../main";

export default defineComponent({
  setup() {
    const form = reactive({
      title: "dummy title",
      description:
        "<p>dummy description</p><p>dummy description</p><p>dummy description</p>",
      hashtags: "dummy hashtags",
    });

    const router = useRouter();

    const handleSubmit = async (e: Event) => {
      const {
        data: { status, errorMsg },
      }: { data: { status: number; errorMsg: string } } = await instance.post(
        "/videos/upload",
        form
      );

      if (status == 200) {
        router.push("/");
      } else {
        alert(errorMsg);
      }
    };

    // watchEffect(() => {
    //   console.log(form.description);
    // });

    return { form, handleSubmit };
  },
});
</script>