<template>
    <div class="post c-6 cm-12">
        <div class="top-post">
            <div class="c-8 user-id">
                <div id="user-photo"></div>
                <p class="user-name"> {{ firstName }} {{ lastName }} </p>
            </div>
            <div class="c-4">
                <p class="post-date"> Il y a {{ createdAt }}.</p>
            </div>
        </div>
        <div class="content">
            <p class="message-post"> {{ content }}</p>
            <div src="../assets/images/post-image-sonia.jpg" class="media-post"></div>
        </div>
        <div class="last-comments">
            <!-- <p class="number-comments"><span id="comments-number">1</span> commentaire</p> -->
            <div class="comment-bloc">
                <div class="user-photo-comment" :value="lastCommentUser"></div>
                <div class="comment-area">
                    <p class="user-name">{{ lastCommentUserFullName }}</p>
                    <p>{{ lastCommentText }}</p>
                </div>
            </div>
        </div>
        <div class="commentZone">
            <div class="comment-bloc">
                <div class="user-photo-comment"></div>
                <textarea id="comment-area" class="form-control" placeholder="Écrire votre commentaire ici"></textarea>
            </div>
            <button id="comment-submit" type="submit" class="btn-med">Publier</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Post',
    data() {
        return {
            lastCommentUser: "",
            lastCommentText: "Super bonne référence",
            lastCommentUserFullName: "Victor Deweerdt"
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
            default: "../assets/images/user-photo-vd.jpg"
        },
        createdAt: {
            type: String,
            default: "2 heures"
        },
        content: {
            type: String,
            default: "This is my first message !"
        },
        comments: {
            type: Array,
            default: () => []
        }
    }
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
    border-radius: 40px;
        @media (max-width: $lg) {
        margin: 30px 40px;
    }
}

.top-post {
    width: 100%;
    display: flex;
    align-items: center;
}

.content {
    width: 100%;
}

.commentZone {
    width: 100%;
    .number-comments {
        font-size: 0.9rem;
        padding: 20px 0;
    }
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
  background: url(../assets/images/user-photo-vd.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50px;
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



.user-id {
    display: flex;
    align-items: center;
}


</style>