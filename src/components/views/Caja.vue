<template>
    <div class="flex flex-col md:flex-row md:h-screen ">

        <div class=" md:grow sm:flex md:overflow-y-auto md:w-2/3">
            <div class="p-0 m-0 flex flex-wrap flex-row justify-center">
                <Tarjeta titulo="agua de jamaica con trozo de piña owo" tipo="1 vaso" precio="25.00" v-for="numero in 10"
                :key="numero" />
                <Tarjeta titulo="papas con chilito" tipo="1 vaso" precio="25.00" />
                <Tarjeta titulo="marzopa" tipo="1 vaso" precio="25.00" />
                <Tarjeta titulo="mazapan" tipo="1 vaso" precio="25.00" />
                
            </div>
        </div>
        <div class="overflow-y-hidden h-screen">
        <ListaCompra />
    </div>
    </div>
</template>

<script setup>
import Tarjeta from '../templates/Tarjeta.vue'
import ListaCompra from '../templates/ListaCompra.vue'
</script>

<style scoped></style>