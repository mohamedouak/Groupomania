<template>
  <div class="home">   
    <h1>Bienvenue chez <img alt="Vue logo" src="../assets/icon-left-font.png"></h1>
    <div class="ident">
      <router-link to="/signup">S'inscrire</router-link>
      <router-link to="/login">Se connecter</router-link>
    </div>  
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {
  }
}
</script>
<style lang="scss">
  .home{
  img {
    object-fit: cover;
    width: 50%;
    height: 400px;
  }
}
</style>
