<template>
    <div class="post">
        <div class="top-post">
            <div class="c-8 user-id">
                <div id="user-photo"></div>
                <p class="user-name"> {{ userName }} </p>
            </div>
            <div class="c-4">
                <p class="post-date"> Il y a {{ postDate }} heures.</p>
            </div>
        </div>
        <div class="content">
            <p class="message-post"> {{ message }}</p>
            <div src="../assets/images/post-image-sonia.jpg" class="media-post"></div>
        </div>
        <div class="comments">
            <p class="number-comments"><span id="comments-number">1</span> commentaire</p>
            <div class="comment-bloc">
                <div class="user-photo-comment"></div>
                <textarea id="comment-area" class="form-control" :value="commentArea" placeholder="Écrire votre commentaire ici"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Post',
    props: {
        userName: {
        type: String,
        default: 'Victor Deweerdt',
        required:true
        },
        userPhoto: {
        type: String
        },
        postDate: {
            type: String,
            required:true,
            default: '2'
        },
        message: {
        type: String,
        required:true,
        default: 'Ceci est un nouveau message concernant un post qui pourrait ressembler à ça.'
        },
        commentArea: {
        type: String,
        required:true,
        default: ''
        }
    }
}
</script>

<style scoped lang="scss">
.post {
    display: flex;
    flex-wrap: wrap;
    width: 50%;
    margin: 30px auto;
    padding: 40px 0;
    background-color: white;
    padding: 25px;
    border-radius: 40px;
}

.top-post {
    width: 100%;
    display: flex;
    align-items: center;
}

.content {
    width: 100%;
}

.comments {
    width: 100%;
    .number-comments {
        font-size: 0.9rem;
        padding: 20px 0;
    }
    .comment-bloc {
        display: flex;
    }
}

#user-photo {
  background: url(../assets/images/user-photo-vd.jpg);
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
    padding: 20px;
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

.user-id {
    display: flex;
    align-items: center;
}


</style>