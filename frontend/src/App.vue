<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    />
    <i class="fas fa-camera"></i>
    <i class="fas fa-youtube"></i>

    <div id="nav">
      <router-link to="/">Home</router-link>
      <span> | </span>
      <span v-if="!auth.loggedIn">
        <router-link to="/join">Join</router-link>
        <span> | </span>
        <router-link to="/login">Log In</router-link>
      </span>
      <span v-else>
        <router-link to="/videos/upload">Upload Video</router-link>
        <span> | </span>
        <router-link to="/users/edit">Edit Profile</router-link>
        <span> | </span>
        <span id="logout" @click="logout">Log Out</span>
      </span>
      <span> | </span>
      <router-link to="/dummy">Dummy</router-link>
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

export default defineComponent({
  components: {
    SearchForm,
  },
  setup() {
    const store = useStore();

    const auth = computed(() => {
      return store.getters["user/getUser"];
    });

    const logout = async () => {
      await store.dispatch("user/logout");
    };

    return { auth, logout };
  },
});
</script>

<style lang="scss">
</style>