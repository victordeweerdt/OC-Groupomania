<template>
    <div class="post c-6 cm-12">
        <div class="top-post">
            <div class="c-8 user-id">
                <img id="user-photo" :src="userPhoto">
                <p class="user-name"> {{ firstName }} {{ lastName }} </p>
            </div>
            <div class="c-4">
                <p class="post-date">{{ createdAt | moment("ddd, hA") }}</p>
            </div>
        </div>
        <div class="content">
            <p class="message-post"> {{ content }}</p>
            <img :src="postPhoto" class="media-post">
        </div>
        <!-- Dernier com -->
        <slot name="Comments"></slot>
        <slot name="lastCommentZone"></slot>
    </div>
</template>

<script>
export default {
    name: 'Post',
    data() {
        return {
        }
    },
    props: {
        firstName: {
            type: String,
            default: ""
        },
        lastName: {
            type: String,
            default: ""
        },
        userPhoto: {
            type: String,
            default: ""
        },
        createdAt: {
            type: String,
            default: "2 heures"
        },
        content: {
            type: String,
            default: "This is my first message !"
        },
        myUserPhoto: {
            type: String,
            default:""
        },
        postId: {
            type: String
        },
        postPhoto: {
            type: String
        },
        newCommentContent: {
            type: String
        }
    },
}
</script>

<style scoped lang="scss">
@import '../assets/styles/main.scss';

.post {
    display: flex;
    flex-wrap: wrap;
    margin: 30px auto;
    padding: 40px 0;
    background-color: white;
    padding: 25px;
    border-radius: 0;
    box-shadow: 0px 2px 3px 0px #EAEAEA;
        @media (max-width: $lg) {
        margin: 30px 80px;
    }
}

.top-post {
    width: 100%;
    display: flex;
    align-items: center;
}

.bottom-post {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .mdi {
        cursor: pointer;
    }
}

.content {
    width: 100%;
}

#user-photo {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    object-fit: cover;
}

.media-post {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
}

.post-date {
    font-size: 0.7rem;
    font-weight: 400;
    text-align: right;
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

.last-comments {
    display: flex;
    width: 100%;
    flex-direction: column;
    .comment-area {
        width: calc(100% - 70px);
        background-color: #FAFAFA;
        margin-left: 20px;
        padding: 10px 20px;
        border-radius: 30px;
        .user-name {
            padding: 0 0 5px;
        }
    }
}



.user-id {
    display: flex;
    align-items: center;
}


</style>