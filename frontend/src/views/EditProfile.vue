<template>
  <div>
    <h1>Edit Profile</h1>

    <form id="form" v-on:submit.prevent="handleSubmit" autocomplete="off">
      <div v-if="form.avatarUrl">
        <img id="avatar" :src="form.avatarUrl" crossorigin="anonymous" />
      </div>
      <label>
        <span>name - </span>
        <input v-model="form.name" type="text" name="name" placeholder="name" />
      </label>
      <br />
      <label>
        <span>email - </span>
        <input v-model="form.email" type="email" namme="email" placeholder="email" />
      </label>
      <br />
      <label
        ><span>username - </span>
        <input v-model="form.username" type="text" name="username" placeholder="username" />
      </label>
      <br />
      <label
        ><span>location - </span>
        <input v-model="form.location" type="text" name="location" placeholder="location" />
        <br />
        <label>
          <span>avatar - </span>
          <input @change="changeFile" type="file" name="avatar" placeholder="image" accept="image/*" />
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
import { baseURL, instance } from "../main";

export default defineComponent({
  setup() {
    const form = reactive({
      name: "",
      email: "",
      username: "",
      location: "",
      avatarUrl: null,
      avatar: null,
    });

    const msg = ref("");

    const init = async () => {
      const res = await instance.get("/users/edit");

      const { avatarUrl } = res.data.user;

      for (const key in form) {
        form[key] = [key];
      }

      form.avatarUrl = `${baseURL}${avatarUrl}`;
    };

    init();

    const changeFile = (e: any) => {
      // console.log(e.target.files[0]);
      form.avatar = e.target.files[0];
    };

    const store = useStore();

    const handleSubmit = async () => {
      const { status, errorMsg } = await store.dispatch("user/editProfile", form);

      if (status == 200) {
        msg.value = "Updated Profile.";
        init();
      } else {
        msg.value = errorMsg;
      }
    };

    return { form, handleSubmit, msg, changeFile };
  },
});
</script>

<style scoped>
#avatar {
  width: 300px;
}
</style>
