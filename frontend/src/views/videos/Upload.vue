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
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

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

    onMounted(() => {
      const startBtn: HTMLButtonElement = document.querySelector("#startBtn");
      const video: HTMLVideoElement = document.querySelector("#preview");

      let stream: MediaStream;
      let recorder: MediaRecorder;
      let videoFile: string;

      const handleDownload = async () => {
        const ffmpeg = createFFmpeg({ log: true });

        // 사용자가 자바스크립트가 아닌, 다른 소프트웨어를 설치해서 사용하는 것이므로 기다려주어야함
        // 웹어셈블리를 사용하기 때문에 브라우저라는 한계를 벗어날 수 있음
        await ffmpeg.load();

        // 폴더와 파일이 컴퓨터 메모리에 저장되게 함
        ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));

        // 메모리에 저장된 파일을 input으로 받게 한 후, output으로 반환
        // -r 60은 영상을 초당 60 프레임으로 인코딩해주는 명령어
        await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");
        //

        const a = document.createElement("a");
        a.href = videoFile;
        a.download = "MyRecording.webm";
        document.body.appendChild(a);
        a.click();
      };

      const handleStop = () => {
        startBtn.innerText = "Download Recording";
        startBtn.removeEventListener("click", handleStop);
        startBtn.addEventListener("click", handleDownload);

        recorder.stop();
      };

      const handleStart = () => {
        startBtn.innerText = "Stop Recording";
        startBtn.removeEventListener("click", handleStart);
        startBtn.addEventListener("click", handleStop);

        // 타입스크립트에서 MediaRecorder 사용하기
        // https://stackoverflow.com/questions/40051818/how-can-i-use-a-mediarecorder-object-in-an-angular2-application
        recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

        recorder.ondataavailable = (event: any) => {
          videoFile = URL.createObjectURL(event.data);
          // console.log(videoFile);
          // blob:http://localhost:8000/59ff28e5-0f7d-43b6-895a-a199dc83e6fa

          video.srcObject = null;
          video.src = videoFile;
          video.loop = true;
          video.play();
        };

        recorder.start();
      };

      const init = async () => {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: true,
        });
        video.srcObject = stream;
        video.play();
      };

      init();

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