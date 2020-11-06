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
                :key="post.id"
                v-on:submit-comment="submitComment()"
                v-on:post-deleted="deletePost(post.id)"
            >
            <template v-slot:Comments v-if="comment.content !== null">
                <div class="last-comments">
                    <!-- <p class="number-comments"><span id="comments-number">1</span> commentaire</p> -->
                    <div class="comment-bloc">
                        <img class="user-photo-comment" :src="comment.userPhoto">
                        <div class="comment-area">
                            <p class="user-name">{{ comment.firstName }} {{ comment.lastName }}</p>
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
                id: ""
            },
            comments: [],
            comment: {
                firstName: "Victor",
                lastName: "Deweerdt",
                content: null,
                userPhoto: ""
            },
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
        
        setTimeout(this.showComments(), 1000);
    },
    methods: {
        deletePost(id) {
            axios
                .delete('http://localhost:3000/api/posts/' + id + '/comments', {
                    headers: { Authorization: "Bearer " + this.cookie }
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
            axios
                .delete('http://localhost:3000/api/posts/' + id, {
                    headers: { Authorization: "Bearer " + this.cookie }
                })
                .then(response => {
                    console.log(response)
                    this.loadPosts();
                })
                .catch(error => {
                    console.log(error)
                })
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
            this.$router.go();
        },
        submitComment() {
            console.log('hello');
        }
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

.comment-bloc {
    display: flex;
    margin: 10px 0;
    width: 100%;
}

#user-photo {
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