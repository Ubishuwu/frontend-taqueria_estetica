<template>
  <div class="w-[200px] flex">

    <form class="flex mt-5">
      <label class="form-control w-full max-w-xs mr-2">
        <div class="label">
          <span class="label-text">Ordenar por</span>
        </div>
        <select class="select select-sm select-bordered">
          <option>Nombre</option>
          <option>Inventario</option>
          <option>Sucursal</option>
        </select>
      </label>

    </form>
    <button class="btn btn-outline btn-success mt-10 ml-3" onclick="my_modal_3.showModal()">Agregar Servicio</button>
    <dialog id="my_modal_3" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <FormularioServicio />
      </div>
    </dialog>
  </div>
  <div class="mt-5 overflow-auto h-[calc(100vh-theme('spacing.7'))] min-h-72">
    <table class="table border-collapse">
      <!-- head -->
      <thead class="sticky z-10 top-0 bg-gray-100">
        <tr>
          <th>Nombre</th>
          <th>Tipo de Servicio</th>
          <th>Precio</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="serv in servicios">
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img :src="serv.imagen"
                    alt="Avatar Tailwind CSS Component" id="myimg" />
                </div>
              </div>
              <div class="font-bold">{{ serv.nombre }}</div>
            </div>
          </td>
          <td>
            <div class="text-sm opacity-50">{{ serv.tipo }}</div>
          </td>
          <td>{{ serv.precio }}</td>
          <th>
            <button class="btn btn-ghost btn-xs">Detalles</button>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>

import firebase from "firebase/app";
import "firebase/auth";
import db from "../../../firebase/firebaseInit"

import FormularioServicio from "../../forms/FormularioServicio.vue";


export default {

  data() {
    return {
      servicios: [{imag:"https://www.agrorganicos.mx/cdn/shop/products/cilantro_1080x.jpg?v=1556947270"}]
    };
  },
  components: {
    FormularioServicio
  },
  async created() {
    const dataBase = await db.collection('servicios');
    const dbResults = await dataBase.get();
    dbResults.forEach(async (doc) => {

      const data = {
        nombre: doc.data().nombre,
        tipo: doc.data().tipo,
        precio: doc.data().precio,
        items: await this.recuperarItems(doc.data().items),
        imagen: doc.data().imagen,
      }
      this.servicios.push(data)
    })
  },
  methods: {
    async recuperarItems(data) {
      const auxIng = [];
      //console.log(data);
      try {
        for (const ing of data) {
          try {
            const dato = await ing.producto.get();
            if (dato.exists) {
              const ingrediente = { producto: dato.data(), cantidad: ing.cantidad };
              auxIng.push(ingrediente);
            } else {
              console.log(`El documento con ID ${ing.producto} no existe.`);
            }
          } catch (error) {
            console.error(`Error al obtener datos para ID ${ing.producto}:`, error);
          }
        }
      } catch (error) {
        //console.error(`Error al leer datos`, error);
      }
      //console.log(auxIng)

      return auxIng;
    }
  }
}
</script>

<style></style>