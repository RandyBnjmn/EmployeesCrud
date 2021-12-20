<template>
  <div class="container">
    <Title title="Employees list" />

    <div class="section">
      <router-link to="/employeesDetails" class="col s4 btn btn-block blue right">
        <i class="material-icons left">add</i> New
      </router-link>
      <br /><br />
    </div>

    <table class="responsive-table centered">
      <thead>
        <tr class="indigo lighten-5">
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="indigo lighten-5" v-for="employee in employees" :key="employee.id">
          <td>{{ employee.firstName }}</td>
          <td>{{ employee.lastName }}</td>
          <td>{{ employee.identificationCard }}</td>
          <td>{{ employee.telephone }}</td>
          <td>{{ employee.email }}</td>
          <td>
            {{
              employee.salary.toLocaleString('en-DO', {
                style: 'currency',
                currency: 'DOP',
              })
            }}
          </td>
          <td>
            <address>{{ employee.address }}</address>
          </td>
          <td>
            <router-link
              :to="{
                name: 'EmployeesDetails',
                params: {
                  id: employee.id,
                },
              }"
              class="btn waves-effect waves-light orange lighten-2"
              title="Editar"
            >
              <i class="material-icons">create</i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Title from '../components/Title.vue';
  import RegisterForm from '../components/RegisterForm.vue';
  import { mapActions, mapState } from 'vuex';

  export default {
    data() {
      return {
        headers: [
          'Nombre',
          'Apellido',
          'Cedula',
          'Telefono',
          'Correo',
          'Sueldo',
          'Direccion',
          'Edit',
        ],
      };
    },
    name: 'Home',
    components: {
      Title,
      RegisterForm,
    },
    computed: {
      ...mapState(['employee', 'employees']),
    },
    methods: {
      ...mapActions(['actionGetEmployees', 'getToken']),
    },

    mounted() {
      this.getToken();
      this.actionGetEmployees();
    },
  };
</script>

<style scoped></style>
