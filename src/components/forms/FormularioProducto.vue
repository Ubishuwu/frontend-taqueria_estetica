<template>
    <div class="border border-1 border-black">
        <div class="flex flex-col justify-center items-center p-3 m-2">
            <h1 class="text-2xl font-semibold m-2">Nuevo Producto</h1>
            <label class="flex md:flex-row flex-col w-full max-w-2xl items-center">
                <span class="label-text">Nombre del Producto:</span>
                <input type="text" placeholder="Ingrediente" class="input input-bordered input-sm grow ml-3" />
            </label>
            <div class="justify-center items-center flex md:flex-row flex-col w-full">
                <label class="flex md:flex-row flex-col max-w-2xl items-center m-2">
                    <span class="label-text">Cantidad:</span>
                    <input type="number" placeholder="1 unidad" class="input input-bordered input-sm ml-3" />
                </label>
                <label class="flex md:flex-row flex-col max-w-2xl items-center m-2">
                    <span class="label-text">Precio($):</span>
                    <input type="number" placeholder="00.00" class="input input-bordered input-sm ml-3" />
                </label>
            </div>
            <input type="submit" value="Guardar" class="btn btn-sm hover:btn-success hover:text-secondary mt-2" />

        </div>
    </div>
</template>

<script> 
//agregar validadcion y metodo de envio.. ademas de colocarlo como modal o vista dependiendo como se vea mejor
</script>