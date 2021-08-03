<template>
  <div class="compte">
    <div class="connect" v-if="id != null">
      <h1>Bienvenue {{ username }},</h1>
      <p>
        <button @click="logout">Se déconnecter</button><br />
        <button @click="deleteUser(id)">Supprimer mon compte</button>
      </p>
    </div>
    <div class="disconnect" v-else>
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
          response.data;
          this.$router.push({ name: "Signup" });
        })
        .catch((error) => console.error(error));
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
  .connect {
    h1 {
      color: black;
    }
    p {
      margin-top: 100px;
      display: flex;
      justify-content: space-around;
      @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center;
      }
      button {
        border-radius: 5px;
        font-size: 1.2em;
        width: 300px;
        height: 40px;
        padding: 10px;
        margin: 10px 0;
        background: #0c2444;
        color: #fff;
        cursor: pointer;
        border: 1px solid #0c2444;
        @media screen and (max-width: 768px) {
          font-size: 1em;
          width: 200px;
          padding: 10px;
        }
      }
    }
  }
  .disconnect {
    margin-top: 150px;
    p {
      font-size: 1.3em;
      padding-bottom: 20px;
      color: black;
      a {
        margin-top: 15px;
        text-decoration-line: none;
        color: #0c2444;
        font-weight: bold;
      }
    }
  }
}
</style>
