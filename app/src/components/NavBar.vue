<template>
    <div id="nav">
        <div class="c-4 back-to-home">
            <router-link to="/"><img src="../assets/images/logo-groupomania.jpg" id="logo-groupomania"></router-link>
        </div>
        <div class="c-4">
            <div class="app-name">
                <router-link to="/"><p>Keeplink</p></router-link>
            </div>
        </div>
        <div class="c-4">
            <div id="account">
                <router-link to="/account"><img id="user-photo-header" v-bind:src="userPhoto"></router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'NavBar',
    data() {
        return {
          cookie: this.$cookies.get("token"),
            userPhoto: 'http://localhost:3000/images/103809476_2686800248257377_1575430129088627782_n.jpg1604504354117.jpg'
        }
    },
    created() {
        axios
        .get('http://localhost:3000/api/users/me', {
            headers: { 
            Authorization: "Bearer " + this.cookie }
        })
        .then(response => {
            this.userPhoto = response.data.user.photo;
        })
        .catch(error => {
            console.log(error);
        })
    }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/main.scss';

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
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      font-weight: 900;
      font-size: 1.5rem;
      color: black;
      text-align: center;
      text-transform: uppercase;
    }
  }
}

.dropdown__menu {
  top: 100%;
  right: 0;
  position: absolute;
  z-index: 10;
  // height: 25rem;
  min-width: 300px;
  margin-top: 1rem;
  // overflow-y: auto;
  padding: 2rem 1rem 2rem 0rem;
  border-radius: 12px;
  background-color: white;
  border: 1px solid var(--color-gray);
  background-clip: padding-box;
}

.active {
  display: block;
}

#user-photo-header {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 50px;
  height: 50px;
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
  width: 40px;
}


</style>