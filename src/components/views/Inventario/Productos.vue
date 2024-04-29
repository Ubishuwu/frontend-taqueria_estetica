<template>
      <div class="flex flex-col lg:max-h-[calc(100vh-3rem)] max-h-[calc(100vh-8rem)] overflow-none">

        <div class="w-[200px] flex">
          
          <form class="flex mt-5">
            <label class="form-control w-full max-w-xs mr-2">
              <div class="label">
                <span class="label-text">Sucursal</span>
              </div>
              <select class="select select-sm select-bordered">
                <option>Todos</option>
                <option>Taqueria El TaquerITO</option>
                <option>Estetica El cortITO</option>
              </select>
            </label>
            <label class="form-control w-full max-w-xs mr-2">
              <div class="label">
                <span class="label-text">Estatus</span>
        </div>
        <select class="select select-sm select-bordered">
          <option>Todos</option>
          <option>Proximos a vencer</option>
          <option>Normal</option>
          <option>Sobreinventario</option>
        </select>
      </label>
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
    <button class="btn btn-outline btn-success mt-10" onclick="my_modal_3.showModal()">Agregar Producto</button>
    <button class="btn btn-outline btn-success mt-10 ml-3" onclick="my_modal_3.showModal()">Agregar Servicio</button>
    <dialog id="my_modal_3" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <FormularioProducto/>
      </div>
    </dialog>
  </div>
  <div class="mt-5 overflow-auto h-[calc(100vh-theme('spacing.7'))]">
    <table class="table">
      <!-- head -->
      <thead class="z-50 sticky top-0 bg-gray-100">
        <tr>
          <th>Nombre</th>
          <th>Medida</th>
          <th>Inventario</th>
          <th>Proveedor</th>
          <th>Sucursal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr>
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img src="https://www.agrorganicos.mx/cdn/shop/products/cilantro_1080x.jpg?v=1556947270"
                  alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div class="font-bold">Cilantro</div>
                <div class="text-sm opacity-50">Cocina</div>
              </div>
            </div>
          </td>
          <td>Kilo</td>
          <td>
            <div class="badge badge-success">
              <p class="text-white">5</p>
            </div>
          </td>
          
          <td>Mercado 20 de Noviembre</td>
          <td>Taqueria</td>
          <th>
            <button class="btn btn-ghost btn-xs">Detalles</button>
          </th>
        </tr>
        <tr v-for="prod in productos">
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img src="https://www.agrorganicos.mx/cdn/shop/products/cilantro_1080x.jpg?v=1556947270"
                  alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div class="font-bold">{{prod.nombre}}</div>
                <div class="text-sm opacity-50">{{prod.tipo}}</div>
              </div>
            </div>
          </td>
          <td>{{prod.medida}}</td>
          <td>
            <div class="badge badge-success">
              <p class="text-white">{{prod.inventarioActual}}</p>
            </div>
          </td>
          
          <td>{{prod.proveedor}}</td>
          <th>{{prod.sucursal}}</th>
          <th>
            <button class="btn btn-ghost btn-xs">Detalles</button>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>
<script>

import firebase from "firebase/app";
import "firebase/auth";
import db from "../../../firebase/firebaseInit"

import FormularioProducto from '../../forms/FormularioProducto.vue';

export default {
  
  data() {
    return {
      productos: []
    };
  },
  components: {
    FormularioProducto,
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
      this.productos.push(data)
    })


  }
}
</script>

<style></style>
