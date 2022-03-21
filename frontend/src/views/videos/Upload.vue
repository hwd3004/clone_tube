<template>
  <div>
    <div>
      <button id="startBtn">start recording</button>
      <br />
      <video id="preview"></video>
    </div>
    <form id="form" v-on:submit.prevent="handleSubmit">
      <input
        type="file"
        accept="video/*"
        required
        name="video"
        @change="changeVideo"
      />
      <br />
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
import { defineComponent, onMounted, reactive } from "@vue/runtime-core";
import { useStore } from "vuex";
// import "regenerator-runtime"

export default defineComponent({
  setup() {
    const form = reactive({
      title: "dummy title",
      description:
        "<p>dummy description</p><p>dummy description</p><p>dummy description</p>",
      hashtags: "dummy hashtags",
      video: null,
    });

    const store = useStore();

    const handleSubmit = async () => {
      store.dispatch("uploadVideo", form);
    };

    // eslint-disable-next-line
    const changeVideo = (e: any) => {
      form.video = e.target.files[0];
    };

    onMounted(async () => {
      const startBtn: HTMLButtonElement = document.querySelector("#startBtn");
      const video: HTMLVideoElement = document.querySelector("#preview");

      let stream: any;

      const handleStop = () => {
        startBtn.innerText = "Start Recording";
        startBtn.removeEventListener("click", handleStop);
        startBtn.addEventListener("click", handleStart);
      };

      const handleStart = async () => {
        startBtn.innerText = "Stop Recording";
        startBtn.removeEventListener("click", handleStart);
        startBtn.addEventListener("click", handleStop);

        stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        video.srcObject = stream;
        video.play();

        // https://stackoverflow.com/questions/40051818/how-can-i-use-a-mediarecorder-object-in-an-angular2-application
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (e: any) => {
          console.log(e);
        };
      };

      startBtn.addEventListener("click", handleStart);
    });

    return { form, handleSubmit, changeVideo };
  },
});
</script>

<style scoped>
#preview {
  width: 300px;
}
</style>