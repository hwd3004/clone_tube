<template>
  <div>
    <h1>Edit Profile</h1>

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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { instance } from "../main";

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

    const init = async () => {
      const res = await instance.get("/users/edit");
      console.log(res);

      const { name, email, username, password, location } = res.data.user;

      form.name = name;
      form.email = email;
      form.username = username;
      form.password = password;
      form.password2 = password;
      form.location = location;
    };

    init();

    return { form };
  },
});
</script>
