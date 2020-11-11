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
                :myUserPhoto="user.photo"
                :key="post.id"
                v-on:submit-comment="submitComment(newComment.content, post.id)"
                v-on:post-deleted="deletePost(post.id)"
            >
            <template v-slot:Comments v-if="post.Comments !== null">
                <div class="last-comments">
                    <!-- <p class="number-comments"><span id="comments-number">1</span> commentaire</p> -->
                    <div class="comment-bloc"
                        v-for="comment in post.Comments"
                        v-bind:key="comment.id">
                        <img class="user-photo-comment" :src="comment.user_id">
                        <div class="comment-area">
                            <p class="user-name">{{ comment.user_id }} {{ comment.user_id }}</p>
                            <p>{{ comment.content }}</p>
                        </div>
                    </div>
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
                content: null,
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
        if (this.$cookies.isKey("token")) {
        console.log('Token : OK')
        } else {
        this.$router.push("/signup");
        }
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
            console.log('tit');
            this.$router.go();
        },
        submitComment(newComment, post) {
            let formData = new FormData();
            console.log(newComment);
            console.log(post);
            const postId = post.id;
            formData.append('commentContent', newComment.content);
            axios
                .post('http://localhost:3000/api/posts/' + postId + '/comments', 
                formData, {
                    headers: { Authorization: "Bearer " + this.cookie }
                })
                .then(response => console.log(response))
                .catch(error => console.log(error))
        },
    }
}
</script>

<style scoped lang="scss">

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
    &:focus {
        height: auto;
    }
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

</style>