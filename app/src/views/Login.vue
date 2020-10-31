<template>
    <div class="login">
        <div class="c-6 left-side">
            <h1 class="title">Bonjour et bienvenu sur Keeplink</h1>
            <p class="subtitle">Votre nouveau réseau social d’entreprise</p>
        </div>
        <div class="c-6 right-side">
            <div class="titles c-12">
                <div class="c-6">
                    <p class="login-title">Login</p>
                </div>
                <div class="c-6 signup">
                    <a href="#/signup" class="signup-title">Sign-up</a>
                </div>
            </div>
            <input 
                type="email" 
                class="input-l" 
                id="email-input" 
                placeholder="name@example.com"
                v-model="dataUser.email"
            />
            <input 
                type="password" 
                class="input-l" 
                id="password-input" 
                placeholder="Votre mot de passe"
                v-model="dataUser.password"
            />
            <button
                @click.prevent="submitLogin"
                type="submit" 
                class="btn btn-primary mb-2 btn-submit"
            >Je me connecte</button>
        </div>
    </div>
</template>


<script>
import axios from "axios";

export default {
    name: 'login',
    data() {
        return {
            dataUser: {
                email: '',
                password: ''
            }
        };
    },

    methods: {
        submitLogin() {
            if (this.email !== null || this.password !== null) {
                axios
                    .post("http://localhost:3000/api/users/login",
                        this.dataUser
                    )
                    .then(response => {
                        localStorage.setItem("token", response.data.token);
                        this.$cookies.set("token", response.data.token, '1d');
                        this.$router.push({name: 'Home'});
                    })
                    .catch(error => {
                        console.log(error.response)
                    })
            } else {
                alert("L'un des champs n'est pas renseigné !");
            }
        }
    },   
}
</script>

<style scoped lang="scss">
@import '../assets/styles/main.scss';

.login {
    display: flex;
    min-height: 100%;
    align-items: center;
    justify-content: center;
    padding: 15rem 0;
}

.subtitle {
    font-size: 1.5rem;
}

.left-side {
    padding: 0px 150px;
    .title {
        padding-bottom: 30px;
    }
    @media (max-width:$xl) {
        padding: 0px 70px;
    }
}

.right-side {
    padding: 0px 150px;
    input {
        margin-bottom: 15px;
    }
    @media (max-width:$xl) {
        padding: 0px 70px;
    }
}

.titles {
    display: flex;
    margin-bottom: 2rem;
    .login-title {
        text-align: right;
        padding-right: 10px;
        font-size: 2rem;
    }
    .signup-title {
        text-align: left;
        padding-left: 10px;
    }
    .signup {
        display: flex;
        align-items: center;
    }
}

</style>