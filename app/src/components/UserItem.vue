
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
                    aria-label="Modification de permission admin d'un utilisateur"
                    v-on:click.prevent="updateUsers(user)"
                    >Mettre à jour
                </button>
                <slot name="Permission"></slot>
            </div>
        </div>
        <div class="secondary-side">
            <button 
                class="delete-user"
                aria-label="Suppression d'un utilisateur" 
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
    @media (max-width: $med) {
        flex-wrap: wrap;
    }
    .main-side {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: white;
        padding: 25px;
        width: 100%;
        box-shadow: 0px 2px 3px 0px #EAEAEA;
        flex-wrap: wrap;
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
            @media (max-width: $med) {
                padding-bottom: 20px;
            }
        }
        .right-side {
            display: flex;
            @media (max-width: $med) {
                    width: 100%;
                }
            #update-btn {
                border: none;
                @media (max-width: $med) {
                    border: 1px solid #f5f5f5;
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
        @media (max-width: $med) {
            width: 100%;
            margin: 10px 0;
        }
        .delete-user {
            width: 60px;
            height: 60px;
            background-color: $second-color;
            border: none;
            @media (max-width: $med) {
                width: 100%;
            }
            .mdi {
                color: $main-color;
            }
        }
    }
}

</style>