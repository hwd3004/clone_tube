<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <span v-if="!user.loggedIn">
        <router-link to="/join">Join</router-link> |
        <router-link to="/login">Log In</router-link>
      </span>
      <span v-else>
        <span id="logout" @click="logout">Log Out</span>
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
      const data = store.getters["user/getUser"];
      return data;
    });

    const logout = async () => {
      const res = await instance.get("/users/logout");
      console.log(res);
    };

    return { user, logout };
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

#nav a,
#logout {
  font-weight: bold;
  color: #2c3e50;
}

#logout {
  cursor: pointer;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
