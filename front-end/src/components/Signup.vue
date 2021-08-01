<template>
  <div class="signup">
    <img alt="Vue logo" src="../assets/icon-left-font-monochrome-black.png" />
    <h1>Inscription</h1>
    <input type="text" v-model="username" placeholder="Pseudo" />
    <input type="text" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Mot de passe" />
    <button @click="signUp">S'inscrire</button>
    <p>
      <router-link to="/login">Se connecter</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async signUp() {
      let result = await axios.post("http://localhost:3000/api/users/signup", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
      console.log(result);
      if (result.status == 201) {
        this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>

<style lang="scss"></style>
