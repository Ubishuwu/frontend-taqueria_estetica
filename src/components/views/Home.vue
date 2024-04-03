<template>
 
 <NavBar></NavBar>
    <div>
        <router-view></router-view>
    </div>
    <p class="bg-secondary">sucurasles aparecer aqui, si es el dueño</p>
    <p>pie de pagina owo</p>
</template>

<script setup>
import Side_Bar from '../Side_Bar.vue';
import NavBar from '../templates/NavBar.vue';

import { useRoute } from 'vue-router'
import {ref, watch} from 'vue'

const route = useRoute()
const currentRouteName = ref(route.name)
    
watch(() => {
  currentRouteName.value = route.name;
});
</script>

<style></style>