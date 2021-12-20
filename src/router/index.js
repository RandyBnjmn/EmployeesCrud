import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import Login from '../views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/employees',
    name: 'Employees',
    component: () => import('../views/Employees.vue'),
    meta: { rutaProtegida: true },
  },
  {
    path: '/paysheet',
    name: 'Paysheet',
    component: () => import('../views/Paysheet.vue'),
    meta: { rutaProtegida: true },
  },
  {
    path: '/employeesDetails/:id?',
    name: 'EmployeesDetails',
    component: () => import('../views/EmployeesDetails.vue'),
    meta: { rutaProtegida: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const rutaEsProtegida = to.matched.some((item) => item.meta.rutaProtegida);
  if (rutaEsProtegida && store.state.token === null) {
    next('/');
  } else {
    next();
  }
});
export default router;
