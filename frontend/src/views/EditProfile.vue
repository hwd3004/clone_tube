<template>
  <div>
    <h1>Edit Profile</h1>

    <form id="form" v-on:submit.prevent="handleSubmit" autocomplete="off">
      <label>
        <span>name - </span>
        <input v-model="form.name" type="text" name="name" placeholder="name" />
      </label>
      <br />
      <label>
        <span>email - </span>
        <input
          v-model="form.email"
          type="email"
          namme="email"
          placeholder="email"
        />
      </label>
      <br />
      <label
        ><span>username - </span>
        <input
          v-model="form.username"
          type="text"
          name="username"
          placeholder="username"
        />
      </label>
      <br />
      <label
        ><span>location - </span>
        <input
          v-model="form.location"
          type="text"
          name="location"
          placeholder="location"
        />
        <br />
        <label>
          <span>avatar - </span>
          <input
            @change="changeFile"
            type="file"
            name="file"
            placeholder="image"
            accept="image/*"
          />
        </label>
        <br />
        <input type="submit" />
      </label>
    </form>
    <p>{{ msg }}</p>
    <br />
    <router-link to="/users/change_password">Change Password</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { instance } from "../main";

export default defineComponent({
  setup() {
    const form = reactive({
      name: "",
      email: "",
      username: "",
      location: "",
      file: null,
    });

    const msg = ref("");

    const init = async () => {
      const res = await instance.get("/users/edit");

      const { name, email, username, location } = res.data.user;

      form.name = name;
      form.email = email;
      form.username = username;
      form.location = location;
    };

    init();

    const changeFile = (e: any) => {
      console.log(e.target.files[0]);
      form.file = e;
    };

    const store = useStore();

    const handleSubmit = async () => {
      const { status, errorMsg } = await store.dispatch(
        "user/editProfile",
        form
      );

      if (status == 200) {
        msg.value = "Updated Profile.";
      } else {
        msg.value = errorMsg;
      }
    };

    return { form, handleSubmit, msg, changeFile };
  },
});
</script>
