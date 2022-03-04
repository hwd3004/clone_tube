<template>
  <div>
    <form v-on:submit.prevent="handleSearch">
      <input type="text" placeholder="Search by title" v-model="keyword" />
      <input type="submit" value="search" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();

    const keyword = ref("");

    const handleSearch = () => {
      keyword.value = keyword.value.trim();

      // https://velog.io/@skyepodium/vue-router로-데이터-전달하기-eskrsmr3
      router.push({
        path: `/search`,
        query: { keyword: keyword.value.trim() },
      });
    };

    return { handleSearch, keyword };
  },
});
</script>

<style scoped>
</style>
