<template>
    <div id="all-users">
        <h1 class="title">
            Gestion des utilisateurs 
            <br>par les admins
        </h1>
        <div class="all-user-items">
            <UserItem 
            v-for="user in allUsers"
            :photo="user.photo"
            :firstName="user.firstName"
            :lastName="user.lastName"
            :email="user.email"
            v-on:user-deleted="deleteUser(user.id)"
            v-on:user-updated="updateUser(user.id, user)"
            :key="user.id"
            >
            <template v-slot:Permission>
                <select name="permission" id="permission-select" v-model.number="user.permission">
                    <option v-for="option in options" v-bind:key="option.value">
                        {{ option.text }}
                    </option>
                </select>
            </template>
            </UserItem>
        </div>
    </div>
</template>



<script>
import UserItem from '@/components/UserItem.vue'
import axios from 'axios'
export default {
    name: 'allUsersAdmin',
    components: {
        UserItem
    },
    data() {
        return {
            cookie: this.$cookies.get("token"),
            allUsers: [],
            user: {
                firstName: 'Victor',
                lastName: 'Deweerdt',
                photo: '',
                email: '',
                permission: false,
            },
            options: [
                { text: 'false', value: '0' },
                { text: 'true', value: '1' }
            ],
        }
    },
    created() {
        if (this.$cookies.isKey("token")) {
        console.log('Token : OK')
        } else {
        this.$router.push("/signup");
        }
        axios
            .get('http://localhost:3000/api/admin/users', {
                headers: { Authorization: "Bearer " + this.cookie }
            })
            .then(response => {
                console.log("users", response.data);
                this.allUsers = response.data;
                })
            .catch(error => {
                console.log(error);
            });
    },
    methods: {
        deleteUser(id) {
            this.$confirm(
                {
                    message: `Êtes-vous sur de vouloir supprimer ce compte ?`,
                    button: {
                        no: 'No',
                        yes: 'Yes'
                    },
                    callback: confirm => {
                        if (confirm) {
                            axios
                                .delete('http://localhost:3000/api/admin/users/' + id, {
                                    headers: { Authorization: "Bearer " + this.cookie }
                                })
                                .then(() => console.log({message : 'Utilisateur supprimé !'}))
                                .catch(error => console.log(error))
                            this.$router.go();
                        }
                    }
                }
            )
        },
        updateUser(id, user) {
            this.$confirm(
                {
                    message: `Attention ! Si vous modifiez la permission de cet utilisateur, vous ne pourrez plus y accéder. Les admins n'ont accès qu'aux non-admins. Continuer ?`,
                    button: {
                        no: 'No',
                        yes: 'Yes'
                    },
                    callback: confirm => {
                        if (confirm) {
                            console.log(user);
                                axios
                                    .put('http://localhost:3000/api/admin/users/' + id, user, {
                                        headers: { 
                                            Authorization: "Bearer " + this.cookie }
                                    })
                                    .then(() => console.log({message : 'Utilisateur modifié !'}))
                                    .catch(error => console.log(error))
                                this.$router.go();
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

#all-users {
    margin-top: 100px;
    background-color: white;
}

.title {
    padding: 100px 0 50px 25%;
    @media (max-width:$xl) {
        padding: 100px 80px 100px;
    }
    @media (max-width:$med) {
        padding: 100px 20px 100px;
    }
}

.button {
    padding: 0 25% 50px;
    @media (max-width:$xl) {
        padding: 0 80px 50px;
    }
}

.all-user-items {
    background-color: #FAFAFA;
    padding: 100px 25% 80px;
    @media (max-width:$xl) {
        padding: 80px 80px 100px;
    }
    @media (max-width:$med) {
        padding: 20px 20px 100px;
    }
}

#permission-select {
    width: 100px;
    height: 60px;
    padding-left: 20px;
    appearance: none;
    background-image: url('../assets/ic_arrow_drop_down_24px.svg');
    background-repeat: no-repeat;
    background-position-x: 60px;
    background-position-y: center;
    @media (max-width: $med) {
        width:100%;
        background-position-x: 140px;
        height: 56px;
    }
}

select {
    &:focus {
        border: 2px solid black;
    }
    &:active {
        border: 2px solid black;
    }
}

</style>