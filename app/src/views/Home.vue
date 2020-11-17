<template>
    <div class="forum">
        <CreatePost 
            v-on:load-all-posts="onSubmit()"
        />
        <div id="post-zone">
            <Post
                v-for="post in allPosts"
                :firstName="post.User.firstName"
                :lastName="post.User.lastName"
                :userPhoto="post.User.photo"
                :createdAt="post.createdAt"
                :content="post.content"
                :postPhoto="post.attachments"
                :key="post.id"
            >
            <template v-slot:Comments v-if="post.Comments !== null">
                <div class="last-comments">
                    <!-- <p class="number-comments"><span id="comments-number">1</span> commentaire</p> -->
                    <div class="comment-bloc"
                        v-for="comment in post.Comments"
                        v-bind:key="comment.id">
                        <img class="user-photo-comment" :src="comment.User.photo">
                        <div class="comment-area">
                            <p class="user-name">{{ comment.User.firstName }} {{ comment.User.lastName }}</p>
                            <p>{{ comment.content }}</p>
                        </div>
                        <div v-on:click="deleteComment(post.id, comment.id)" id="deleteIcon" class="delete-comment" v-if="comment.user_id == user.id || user.permission == 1"><span class="mdi mdi-delete-outline" role="button" aria-label="Suppression d'un commentaire"></span></div>
                    </div>
                </div>
            </template>
            <template v-slot:lastCommentZone>
                <div class="commentZone">
                    <form>
                        <div class="comment-bloc">
                            <img class="user-photo-comment" :src="user.photo">
                            <textarea 
                                id="comment-area" 
                                class="form-control"
                                v-model="newComment.content"
                                aria-label="Zone d'un commentaire" 
                                placeholder="Écrire votre commentaire ici"
                            ></textarea>
                        </div>
                        <div class="bottom-post">
                            <button v-on:click="submitComment(post.id)" id="comment-submit" type="submit" class="btn-med" aria-label="Publication d'un commentaire">Publier</button>
                            <div v-on:click="deletePost(post.id)" id="deleteIcon" v-if="post.user_id == user.id || user.permission == 1"><span class="mdi mdi-delete-outline" role="button" aria-label="Suppression d'un post"></span></div>
                        </div>
                    </form>
                </div>
            </template>
            </Post>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import CreatePost from '@/components/CreatePost.vue'
import Post from '@/components/Post.vue'
import axios from 'axios'

export default {
    name: 'Home',
    components: {
        CreatePost,
        Post,
    },
    data() {
        return {
            cookie: this.$cookies.get("token"),
            allPosts: "",
            post: {
                user_id: "",
                createdAt: "",
                content: "",
                id: "",
                attachments: "",
                Comments: []
            },
            comment: {
                content: '',
                user_id: ''
            },
            newComment: {
                content: ''
            },
            user: {
                photo: ''
            }
        }
    },
    created() {
        axios
            .get('http://localhost:3000/api/posts', {
                headers: { Authorization: "Bearer " + this.cookie }
            })
            .then((response) => {
                console.log("posts", response.data);
                this.allPosts = response.data;
            })
            .catch(error => {
                console.log(error);
            });
        axios
            .get('http://localhost:3000/api/users/me', {
                headers: { Authorization: "Bearer " + this.cookie }
            })
            .then(response => {
                this.user = response.data.user;
                console.log(this.user);
            })
            .catch(error => console.log(error))
    },
    methods: {
        deletePost(id) {
            this.$confirm(
                {
                    message: `Supprimer cette publication ?`,
                    button: {
                        no: 'Non',
                        yes: 'Oui'
                    },
                    callback: confirm => {
                        if (confirm) {
                            axios
                                .delete('http://localhost:3000/api/posts/' + id, {
                                    headers: { Authorization: "Bearer " + this.cookie }
                                })
                                .then(response => {
                                    console.log(response)
                                    this.loadPosts();
                                })
                                .catch(error => {
                                    window.alert(error);
                                })
                        }
                    }
                }
            )
        },
        loadPosts() {
            axios
                .get('http://localhost:3000/api/posts', {
                    headers: { Authorization: "Bearer " + this.cookie }
                })
                .then((response) => {
                    console.log("posts", response.data);
                    this.allPosts = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        onSubmit() {
            let messageText = document.getElementById('post-area')._value;
            console.log(messageText);
            if (messageText !== null) {
                this.$router.go();
            } else {
                alert('Remplissez le champs texte de votre post !');
                return false;
            }
        },
        submitComment(postId) {
            const comment = this.newComment;
            console.log(comment);
            axios
                .post('http://localhost:3000/api/posts/' + postId + '/comments', 
                comment, {
                    headers: {
                        Authorization: "Bearer " + this.cookie }
                })
                .then(response => {
                    console.log(response);
                    this.$router.go();
                })
                .catch(error => console.log(error))
        },
        deleteComment(postId, commentId) {
            this.$confirm(
                {
                    message: `Supprimer ce commentaire ?`,
                    button: {
                        no: 'Non',
                        yes: 'Oui'
                    },
                    callback: confirm => {
                        if (confirm) {
                            axios
                                .delete('http://localhost:3000/api/posts/' + postId + '/comments/' + commentId, {
                                    headers: { Authorization: "Bearer " + this.cookie }
                                })
                                .then(response => {
                                    console.log(response)
                                    this.loadPosts();
                                })
                                .catch(error => {
                                    window.alert(error);
                                })
                        }
                    }
                }
            )
        }
    }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/main.scss';

.forum {
    background-color: white;
    margin-top: 100px;
}

#post-zone {
    background-color: #FAFAFA;
    min-height: 800px;
    padding: 1rem 0;
}

.comment-bloc {
    display: flex;
    margin: 10px 0;
    width: 100%;
}

#user-photo {
    object-fit: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 50px;
    height: 50px;
    border-radius: 50px;
}

.user-photo-comment {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    object-fit: cover;
}

.message-post {
    font-weight: 400;
    font-size: 1.1rem;
    line-height: 1.5rem;
    padding: 1.5rem 0;
}

.user-name {
    font-size: 0.9rem;
    padding: 10px 20px;
}

#comment-area {
    margin-left: 20px;
    width: calc(100% - 70px);
    border-radius: 40px;
    min-height: 50px;
    padding: 10px 20px;
    height: 40px;
    background-color: #FAFAFA;
    border: none;
    @media (max-width: $med) {
            font-size: 0.8rem;
            min-height: 40px;
        }
    &:focus {
        height: auto;
    }
}

.comment-bloc {
    display: flex;
    margin: 15px 0;
    width: 100%;
}

.user-photo-comment {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    object-fit: cover;
}

.last-comments {
    display: flex;
    width: 100%;
    .comment-area {
        width: calc(100% - 70px);
        background-color: #FAFAFA;
        margin-left: 20px;
        padding: 10px 20px;
        .user-name {
            padding: 0 0 5px;
        }
    }
}

#comment-area {
    margin-left: 20px;
    width: calc(100% - 70px);
    border-radius: 40px;
    min-height: 50px;
    padding: 10px 20px;
    height: 40px;
    background-color: #FAFAFA;
    border: none;
    &:focus {
        height: auto;
    }
}

.commentZone {
    width: 100%;
    .number-comments {
        font-size: 0.9rem;
        padding: 20px 0;
    }
}

.delete-comment {
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
}

</style>