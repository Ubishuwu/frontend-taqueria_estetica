<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content ">
      <!-- Page content here -->
      <div class=" flex ">
        <div class=" navbar fixed shadow-md bg-base-100 z-20 flex ">
          <div class="navbar-start ">
            <div class="dropdown ">
              <label
                for="my-drawer-2"
                class="btn btn-primary drawer-button lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
            </div>
          </div>
          
          <a class="text-xl">{{showComponent}}</a>
        </div>
      </div>
      <!--End Navbar-->

      <!--Content-->
      <div class="m-5 mt-20 lg:ml-60 ml-5">
        <component :is="showComponent" />
      </div>
    </div>
    <div class="drawer-side z-20">
      <label
        for="my-drawer-2"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="fixed menu p-4 w-56 min-h-full bg-base-200 text-base-content mt-16 lg:mt-0">
        <!-- Sidebar content here 
        <li><a href="/"><font-awesome-icon :icon="['fas', 'arrow-left']" />Back</a></li> 
      -->
        <li @click="showComponent = 'Main'"><a>Reportes</a></li>
        
        <li v-if="this.usuario != null && this.usuario.rol == 'Gerente General' || this.usuario.rol.includes('Gerente')"  @click="showComponent = 'Productos'"><a>Inventario de productos</a></li>
        <li v-if="this.usuario != null && this.usuario.rol == 'Gerente General'" @click="showComponent = 'Personal'"><a>Empleados</a></li>
        <li v-if="this.usuario != null && (this.usuario.rol == 'Gerente Taqueria' || this.usuario.rol == 'Gerente General')" @click="showComponent = 'Cocina'"><a>Cocina</a></li>
        <li v-if="this.usuario != null && (this.usuario.rol == 'Gerente Barberia' || this.usuario.rol == 'Gerente General')" @click="showComponent = 'Servicios'"><a>Servicios</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Main from "./Inventario/Main.vue" ;
import Reportes from "./Inventario/Reportes.vue";
import Productos from "./Inventario/Productos.vue";
import Personal from "./Inventario/Personal.vue";
import Cocina from "./Inventario/Cocina.vue";
import Servicios from "./Inventario/Servicios.vue";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../../firebase/firebaseInit"

export default {
  components: {
    Main,
    Reportes,
    Productos,
    Personal,
    Cocina, 
    Servicios
  },
  data() {
    return {
      showComponent: "Main",
      usuario: null
    };
  },
  async created() {
        this.usuario = (await db.collection('empleado').doc(firebase.auth().currentUser.uid).get()).data();
        console.log(this.usuario);
        console.log(firebase.auth())
    },
    methods:{
    }
};
</script>

<style></style>
