<template>
  <div class="md:w-[50em] w-full text-center mx-auto my-[10%] flex justify-center p-10" >
    <form class=" w-full" >

      <label class="form-control w-full py-3">
        <div class="label">
          <span class="font-medium text-lg">Ingresa el nombre del platillo</span>
        </div>
        <input
          type="text"
          placeholder="Nombre"
          class="input input-bordered w-full "
        />
      </label>
      <label class="form-control w-full py-3 ">
        <div class="label">
          <span class="font-medium text-lg">Tipo</span>
        </div>
        <select class="select select-bordered">
          <option disabled selected>Elija uno</option>
          <option>Bebida</option>
          <option>Comida</option>
          <option>Postre</option>
          <option>Otro</option>
        </select>
      </label> 
      <button class="btn py-3 w-full" type="submit">Crear</button>
    </form>
  </div>
</template>

<script></script>

<style></style>
