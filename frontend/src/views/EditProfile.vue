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
      <!-- 
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
       -->
      <!-- <br /> -->
      <label
        ><span>location - </span>
        <input
          v-model="form.location"
          type="text"
          name="location"
          placeholder="location"
        />
        <br />
        <input type="submit" />
      </label>
    </form>
    <p>{{ msg }}</p>
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
      // password: "",
      // password2: "",
      location: "",
    });

    const msg = ref("");

    const init = async () => {
      await instance.get("/users/edit").then((res) => {
        console.log(res.data.user);

        const { name, email, username, password, location } = res.data.user;

        form.name = name;
        form.email = email;
        form.username = username;
        // form.password = password;
        // form.password2 = password;
        form.location = location;
      });
    };

    init();

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

    return { form, handleSubmit, msg };
  },
});
</script>
