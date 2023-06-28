<script setup lang="ts">

import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';
import { fetchSingleThread } from '@/utils/apiRequests';

const { params: { subreddit, threadId, threadTitle } } = useRoute();

const data: Ref<any> = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  data.value = await fetchSingleThread(subreddit as string, threadId as string, threadTitle as string);
  isLoading.value = false;
});

</script>
<template>
  <main v-if="!isLoading">
    <h1>{{ data.title }}</h1>
    <h2>in {{ subreddit }}</h2>
    <p>{{ data.selftext }}</p>
    <h2>Comments</h2>
    <ul>
      <template v-for="item in data.comments" :key="item.id">
        <li v-if="item.author">
          <h3>By {{ item.author }}</h3>
          <p class="comment-body">{{ item.body }}</p>
          <p>Replies: {{ item.numberOfReplies }}</p>
          <p>Votes: {{ isNaN(item.votes) ? '0' : item.votes }}</p>
        </li>
      </template>
    </ul>
  </main>
  <p v-else>Loading article and comments...</p>
</template>

<style scoped>
h1 {
    margin-top: 40px;
}

ul {
    list-style: none;
    padding: 0
}

h3 {
    color: black;
    background-color: whitesmoke;
    padding: 5px 10px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}

li {
    border: 1px solid gray;
    margin: 20px auto;
    border-radius: 6px;
    padding-bottom: 5px
}

.comment-body {
    padding: 10px
}

li p {
    padding: 0 10px
}

@media (min-width: 1000px) {
  main {
  margin-left: 160px;
  margin-right: 160px
}
}
</style>