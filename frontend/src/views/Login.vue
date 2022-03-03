<template>
  <div>
    <h1>login</h1>
    <form v-on:submit.prevent="handleSubmit">
      <input v-model="form.username" type="text" name="username" />
      <br />
      <input
        v-model="form.password"
        type="password"
        name="password"
        placeholder="password"
      />
      <br />
      <input type="submit" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watchEffect } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const form = reactive({ username: "test_user", password: "test" });

    const store = useStore();

    const handleSubmit = async () => {
      store.dispatch("user/login", form);
    };

    // watchEffect(() => {
    //   console.log(form.username);
    //   console.log(form.password);
    // });
    return { form, handleSubmit };
  },
});
</script>

<style scoped>
</style>
