<template>
  <div class="flex flex-col lg:max-h-[calc(100vh-3rem)] max-h-[calc(100vh-8rem)] overflow-none">

    <div class="flex sm:flex-row flex-col justify-between items-center">

      <form class="flex sm:flex-nowrap flex-wrap">
        <label class="form-control w-full max-w-xs mr-2">
          <div class="label">
            <span class="label-text">Tipo</span>
          </div>
          <select v-model="tipo" @change="filtroOrden" class="select select-sm select-bordered">
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
      <button class="btn btn-outline btn-success mt-5" onclick="my_modal_3.showModal()">Agregar Servicio</button>
    </div>
  </div>
  <dialog id="my_modal_3" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <FormularioServicio />
    </div>
  </dialog>
  <div class="overflow-x-auto mt-5">
    <table class="table">
      <!-- head -->
      <thead class="sticky z-10 top-0 bg-gray-100">
        <tr>
          <th>Nombre</th>
          <th>Tipo de Servicio</th>
          <th>Precio</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="serv in servicios">
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img v-if="serv.imagen" class="h-8 w-8 rounded-full object-cover " :src="serv.imagen" alt="">
                  <img v-else :src="`../src/assets/${serv.tipo}.png`" alt="Avatar Tailwind CSS Component" class="" />
                </div>
              </div>
              <div class="font-bold">{{ serv.nombre }}</div>
            </div>
          </td>
          <td>
            <div class="text-sm opacity-50">{{ serv.tipo }}</div>
          </td>
          <td>{{ serv.precio }}</td>
          <td>
            <button class="btn btn-neutral btn-xs" onclick="detalle.showModal()"
              @click="nuevoDetalle(serv)">Detalles</button>
          </td>
          <td>
            <button class="btn btn-error btn-xs" @click="eliminar(serv)">Eliminar</button>
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
            Productos Usados</span>
          <div class="max-h-64 overflow-auto">

            <div class="" v-for="ingre in detalles.items">
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

</template>
<script>

import firebase from "firebase/app";
import "firebase/auth";
import db from "../../../firebase/firebaseInit"

import FormularioServicio from "../../forms/FormularioServicio.vue";


export default {

  data() {
    return {
      servicios: [],
      serviciosCopia: [],
      detalles: {},
      tipo: "Todos",
      orden: "Nombre"
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
        id: doc.id,
      }
      this.servicios.push(data);
      this.serviciosCopia = this.servicios;

    })
  },
  methods: {
    nuevoDetalle(item) {
      this.detalles = item;
    },
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
    },
    eliminarServicio(nombreServicio) {
      db.collection('servicios').where('nombre', '==', nombreServicio).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().imagen) {
              const imagenRef = firebase.storage().refFromURL(doc.data().imagen);

              imagenRef.delete().then(() => {
                console.log("Imagen borrada");
              }).catch((error) => {
                console.error("Error al borrar la imagen: ", error);
              });
            }

            doc.ref.delete().then(() => {
              console.log("Servicio borrado exitosamente");
            }).catch((error) => {
              console.error("Error al eliminar el servicio:", error);
            });
          });

        })
        .catch((error) => {
          console.error("Error al eliminar el servicio: ", error);
        }).finally(async () => {
          await this.$nextTick();
          location.reload(true);
        });


    },
    eliminar(serv) {
      //console.log(serv.id)

      if (serv.imagen) {

        const imagenRef = firebase.storage().refFromURL(serv.imagen);

        imagenRef.delete().then(() => {
          console.log("Imagen borrada");
        }).catch((error) => {
          console.error("Error al borrar la imagen: ", error);
        });
      } else {
        console.log("No hay imagen para borrar");

      }

      firebase.firestore().collection('servicios').doc(serv.id).delete()
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
        this.servicios.sort((a, b) => a.nombre.localeCompare(b.nombre));
      } else if (opcion === 'Tipo') {
        this.servicios.sort((a, b) => a.tipo.localeCompare(b.tipo));
      } else if (opcion === 'Precio menor a mayor') {
        this.servicios.sort((a, b) => a.precio - b.precio);
      } else if (opcion === 'Precio mayor a menor') {
        this.servicios.sort((a, b) => b.precio - a.precio);
      }

      this.$forceUpdate();
    },
    filtrar(opcion) {
      if (opcion == "Todos") {
        this.servicios = this.serviciosCopia;
      } else
        this.servicios = this.servicios.filter(elemento => elemento.tipo === opcion);

    },

    filtroOrden() {
      this.servicios = this.serviciosCopia;
      this.serviciosCopia = this.servicios;
      this.filtrar(this.tipo);
      this.ordenar(this.orden);

    }
  }
}
</script>

<style></style>