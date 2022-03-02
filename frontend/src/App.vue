<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <!-- <router-link to="/about">About</router-link> | -->
      <router-link to="/join">Join</router-link> |
      <router-link to="/login">Log In</router-link>
    </div>

    <SearchForm />

    <!-- https://pilot376.tistory.com/58 -->
    <!-- 쿼리 스트링 변경 시 Vue.js Router 현재 페이지 갱신하기 -->
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchForm from "./components/SearchForm.vue";

export default defineComponent({
  components: {
    SearchForm,
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
