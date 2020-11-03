<template>
  <div class="account">
    <div class="user">
      <div id="user-photo"></div>
    </div>
    <div class="fields c-12">
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
                    id="photo" 
                    ref="photo" 
                    v-on:change="handleFileUpload()"
                />
                <div class="buttons">
                  <div class="c-12">
                    <button 
                      type="submit" 
                      class="btn btn-primary mb-2 btn-update"
                      @click.prevent="updateUserInformations"
                    >Mettre à jour les informations</button>
                  </div>
                  <div class="c-12">
                    <button 
                      type="submit" 
                      class="btn btn-primary mb-2 btn-delete"
                      @click.prevent="deleteUser"
                    >Supprimer le compte</button>
                  </div>
                </div>
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
              photo: ''
          }
        };
    },

    created() {
      if (this.$cookies.isKey("token")) {
      console.log('Token : OK')
    } else {
      this.$router.push("/login");
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
          let formData = new FormData();
          formData.append('email', this.dataUser.email);
          formData.append('firstName', this.dataUser.firstName);
          formData.append('lastName', this.dataUser.lastName);
          formData.append('photo', this.dataUser.photo, this.dataUser.photo.name);
          axios
            .put('http://localhost:3000/api/users/me',
                  formData,
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
          this.dataUser.photo = this.$refs.photo.files[0];
        },
        deleteUser() {
          const id = this.dataUser.id;
          axios
            .delete('http://localhost:3000/api/users/' + id, {
              headers: { Authorization: "Bearer " + this.cookie }
            })
            .then(response => {
              console.log(response.data);
              this.$cookies.remove("token");
              this.$router.push("/signup");

              })
            .catch(error => console.log(error))
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

#photo {
  border: none;
}

.buttons {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 50px 0;
  flex-wrap: wrap;
  .c-12 {
    display: flex;
    justify-content: center;
  }
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
    background-color: white;
    input {
      border: 1px solid black;
      margin-bottom: 20px;
    }
        padding: 0px 25% 10px;
    @media (max-width:$xl) {
            padding: 0 80px 200px;
    }
}

button {
  .mdi {
    padding-right: 10px;
  }
}

</style>
