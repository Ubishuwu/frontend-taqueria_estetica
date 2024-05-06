<template>
  <div class="w-full">
    <progress class="progress progress-success w-full" value="10" max="100"></progress>
  </div>
  <div class="">
    <button class="btn" @click="goBack">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
      Regresar
    </button>
  </div>
  <div class="md:w-[50em] w-full mx-auto my-[3%] flex flex-col justify-start p-10">
    <form v-if="state == 1" class=" w-full" @submit.prevent="">

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
          <option>Bebida</option>
          <option>Comida</option>
          <option>Postre</option>
          <option>Otro</option>
        </select>
      </label>
      <label class="form-control w-full py-3 ">
        <div class="label">
          <span class="font-medium text-lg">Imagen</span>
        </div>
        <input @change="change($event)" type="file" id="imagen" accept="image/*" class="input input-bordered w-full" />
      </label>
      <button class="btn py-3 w-full" @click="next">Siguiente</button>
    </form>

    <div v-if="state == 2" class=" w-full flex flex-col  p-5">
      <p class="text-left font-bold text-2xl">Ingredientes</p>
      <button class="btn mt-5 max-w-60" onclick="my_modal_2.showModal()">Agregar ingrediente</button>
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
            <input v-model="cantidad" type="number" class="input input-bordered w-full" required />
          </label>
          <div class="modal-action ">
            <form method="dialog" class="mr-auto">
              <button class="btn" @click="agregarIngrediente">Agregar</button>
            </form>
          </div>
        </div>

      </dialog>
      <div class="overflow-auto max-h-64">

        <ul v-if="ingredientes[0] != null" class="menu bg-base-200 w-full rounded-box mt-5">
          <li>
            <h2 class="menu-title">Ingredientes</h2>
            <ul>
              <li v-for="ingrediente in ingredientes" :key="ingrediente.producto.id"
                class="flex flex-row justify-between">
                <div class="flex flex-row justify-between grow">

                  <div>{{ ingrediente.producto.nombre }}</div>

                  <div>{{ ingrediente.cantidad }}</div>
                </div>
                <button @click="eliminar(ingrediente)">x</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="my-10 flex justify-between w-full">

        <button class="btn py-3 mr-4 bg-red-700" @click="back">Regresar</button>

        <button class="btn py-3 grow" @click="guardar">Crear</button>
      </div>
    </div>
  </div>
</template>

<script>

import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, minValue, maxValue, alpha, decimal, email, sameAs, helpers, numeric } from '@vuelidate/validators'


import firebase from "firebase/app";
import "firebase/auth";
import db from "../../firebase/firebaseInit"
import { storage } from '../../firebase/firebaseInit';
const ref = storage.ref();

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      state: 1,
      nombre: "",
      tipo: "",
      precio: "",
      unidad: "...",
      ingrediente: "",
      cantidad: "",
      productos: [],
      ingredientes: [],
      imagen: "",
      errorEnvio: false,
    }
  },
  validations: {
    nombre: { required },
    precio: { required, decimal, minValue: minValue(0) },
    tipo: { required },
    ingrediente: { required },
    cantidad: { required, decimal, minValue: minValue(0) },

  },
  methods: {
    goBack() {
      this.$router.push('/inventario');
    },
    eliminar(item) {
      const nuevaLista = this.ingredientes.filter((items) => items !== item);
      this.ingredientes = nuevaLista;
    },
    change(e) {
      this.imagen = e.target.files[0];
      console.log(this.imagen)
    },
    async next() {
      const vefNomb = await this.v$.nombre.$validate();
      const vefPrecio = await this.v$.precio.$validate();
      const vefTipo = await this.v$.tipo.$validate();
      if (vefNomb && vefPrecio && vefTipo) {
        console.log("listo");
        this.state = 2;
      }
      else {
        console.log("falta");

      }
    },
    async back() {
      this.state = 1;
    },
    cambiarUnidad() {
      console.log(this.ingrediente)
      const resultado = this.productos.find(prod => prod.nombre == this.ingrediente);
      console.log(resultado)
      this.unidad = resultado.medida;
    },
    agregarIngrediente() {
      this.ingredientes.push({
        producto: this.productos.find(prod => prod.nombre == this.ingrediente),
        cantidad: this.cantidad
      });
      console.log(this.ingredientes)
    },
    async guardar() {
      const receta = [];///hacer enlace a la tabla de productos
      this.ingredientes.forEach((ingrediente) => {
        console.log(ingrediente.producto.id)
        receta.push({
          producto: db.collection('productos').doc(ingrediente.producto.id),
          cantidad: ingrediente.cantidad
        })
      })
      //guardarlos en la bd
      const dataBase = db.collection("platillos").doc();


      try {
        let downloadURL = null;
        if (this.imagen != null && this.imagen != "") {
          const refImg = ref.child("imagenes/" + dataBase.id + ".jpg");
          const metadata = { contentType: 'img/jpeg' }
          await refImg.put(this.imagen, metadata);
          downloadURL = await refImg.getDownloadURL();
          //console.log('URL de descarga:', downloadURL);
          console.log('Archivo cargado exitosamente');
        }
        await dataBase.set({
          nombre: this.nombre,
          tipo: this.tipo,
          ingredientes: receta,
          precio: this.precio,
          imagen: downloadURL,
          sucursal: "Taqueria",
        })

        await this.$nextTick();

        this.$router.push('/inventario');

      } catch (error) {
        console.error('Error al cargar el archivo:', error);
        errorEnvio = true;
      }
    }
  },
  async created() {
    const dataBase = await db.collection('productos');
    const dbResults = await dataBase.get();
    //docs = dbResults.docs;
    dbResults.forEach((doc) => {
      const data = {
        nombre: doc.data().nombre,
        medida: doc.data().medida,
        proveedor: doc.data().proveedor,
        inventarioActual: doc.data().inventarioActual,
        inventarioMinimo: doc.data().inventarioMinimo,
        tipo: doc.data().tipo,
        sucursal: doc.data().sucursal,
        id: doc.id,
      }
      if (data.tipo == "Ingrediente" && data.sucursal == "Taqueria") {
        this.productos.push(data)
      }

    })


  },

}
</script>

<style></style>
