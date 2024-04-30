<template>
  <div class="flex flex-col lg:max-h-[calc(100vh-3rem)] max-h-[calc(100vh-8rem)] overflow-none">

    <div class="flex w-fulll bg-slate-500">
      <div class="bg-cyan-700 w-full">
        <div id="main" class="mx-10 mt-4">
          <a class="btn" href="/create-platillo">Crear Platillo</a>
        </div>

        <div class="divider"></div>
      </div>
      <div class="bg-slate-950">
        <div class="w-[10em]">
        </div>
      </div>

    </div>

    <!---Tabla-->
    <div class="mt-5 overflow-auto h-[calc(100vh-theme('spacing.7'))]">
      <table class="table border-collapse">
        <!-- head -->
        <thead class="sticky top-0 bg-gray-100">
          <tr>
            <th>Nombre</th>
            <th class="hidden min-[520px]:table-cell ">Precio</th>
            <th class="hidden min-[520px]:table-cell ">Tipo</th>
            <th class="hidden sm:table-cell ">Ingredientes</th>
            <th></th>
          </tr>
        </thead>

        <tbody class="">
          <tr v-for="plat in cocina" :key="plat.nombre">
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img :src="'../src/assets/miku.png'" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">{{ plat.nombre }}</div>

                </div>
              </div>
            </td>
            <td class="hidden min-[520px]:table-cell ">{{ plat.precio }}</td>

            <td class="hidden min-[520px]:table-cell font-medium">
              {{ plat.tipo }}
            </td>

            <td class="hidden sm:table-cell ">
              <div class="badge badge-success">
                <p class="text-white">{{ plat.ingredientes.length }}</p>
              </div>
              <div>
                <p v-for="ingre in plat.ingredientes" class="">{{ ingre.producto.nombre }} : {{ ingre.cantidad }} {{
                  ingre.producto.medida }}</p>
              </div>
            </td>

            <td class="hidden sm:table-cell ">{{ plat.rol }}</td>
            <th>
              <button class="btn btn-ghost btn-xs " onclick="detalle.showModal()"
                @click="nuevoDetalle(plat)">Detalles</button>
            </th>

          </tr>
        </tbody>
      </table>
    </div>


    <!---VIsta de detalles-->
    <dialog id="detalle" class="modal w-4/5 ">
      <div class="absolute overflow-hidden rounded-xl bg-slate-100 p-5 md:w-[90vh] w-full">
        <div class="flex flex-col w-full">
          <div class="flex flex-col w-full p-3">

            <span class="text-xl text-center w-full mb-2 p-2 border-b-2 border-gray-300">
              Información del Platillo
            </span>
            <div class="flex justify-between md:flex-row flex-col">

              <label class="flex flex-nowrap m-2">
                <h2 class="font-bold text-lg mr-2">Nombre:</h2>
                <h3 class="font-normal text-lg">{{ detalles.nombre }}</h3>

              </label>
            </div>
            <div class="flex justify-between md:flex-row flex-col">

              <label class="flex flex-nowrap m-2">
                <h2 class="font-bold text-lg mr-2">Precio:</h2>
                <h3 class="font-normal text-lg">{{ detalles.precio }}</h3>
              </label>
              <label class="flex flex-nowrap m-2">
                <h2 class="font-bold text-lg mr-2">Tipo:</h2>
                <h3 class="font-normal text-lg">{{ detalles.tipo }}</h3>
              </label>
            </div>
          </div>

          <div class="flex flex-col w-full p-3 pt-0 ">
            <span class="text-xl text-center w-full mb-2 p-2 border-b-2 border-gray-300">
              Ingredientes</span>
            <div class="max-h-64 overflow-auto">

              <div class="" v-for="ingre in detalles.ingredientes">
                <div class="flex justify-between md:flex-row flex-col border-b-2 border-gray-600">

                  <label class="flex flex-nowrap m-2">
                    <h2 class="font-bold text-lg mr-2">Nombre:</h2>
                    <h3 class="font-normal text-lg">{{ ingre.producto.nombre }}</h3>
                  </label>
                  <label class="flex flex-nowrap m-2">
                    <h2 class="font-bold text-lg mr-2">Cantidad:</h2>
                    <h3 class="font-normal text-lg">{{ ingre.cantidad }}</h3>
                  </label>
                  <label class="flex flex-nowrap m-2">
                    <h2 class="font-bold text-lg mr-2">Medida:</h2>
                    <h3 class="font-normal text-lg">{{ ingre.producto.medida }}</h3>
                  </label>
                </div>
              </div>

              
            </div>
          </div>

        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>

  </div>

</template>

<script>

import "firebase/auth";
import db from "../../../firebase/firebaseInit"
import FormularioUsuarios from '../../forms/FormularioUsuarios.vue';


export default {

  data() {
    return {
      cocina: [
        {
          nombre: "juan",
          precio: 55,
          tipo: "awa",
          ingredientes: [
            {
              producto: { nombre: "queso" },
              cantidad: 5
            }
          ],
          comentario: "riko"
        },
      ],
      detalles: {}
    };
  },
  components: {
    FormularioUsuarios,
  },
  async created() {
    const dataBase = await db.collection('platillos');
    const dbResults = await dataBase.get();
    console.log(dbResults)
    dbResults.forEach(async (doc) => {
      //for (const doc of dbResults) {
      const data = {
        nombre: doc.data().nombre,
        precio: doc.data().precio,
        tipo: doc.data().tipo,
        ingredientes: await this.ingredientes(doc.data().ingredientes),
        comentario: doc.data().comentario,
      }
      this.cocina.push(data)
    })
  },
  methods: {
    async ingredientes(datos) {
      const auxIng = [];

      for (const ing of datos) {
        try {
          const dat = db.collection('productos').doc(ing.producto);
          const result = await dat.get();
          console.log(result.data());

          if (result.exists) {
            const ingrediente = { producto: result.data(), cantidad: ing.cantidad };
            auxIng.push(ingrediente);
          } else {
            console.log(`El documento con ID ${ing.producto} no existe.`);
          }
        } catch (error) {
          console.error(`Error al obtener datos para ID ${ing.producto}:`, error);
        }
      }

      console.log(auxIng)

      return auxIng;
    },
    nuevoDetalle(item) {
      this.detalles = item;
    }
  }


}
</script>

<style></style>
