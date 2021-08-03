<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/icon-left-font-monochrome-black.png" />
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
  components: {},
};
</script>
<style lang="scss">
.home {
  img {
    object-fit: cover;
    width: 50vw;
    margin-bottom: 150px;
     @media screen and (max-width: 768px) {
       width: 80vw;
     }
  }
  .ident {
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    a {
      text-decoration-line: none;
      color: black;
      font-weight: bold;
      font-size: 1.5em;
      cursor: pointer;
      &:hover {
        color: #d44c5c;
      }
      @media screen and (max-width: 768px) {
        font-size: 1em;
      }
    }
  }
}
</style>
