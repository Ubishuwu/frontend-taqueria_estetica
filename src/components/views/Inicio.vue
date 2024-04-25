<template>
    <div class="h-full w-full">

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
</template>