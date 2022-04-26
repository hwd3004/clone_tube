<template>
  <div>
    <div id="videoContainer">
      <video v-bind:src="`http://localhost:4000${video.fileUrl}`" crossorigin="true" controls></video>
      <div id="videoControls">
        <button id="play">Play</button>
        <button id="mute">Mute</button>
        <input id="volume" type="range" min="0" max="1" step="0.01" />
        <span>
          <span id="currentTime">00:00:00</span>
          <span>&nbsp;/&nbsp;</span>
          <span id="totalTime">00:00:00</span>
        </span>
        <span>
          <input id="timeline" type="range" min="0" step="1" value="0" />
        </span>
        <span>
          <button id="fullscreen">Full Screen</button>
        </span>
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
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

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
          setControls();
        } else {
          video.pause();
          playBtn.innerText = "Play";
          setControls();
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
        videoControls.classList.add("hiding");
      };

      const showControls = () => {
        videoControls.classList.remove("hiding");
      };

      const setControls = () => {
        if (controlsTimeout) {
          clearTimeout(controlsTimeout);
          controlsTimeout = null;
        }

        showControls();

        if (!video.paused) {
          controlsTimeout = setTimeout(() => {
            hideControls();
          }, 1500);
        }
      };

      const handleMouseMove = () => {
        // 기본 로직
        // 1. 마우스를 움직이면 기존 setTimeout을 clearTimeout이 지우고, 새로운 setTimeout을 만들고 실행
        // 2. 그 상태에서 마우스를 움직이지 않으면 setTimeout이 정해진 시간 후 메소드 실행
        // 3. 시간이 흐르는 중에 움직이면 1번으로 돌아감
        setControls();
      };

      const handleMouseLeave = () => {
        // if (!video.paused) {
        //   hideControls();
        // }
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
      video.addEventListener("click", handlePlay);
    });

    return { video, currentUserId, deleteVideo };
  },
});
</script>

<style lang="scss" scoped>
/* https://cli.vuejs.org/guide/css.html#pre-processors */

#videoContainer {
  video {
    width: 600px;
  }

  /* #videoControls {
    display: block;
  } */
}

.showing {
  display: block;
}

.hiding {
  display: none;
}
</style>

