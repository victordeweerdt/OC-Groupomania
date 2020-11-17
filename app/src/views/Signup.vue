<template>
    <div id="signup">
        <div class="top-side c-12">
            <div class="titles c-12">
                <div>
                    <p class="signup-title">S'inscrire</p>
                </div>
                <div class="login">
                    <a href="#/login" class="login-title">Se connecter<span class="mdi mdi-arrow-right"></span></a>
                </div>
            </div>
        </div>
        <div class="bottom-side c-6 cm-12">
            <div class="fields">
                <input 
                    type="text" 
                    class="input-l" 
                    id="firstName" 
                    placeholder="First-name"
                    aria-label="Prénom de l'utilisateur"
                    v-model="dataUser.firstName"
                />
                <input 
                    type="text" 
                    class="input-l" 
                    id="lastName" 
                    placeholder="Last-name"
                    aria-label="Nom de famille de l'utilisateur"
                    v-model="dataUser.lastName"
                />
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
                    aria-label="Mot de passe de l'utilisateur"
                    v-model="dataUser.password"
                    v-on:keyup.enter="submitSignup"
                />
                <button 
                    type="submit" 
                    class="btn btn-primary mb-2 btn-submit"
                    aria-label="Inscription de l'utilisateur"
                    @click.prevent="submitSignup"
                ><span class="mdi mdi-arrow-right"></span></button>
            </div>
        </div>
    </div>
</template>


<script>
import axios from "axios";

export default {
    name: 'signup',  
    data() {
        return {
            dataUser: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            }
        };
    },

    methods: {
        submitSignup() {
            if (this.firstName !== null || this.lastName !== null || this.email !== null || this.password !== null) {
                axios
                    .post("http://localhost:3000/api/users/signup",
                        this.dataUser
                    )
                    .then(response => {
                        console.log(response);
                        this.$router.push("/login");
                    })
                    .catch(error => {
                        console.log(error.response)
                    })
            } else {
                alert("L'un des champs n'est pas renseigné !");
            }
        },
    },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/main.scss';

#signup {
    display: flex;
    min-height: 100%;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 100px;
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
    @media (max-width:$med) {
        padding: 100px 20px 20px;
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
    @media (max-width:$med) {
        padding: 20px 20px;
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