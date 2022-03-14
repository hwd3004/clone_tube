<template>
  <div>
    <div id="videoContainer">
      <video v-bind:src="`http://localhost:4000${video.fileUrl}`"></video>
      <div id="videoControls">
        <button id="play">Play</button>
        <button id="mute">Mute</button>
        <input id="volume" type="range" min="0" max="1" step="0.01" />
        <div>
          <span id="currentTime">00:00:00</span>
          <span>&nbsp;/&nbsp;</span>
          <span id="totalTime">00:00:00</span>
        </div>
        <div>
          <input id="timeline" type="range" min="0" step="1" value="0" />
        </div>
        <div>
          <button id="fullscreen">Full Screen</button>
        </div>
      </div>
    </div>

    <p>{{ video.title }}</p>
    <p v-html="video.description"></p>
    <p>{{ video.hashtags }}</p>
    <p>{{ video.meta }}</p>
    <p>{{ video.createdAt }}</p>
    <p>
      uploaded by
      <router-link v-bind:to="`/users/${video.owner._id}`">{{
        video.owner.name
      }}</router-link>
    </p>
    <p>{{ video.owner._id }}</p>

    <div v-if="currentUserId == video.owner._id">
      <router-link v-bind:to="`/videos/${video._id}/edit`"
        ><button>Edit</button></router-link
      >
      &nbsp;
      <button @click="deleteVideo">Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import { instance } from "@/main";
import {
  defineComponent,
  onMounted,
  onUpdated,
  reactive,
  ref,
} from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import router from "../../router/index";

export default defineComponent({
  setup() {
    const video = ref({});
    const currentUserId = ref("");

    const router = useRouter();
    const store = useStore();

    const url = location.pathname;

    const init = async () => {
      const { data } = await instance.get(url);

      const initVideo = data.video;
      initVideo.hashtags = initVideo.hashtags.join();
      video.value = initVideo;

      currentUserId.value = data.currentUserId;
    };

    init();

    const deleteVideo = async () => {
      const { status, errorMsg } = await store.dispatch("deleteVideo", { url });

      if (status == 200) {
        router.push("/");
      } else {
        alert(errorMsg);
      }
    };

    onMounted(() => {
      const video: HTMLVideoElement = document.querySelector("video");

      video.addEventListener("contextmenu", (e: Event) => {
        e.preventDefault();
      });

      let volumeValue: any = 0.5;
      let controlsTimeout: any = null;

      const playBtn: HTMLButtonElement = document.querySelector("#play");
      const muteBtn: HTMLButtonElement = document.querySelector("#mute");
      const currentTime: HTMLSpanElement =
        document.querySelector("#currentTime");
      const totalTime: HTMLSpanElement = document.querySelector("#totalTime");
      const volumeRange: HTMLInputElement = document.querySelector("#volume");
      const timeline: HTMLInputElement = document.querySelector("#timeline");
      const fullscreenBtn: HTMLButtonElement =
        document.querySelector("#fullscreen");
      const videoContainer: HTMLDivElement =
        document.querySelector("#videoContainer");
      const videoControls: HTMLDivElement =
        document.querySelector("#videoControls");

      volumeRange.value = volumeValue;
      video.volume = volumeValue;

      const handlePlay = () => {
        if (video.paused) {
          video.play();
          playBtn.innerText = "Pause";
        } else {
          video.pause();
          playBtn.innerText = "Play";
        }
      };

      const handleMute = () => {
        if (!video.muted) {
          video.muted = true;
          volumeRange.value = "0";
        } else {
          video.muted = false;
          volumeRange.value = volumeValue;
        }
      };

      const hanldeVolumeChange = (e: any) => {
        const { value } = e.target;

        video.volume = value;
        volumeValue = value;
      };

      const handleLoadedMetadata = () => {
        totalTime.innerText = formatTime(video.duration);
        timeline.max = String(Math.floor(video.duration));
      };

      const handleTimeUpdate = () => {
        currentTime.innerText = formatTime(video.currentTime);
        timeline.value = String(Math.floor(video.currentTime));
      };

      const formatTime = (seconds: number) => {
        return new Date(Math.floor(seconds) * 1000)
          .toISOString()
          .substring(11, 19);
      };

      const handleTimelineChange = (e: any) => {
        const { value } = e.target;

        video.currentTime = value;
      };

      const handleFullScreen = () => {
        const fullscreen = document.fullscreenElement;

        if (fullscreen) {
          document.exitFullscreen();
          fullscreenBtn.innerText = "Enter Full Screen";
        } else {
          videoContainer.requestFullscreen();
          fullscreenBtn.innerText = "Exit Full Screen";
        }
      };

      const hideControls = () => {
        videoContainer.classList.remove("showing");
      };

      const handleMouseMove = () => {
        if (controlsTimeout) {
          clearTimeout(controlsTimeout);
          controlsTimeout = null;
        }

        videoContainer.classList.add("showing");
        controlsTimeout = setTimeout(() => {
          hideControls();
        }, 2000);
      };

      const handleMouseLeave = () => {
        hideControls();
      };

      playBtn.addEventListener("click", handlePlay);
      muteBtn.addEventListener("click", handleMute);
      volumeRange.addEventListener("input", hanldeVolumeChange);
      // change 대신 input으로 하면 볼륨 값을 실시간으로 받음

      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadedmetadata_event
      //
      // video.onloadedmetadata = (event) => {
      //   console.log(event);
      // };
      //
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("timeupdate", handleTimeUpdate);
      timeline.addEventListener("input", handleTimelineChange);
      fullscreenBtn.addEventListener("click", handleFullScreen);
      video.addEventListener("mousemove", handleMouseMove);
      video.addEventListener("mouseleave", handleMouseLeave);
    });

    return { video, currentUserId, deleteVideo };
  },
});
</script>

<style scoped>
video {
  width: 500px;
}
</style>