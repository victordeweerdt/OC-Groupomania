<template>
    <div class="new-post c-6 cm-12">
        <div class="identity">
        <img id="user-photo" :src="user.photo">
        <div>
            <p id="user-name">{{ user.firstName }} {{ user.lastName }}</p>
        </div>
        </div>
        <form @submit.prevent="createPost">
        <div class="post-textarea">
            <textarea 
                id="post-area" 
                class="form-control"
                aria-label="Contenu texte d'un post" 
                v-model="postContent.content" 
                placeholder="Écrire votre post ici"
            ></textarea>
        </div>
        <div class="new-post-buttons">
            <label class="c-6 cm-12 file-select">
                <div class="select-button" role="button" aria-label="Téléchargement d'un fichier">
                    <span v-if="postContent.attachments">Fichier séléctionné : {{postContent.attachments.name}}</span>
                    <span v-else class="add-file"><span class="mdi mdi-image"></span>Ajouter un fichier</span>
                </div>
                <input 
                    type="file"
                    id="photo"
                    class="upload-input"
                    ref="photo" 
                    v-on:change="handleFileUpload()"
                />
            </label>
            <div class="c-6 cm-12">
                <input type="submit" id="btn-new-post" class="btn-lg btn-l" value="Publier" aria-label="Publication d'un post" v-on:click="loadAllPosts()"/>
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
            userPhoto: '',
            postContent: {
                content: null,
                attachments: null,
                comments: 'One',
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
            this.user = response.data.user;
        })
        .catch(error => {
            console.log(error);
        })
    },
    methods: {
        
        createPost() {
            if (this.postContent.content !== null) {
                if (this.postContent.attachments !== null) {
                    let formData = new FormData();
                    formData.append('content', this.postContent.content);
                    formData.append('attachments', this.postContent.attachments, this.postContent.attachments.name);
                    console.log('content with attachments')
                    axios
                        .post('http://localhost:3000/api/posts', 
                            formData , {
                            headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: "Bearer " + this.cookie }
                            }
                        )
                        .then(response => {
                            console.log(response);
                            })
                        .catch(error => {
                            console.log(error)
                            });
                } else {
                    let formData = new FormData();
                    formData.append('content', this.postContent.content);
                    console.log('content')
                    axios
                        .post('http://localhost:3000/api/posts', 
                            formData , {
                            headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: "Bearer " + this.cookie }
                            }
                        )
                        .then(response => {
                            console.log(response);
                            })
                        .catch(error => {
                            console.log(error)
                            });
                }
            } else {
                return false;
            }
        },
        uploadImage() {
            console.log('Image Téléchargée !')
        },

        loadAllPosts() {
            this.$emit('load-all-posts');
        },

        handleFileUpload(){
        this.postContent.attachments = this.$refs.photo.files[0];
        },
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/styles/main.scss';

.identity {
  display: flex;
  align-items: center;
}

#user-name {
  padding-left: 20px;
  font-weight: 600;
}

.new-post {
  margin: 0 auto;
  padding: 40px 0px;
  @media (max-width: $lg) {
    padding: 40px 80px;
  }
  @media (max-width: $med) {
      padding: 80px 20px 20px;
  }
}

#post-area {
  width: 100%;
  padding: 30px 0;
  border: none;
  font-family: neue-haas-unica, sans-serif;
  font-weight: 400;
  min-height: 150px;
  font-size: 1.5rem;
  &::placeholder {
      color: rgb(197, 197, 197);
  }
}

.new-post-buttons {
  display: flex;
  min-height: 60px;
  align-items: center;
  flex-wrap: wrap;
  .mdi {
    padding: 10px 15px;
  }
}

.file-select > .select-button {
    padding: 1rem;
    color: black;
    background-color: white;
    border-radius: .3rem;
    text-align: center;
    font-weight: 500;
    border: 1px solid #000000;
    width: calc(100% - 20px);
    cursor: pointer;
    @media (max-width:$lg) {
        width: 100%;
        margin: 20px 0;
    }
}

.file-select > input[type="file"] {
  display: none;
}
</style>
