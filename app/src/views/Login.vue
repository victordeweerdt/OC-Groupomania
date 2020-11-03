<template>
    <div id="login">
        <div class="top-side c-12">
            <div class="titles c-12">
                <div>
                    <p class="signup-title">Se connecter</p>
                </div>
                <div class="login">
                    <a href="#/signup" class="login-title">S'inscrire<span class="mdi mdi-arrow-right"></span></a>
                </div>
            </div>
        </div>
        <div class="bottom-side c-6 cm-12">
            <div class="fields">
                <input 
                    type="email" 
                    class="input-l" 
                    id="email" 
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
                    type="submit" 
                    class="btn btn-primary mb-2 btn-submit"
                    @click.prevent="submitLogin"
                ><span class="mdi mdi-arrow-right"></span></button>
            </div>
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
                        this.$router.push("/");
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

#login {
    display: flex;
    min-height: 100%;
    align-items: center;
    flex-wrap: wrap;
}

.subtitle {
    font-size: 1.5rem;
}

.top-side {
    display: flex;
    min-height: 100%;
    align-items: center;
    justify-content: center;
    padding: 100px auto 50px;
    flex-wrap: wrap;
    background-color: white;
    padding: 100px 25% 10px;
    @media (max-width:$xl) {
        padding: 100px 80px 20px;
    }
}

.bottom-side {
    padding: 50px 0;
    margin: 0 auto;
    input {
        margin-bottom: 20px;
    }
    @media (max-width:$xl) {
        padding: 50px 80px;
    }
}

.fields {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.titles {
    display: flex;
    margin-bottom: 2rem;
    text-transform: uppercase;
    justify-content: space-between;

    .signup-title {
        text-align: left;
        font-size: 1.8rem;
        text-transform: none;
        font-weight: 600;
    }
    .login-title {
        text-align: right;
        padding-left: 10px;
        text-transform: none;
        color: black;
        font-size: 1rem;
        font-weight: 600;
        display: flex;
        align-items: center;

        .mdi {
            padding-left: 10px;
        }
    }
    .login {
        display: flex;
        align-items: center;
    }
}

</style>