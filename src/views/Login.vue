<template>
  <div class="container section">
    <div class="row">
      <div class="col s12 m6 offset-m3">
        <div class="card indigo lighten-5">
          <div class="card-action indigo lighten-2 white-text center">
            <h3>Login</h3>
          </div>

          <div class="card-content">
            <form @submit.prevent="Login">
              <div class="input-field col s12">
                <i class="material-icons prefix">alternate_email</i>
                <input
                  id="email"
                  type="email"
                  class="validate"
                  placeholder="email@example.com"
                  required
                  v-model="this.user.email"
                />
                <span
                  class="helper-text"
                  data-error="Ingrese un correo valido"
                  data-success="Correcto"
                  >email@example.com</span
                >
              </div>

              <br />

              <div class="input-field col s12">
                <i class="material-icons prefix">password</i>
                <input
                  id="first_name"
                  type="password"
                  placeholder="password"
                  class="validate"
                  required
                  v-model="this.user.password"
                />
              </div>

              <br />

              <div class="form-field center">
                <button type="submit" class="btn waves-effect waves-light green">
                  <i class="material-icons left">login</i>
                  Acceder
                </button>
              </div>

              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import Title from '../components/Title.vue';
  export default {
    data() {
      return {
        user: {
          email: '',
          password: '',
        },
      };
    },
    components: {
      Title,
    },

    methods: {
      ...mapActions(['actionLogin']),
      async Login() {
        await this.actionLogin(this.user);
        document.removeEventListener('keydown', this.onKeydown);
      },
    },
  };
</script>

<style scoped>
  .card-action,
  .card {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .card {
    margin-top: 50px;
  }
</style>
