<template>
     <NavBar :titulo="currentRouteName"></NavBar>
    
    <router-view></router-view>
 
 
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