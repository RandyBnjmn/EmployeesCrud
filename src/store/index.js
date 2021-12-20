import { createStore } from 'vuex';
import router from '../router';
import Swal from 'sweetalert2';
export default createStore({
  state: {
    token: null,
    employees: [],

    employee: {
      id: 0,
      firstName: '',
      lastName: '',
      identificationCard: '',
      telephone: '',
      email: '',
      salary: Number,
      address: '',
      active: Boolean,
    },
  },
  mutations: {
    setLogin(state, payload) {
      state.token = payload.token;
      sessionStorage.setItem('token', state.token);

      Swal.fire({
        title: 'Login Exitoso',
        text: 'Bienvenid@',
        timer: 3000,
        icon: 'success',
        showConfirmButton: false,
      });
      router.push('/employees');
    },
    setToken(state, payload) {
      state.token = payload;
    },

    singOff(state) {
      state.token = null;
      sessionStorage.removeItem('token');
      router.push('/');
      Swal.fire({
        title: 'SESION CERRA CON EXITO',
        text: 'Hasta luego',
        timer: 3000,
        icon: 'success',
        showConfirmButton: false,
      });
    },

    setEmployees(state, payload) {
      state.employees = payload;
    },

    setEmployee(state, payload) {
      state.employee = payload;
    },
    resetObject(state) {
      for (const prop of Object.getOwnPropertyNames(state.employee)) {
        delete state.employee[prop];
      }
    },
  },
  actions: {
    async actionLogin({ commit }, user) {
      const response = await fetch('https://localhost:44332/api/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.ok == true) {
        commit('setLogin', data);
      } else {
        Swal.fire({
          title: 'CORREO O CONTRASEÑA INVÁLIDOS',
          text: 'Por favor, vuelva a intentarlo',
          icon: 'error',
          showConfirmButton: true,
        });
      }
    },
    actionSingOff({ commit }) {
      commit('singOff');
    },
    getToken({ commit }) {
      if (sessionStorage.getItem('token')) {
        commit('setToken', sessionStorage.getItem('token'));
      } else {
        commit('setToken', null);
      }
    },
    async actionGetEmployees({ commit }) {
      const response = await fetch('https://localhost:44332/api/employees', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.state.token,
        },
      });

      const data = await response.json();
      commit('setEmployees', data);
    },

    async actionGetById({ commit }, payload) {
      const response = fetch(`https://localhost:44332/api/employees/${payload}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.state.token,
        },
      });
      const data = await (await response).json();
      commit('setEmployee', data);
    },
    async actionSaveEmployee({ commit }, payload) {
      const response = await fetch('https://localhost:44332/api/employees', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.state.token,
        },
      });
      const data = await response.json();
      if (data == true) {
        Swal.fire({
          title: 'EXITO',
          text: 'Guardado con exito',
          icon: 'success',
          timer: 2500,
          showConfirmButton: false,
        });
        router.push('/employees');
      }
    },

    actionResetObject({ commit }) {
      commit('resetObject');
      router.push('/employees');
    },
  },
  modules: {},
});
