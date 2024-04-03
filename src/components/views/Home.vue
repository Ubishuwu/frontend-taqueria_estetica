<template>
 
 <NavBar :titulo="currentRouteName"></NavBar>
 <!----->
    <div class=" overflow-y-hidden">
        <router-view></router-view>
    </div>
    
    <!--
    <div class="bg-neutral flex ">
      <div class="p-0 m-0 flex flex-wrap flex-row w-2/3">
        <Tarjeta titulo="agua de jamaica con trozo de piña owo" tipo="1 vaso" precio="25.00" v-for="numero in 10"
        :key="numero" />
        <Tarjeta titulo="papas con chilito" tipo="1 vaso" precio="25.00" />
        <Tarjeta titulo="marzopa" tipo="1 vaso" precio="25.00" />
        <Tarjeta titulo="mazapan" tipo="1 vaso" precio="25.00" />
        
      </div>
      
      
    </div>
    <ListaCompra />
    --->
    <p class="bg-secondary">sucurasles aparecer aqui, si es el dueño</p>
    <p>pie de pagina owo</p>
</template>

<script setup>
import Side_Bar from '../Side_Bar.vue';
import NavBar from '../templates/NavBar.vue';

import Tarjeta from '../templates/Tarjeta.vue'
import ListaCompra from '../templates/ListaCompra.vue'
import { useRoute } from 'vue-router'
import {ref, watch} from 'vue'

const route = useRoute()
const currentRouteName = ref(route.name)
    
watch(() => {
  currentRouteName.value = route.name;
});



</script>

<style></style>