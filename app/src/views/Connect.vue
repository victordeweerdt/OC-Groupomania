<template>
    <div class="connect">
        <div class="c-6 left-side">
            <h1 class="title">Bonjour et bienvenu sur Keeplink</h1>
            <p class="subtitle">Votre nouveau réseau social d’entreprise</p>
        </div>
        <div class="c-6 right-side">
            <input type="email" class="input-l" id="email-input" placeholder="name@example.com">
            <input type="password" class="input-l" id="password-input" placeholder="Votre mot de passe">
            <button type="submit" class="btn btn-primary mb-2 btn-submit">Je me connecte</button>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Connect'    
}
</script>

<style scoped lang="scss">
@import '../assets/styles/main.scss';

.connect {
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

</style>