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
        <textarea id="post-area" class="form-control" :value="postArea" placeholder="Écrire votre post ici"></textarea>
    </div>
    <div class="new-post-buttons">
      <div class="c-6">
        <span class="mdi mdi-image icon-inactive"></span>
      </div>
      <div class="c-6">
        <button id="btn-new-post" class="btn-lg btn-l" type="submit">Publier</button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'NewPost',
  props: {
    userName: {
      type: String,
      default: 'Victor Deweerdt',
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
  background: url(../assets/images/user-photo-vd.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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

#post-area {
  width: 100%;
  padding: 1rem 0;
  border: none;
  font-family: neue-haas-unica, sans-serif;
  font-weight: 400;
  min-height: 150px;
  font-size: 1.5rem;
}

.new-post-buttons {
  display: flex;
  min-height: 60px;
  align-items: center;
  .mdi {
    border: 1px solid #e4e4e4;
    padding: 10px 15px;
    border-radius: 30px;
  }
}
</style>
