<template>
  <div class="new-post c-6">
    <div class="identity">
      <div id="user-photo"></div>
      <div>
        <p id="user-name">{{ userName }}</p>
      </div>
    </div>
    <div class="post-textarea">
        <label for="post-area"></label>
        <textarea id="post-area" :value="postArea" placeholder="Écrire votre post ici"></textarea>
    </div>
  </div>

</template>

<script>
export default {
  name: 'NewPost',
  props: {
    userName: {
      type: String,
      default: 'Victor',
      required:true
    },
    userPhoto: {
      type: String
    },
    postArea: {
      type: String,
      required:true,
      default: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/styles/main.scss';
#user-photo {
  background-color: $second-color;
  width: 50px;
  height: 50px;
  border-radius: 50px;
}

.identity {
  display: flex;
  align-items: center;
}

#user-name {
  padding-left: 20px;
}

.new-post {
  margin: 2.5rem auto;
}

.post-textarea {
  margin-top:2rem;
}

#post-area {
  width: 100%;
  padding: 1rem 0;
  border: none;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 1.2rem;
  color: black;
  font-weight: 500;
}
</style>
