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
            :permission="user.permission"
            v-on:user-deleted="deleteUser(user.id)"
            v-on:user-updated="updateUser(user.id)"
            :key="user.id"
            />
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
                photo: 'http://localhost:3000/images/DSC04282.jpg1604754621573.jpg',
                email: 'vdeweerdt@groupomania.com',
                permission: ''
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
            axios
                .delete('http://localhost:3000/api/admin/users/' + id, {
                    headers: { Authorization: "Bearer " + this.cookie }
                })
                .then(() => console.log({message : 'Utilisateur supprimé !'}))
                .catch(error => console.log(error))
            this.$router.go();
        },
        updateUser(id) {
            let formData = new FormData();
            formData.append('email', this.user.email);
            formData.append('firstName', this.user.firstName);
            formData.append('lastName', this.user.lastName);
            formData.append('photo', this.user.permission);
            axios
                .put('http://localhost:3000/api/admin/users/' + id, formData, {
                    headers: { Authorization: "Bearer " + this.cookie }
                })
                .then(() => console.log({message : 'Utilisateur modifié !'}))
                .catch(error => console.log(error))
            this.$router.go();
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
        padding: 100px 80px 50px;
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
        padding: 100px 80px 100px;
    }
}

</style>