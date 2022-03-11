<template>
  <div>
    <h3>Join</h3>
    <form id="form" v-on:submit.prevent="handleSubmit" autocomplete="off">
      <label>
        <span>name : </span>
        <input v-model="form.name" type="text" name="name" placeholder="name" />
      </label>
      <br />
      <label>
        <span>email : </span>
        <input
          v-model="form.email"
          type="email"
          name="email"
          placeholder="email"
        />
      </label>
      <br />
      <label>
        <span>username : </span>
        <input
          v-model="form.username"
          type="text"
          name="username"
          placeholder="username"
        />
      </label>
      <br />
      <label>
        <span>password : </span>
        <input
          v-model="form.password"
          type="password"
          name="password"
          placeholder="password"
        />
      </label>
      <br />
      <label>
        <span>confirm password : </span>
        <input
          v-model="form.password2"
          type="password"
          name="password2"
          placeholder="confirm password"
        />
      </label>
      <br />
      <label>
        <span>location : </span>
        <input
          v-model="form.location"
          type="text"
          name="location"
          placeholder="location"
        />
      </label>
      <br />
      <input type="submit" />
    </form>
    <p v-if="errorMsg">
      {{ errorMsg }}
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted, reactive, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const form = reactive({
      name: "",
      email: "",
      username: "",
      password: "",
      password2: "",
      location: "",
    });

    const store = useStore();

    store.dispatch("user/filterPublicOnly");

    const errorMsg = computed(() => {
      const { errorMsg } = store.getters["user/getErrorMsg"];

      return errorMsg;
    });

    const handleSubmit = async () => {
      await store.dispatch("user/join", form);
    };

    onUnmounted(() => {
      store.commit("user/clearError");
    });

    return { form, errorMsg, handleSubmit };
  },
});
</script>

<style scoped>
</style>
