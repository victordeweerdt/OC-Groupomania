<template>
  <div class="account">
    <div class="user">
      <div id="user-photo"></div>
    </div>
    <div class="fields">
                <input 
                    type="text" 
                    class="input-l" 
                    id="firstName" 
                    placeholder="First-name"
                    v-model="dataUser.firstName"
                />
                <input 
                    type="text" 
                    class="input-l" 
                    id="lastName" 
                    placeholder="Last-name"
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
                    v-model="dataUser.password"
                />
                <input 
                    type="file" 
                    id="file" 
                    ref="file" 
                    v-on:change="handleFileUpload()"
                />
                <button 
                    type="submit" 
                    class="btn btn-primary mb-2 btn-download"
                    @click.prevent="downloadProfilPicture"
                ><span class="mdi mdi-image"></span>Télécharger un photo de profil</button>
            </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
    name: 'account',  
    data() {
        return {
          cookie: this.$cookies.get("token"),
          dataUser: {
              firstName: '',
              lastName: '',
              email: '',
              file: ''
          }
        };
    },

    created() {
      if (this.$cookies.isKey("token")) {
      console.log('Token : OK')
    } else {
      this.$router.push({name: 'Login'});
    }
      axios
        .get("http://localhost:3000/api/users/me", {
          headers: { Authorization: "Bearer " + this.cookie }
        })
        .then(response => {
          console.log(response.data);
          this.dataUser = response.data.user;
        })
    },

    methods: {
        updateUserInformations() {
            if (this.firstName !== null || this.lastName !== null || this.email !== null || this.password !== null) {
                axios
                    .post("http://localhost:3000/api/users/signup",
                        this.dataUser
                    )
                    .then(response => {
                        console.log(response)
                        window.location.href = '#/login';
                    })
                    .catch(error => {
                        console.log(error.response)
                    })
            } else {
                alert("L'un des champs n'est pas renseigné !");
            }
        },
        downloadProfilPicture() {
          let formData = new FormData();
          formData.append('photo', this.dataUser.file);
          console.log(formData);
          axios
            .post( 'http://localhost:3000/api/users/me',
                  {params: formData},
                  {
                  headers: {
                      'Content-Type': 'multipart/form-data',
                      Authorization: "Bearer " + this.cookie
                  },
                }
              ).then(() =>
                console.log('Image téléchargée !')
            )
            .catch(error =>
              console.log(error)
            );
        },
        handleFileUpload(){
          this.file = this.$refs.file.files[0];
        },
    },
};
</script>



<style scoped lang="scss">
@import '../assets/styles/main.scss';

.user {
  display: flex;
  justify-content: center;
  padding: 100px 0;
  background-color: white;
}

#user-photo {
  background: url(../assets/images/user-photo-vd.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100px;
  height: 100px;
  border-radius: 60px;
}

.fields {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 80px;
    background-color: white;
    input {
      border: 1px solid black;
      margin-bottom: 20px;
    }
}

button {
  .mdi {
    padding-right: 10px;
  }
}

</style>
