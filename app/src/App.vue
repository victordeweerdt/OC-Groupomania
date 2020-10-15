<template>
  <div id="app">
    <div id="nav">
      <div class="c-4 back-to-home">
        <router-link to="/"><img src="./assets/images/logo-groupomania.jpg" id="logo-groupomania"></router-link>
      </div>
      <div class="c-4">
        <div class="app-name">
          <p>Keeplink</p>
        </div>
      </div>
      <div class="c-4">
        <div id="account">
          <router-link to="/"><span class="mdi mdi-logout icon-inactive"></span></router-link>
          <div id="user-photo-header"></div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import './assets/styles/main.scss';
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
  display: flex;
  align-items: center;
  background-color: white;

  .back-to-home {
    text-align:left;
  }

  a {
    font-weight: 500;
    text-decoration: none;
    color: #2c3e50;
    padding-right: 30px;
    font-size: 1.5rem;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  .app-name {
    p {
      font-weight: 900;
      font-size: 1.5rem;
      color: $main-color;
      text-align: center;
    }
  }
}

#user-photo-header {
  background: url(./assets/images/user-photo-vd.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 60px;
  height: 60px;
  border-radius: 60px;
}

#account {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  #user-photo {
    width: 60px;
    height: 60px;
  }
}

#logo-groupomania {
  width: 200px;
}
</style>


<script>
</script>