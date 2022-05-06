<template>
  <div>
    <div id="videoContainer">
      <video crossorigin="true" controls></video>
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

    <p>{{ getVideo.title }}</p>
    <p v-html="getVideo.description"></p>
    <p>{{ getVideo.hashtags }}</p>
    <p>{{ getVideo.meta }}</p>
    <p>{{ getVideo.createdAt }}</p>
    <p v-if="getVideo.owner">
      uploaded by
      <router-link v-bind:to="`/users/${getVideo.owner._id}`">{{ getVideo.owner.name }}</router-link>
    </p>

    <div v-if="getVideo.owner && getCurrentUserId == getVideo.owner._id">
      <router-link v-bind:to="`/videos/${getVideo._id}/edit`"><button>Edit</button></router-link>
      &nbsp;
      <button @click="deleteVideo">Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onUpdated, ref } from "@vue/runtime-core";
import { Ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { local } from "../../main";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();

    const url = location.pathname;

    store.dispatch("fetchVideo", { url });

    const getVideo = computed(() => {
      const data = store.getters["getVideo"];

      return data;
    });

    const getCurrentUserId = computed(() => {
      const data = store.getters["getCurrentUserId"];

      return data;
    });

    const deleteVideo = async () => {
      const { status, errorMsg } = await store.dispatch("deleteVideo", { url });

      if (status == 200) {
        router.push("/");
      } else {
        alert(errorMsg);
      }
    };

    onUpdated(function () {
      const video = ref(document.querySelector("video"));

      if (local) {
        // video.value.src = `http://localhost:4000/api${getVideo.value.fileUrl}`;
        //

        // const asd1 = readFileSync(`http://localhost:4000/api${getVideo.value.fileUrl}`);
      } else {
        video.value.src = `/api${getVideo.value.fileUrl}`;
      }

      video.value.addEventListener("contextmenu", (e: Event) => {
        e.preventDefault();
      });

      let volumeValue: any = 0.5;
      let controlsTimeout: any = null;

      const playBtn = ref(document.querySelector("#play")) as Ref<HTMLButtonElement>;
      const muteBtn = ref(document.querySelector("#mute")) as Ref<HTMLButtonElement>;
      const currentTime = ref(document.querySelector("#currentTime")) as Ref<HTMLSpanElement>;
      const totalTime = ref(document.querySelector("#totalTime")) as Ref<HTMLSpanElement>;
      const volumeRange = ref(document.querySelector("#volume")) as Ref<HTMLInputElement>;
      const timeline = ref(document.querySelector("#timeline")) as Ref<HTMLInputElement>;
      const fullscreenBtn = ref(document.querySelector("#fullscreen")) as Ref<HTMLButtonElement>;
      const videoContainer = ref(document.querySelector("#videoContainer")) as Ref<HTMLDivElement>;
      const videoControls = ref(document.querySelector("#videoControls")) as Ref<HTMLDivElement>;

      volumeRange.value.value = volumeValue;
      video.value.volume = volumeValue;

      const handlePlay = () => {
        if (video.value.paused) {
          video.value.play();
          playBtn.value.innerText = "Pause";
          setControls();
        } else {
          video.value.pause();
          playBtn.value.innerText = "Play";
          setControls();
        }
      };

      const handleMute = () => {
        if (!video.value.muted) {
          video.value.muted = true;
          volumeRange.value.value = "0";
        } else {
          video.value.muted = false;
          volumeRange.value.value = volumeValue;
        }
      };

      const hanldeVolumeChange = (e: any) => {
        const { value } = e.target;

        video.value.volume = value;
        volumeValue = value;
      };

      const handleLoadedMetadata = () => {
        totalTime.value.innerText = formatTime(video.value.duration);
        timeline.value.max = String(Math.floor(video.value.duration));
      };

      const handleTimeUpdate = () => {
        currentTime.value.innerText = formatTime(video.value.currentTime);
        timeline.value.value = String(Math.floor(video.value.currentTime));
      };

      const formatTime = (seconds: number) => {
        return new Date(Math.floor(seconds) * 1000).toISOString().substring(11, 19);
      };

      const handleTimelineChange = (e: any) => {
        const { value } = e.target;

        video.value.currentTime = value;
      };

      const handleFullScreen = () => {
        const fullscreen = document.fullscreenElement;

        if (fullscreen) {
          document.exitFullscreen();
          fullscreenBtn.value.innerText = "Enter Full Screen";
        } else {
          videoContainer.value.requestFullscreen();
          fullscreenBtn.value.innerText = "Exit Full Screen";
        }
      };

      const hideControls = () => {
        videoControls.value.classList.add("hiding");
      };

      const showControls = () => {
        videoControls.value.classList.remove("hiding");
      };

      const setControls = () => {
        if (controlsTimeout) {
          clearTimeout(controlsTimeout);
          controlsTimeout = null;
        }

        showControls();

        if (!video.value.paused) {
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

      playBtn.value.addEventListener("click", handlePlay);
      muteBtn.value.addEventListener("click", handleMute);

      volumeRange.value.addEventListener("input", hanldeVolumeChange);
      // change 대신 input으로 하면 볼륨 값을 실시간으로 받음

      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadedmetadata_event
      video.value.addEventListener("loadedmetadata", handleLoadedMetadata);

      video.value.addEventListener("timeupdate", handleTimeUpdate);
      timeline.value.addEventListener("input", handleTimelineChange);
      fullscreenBtn.value.addEventListener("click", handleFullScreen);
      video.value.addEventListener("mousemove", handleMouseMove);
      video.value.addEventListener("mouseleave", handleMouseLeave);
      video.value.addEventListener("click", handlePlay);

      //
      //
      //
    });

    return { getVideo, getCurrentUserId, deleteVideo };
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

