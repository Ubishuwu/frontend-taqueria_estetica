<template>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur eligendi saepe deleniti sit amet quidem
        molestias pariatur eos deserunt incidunt quaerat quis, tenetur dicta minima aperiam eum totam modi quasi?</p>

    <div>
        <Tarjeta titulo="agua de jamaica con trozo de piña owo" tipo="1 vaso" precio="25.00" v-for="numero in 10" :key="numero" />
        <Tarjeta titulo="papas con chilito" tipo="1 vaso" precio="25.00" />
        <Tarjeta titulo="marzopa" tipo="1 vaso" precio="25.00" />
        <Tarjeta titulo="mazapan" tipo="1 vaso" precio="25.00" />
    </div>
</template>

<script setup>
import Tarjeta from '../elementos/Tarjeta.vue'

</script>

<style scoped>
p {
    background-color: aquamarine;
}

div {

    background-color: rgb(230, 229, 229);
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
}
</style>