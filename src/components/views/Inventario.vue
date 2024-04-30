<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <div class="lg:hidden">
        <div class="lg:hidden navbar bg-base-100 flex">
          <div class="navbar-start">
            <div class="dropdown">
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
            <a class="btn btn-ghost text-xl">Inventario</a>
          </div>
          <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
              <li><a>Item 1</a></li>
              <li>
                <details>
                  <summary>Parent</summary>
                  <ul class="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                  </ul>
                </details>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
         
        </div>
      </div>
      <!--End Navbar-->

      <!--Content-->
      <div class="m-5">
        <component :is="showComponent" />
      </div>
    </div>
    <div class="drawer-side">
      <label
        for="my-drawer-2"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
        <!-- Sidebar content here -->
        <li><a href="/"><font-awesome-icon :icon="['fas', 'arrow-left']" />Back</a></li>
        <li @click="showComponent = 'Main'"><a>Página Principal</a></li>
        <li @click="showComponent = 'Productos'"><a>Inventario</a></li>
        <li @click="showComponent = 'Personal'"><a>Empleados</a></li>
        <li @click="showComponent = 'Cocina'"><a>Cocina</a></li>
        <li @click="showComponent = 'Servicios'"><a>Servicios</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Main from "./Inventario/Main.vue";
import Reportes from "./Inventario/Reportes.vue";
import Productos from "./Inventario/Productos.vue";
import Personal from "./Inventario/Personal.vue";
import Cocina from "./Inventario/Cocina.vue";
import Servicios from "./Inventario/Servicios.vue";

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
    };
  },
};
</script>

<style></style>
