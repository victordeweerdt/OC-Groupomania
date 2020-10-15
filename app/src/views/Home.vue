<template>
  <div class="forum">
    <NewPost/>
    <div id="post-zone">
      <Post/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NewPost from '@/components/NewPost.vue'
import Post from '@/components/Post.vue'

export default {
  name: 'Home',
  components: {
    NewPost,
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