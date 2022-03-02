<template>
  <div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->

    <div v-for="(videos, index) in state.videos" v-bind:key="index">
      <div>
        <p>{{ videos._id }}</p>
        <p>
          <!-- https://goddino.tistory.com/117 - vue 동적 라우팅 -->
          <router-link v-bind:to="`/videos/${videos._id}`">{{
            videos.title
          }}</router-link>
        </p>
        <p>{{ videos.description }}</p>
        <p>{{ videos.hashtags }}</p>
        <hr />
      </div>
    </div>
    <br />
    <router-link to="/videos/upload"><button>upload</button></router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import HelloWorld from "../components/HelloWorld.vue"; // @ is an alias to /src
import { instance } from "../main";
import Videos from "../components/Videos.vue";

export default defineComponent({
  components: {
    // HelloWorld,
    Videos,
  },
  setup(props, context) {
    console.log("props : ", props);
    console.log("context : ", context);

    const state = reactive({
      videos: [],
    });

    const init = async () => {
      try {
        const res = await instance.get("/");
        // console.log(res);
        // state.data = res.data;
        state.videos = res.data.videos;
      } catch (error) {
        console.error(error);
      }
    };

    init();

    return { state };
  },
  updated() {
    console.log("asd", this.state);
  },
});
</script>
