<template>
  <div class="forum">
    <NewPost/>
  </div>
</template>

<script>
// @ is an alias to /src
import NewPost from '@/components/NewPost.vue'

export default {
  name: 'Home',
  components: {
    NewPost
  }
}
</script>

<style scoped lang="scss">
  .forum {
    background-color: white;
  }
</style>
