<template>
  <NavBar :titulo="currentRouteName"></NavBar>

  <router-view></router-view>
  <button class="btn hidden" onclick="formulario.showModal()">open modal</button>

  <!---Auxiliar para testear formularios-- pasar proximamente a un modal--->
  <dialog id="formulario" class="modal max-w-96">
    <div class="relative h-5/6 overflow-y-auto overscroll-auto rounded-l-xl sm:w-4/6 w-full scroll-estilo">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <FormularioUsuarios />
    </div>
  </dialog>

</template>

<script setup>
import Side_Bar from '../Side_Bar.vue';
import NavBar from '../templates/NavBar.vue';

import Tarjeta from '../templates/Tarjeta.vue'
import ListaCompra from '../templates/ListaCompra.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

import formularioIngrediente from '../forms/FormularioIngrediente.vue';
import FormularioProducto from '../forms/FormularioProducto.vue';
import FormularioUsuarios from '../forms/FormularioUsuarios.vue';


const route = useRoute()
const currentRouteName = ref(route.name)

watch(() => {
  currentRouteName.value = route.name;
});



</script>

<style></style>