<template>
  <div>
    <!-- <div>
      <button id="actionBtn">start recording</button>
      <br />
      <video id="preview"></video>
    </div> -->
    <form id="form" v-on:submit.prevent="handleSubmit">
      <input type="file" accept="video/*" name="video" @change="changeVideo" />
      <br />
      <input type="text" name="title" placeholder="title" required maxlength="80" v-model="form.title" />
      <br />
      <input type="text" name="hashtags" placeholder="hashtags, separated by comma" required v-model="form.hashtags" />
      <br />

      <!-- https://stackoverflow.com/questions/67806814/how-to-use-v-model-in-quill-editor -->
      <!-- <QuillEditor theme="snow" toolbar="full" v-model:content="form.description" contentType="html" /> -->
      <div id="ckeditor">
        <ckeditor :editor="editor" v-model="form.description" />
      </div>
      <br />
      <input type="submit" value="upload" />
    </form>
    <div>
      <br />
      <p>{{ getUploadingState.percentage }}</p>
      <p>{{ getUploadingState.size }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, reactive } from "@vue/runtime-core";
import { useStore } from "vuex";
// import "regenerator-runtime"
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ref } from "vue";

export default defineComponent({
  setup() {
    const form = reactive({
      title: "dummy title",
      description: "<p>dummy description</p><p>dummy description</p><p>dummy description</p>",
      hashtags: "dummy hashtags",
      video: null,
    });

    const editor = ref(ClassicEditor);

    const store = useStore();

    const handleSubmit = async () => {
      store.dispatch("uploadVideo", form);
    };

    const getUploadingState = computed(() => {
      return store.getters["getUploadingState"];
    });

    // eslint-disable-next-line
    const changeVideo = (e: any) => {
      form.video = e.target.files[0];
    };

    return { form, handleSubmit, changeVideo, getUploadingState, editor };
  },
});
</script>

<style scoped>
#preview {
  width: 300px;
}
</style>