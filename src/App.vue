<template>
  <nav class="nav-wrapper indigo lighten-2">
    <div class="container">
      <router-link to="/employees" class="brand-logo">Crud</router-link>
      <a v-if="token" href="#" data-target="menu" class="sidenav-trigger">
        <i class="material-icons">menu</i>
      </a>
      <ul class="right hide-on-med-and-down">
        <li>
          <router-link v-if="token" to="/paysheet">Paysheet</router-link>
        </li>
        <li v-if="token">
          <a v-on:click="this.actionSingOff">Cerrar sesión</a>
        </li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="menu">
    <li><router-link to="/paysheet"></router-link></li>
    <li>
      <a href="#" v-on:click="this.actionSingOff" to="/">Cerrar sesión</a>
    </li>
  </ul>

  <router-view />
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  export default {
    computed: {
      ...mapState(['token']),
    },
    methods: {
      ...mapActions(['actionSingOff', 'getToken']),
    },
    mounted() {
      M.AutoInit();
      this.getToken();
    },
  };
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

  .sidenav {
    width: 150px;
  }
</style>
