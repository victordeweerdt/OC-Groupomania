<template>
  <div class="new-post c-6 cm-12">
    <div class="identity">
      <div id="user-photo"></div>
      <div>
        <p id="user-name">{{ user.firstName }} {{ user.lastName }}</p>
      </div>
    </div>
    <form @submit.prevent="createPost">
      <div class="post-textarea">
        <textarea 
          id="post-area" 
          class="form-control" 
          v-model="postContent.content" 
          placeholder="Écrire votre post ici"
        ></textarea>
      </div>
      <div class="new-post-buttons">
        <div class="c-6 upload-file">
          <input
            class="add-image"
            type="file"
            id="inputFile"
            name="inputFile"
            @change="uploadImage"
          />
        </div>
        <div class="c-6">
          <input type="submit" id="btn-new-post" class="btn-lg btn-l" value="Publier"/>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'NewPost',
  props: {
    submit: Function
  },
  data() {
    return {
      cookie: this.$cookies.get("token"),
      user: "",
      userPhoto: "",
      postContent: {
        content: "",
        attachments: "",
        comments: null
      }
    }
  },
  created() {
    axios
      .get('http://localhost:3000/api/users/me', {
        headers: { 
          Authorization: "Bearer " + this.cookie }
      })
      .then((response) => {
        this.user = response.data.user
      })
      .catch(error => {
        console.log(error);
      })
  },
  methods: {
    createPost() {
      axios
        .post('http://localhost:3000/api/posts', 
        this.postContent , {
        Authorization: "Bearer " + this.cookie }
      )
      .then(() => this.submit())
      .catch((error) => console.log(error));
    },
    uploadImage() {
      console.log('Image Téléchargée !')
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
  @media (max-width: $lg) {
    padding: 0 40px;
  }
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
