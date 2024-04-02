import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/views/Home.vue'
import Caja from '../components/views/Caja.vue'
import Inventario from '../components/views/Inventario.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "caja",
        name: "Caja",
        component: Caja,
      },{
        path: "inventario",
        name: "Inventario",
        component: Inventario,
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export { router };
