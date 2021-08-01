<template>
  <div class="signup">
    <img alt="Vue logo" src="../assets/icon-left-font-monochrome-black.png" />
    <h1>Connexion</h1>
    <input type="text" v-model="username" placeholder="Pseudo" />
    <input type="password" v-model="password" placeholder="Mot de passe" />
    <button @click="login">Se connecter</button>
    <p>
      <router-link to="/signup">S'inscrire</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      if (this.username !== null || this.password !== null) {
        axios
          .post("http://localhost:3000/api/users/login", {
            username: this.username,
            password: this.password,
          })
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("isAdmin", res.data.isAdmin);
            if (res.status == 200) {
              this.$router.push({ name: "Account" });
            }
          })
          .catch((error) => console.log(error));
      } else {
        console.log("oops !");
      }
    },
  },
};
</script>

<style></style>
