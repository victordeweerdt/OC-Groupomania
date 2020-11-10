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
          <!-- <div class="users-link">
            <p>Accèder aux utilisateurs</p>
          </div> -->
            <div id="account" v-if="cookie != null">
                <div id="toggleAccount">
                  <img id="user-photo-header" v-bind:src="userPhoto">
                  <div id="submenu">
                      <ul>
                            <li><router-link to="/account"><span class="mdi mdi-account"></span>Informations</router-link></li>
                            <li v-if="admin == 1"><router-link to="/allusersadmin"><span class="mdi mdi-account-group"></span>Tous les utilisateurs</router-link></li>
                            <li><a href="#" class="logOut" @click="logOut()"><span class="mdi mdi-logout"></span>Se déconnecter</a></li>
                      </ul>
                  </div>
                </div>
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
          userPhoto: '../assets/images/userProfil.jpg',
          admin: ''
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
            this.admin = response.data.user.permission;
        })
        .catch(error => {
            console.log(error);
        })
        if (this.cookie == null) {
            const accountLink = document.getElementById('account');
            accountLink.style.display = "none";
        }
    },
    methods: {
        logOut() {
          this.$confirm(
            {
                message: `Êtes-vous sûr de vous déconnecter ?`,
                button: {
                    no: 'No',
                    yes: 'Yes'
                },
                callback: confirm => {
                    if (confirm) {
                      this.$cookies.remove("token");
                      this.$router.go();
                    }
                }
            })
        }
    },
}
</script>

<style scoped lang="scss">
@import '../assets/styles/main.scss';

#nav {
  padding: 30px 80px;
  display: flex;
  align-items: center;
  background-color: white;
  position: fixed;
  top: 0;
  width: 100%;

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

// .users-link {
//   display: flex;
//   justify-content: right;
// }

.logOut {
    cursor: pointer;
}

#toggleAccount {
      overflow: hidden;
    #submenu {
            top: 80px;
            right: 0;
            position: absolute;
            z-index: 10;
            padding: 2rem;
            border: 1px solid;
            background-color: white;
            color: white;
            display: none;
            .mdi {
                padding-right: 5px;
                top: 2px;
                position: relative;
            }
            li {
                a {
                    color: black !important;
                    font-size: 1rem;
                }
                padding: 5px 0;
            }
        }
        &:hover {
            #submenu {
                display: block;
            }
        }
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
  object-fit: cover;
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