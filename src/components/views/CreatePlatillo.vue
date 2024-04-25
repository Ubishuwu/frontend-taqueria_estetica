<template>
  <div class="w-full">
    <progress class="progress progress-success w-full" value="10" max="100"></progress>
  </div>

  <div class="md:w-[50em] w-full  mx-auto my-[10%] flex flex-col justify-center p-10">
    <form v-if="state == 1" class=" w-full">

      <label class="form-control w-full py-3">
        <div class="label">
          <span class="font-medium text-lg">Ingresa el nombre del platillo</span>
        </div>
        <input v-model="nombre" type="text" placeholder="Nombre" class="input input-bordered w-full " />
      </label>
      <label class="form-control w-full py-3">
        <div class="label">
          <span class="font-medium text-lg">Precio</span>
        </div>
        <input v-model="precio" type="number" placeholder="Pesos Mexicanos" class="input input-bordered w-full " />
      </label>
      <label class="form-control w-full py-3 ">
        <div class="label">
          <span class="font-medium text-lg">Tipo</span>
        </div>
        <select v-model="tipo" class="select select-bordered">
          <option disabled selected>Elija uno</option>

          <option>Comida</option>
          <option>Postre</option>
          <option>Otro</option>
        </select>
      </label>
      <button class="btn py-3 w-full" type="submit" @click="next">Siguiente</button>
    </form>
    <div v-if="state == 2" class=" w-full">
      <p class="text-left font-bold text-2xl">Ingredientes</p>
      <button class="btn mt-5" onclick="my_modal_2.showModal()">Agregar ingrediente</button>
      <dialog id="my_modal_2" class="modal ">
        <div class="modal-box">

          <label class="form-control w-full ">
            <div class="label">
              <span class="label-text">Nombre</span>
            </div>
            <select v-model="ingrediente" class="select select-bordered" v-on:change.prevent="cambiarUnidad">
              <option disabled selected>Seleccione uno</option>
              <option v-for="prod in productos">{{ prod.nombre }}</option>
            </select>
          </label>
          <label class="form-control w-full ">
            <div class="label">
              <span class="label-text">Cantidad en {{ this.unidad }}s</span>
            </div>
            <input v-model="inventarioactual" type="number" class="input input-bordered w-full" required />
          </label>
          <div class="modal-action ">
            <form method="dialog" class="mr-auto">
              <button class="btn" @click="agregarIngrediente">Agregar</button>
            </form>
          </div>
        </div>

      </dialog>

      <ul v-if="ingredientes[0] != null"  class="menu bg-base-200 w-56 rounded-box mt-5">
        <li>
          <h2 class="menu-title">Ingredientes</h2>
          <ul>
            <li v-for="ingrediente in ingredientes" class="flex flex-row justify-between"><a>{{ingrediente}}</a> <button>x</button></li>
          </ul>
        </li>
      </ul>
      <div class="my-10"></div>
      <button class="btn py-3 w-full" type="submit" @click="guardar">Crear</button>
    </div>
  </div>
  <div>

  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import db from "../../firebase/firebaseInit"

export default {
  data() {
    return {
      state: 1,
      nombre: "",
      tipo: "",
      precio: 0,
      unidad: "gramos",
      ingrediente: null,
      productos: [],
      ingredientes: []
    }
  },
  methods: {
    next() {
      this.state = 2;
    },
    cambiarUnidad() {
      console.log(this.ingrediente)
      const resultado = this.productos.find(prod => prod.nombre == this.ingrediente);
      console.log(resultado)
      this.unidad = resultado.medida;
    },
    agregarIngrediente(){
      this.ingredientes.push(this.ingrediente);
      console.log(this.ingredientes)
    },
    async guardar(){
      const dataBase = db.collection("platillos").doc();
            await dataBase.set({
              nombre: this.nombre,
              tipo: this.tipo,
              ingredientes: this.ingredientes,
              precio: this.precio,
            })
            this.$router.push('/cocina');
    }
  },
  async created() {
    const dataBase = await db.collection('productos');
    const dbResults = await dataBase.get();
    dbResults.forEach((doc) => {
      const data = {
        nombre: doc.data().nombre,
        medida: doc.data().medida,
        proveedor: doc.data().proveedor,
        inventarioActual: doc.data().inventarioActual,
        inventarioMinimo: doc.data().inventarioMinimo,
        tipo: doc.data().tipo,
        sucursal: doc.data().sucursal
      }
      if (data.tipo == "Ingrediente") {
        this.productos.push(data)
      }

    })


  },

}
</script>

<style></style>
