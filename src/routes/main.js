import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/views/Home.vue'
import Caja from '../components/views/Caja.vue'
import Inventario from '../components/views/Inventario.vue'
import Login from '../components/forms/Login.vue';
import Register from '../components/forms/Register.vue';
import Cocina from '../components/views/Cocina.vue';
import CreatePlatillo from '../components/views/CreatePlatillo.vue';
import FormularioIngrediente from '../components/forms/FormularioIngrediente.vue';
import FormularioPlatillo from '../components/forms/FormularioPlatillo.vue';
import FormularioUsuarios from '../components/forms/FormularioUsuarios.vue';
const routes = [
  {
    path: "/",
    name: "Home",
    component: FormularioUsuarios,
    children: [
      {
        path: "caja",
        name: "Caja",
        component: Caja,
      },
      {
        path: "cocina",
        name: "Cocina",
        component: Cocina,
      },
    ]
  },
  {
    path: "/Login",
    name: "Login",
    component: Login
  },
  {
    path: "/Register",
    name: "Register",
    component: Register
  },
  {
    path: "/create-platillo",
    name: "Crear Plantillo",
    component: CreatePlatillo
  },
  {
    path: "/inventario",
    name: "Inventario",
    component: Inventario,
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Retorna la posición deseada
    if (to.hash) {
      return { el: to.hash };
    }
  },
});


export { router };