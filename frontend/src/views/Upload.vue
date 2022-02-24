<template>
  <div>
    <form>
      <input type="text" name="title" placeholder="title" required />
      <br />
      <input
        type="text"
        name="description"
        placeholder="description"
        required
      />
      <br />
      <input
        type="text"
        name="hashtags"
        placeholder="hashtags, separated by comma"
        required
      />
      <br />
      <input type="submit" value="upload" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Upload",
});
</script>