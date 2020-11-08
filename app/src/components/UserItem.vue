
<template>
    <div class="user-item">
        <div class="main-side">
            <div class="left-side">
                <img class="user-photo" :src="photo">
                <div class="user-identity">
                    <p class="user-name">{{ firstName }} {{ lastName }}</p>
                    <p class="email">{{ email }}</p>
                </div>
            </div>
            <div class="right-side">
                <button 
                    id="update-btn"
                    type="submit" 
                    class="btn btn-primary mb-2 btn-update"
                    v-on:click.prevent="updateUsers(user)"
                    >Mettre à jour
                </button>
                <select name="permission" id="permission-select">
                    <option value="">{{ permission }}</option>
                    <option value="1">true</option>
                </select>
            </div>
        </div>
        <div class="secondary-side">
            <button 
                class="delete-user" 
                v-on:click.prevent="deleteUser(user)"><span class="mdi mdi-delete-outline"></span></button>
        </div>
    </div>
</template>


<script>
export default {
    name: 'UserItem',
    props: {
        firstName: {
            type: String,
            default: 'Victor'
        },
        lastName: {
            type: String,
            default: 'Deweerdt'
        },
        photo: {
            type: String,
            default: 'http://localhost:3000/images/DSC04282.jpg1604754621573.jpg'
        },
        email: {
            type: String,
            default: 'vdeweerdt@groupomania.com'
        },
        permission: {
            type: Boolean,
            default: false
        },
        user: {
            type: String
        }
    },
    methods: {
        deleteUser(user) {
            this.$emit('user-deleted', user);
        },
        updateUsers(user) {
            this.$emit('user-updated', user);
        }
    }
}
</script>


<style scoped lang="scss">
@import '../assets/styles/main.scss';

.user-photo {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 60px;
  object-fit: cover;
}

.user-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
    .main-side {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: white;
        padding: 25px;
        width: 100%;
        box-shadow: 0px 2px 3px 0px #EAEAEA;
        .user-identity {
            padding-left: 20px;
            .user-name {
                font-size: 1.2rem;
                font-weight: 600;
                padding-bottom: 5px;
            }
        }
        .left-side {
            display: flex;
            align-items: center;
        }
        .right-side {
            display: flex;
            #permission-select {
                width: 100px;
                height: 60px;
                padding-left: 20px;
                appearance: none;
                background-image: url('../assets/ic_arrow_drop_down_24px.svg');
                background-repeat: no-repeat;
                background-position-x: 60px;
                background-position-y: center;
            }
            #update-btn {
                border: none;
            }
            select {
                &:focus {
                    border: 2px solid black;
                }
                &:active {
                    border: 2px solid black;
                }
            }
        }
    }
    .secondary-side {
        display: flex;
        justify-content: center;
        align-items: center;
        height: auto;
        margin: 20px;
        .delete-user {
            width: 60px;
            height: 60px;
            background-color: $second-color;
            border: none;
            .mdi {
                color: $main-color;
            }
        }
    }
}

</style>