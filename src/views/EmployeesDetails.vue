<template>
  <div class="container section">
    <Title title="Employees details" />
    <div class="row">
      <RegisterForm />
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import RegisterForm from '../components/RegisterForm.vue';
  import Title from '../components/Title.vue';
  export default {
    components: {
      RegisterForm,
      Title,
    },
    computed: {
      ...mapState(['employee', 'positions']),
    },
    methods: {
      ...mapActions(['actionGetById']),
    },

    created() {
      if (this.$route.params.id > 0) {
        this.actionGetById(this.$route.params.id);
      }
    },
  };
</script>

<style></style>
