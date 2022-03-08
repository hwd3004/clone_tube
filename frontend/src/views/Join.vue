<template>
  <div>
    <h3>Join</h3>
    <form id="form" v-on:submit.prevent="handleSubmit" autocomplete="off" >
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
import { defineComponent, reactive, ref } from "vue";
import { instance } from "../main";

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

    const errorMsg = ref(null);

    const handleSubmit = async () => {
      const res = await instance.post(window.location.pathname, form);

      if (res.data.status == 200) {
        alert("가입완료");
      } else {
        errorMsg.value = res.data.errorMsg;
      }
    };

    return { form, errorMsg, handleSubmit };
  },
});
</script>

<style scoped>
</style>
