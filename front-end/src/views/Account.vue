<template>
  <div class="compte">            
    <div class="connect" v-if="id != null">
      <h1>Bonjour {{ username }},</h1>
      <p>
        <button @click="logout">Se déconnecter</button><br />
        <button @click="deleteUser(id)">Supprimer mon compte</button>
      </p>
    </div>    
    <div class="disconnect" v-else>
      <h1>Veuillez vous identifier</h1>
      <p>
        Si vous n'avez pas de compte : <br />
        <router-link to="/signup">Inscrivez-vous</router-link>
      </p>
      <p>
        Si vous avez un compte : <br />
        <router-link to="/login">Connectez-vous</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import Signup from "../components/Signup.vue";
import axios from "axios";
export default {
  name: "Account",
  component: {
    Signup,
  },
  data() {
    return {
      id: null,
      username: null,
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
    deleteUser(id) {
      axios
        .delete("http://localhost:3000/api/users/" + id)
        .then((response) => {
          this.$router.push({ name: "Signup" });
        })
        .catch((error) => alert("error"));
    },
    getUserByToken() {
      axios
        .post(
          "http://localhost:3000/api/users/jwt",
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.id = response.data.id;
          this.username = response.data.username;
        });
    },
  },
  mounted() {
    this.getUserByToken();
  },
};
</script>

<style lang="scss">
.compte {
  color: #0c2444;
  img {
    width: 50%;
  }
  button {
    background-color: #0c2444;
    color: white;
  }
}
</style>
