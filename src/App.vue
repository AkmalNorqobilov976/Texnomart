<template>
  <div>
    <nav class="navbar">
      <router-link to="/products">Products</router-link>
      <router-link to="/auth/signin">Sign In</router-link>
    </nav>
  </div>
  <router-view/>
</template>

<style lang="scss">


.navbar {
  padding: 1.5rem;
   text-align: right;
  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 1rem;
    text-decoration: none;
    text-transform: uppercase;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
