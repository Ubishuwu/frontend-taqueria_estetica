<template>
  <NavBar :titulo="currentRouteName"></NavBar>

  <router-view></router-view>
</template>

<script setup>
import NavBar from '../templates/NavBar.vue';

import { useRoute } from 'vue-router'
import { onBeforeMount, onMounted, ref, watch } from 'vue'

import formularioIngrediente from '../forms/FormularioIngrediente.vue';
import FormularioProducto from '../forms/FormularioProducto.vue';
import FormularioUsuarios from '../forms/FormularioUsuarios.vue';

import firebase from "firebase/app";
import "firebase/auth";
import { onBeforeUpdate } from 'vue';

const route = useRoute()
const currentRouteName = ref(route.name)

watch(() => {
  currentRouteName.value = route.name;
});

</script>

<style></style>