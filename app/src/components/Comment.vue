<template>
    <div class="last-comments">
        <!-- <p class="number-comments"><span id="comments-number">1</span> commentaire</p> -->
        <div class="comment-bloc">
            <img class="user-photo-comment" :src="commentUserPhoto">
            <div class="comment-area">
                <p class="user-name">{{ commentFirstName }} {{ commentLastName }}</p>
                <p>{{ commentContent }}</p>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Comment',
    props: {
        commentFirstName: {
            type: String,
            default: "Victor"
        },
        commentLastName: {
            type: String,
            default: "Deweerdt"
        },
        commentUserPhoto: {
            type: String,
            default: "http://localhost:3000/images/DSC04322-5.jpg1604675737628.jpg"
        },
        commentContent: {
            type: String,
            default: "Voici mon commentaire."
        }
    }
}
</script>


<style scoped lang="scss">
@import '../assets/styles/main.scss';


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
    object-fit: cover;
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