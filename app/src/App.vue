<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"><img src="./assets/images/logo-groupomania.jpg" id="logo-groupomania"></router-link>
      <div class="app-name">
        <p>Keeplink</p>
      </div>
      <div id="account">
          <a href="#">Se déconnecter</a>
          <div id="user-photo"></div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import './assets/styles/main.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;

  a {
    font-weight: 500;
    text-decoration: none;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  .app-name {
    p {
      font-weight: 900;
      font-size: 1.5rem;
      color: $main-color;
    }
  }
}

#account {
  display: flex;
  align-items: center;
  justify-content: space-between;
  #user-photo {
    width: 50px;
    height: 50px;
  }
}

#logo-groupomania {
  width: 200px;
}
</style>


<script>
</script>