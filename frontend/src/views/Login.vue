<template>
  <div>
    <h1>login</h1>
    <form v-on:submit.prevent="handleSubmit" autocomplete="off">
      <input v-model="form.username" type="text" name="username" />
      <br />
      <input
        v-model="form.password"
        type="password"
        name="password"
        placeholder="password"
      />
      <br />
      <p v-if="errorMsg">
        {{ errorMsg }}
      </p>
      <input type="submit" />
    </form>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onUnmounted,
  reactive,
  watchEffect,
} from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const form = reactive({ username: "test_user", password: "test" });

    const store = useStore();

    const handleSubmit = async () => {
      await store.dispatch("user/login", form);
    };

    const errorMsg = computed(() => {
      const { errorMsg } = store.getters["user/getErrorMsg"];

      return errorMsg;
    });

    onUnmounted(() => {
      store.commit("user/clearError");
    });

    return { form, handleSubmit, errorMsg };
  },
});
</script>

<style scoped>
</style>
