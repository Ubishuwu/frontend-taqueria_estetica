<template>
    <div>
        <form>
            <label class="form-control w-full ">
                <div class="label">
                    <span class="label-text font-bold">Nombre</span>
                </div>
                <input type="email" v-model="email" class="input input-bordered w-full" required />
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text font-bold">Tipo de producto</span>
                </div>
                <select class="select select-bordered">
                    <option selected>Ingrediente</option>
                    <option>De venta</option>
                </select>
            </label>
            <label class="form-control w-full ">
                <div class="label">
                    <span class="label-text font-bold">Proveedor</span>
                </div>
                <input type="email" v-model="email" class="input input-bordered w-full" required />
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text font-bold">Medida</span>
                </div>
                <select class="select select-bordered">
                    <option disabled selected>Selecciona una</option>
                    <option>Kilo</option>
                    <option>Gramo</option>
                    <option>Litro</option>
                    <option>Miligramo</option>
                    <option>Bulto</option>
                    <option>Unidad</option>
                </select>
            </label>
            <label class="form-control">
                <div class="label">
                    <span class="label-text font-bold">Descripción (opcional)</span>
                </div>
                <textarea class="textarea textarea-bordered h-24" placeholder="Este ingrediente solo se compra en temporada de verano......."></textarea>
            </label>
            <label class="form-control w-full mt-5">
                <button class="btn" type="submit" @click.prevent="login">Registrar</button>
            </label>

        </form>
    </div>

</template>

<script>

</script>