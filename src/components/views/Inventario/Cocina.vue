<template>
  <div class="flex flex-col lg:max-h-[calc(100vh-3rem)] max-h-[calc(100vh-8rem)] overflow-none">

    <div class="flex sm:flex-row flex-col justify-between items-center">

      <form class="flex sm:flex-nowrap flex-wrap">
        <label class="form-control w-full max-w-xs mr-2">
          <div class="label">
            <span class="label-text">Tipo</span>
          </div>
          <select v-model="filtro" @change="filtroOrden" class="select select-sm select-bordered">
            <option>Todos</option>
            <option>Bebida</option>
            <option>Comida</option>
            <option>Postre</option>
            <option>Otro</option>
          </select>
        </label>
        <label class="form-control w-full max-w-xs mr-2">
          <div class="label">
            <span class="label-text">Ordenar por</span>
          </div>
          <select v-model="orden" @change="filtroOrden" class="select select-sm select-bordered">
            <option>Nombre</option>
            <option>Precio mayor a menor</option>
            <option>Precio menor a mayor</option>
            <option>Tipo</option>
          </select>
        </label>

      </form>
      <a class="btn btn-outline btn-success mt-5" href="/create-platillo">Crear Platillo</a>
    </div>

    <!---Tabla-->
    <div class="mt-5 overflow-auto h-[calc(100vh-theme('spacing.7'))] min-h-72">
      <table class="table border-collapse">
        <!-- head -->
        <thead class="sticky z-10 top-0 bg-gray-100">
          <tr>
            <th>Nombre</th>
            <th class="hidden min-[520px]:table-cell ">Precio</th>
            <th class="hidden min-[520px]:table-cell ">Tipo</th>
            <th class="hidden sm:table-cell ">Ingredientes</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody class="">
          <tr v-for="plat in cocina" :key="plat.nombre">
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img v-if="plat.imagen" class="h-8 w-8 rounded-full object-cover " :src="plat.imagen" alt="">
                    <img v-else :src="`../src/assets/${plat.tipo}.png`" alt="Avatar Tailwind CSS Component" class="" />
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
            <td class="hidden sm:table-cell ">
              <button class="btn btn-ghost btn-xs " onclick="detalle.showModal()"
                @click="nuevoDetalle(plat)">Detalles</button>
            </td>
            <td>
              <button class="btn btn-error btn-xs" @click="eliminar(plat)">Eliminar</button>
            </td>

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
import firebase from "firebase/app";


export default {

  data() {
    return {
      cocina: [],
      cocinaCopia:[],
      detalles: {},
      orden: "Nombre",
      filtro: "Todos",
    };
  },
  components: {
    FormularioUsuarios,
  },
  async created() {
    const dataBase = await db.collection('platillos');
    const dbResults = await dataBase.get();
    //console.log(dbResults.docs)
    dbResults.forEach(async (doc) => {
      const data = {
        nombre: doc.data().nombre,
        precio: doc.data().precio,
        tipo: doc.data().tipo,
        ingredientes: await this.ingredientes(doc.data().ingredientes),
        comentario: doc.data().comentario,
        imagen: doc.data().imagen,
        id: doc.id,
      }
      //console.log(data)
      this.cocina.push(data)
      this.cocinaCopia=this.cocina;
    })
  },
  methods: {
    async ingredientes(datos) {
      const auxIng = [];
      //console.log(datos);
      for (const ing of datos) {
        try {
          const dato = await ing.producto.get();
          if (dato.exists) {
            //const ingrediente = { producto: result.data(), cantidad: ing.cantidad};
            const ingrediente = { producto: dato.data(), cantidad: ing.cantidad };
            auxIng.push(ingrediente);
          } else {
            console.log(`El documento con ID ${ing.producto} no existe.`);
          }
        } catch (error) {
          console.error(`Error al obtener datos para ID ${ing.producto}:`, error);
        }
      }

      //console.log(auxIng)

      return auxIng;
    },
    nuevoDetalle(item) {
      this.detalles = item;
    },
    eliminarPlatillo(nombrePlatillo) {
      db.collection('platillos').where('nombre', '==', nombrePlatillo).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const imagenRef = firebase.storage().refFromURL(doc.data().imagen);
            imagenRef.delete().then(() => {
              console.log("Imagen borrada");
            }).catch((error) => {
              console.error("Error al borrar la imagen: ", error);
            });

            doc.ref.delete().then(() => {
              console.log("Platillo borrado exitosamente");
            }).catch((error) => {
              console.error("Error al eliminar el platillo:", error);
            });
          });
        })
        .catch((error) => {
          console.error("Error al eliminar el platillo: ", error);
        });

      location.reload(true);
    },

    eliminar(plat) {
      //console.log(serv.id)

      if (plat.imagen) {

        const imagenRef = firebase.storage().refFromURL(plat.imagen);

        imagenRef.delete().then(() => {
          console.log("Imagen borrada");
        }).catch((error) => {
          console.error("Error al borrar la imagen: ", error);
        });
      } else {
        console.log("No hay imagen para borrar");

      }

      firebase.firestore().collection('platillos').doc(plat.id).delete()
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
      if (opcion === 'Nombre') {
        this.cocina.sort((a, b) => a.nombre.localeCompare(b.nombre));
      } else if (opcion === 'Tipo') {
        this.cocina.sort((a, b) => a.tipo.localeCompare(b.tipo));
      } else if (opcion === 'Precio menor a mayor') {
        this.cocina.sort((a, b) => a.precio - b.precio);
      } else if (opcion === 'Precio mayor a menor') {
        this.cocina.sort((a, b) => b.precio - a.precio);
      }

      this.$forceUpdate();
    },
    filtrar(opcion) {
      if (opcion == "Todos") {
        this.cocina = this.cocinaCopia;
      } else 
        this.cocina = this.cocina.filter(elemento => elemento.tipo === opcion);
      
    },

    filtroOrden() {
      this.cocina = this.cocinaCopia;
      this.cocinaCopia= this.cocina;
      this.filtrar(this.filtro);
      this.ordenar(this.orden);

    }
  }


}
</script>

<style></style>
