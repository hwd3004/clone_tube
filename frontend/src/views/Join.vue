<template>
  <div>
    <h3>Join</h3>
    <form id="form" v-on:submit.prevent="handleSubmit" autocomplete="off">
      <input v-model="form.name" type="text" name="name" placeholder="name" />
      <br />
      <input v-model="form.email" type="email" email placeholder="email" />
      <br />
      <input
        v-model="form.username"
        type="text"
        name="username"
        placeholder="username"
      />
      <br />
      <input
        v-model="form.password"
        type="password"
        name="password"
        placeholder="password"
      />
      <br />
      <input
        v-model="form.password2"
        type="password"
        name="password2"
        placeholder="confirm password"
      />
      <br />
      <input
        v-model="form.location"
        type="text"
        name="location"
        placeholder="location"
      />
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
      name: "test",
      email: "test@test.com",
      username: "test_user",
      password: "test",
      password2: "test",
      location: "test",
    });

    const store = useStore();

    store.dispatch("user/filterPublicOnly", { url: location.pathname });

    const errorMsg = computed(() => {
      const { errorMsg } = store.getters["user/getErrorMsg"];

      return errorMsg;
    });

    const handleSubmit = async () => {
      store.dispatch("user/join", form);
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
