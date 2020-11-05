<template>
    <div class="forum">
        <CreatePost/>
        <div id="post-zone">
            <Post
                v-for="post in allPosts"
                :firstName="post.User.firstName"
                :lastName="post.User.lastName"
                :userPhoto="post.User.photo"
                :createdAt="post.createdAt"
                :content="post.content"
                :comments="post.comments"
                :key="post.id"
            />
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
        Post
    },
    data() {
        return {
        cookie: this.$cookies.get("token"),
        allPosts: [],
        post: {
            user_id: "",
            createdAt: "",
            content: "",
            comments: [],
            id: ""
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
        })
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