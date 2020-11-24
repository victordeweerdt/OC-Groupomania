<template>
  <div class="account">
    <div class="user">
      <img id="user-photo" v-bind:src="dataUser.photo">
    </div>
    <div class="fields c-12">
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
                    aria-label="Email de l'utilisateur"
                    placeholder="name@example.com"
                    v-model="dataUser.email"
                />

                <label class="file-select c-12">
                    <div class="select-button" role="button" aria-label="Téléchargement d'un fichier">
                        <span v-if="newUserData.photo">Fichier séléctionné : {{newUserData.photo.name}}</span>
                        <span v-else class="add-file"><span class="mdi mdi-image"></span>Ajouter un fichier</span>
                    </div>
                    <input 
                        type="file"
                        id="photo"
                        class="upload-input"
                        ref="photo" 
                        v-on:change="handleFileUpload()"
                    />
                </label>

                <div class="buttons">
                  <div class="c-12">
                    <button 
                      type="submit" 
                      class="btn btn-primary mb-2 btn-update"
                      aria-label="Modifier les informations utilisateur"
                      @click.prevent="updateUserInformations"
                    >Mettre à jour les informations</button>
                  </div>
                  <div class="c-12">
                    <button 
                      type="submit" 
                      class="btn btn-primary mb-2 btn-delete"
                      aria-label="Supprimer l'utilisateur"
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
          },
          newUserData: {
            photo: null
          }
        };
    },

    created() {
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
          console.log(this.newUserData.photo);
          if (this.newUserData.photo !== null) {
            console.log('non null');
            let formData = new FormData();
            formData.append('email', this.dataUser.email);
            formData.append('firstName', this.dataUser.firstName);
            formData.append('lastName', this.dataUser.lastName);
            formData.append('photo', this.newUserData.photo, this.newUserData.photo.name);
            axios
              .put('http://localhost:3000/api/users/me',
                    formData,
                    {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: "Bearer " + this.cookie
                    },
                  }
                ).then(() => {
                  console.log('Image téléchargée !');
                  this.$router.go();
              })
              .catch(error =>
                console.log(error)
              );
            } else {
              console.log('null');
              let formData = new FormData();
              formData.append('email', this.dataUser.email);
              formData.append('firstName', this.dataUser.firstName);
              formData.append('lastName', this.dataUser.lastName);
              formData.append('photo', this.dataUser.photo);
              axios
                .put('http://localhost:3000/api/users/me',
                      formData,
                      {
                      headers: {
                          'Content-Type': 'multipart/form-data',
                          Authorization: "Bearer " + this.cookie
                      },
                    }
                  ).then(() => {
                    console.log('Image téléchargée !');
                    this.$router.go();
                })
                .catch(error =>
                  console.log(error)
                );
            }
          },
        loadUser() {
          axios
            .get("http://localhost:3000/api/users/me", {
              headers: { Authorization: "Bearer " + this.cookie }
            })
            .then(response => {
              console.log(response.data);
              this.dataUser = response.data.user;
            })
        },
        handleFileUpload(){
          this.newUserData.photo = this.$refs.photo.files[0];
        },
        deleteUser() {
            this.$confirm(
                {
                    message: `Êtes-vous sur de vouloir supprimer votre compte ?`,
                    button: {
                        no: 'No',
                        yes: 'Yes'
                    },
                    callback: confirm => {
                        if (confirm) {
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
                        }
                    }
                }
            )
        },
    },
};
</script>



<style scoped lang="scss">
@import '../assets/styles/main.scss';

.account {
  margin-top: 100px;
}

.user {
    display: flex;
    justify-content: center;
    padding: 100px 0;
    background-color: white;
    @media (max-width:$med) {
        padding: 50px 0;
    }
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
  width: 100px;
  height: 100px;
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
    @media (max-width:$med) {
            padding: 0 20px 50px;
    }
}

button {
  .mdi {
    padding-right: 10px;
  }
}

.file-select > .select-button {
    padding: 1rem;
    color: black;
    background-color: white;
    border-radius: .3rem;
    text-align: center;
    font-weight: 500;
    border: 1px solid black;
    width: calc(100% - 5px);
    cursor: pointer;
}

.file-select > input[type="file"] {
  display: none;
}

.select-button {
    .add-file {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 20px;
    }
    .mdi {
        border: none;
        padding-right: 15px;
    }
}

</style>
