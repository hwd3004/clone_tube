<template>
  <div>
    <form v-on:submit.prevent="handleSearch">
      <input type="text" placeholder="Search by title" name="keyword" />
      <input type="submit" value="search" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();

    const handleSearch = () => {
      const keywordNode: HTMLInputElement =
        document.querySelector("[name=keyword]");

      let keyword = keywordNode.value;

      keyword = keyword.trim();

      keywordNode.value = keyword;

      // https://velog.io/@skyepodium/vue-router로-데이터-전달하기-eskrsmr3
      router.push({ path: `/search`, query: { keyword } });
    };

    return { handleSearch };
  },
});
</script>

<style scoped>
</style>
