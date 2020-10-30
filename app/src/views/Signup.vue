<template>
    <div id="signup">
        <div class="c-6 left-side">
            <h1 class="title">Bonjour et bienvenu sur Keeplink</h1>
            <p class="subtitle">Votre nouveau réseau social d’entreprise</p>
        </div>
        <div class="c-6 right-side">
            <div class="titles c-12">
                <div class="c-6">
                    <p class="signup-title">Sign-up</p>
                </div>
                <div class="c-6 login">
                    <a href="#/login" class="login-title">Login</a>
                </div>
            </div>
            <input type="text" class="input-l" id="firstName" placeholder="First-name">
            <input type="text" class="input-l" id="lastName" placeholder="Last-name">
            <input type="email" class="input-l" id="email" placeholder="name@example.com">
            <input type="password" class="input-l" id="password-input" placeholder="Votre mot de passe">
            <button type="submit" class="btn btn-primary mb-2 btn-submit">Je me connecte</button>
        </div>
    </div>
</template>


<script>
export default {
    name: 'signup'    
}
</script>

<style scoped lang="scss">
@import '../assets/styles/main.scss';

#signup {
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
    .signup-title {
        text-align: right;
        padding-right: 10px;
        font-size: 2rem;
    }
    .login-title {
        text-align: left;
        padding-left: 10px;
    }
    .login {
        display: flex;
        align-items: center;
    }
}

</style>