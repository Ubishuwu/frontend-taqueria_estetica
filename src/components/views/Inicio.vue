<template>
    <div class="w-full h-full flex">

        <div class="fixed h-screen w-full bg-cover -z-50" style="background-image: url('../src/assets/fondo.png')"></div>
        <div class="h-full w-full bg-none">

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
        </div>
    </div>
</template>

<script setup>


import formularioIngrediente from '../forms/FormularioIngrediente.vue';
import FormularioProducto from '../forms/FormularioProducto.vue';
import FormularioUsuarios from '../forms/FormularioUsuarios.vue';

</script>