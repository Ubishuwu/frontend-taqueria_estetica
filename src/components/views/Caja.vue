<template>
    <div class="bg-neutral h-full flex flex-nowrap">
        <div class="grow p-0 m-0 flex flex-wrap flex-row">
            <Tarjeta titulo="agua de jamaica con trozo de piña owo" tipo="1 vaso" precio="25.00" v-for="numero in 10"
                :key="numero" />
            <Tarjeta titulo="papas con chilito" tipo="1 vaso" precio="25.00" />
            <Tarjeta titulo="marzopa" tipo="1 vaso" precio="25.00" />
            <Tarjeta titulo="mazapan" tipo="1 vaso" precio="25.00" />

        </div>
        <div >
            <ListaCompra />
        </div>

    </div>

</template>

<script setup>
import Tarjeta from '../templates/Tarjeta.vue'
import ListaCompra from '../templates/ListaCompra.vue'
</script>

<style scoped></style>