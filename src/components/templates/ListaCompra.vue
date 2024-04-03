<template>
    <div class="sticky top-0 bottom-0 h-full overflow-y-hidden">
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
            <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div class="flex items-start justify-between">
                    <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Productos Añadidos
                    </h2>
                </div>

                <div class="mt-8">
                    <div class="flow-root">
                        <ul role="list" class="-my-6 divide-y divide-gray-200">

                            <!-----For para añadir elementos a la lsita de compra-->
                            <li v-for="numero in 10" class="flex py-6">
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
                                                <a href="#">Nombre Producto</a>
                                            </h3>
                                            <p class="ml-4">$90.00</p>
                                        </div>
                                        <p class="mt-1 text-sm text-gray-500">Caracteristica/Tipo</p>
                                    </div>
                                    <div class="flex flex-1 items-end justify-between text-sm">
                                        <p class="text-gray-500">Cantidad</p>

                                        <div class="flex">
                                            <button type="button"
                                                class="font-medium text-indigo-600 hover:text-indigo-500">Eliminar</button>
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
                    <p>$262.00</p>
                </div>
                <p class="mt-0.5 text-sm text-gray-500">wa wa wa wa wa wa(no c d q iria este apartado)</p>
                <div class="mt-6">
                    <a href="#"
                        class="flex items-center justify-center rounded-md border border-transparent bg-info px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Pagar</a>
                </div>
                <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                        <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">
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
</script>

<style></style>