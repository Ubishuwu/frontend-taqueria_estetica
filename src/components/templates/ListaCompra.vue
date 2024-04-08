<template>
    <div class="sticky top-0 bottom-0 h-full overflow-y-hidden border-l border-t border-accent md:w-80">
        <!--
          Slide-over panel, show/hide based on slide-over state.

          Entering: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-full"
            To: "translate-x-0"
          Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-0"
            To: "translate-x-full"
        -->
        <div class="flex h-full flex-col overflow-y-hidden bg-secondary shadow-xl">
            <div class="scroll-estilo flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div class="flex items-start justify-between">
                    <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Productos Añadidos
                    </h2>
                </div>

                <div class="mt-8">
                    <div class="flow-root">
                        <p v-if="false" class=" flex justify-center items-center h-full text-accent text-4xl">
                            <span>Lista Vacia</span>
                        </p>
                        <ul v-if="true" role="list" class="-my-6 divide-y divide-gray-200">

                            <!-----For para añadir elementos a la lsita de compra-->

                            <li v-for="item in lista" class="flex py-6">
                                <!----v-for="elemento in lista" :key="elemento.id"-->

                                <!---IMAGEN-->
                                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-accent">
                                    <img src="../../assets/miku.png"
                                        alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                        class="h-full w-full object-cover object-center">
                                </div>

                                <!---DATOS-->
                                <div class="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div class="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                                <p href="#">{{ item.producto.nombre }}</p>
                                            </h3>
                                            <p class="ml-4">${{ item.producto.precio }}</p>
                                        </div>
                                        <p class="mt-1 text-sm text-gray-500">{{ item.producto.tipo }}</p>
                                        <!---
                                            <p class="mt-1 text-sm text-gray-500">${{item.producto.precio}}c/U</p>
                                        -->
                                    </div>
                                    <div class="flex flex-1 items-end justify-between text-sm">
                                        <div class="flex flex-row justify-center items-center">
                                            <button @click="cambiar_cantidad(item.producto, -1)"
                                                class="h-6 aspect-square bg-transparent text-black mr-1 border border-accent rounded shadow-md hover:bg-info hover:text-white align-text-bottom font-semibold text-base active:scale-90 transition-transform">-</button>
                                            <p
                                                class="text-black border-accent border-t shadow-md w-7 flex rounded-md justify-center items-center aspect-square ">
                                                {{ item.cantidad }}</p>
                                            <button @click="cambiar_cantidad(item.producto, 1)"
                                                class="h-6 aspect-square bg-transparent text-black ml-1 border border-accent rounded shadow-md hover:bg-info hover:text-white align-text-bottom font-semibold text-base active:scale-90 transition-transform">+</button>
                                        </div>

                                        <div class="flex">
                                            <button type="button" @click="eliminar(item.producto)"
                                                class="font-medium text-info hover:text-error">Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="border-t border-accent px-4 py-6 sm:px-6">
                <div class="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${{ total }}</p>
                </div>
                <p v-if="lista.length>0" class="mt-0.5 text-sm text-gray-500">Elementos: {{ lista.length }}</p>
                <div class="mt-6">
                    <button @click="pagar()"
                        class="flex items-center w-full justify-center rounded-md border border-transparent bg-info px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Pagar</button>
                </div>
                <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                        <button @click="cancelar()" type="button" class="font-medium text-indigo-600 hover:text-indigo-500">
                            Cancelar
                            <span aria-hidden="true"> &rarr;</span>
                        </button>
                    </p>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
export default {
    props: {
        lista: [],

    },
    data() {
        return {
            total: 0,
        }
    },
    methods: {
        eliminar(item) {
            this.$emit("eliminar", item);
        },
        cambiar_cantidad(item, val) {
            this.$emit("actualizar", { 'producto': item, 'valor': val });
        },
        pagar(){
            this.$emit("pagar",this.total);

        },
        cancelar(){
            this.$emit("cancelar", true);
        }
    },
    watch: {

        lista: {
            handler(nuevaLista) {
                this.total = nuevaLista.reduce((acumulador, elemento) => acumulador + elemento.cantidad*elemento.producto.precio, 0);

            },
            deep: true // Esto asegura que el watcher detecte cambios incluso dentro de los objetos de la lista
        }
    }
}
</script>

<style></style>