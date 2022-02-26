<template>
  <div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->

    <p>{{ $store.state.asd }}</p>

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

    <h1 v-if="state.temp == 0">&nbsp;-&nbsp;</h1>
    <h1 v-else>{{ state.temp }}</h1>
    <button @click="add">add</button>
    <button @click="minus">minus</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import HelloWorld from "../components/HelloWorld.vue"; // @ is an alias to /src
import { instance } from "../main";

export default defineComponent({
  components: {
    // HelloWorld,
  },
  setup(props, context) {
    console.log("props : ", props);
    console.log("context : ", context);

    const state = reactive({
      data: null,
      temp: 0,
      videos: [],
    });

    const fetch = {
      init: async () => {
        try {
          const res = await instance.get("/");
          // console.log(res);
          // state.data = res.data;
          state.videos = res.data.videos;
        } catch (error) {
          console.error(error);
        }
      },
    };

    const add = () => {
      state.temp += 1;
    };

    const minus = () => {
      state.temp -= 1;
    };

    fetch.init();

    return { state, add, minus };
  },
  mounted() {
    console.log(this.state);
  },
});
</script>
