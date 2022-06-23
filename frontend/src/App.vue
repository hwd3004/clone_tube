<template>
  <div>
    <!-- index.html에 -->
    <!-- <script src="https://kit.fontawesome.com/6ebbd4032b.js" crossorigin="anonymous"></script> -->
    <!-- 추가 -->
    <nav>
      <router-link to="/"><i class="fab fa-youtube"></i></router-link>
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
        <span id="logout" @click="logout"><button>Log Out</button></span>
      </span>
      <span> | </span>
      <router-link to="/dummy">Dummy</router-link>
    </nav>

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

    const auth = computed(() => {
      return store.getters["user/getUser"];
    });

    const logout = async () => {
      await store.dispatch("user/logout");
    };

    // 모바일에서 영상 시청 후 터치가 없으면 잠금 화면으로 이동되는 폰이 있음
    const requestWakeLock = async () => {
      try {
        await navigator["wakeLock"].request("screen");
      } catch (error) {
        console.log(error);
      }
    };

    requestWakeLock();

    return { auth, logout };
  },
});
</script>

<style lang="scss">
/* @import "./scss/styles.scss"; */

#ckeditor {
  display: inline-block;
}

@media (max-width: 650px) {
  #ckeditor {
    display: inline;
  }
}
</style>