<template>
  <div class="flex flex-col lg:max-h-[calc(100vh-3rem)] max-h-[calc(100vh-8rem)] overflow-none">

    <div class="flex sm:flex-row flex-col justify-between items-center">

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
          <select @change="ordenar($event.target.value)" class="select select-sm select-bordered">
            <option>Nombre</option>
            <option>Inventario mayor a menor</option>
            <option>Inventario menor a mayor</option>
            <option>Sucursal</option>
          </select>
        </label>

      </form>
      <button class="btn btn-outline btn-success mt-10" onclick="formulario.showModal()">Agregar Producto</button>
      <dialog id="formulario" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <FormularioProducto />
        </div>
      </dialog>
    </div>


    <div class="mt-5 overflow-auto h-[calc(100vh-theme('spacing.7'))] min-h-72  ">
      <table class="table">
        <!-- head -->
        <thead class="sticky z-10 top-0 bg-gray-100">
          <tr>
            <th>Nombre</th>
            <th class="hidden min-[650px]:table-cell ">Medida</th>
            <th class="hidden min-[520px]:table-cell ">Inventario</th>
            <th class="hidden min-[580px]:table-cell ">Proveedor</th>
            <th>Sucursal</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prod in productos">
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img v-if="prod.imagen" class="h-8 w-8 rounded-full object-cover " :src="prod.imagen" alt="">
                    <img v-else :src="`../src/assets/${prod.tipo}.png`" alt="Avatar Tailwind CSS Component" class="" />

                  </div>
                </div>
                <div class="font-bold">{{ prod.nombre }}</div>
                <div class="text-sm opacity-50">{{ prod.tipo }}</div>
              </div>
            </td>

            <td class="hidden min-[650px]:table-cell ">{{ prod.medida }}</td>
            <td class="hidden min-[520px]:table-cell ">
              <div class="badge badge-success">
                <p class="text-white">{{ prod.inventarioActual }}</p>
              </div>
            </td>
            <td class="hidden min-[580px]:table-cell "> {{ prod.proveedor }}</td>
            <td class="hidden min-[580px]:table-cell">{{ prod.sucursal }}</td>
            <td>
              <button class="btn btn-neutral btn-xs" onclick="detalle.showModal()"
                @click="nuevoDetalle(prod)">Detalles</button>
            </td>
            <td>
              <button class="btn btn-error btn-xs" @click="eliminar(prod)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>


  <!---VIsta de detalles-->
  <dialog id="detalle" class="modal w-4/5 ">
    <div class="absolute overflow-hidden rounded-xl bg-slate-100 p-5 md:w-[100vh] w-full">
      <div class="flex flex-col w-full">
        <div class="flex flex-col w-full p-3">

          <span class="text-xl text-center w-full mb-2 p-2 border-b-2 border-gray-300">Datos
            del Producto</span>
          <div class="flex justify-between md:flex-row flex-col">

            <label class="flex flex-nowrap m-2">
              <h2 class="font-bold text-lg mr-2">Nombre:</h2>
              <h3 class="font-normal text-lg">{{ detalles.nombre }}</h3>
            </label>
            <label class="flex flex-nowrap m-2">
              <h2 class="font-bold text-lg mr-2">Precio:</h2>
              <h3 class="font-normal text-lg">{{ detalles.precio }}</h3>
            </label>
            <label class="flex flex-nowrap m-2">
              <h2 class="font-bold text-lg mr-2">Medida:</h2>
              <h3 class="font-normal text-lg">{{ detalles.medida }}</h3>
            </label>
          </div>
          <div class="flex justify-between md:flex-row flex-col">
            <label class="flex flex-nowrap m-2">
              <h2 class="font-bold text-lg mr-2">Stock Actual:</h2>
              <h3 class="font-normal text-lg">{{ detalles.inventarioActual }}</h3>
            </label>

            <label class="flex flex-nowrap m-2">
              <h2 class="font-bold text-lg mr-2">Stock Minimo:</h2>
              <h3 class="font-normal text-lg">{{ detalles.inventarioMinimo }}</h3>
            </label>
          </div>
        </div>

        <div class="flex flex-col w-full p-3 pt-0">
          <span class="text-xl text-center w-full mb-2 p-2 border-b-2 border-gray-300">
            Detalles</span>
          <div class="flex justify-between md:flex-row flex-col">

            <label class="flex flex-nowrap m-2">
              <h2 class="font-bold text-lg mr-2">Sucursal:</h2>
              <h3 class="font-normal text-lg">{{ detalles.sucursal }}</h3>
            </label>
            <label class="flex flex-nowrap m-2">
              <h2 class="font-bold text-lg mr-2">Proveedor:</h2>
              <h3 class="font-normal text-lg">{{ detalles.proveedor }}</h3>
            </label>
          </div>
          <div class="flex justify-between md:flex-row flex-col">
            <label class="flex flex-nowrap m-2">
              <h2 class="font-bold text-lg mr-2">Comentarios:</h2>
              <h3 class="font-normal text-lg">{{ detalles.comentario }}
              </h3>
            </label>
          </div>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
<script>

import firebase from "firebase/app";
import "firebase/auth";
import db from "../../../firebase/firebaseInit"

import FormularioProducto from '../../forms/FormularioProducto.vue';

export default {

  data() {
    return {
      productos: [],
      detalles: {}
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
        sucursal: doc.data().sucursal,
        comentario: doc.data().comentario,
        precio: doc.data().precio,
        imagen: doc.data().imagen,
        id: doc.id,
      }
      this.productos.push(data)
    })
  },
  methods: {
    nuevoDetalle(item) {
      this.detalles = item;
    },
    borrarProducto(nombreProducto) {
      db.collection('productos').where('nombre', '==', nombreProducto).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const imagenRef = firebase.storage().refFromURL(doc.data().imagen);
            imagenRef.delete().then(() => {
              console.log("Imagen borrada");
            }).catch((error) => {
              console.error("Error al borrar la imagen: ", error);
            });

            doc.ref.delete().then(() => {
              console.log("Producto borrado exitosamente");
            }).catch((error) => {
              console.error("Error al eliminar el producto:", error);
            });
          });
        })
        .catch((error) => {
          console.error("Error al eliminar el producto: ", error);
        });

      location.reload(true);
    },

    eliminar(prod) {
      console.log(prod.id)

      if (prod.imagen) {

        const imagenRef = firebase.storage().refFromURL(prod.imagen);

        imagenRef.delete().then(() => {
          console.log("Imagen borrada");
        }).catch((error) => {
          console.error("Error al borrar la imagen: ", error);
        });
      } else {
        console.log("No hay imagen para borrar");

      }

      firebase.firestore().collection('productos').doc(prod.id).delete()
        .then(() => {
          console.log('Documento eliminado correctamente');
        })
        .catch((error) => {
          console.error('Error al eliminar el documento:', error);
        }).finally(async () => {

          await this.$nextTick();

          location.reload(true);
        });

    },
    ordenar(opcion) {
      console.log(opcion)
      if (opcion === 'Nombre') {
        this.productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
      } else if (opcion === 'Sucursal') {
        this.productos.sort((a, b) => a.sucursal.localeCompare(b.nombre));
      } else if (opcion === 'Inventario menor a mayor') {
        this.productos.sort((a, b) => a.inventarioActual - b.inventarioActual);
      } else if (opcion === 'Inventario mayor a menor') {
        this.productos.sort((a, b) => b.inventarioActual - a.inventarioActual);
      }

      //console.log(this.productos)
      this.$forceUpdate();
    }
  }
}
</script>

<style></style>
