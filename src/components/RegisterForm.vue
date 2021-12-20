<template>
  <form id="form" class="col s12 card indigo lighten-5" @submit.prevent="Submit">
    <div class="row">
      <div class="input-field col s12 m6">
        <i class="material-icons prefix">account_circle</i>
        <input
          id="first_name"
          type="text"
          pattern="^[a-zA-Z]+$"
          class="validate"
          placeholder="First name"
          required
          v-model="this.employee.firstName"
        />
        <span
          class="helper-text"
          data-error="Ingrese un nombre valido"
          data-success="Correcto"
          >My name</span
        >
      </div>

      <div class="input-field col s12 m6">
        <i class="material-icons prefix">person</i>
        <input
          id="last_name"
          type="text"
          pattern="^[a-zA-Z]+$"
          class="validate"
          placeholder="Last name"
          required
          v-model="this.employee.lastName"
        />
        <span
          class="helper-text"
          data-error="Ingrese un apellido valido"
          data-success="Correcto"
          >My last name</span
        >
      </div>

      <div class="input-field col s12 m6">
        <i class="material-icons prefix">phone</i>
        <input
          id="telephone"
          type="text"
          pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}$"
          maxlength="12"
          class="validate"
          placeholder="Telephone"
          required
          v-model="this.employee.telephone"
        />
        <span
          class="helper-text"
          data-error="Ingrese un telefono valido Ej: 809-000-0000"
          data-success="Correcto"
          >809-000-0000</span
        >
      </div>

      <div class="input-field col s12 m6">
        <i class="material-icons prefix">branding_watermark</i>

        <input
          id="identificationCard"
          type="text"
          class="validate"
          pattern="[0-9]{3}-?[0-9]{7}-?[0-9]{1}$"
          maxlength="13"
          placeholder="Identification Card"
          required
          v-model="this.employee.identificationCard"
        />
        <span
          class="helper-text"
          data-error="Ingrese una cedula valida Ej: 402-0000000-0 "
          data-success="Correcto"
          >402-0000000-0</span
        >
      </div>

      <div class="input-field col s12 m6">
        <i class="material-icons prefix">alternate_email</i>
        <input
          id="email"
          type="email"
          class="validate"
          placeholder="Email"
          required
          v-model="this.employee.email"
        />

        <span
          class="helper-text"
          data-error="Ingrese un correo valido"
          data-success="Correcto"
          >email@example.com</span
        >
      </div>

      <div class="input-field col s6">
        <i class="material-icons prefix">monetization_on</i>
        <input
          id="salary"
          type="number"
          class="validate"
          placeholder="Salary"
          required
          v-model="this.employee.salary"
        />
        <span
          class="helper-text"
          data-error="Ingrese un salirio valido"
          data-success="Correcto"
          >35000</span
        >
      </div>

      <div class="input-field col s12">
        <i class="material-icons prefix">room</i>
        <input
          id="addrres"
          type="text"
          class="validate"
          placeholder="Address"
          required
          v-model="this.employee.address"
        />
      </div>

      <div class="switch col s12">
        <label>
          Inactive
          <input type="checkbox" v-model="this.employee.active" />
          <span class="lever"></span>
          Active
        </label>
      </div>
    </div>
    <div class="col s12 center">
      <button type="submit" class="btn green left-align">Save employee</button>
      <button v-on:click="this.actionResetObject" class="btn grey left-align">
        Back
      </button>
    </div>
  </form>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    computed: {
      ...mapState(['employee', 'positions']),
    },

    methods: {
      ...mapActions(['actionResetObject', 'actionSaveEmployee', 'actionGetPositions']),
      async Submit() {
        await this.actionSaveEmployee(this.employee);
        this.actionResetObject();
      },
    },
  };
</script>

<style scoped>
  button {
    display: inline-flex;
    margin-inline: 10px;
  }
  .card {
    padding: 20px;
    border-radius: 15px;
  }
</style>
