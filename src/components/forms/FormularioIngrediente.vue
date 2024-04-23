<template>
    <div class="border border-1 border-black">
        <form @submit.prevent="validar" class="flex flex-col justify-center items-center p-3 m-2">
            <h1 class="text-2xl font-semibold m-2">Nuevo Ingrediente</h1>
            <label class="flex md:flex-row flex-col w-full max-w-2xl items-center">
                <span class="label-text">Nombre del Ingrediente:</span>
                <input type="text" placeholder="Ingrediente" class="input input-bordered input-sm grow ml-3" />
            </label>
            <div class="p-3 w-full justify-center items-center flex flex-col">
                <div class="justify-center items-center flex md:flex-row flex-col w-full">
                    <label class="flex md:flex-row flex-col max-w-2xl items-center m-2">
                        <span class="label-text">Cantidad:</span>
                        <input type="number" placeholder="1 unidad" class="input input-bordered input-sm ml-3" />
                    </label>

                    <label class="flex md:flex-row flex-col max-w-2xl items-center m-2 ">
                        <span class="label-text">Medida:</span>
                        <select class="select select-bordered select-sm ml-3 " >
                            <option disabled selected>gr/ml/pz</option>
                            <option>Gramos(gr)</option>
                            <option>Militros(ml)</option>
                            <option>Pieza(pz)</option>
                            <option>Kilo(kg)</option>
                            <option>Litro(Lt)</option>
                        </select>
                    </label>
                </div>
                <label class="flex md:flex-row flex-col max-w-2xl items-center m-2">
                    <span class="label-text">Precio($):</span>
                    <input type="number" placeholder="00.00" class="input input-bordered input-sm ml-3" />
                </label>
                
            </div>
            <input type="submit" value="Guardar" class="btn btn-sm hover:btn-success hover:text-secondary" />
        </form>
    </div>
</template>

<script>

</script>