<template>
  <div class="forum">
    <CreatePost/>
    <div id="post-zone">
      <Post/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CreatePost from '@/components/CreatePost.vue'
import Post from '@/components/Post.vue'

export default {
  name: 'Home',
  components: {
    CreatePost,
    Post
  }
}
</script>

<style scoped lang="scss">

.forum {
  background-color: white;
}

#post-zone {
  background-color: #FAFAFA;
  min-height: 800px;
  padding: 1rem 0;
}

</style>