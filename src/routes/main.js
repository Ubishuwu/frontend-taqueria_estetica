import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/views/Home.vue'
import Caja from '../components/views/Caja.vue'
import Inventario from '../components/views/Inventario.vue'
import Login from '../components/forms/Login.vue';
import Register from '../components/forms/Register.vue';
//import Cocina from '../components/views/Cocina.vue';
import CreatePlatillo from '../components/views/CreatePlatillo.vue';
import Inicio from '../components/views/Inicio.vue'
import FormularioIngrediente from '../components/forms/FormularioIngrediente.vue';
import FormularioPlatillo from '../components/forms/FormularioPlatillo.vue';
import FormularioUsuarios from '../components/forms/FormularioUsuarios.vue';
import Perfil from '../components/views/Perfil.vue';
import Error404 from '../components/views/Error404.vue';

import { auth } from '../firebase/firebaseInit'
//import firebase from "firebase/app";

import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true, roles: ['user', 'admin', 'gerent'] },
    children: [
      {
        path: "caja",
        name: "Caja",
        component: Caja,
      },
      {
        path: "inventario",
        name: "Inventario",
        component: Inventario,
      },
      {
        path: "inicio",
        name: "Inicio",
        component: Inicio,
      },
      {
        path: "user",
        name: "Perfil Usuario",
        component: Perfil
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
  /*{
    path: "/inventario",
    name: "Inventario",
    component: Inventario,
  },*/
  {
    path: "/error",
    name: "error",
    component: Error404,
  }
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


router.beforeEach((to, from, next) => {

  //console.log(routes[0].children.some(rute => ('/' + rute.path) === to.path))
  console.log(to.path)
  if ((routes.some(route => route.path === to.path) || routes[0].children.some(rute => ('/' + rute.path) === to.path)))
    auth.onAuthStateChanged(async user => {

  if (user) {
    const usuario = (await db.collection('empleado').doc(user.uid).get()).data();
    console.log(usuario);
        // El usuario está autenticado, `currentUser` debe estar disponible
        console.log('Usuario autenticado');
        // Aquí puedes realizar acciones como redirigir a una ruta protegida
        if (to.path === '/Login' || to.path === '/')
          next('/inicio');
        else
          if (usuario.rol === "Empleado" && to.path === '/inventario') {
            next('/');
          } else {
            next();
          }
      } else {
        // No hay usuario autenticado, `currentUser` será null
        console.log('No hay usuario autenticado.');
        // Aquí puedes redirigir al usuario a la pantalla de inicio de sesión
        if (to.path === '/register')
          next();
        else if (to.path != '/Login')
          next('/Login');
        else
          next();
      }
    });
  else
    next('/error');

}

)

export { router };