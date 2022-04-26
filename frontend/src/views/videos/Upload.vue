<template>
  <div>
    <!-- <div>
      <button id="actionBtn">start recording</button>
      <br />
      <video id="preview"></video>
    </div> -->
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
    <div>
      <br />
      <p>{{ uploadingState.percentage }}</p>
      <p>{{ uploadingState.size }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
} from "@vue/runtime-core";
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

    const uploadingState = computed(() => {
      return store.getters["getUploadingState"];
    });

    // eslint-disable-next-line
    const changeVideo = (e: any) => {
      form.video = e.target.files[0];
    };

    // let stream: MediaStream;

    // onMounted(() => {
    //   const actionBtn: HTMLButtonElement = document.querySelector("#actionBtn");
    //   const video: HTMLVideoElement = document.querySelector("#preview");

    //   let recorder: MediaRecorder;
    //   let videoFile: string;

    //   const files = {
    //     input: "recording.wemb",
    //     output: "output.mp4",
    //     thumb: "thumbnail.jpg",
    //   };

    //   const downloadFile = (fileUrl: any, fileName: string) => {
    //     const a = document.createElement("a");
    //     a.href = fileUrl;
    //     a.download = fileName;
    //     document.body.appendChild(a);
    //     a.click();
    //   };

    //   const handleDownload = async () => {
    //     try {
    //       // https://github.com/ffmpegwasm/ffmpeg.wasm#usage
    //       const ffmpeg = createFFmpeg({
    //         corePath:
    //           "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
    //         log: true,
    //       });

    //       // 사용자가 자바스크립트가 아닌, 다른 소프트웨어를 설치해서 사용하는 것이므로 기다려주어야함
    //       // 웹어셈블리를 사용하기 때문에 브라우저라는 한계를 벗어날 수 있음
    //       await ffmpeg.load();

    //       // 폴더와 파일이 컴퓨터 메모리에 저장되게 함
    //       ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));

    //       // 메모리에 저장된 파일을 input으로 받게 한 후, output으로 반환
    //       // -r 60은 영상을 초당 60 프레임으로 인코딩해주는 명령어
    //       await ffmpeg.run("-i", files.input, "-r", "60", files.output);

    //       // 썸네일 생성 1
    //       await ffmpeg.run(
    //         "-i",
    //         files.input,
    //         "-ss",
    //         "00:00:01",
    //         "-frames:v",
    //         "1",
    //         files.thumb
    //       );

    //       const mp4File = ffmpeg.FS("readFile", files.output);
    //       // console.log("mp4File", mp4File);
    //       // console.log("mp4File.buffer", mp4File.buffer);
    //       // raw data에 접근하려면 buffer를 사용해야함

    //       // 썸네일 생성 2
    //       const thumbFile = ffmpeg.FS("readFile", files.thumb);

    //       // new Blob(데이터, 데이터의 종류가 무엇인지 명시)
    //       const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });

    //       // 썸네일 생성 3
    //       const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

    //       const mp4Url = URL.createObjectURL(mp4Blob);

    //       // 썸네일 생성 4
    //       const thumbUrl = URL.createObjectURL(thumbBlob);
    //       //

    //       const a = document.createElement("a");
    //       a.href = mp4Url;
    //       a.download = "MyRecording.mp4";
    //       document.body.appendChild(a);
    //       a.click();

    //       const thumbA = document.createElement("a");
    //       thumbA.href = thumbUrl;
    //       thumbA.download = "MyThumbnail.jpg";
    //       document.body.appendChild(thumbA);
    //       thumbA.click();

    //       ffmpeg.FS("unlink", files.input);
    //       ffmpeg.FS("unlink", files.output);
    //       ffmpeg.FS("unlink", files.thumb);

    //       URL.revokeObjectURL(mp4Url);
    //       URL.revokeObjectURL(thumbUrl);
    //       URL.revokeObjectURL(videoFile);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    //   const handleStop = () => {
    //     actionBtn.innerText = "Download Recording";
    //     actionBtn.removeEventListener("click", handleStop);
    //     actionBtn.addEventListener("click", handleDownload);

    //     recorder.stop();
    //   };

    //   const handleStart = () => {
    //     actionBtn.innerText = "Stop Recording";
    //     actionBtn.removeEventListener("click", handleStart);
    //     actionBtn.addEventListener("click", handleStop);

    //     // 타입스크립트에서 MediaRecorder 사용하기
    //     // https://stackoverflow.com/questions/40051818/how-can-i-use-a-mediarecorder-object-in-an-angular2-application
    //     recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    //     recorder.ondataavailable = (event: any) => {
    //       videoFile = URL.createObjectURL(event.data);
    //       // console.log(videoFile);
    //       // blob:http://localhost:8000/59ff28e5-0f7d-43b6-895a-a199dc83e6fa

    //       video.srcObject = null;
    //       video.src = videoFile;
    //       video.loop = true;
    //       video.play();
    //     };

    //     recorder.start();
    //   };

    //   const init = async () => {
    //     stream = await navigator.mediaDevices.getUserMedia({
    //       audio: false,
    //       video: true,
    //     });
    //     video.srcObject = stream;
    //     video.play();
    //   };

    //   init();

    //   actionBtn.addEventListener("click", handleStart);
    // });

    // onUnmounted(() => {
    //   // 카메라 끄기
    //   const tracks = stream.getTracks();
    //   tracks.forEach((track) => {
    //     track.stop();
    //   });

    //   stream = null;
    // });

    return { form, handleSubmit, changeVideo, uploadingState };
  },
});
</script>

<style scoped>
#preview {
  width: 300px;
}
</style>