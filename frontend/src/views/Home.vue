<template>
  <div>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <br />
    <router-link to="/videos/upload">upload</router-link>

    <h1 v-if="state.temp == 0">&nbsp;-&nbsp;</h1>
    <h1 v-else>{{ state.temp }}</h1>
    <button @click="add">add</button>
    <button @click="minus">add</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import HelloWorld from "../components/HelloWorld.vue"; // @ is an alias to /src
import { instance } from "../main";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
  setup(props, context) {
    console.log("props : ", props);
    console.log("context : ", context);

    const state = reactive({
      data: null,
      temp: 0,
    });

    const fetch = {
      init: async () => {
        try {
          const res = await instance.get("/");
          console.log(res);
          state.data = res.data;
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
});
</script>
