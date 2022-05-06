<template>
  <div>
    <h1>Change Password</h1>
    <form v-on:submit.prevent="handleSubmit">
      <label>
        <span>Current Password : </span>
        <input type="password" v-model="form.currentPassword" />
      </label>
      <br />
      <label>
        <span>New Password : </span>
        <input type="password" v-model="form.newPassword" />
      </label>
      <br />
      <label>
        <span>Confirm New Password : </span>
        <input type="password" v-model="form.newPassword2" />
      </label>
      <br />
      <input type="submit" value="submit" />
    </form>
    <p>{{ msg }}</p>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import { instance } from "@/main";
import { defineComponent, reactive, ref } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    const form = reactive({
      currentPassword: "test",
      newPassword: "test",
      newPassword2: "test",
    });

    const msg = ref("");

    const handleSubmit = async () => {
      const formdata = new FormData();

      const temp: any = form;

      for (const key in temp) {
        formdata.append(key, temp[key]);
      }

      const res = await instance.post(location.pathname, formdata);
      const { status, errorMsg } = res.data;

      if (status != 200) {
        msg.value = errorMsg;
      } else {
        msg.value = "Password Changed.";
      }
    };

    return { form, handleSubmit, msg };
  },
});
</script>
