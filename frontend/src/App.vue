<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <span v-if="user.loggedIn == false">
        <router-link to="/join">Join</router-link> |
        <router-link to="/login">Log In</router-link>
      </span>
      <span v-else>
        <router-link to="/logout">Log Out</router-link>
      </span>
    </div>

    <SearchForm />

    <!-- https://pilot376.tistory.com/58 -->
    <!-- 쿼리 스트링 변경 시 Vue.js Router 현재 페이지 갱신하기 -->
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import SearchForm from "./components/SearchForm.vue";
import { instance } from "./main";

export default defineComponent({
  components: {
    SearchForm,
  },
  setup() {
    const store = useStore();

    const user = computed(() => {
      const data = store.getters;
      // console.log(data);
      console.log(data["user/getUser"]);
      return data["user/getUser"];
    });

    const init = async () => {
      const res = await instance.get("/get_session");
      console.log("App.vue init", res);
    };

    init();

    return { user };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
