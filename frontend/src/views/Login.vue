<template>
  <div>
    <h1>login</h1>
    <form v-on:submit.prevent="handleSubmit">
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
      <input type="submit" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { instance } from "../main";

export default defineComponent({
  data() {
    return {
      form: {
        username: "test_user",
        password: "test",
      },
    };
  },
  methods: {
    handleSubmit: async function () {
      console.log();

      const res = await instance.post(location.pathname, this.form);
      console.log(res);
    },
  },
});
</script>

<style scoped>
</style>
