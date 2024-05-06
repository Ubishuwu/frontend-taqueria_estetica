<template>

    <div class="flex flex-col lg:max-h-[calc(100vh-3rem)] max-h-[calc(100vh-8rem)] overflow-none">

        <div class="flex sm:flex-row flex-col justify-between items-center">

            <form class="flex md:flex-nowrap flex-wrap items-center justify-center">
                <label class="form-control w-full max-w-xs mr-2">
                    <div class="label">
                        <span class="label-text">Sucursal</span>
                    </div>
                    <select v-model="filtro" @change="filtroOrden" class="select select-sm select-bordered">
                        <option>Todos</option>
                        <option>Taqueria El TaquerITO</option>
                        <option>Estetica El cortITO</option>
                    </select>
                </label>
                <label class="form-control w-full max-w-xs mr-2">
                    <div class="label">
                        <span class="label-text">Rol</span>
                    </div>
                    <select v-model="roles" @change="filtroOrden" class="select select-sm select-bordered">
                        <option>Todos</option>
                        <option>Gerente General</option>
                        <option>Gerente Taqueria</option>
                        <option>Gerente Barberia</option>
                        <option>Empleado</option>
                    </select>
                </label>
                <label class="form-control w-full max-w-xs mr-2">
                    <div class="label">
                        <span class="label-text">Ordenar por</span>
                    </div>
                    <select v-model="orden" @change="filtroOrden" class="select select-sm select-bordered">
                        <option>Nombre</option>
                        <option>Edad mayor a menor</option>
                        <option>Edad menor a mayor</option>
                        <option>Sucursal</option>
                    </select>
                </label>

            </form>
                <button class="btn btn-outline btn-success mt-5" onclick="formulario.showModal()">Registar Usuario</button>
        </div>

        <!---Tabla-->
        <div class="mt-5 overflow-auto h-[calc(100vh-theme('spacing.7'))] min-h-72">
            <table class="table border-collapse">
                <!-- head -->
                <thead class="sticky z-10 top-0 bg-gray-100">
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th class="hidden md:table-cell ">Correo</th>
                        <th class="hidden sm:table-cell ">Sucursal</th>
                        <th class="hidden lg:table-cell ">Rol</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody class="">
                    <tr v-for="(user, index) in empleados" :key="user.correo">
                        <td>{{ index + 1 }}</td>
                        <td>
                            <div class="flex items-center gap-3">
                                <div class="avatar">
                                    <div class="mask mask-squircle w-12 h-12 ">
                                        <img v-if="user.imagen" class="h-8 w-8 rounded-full object-cover "
                                            :src="user.imagen" alt="">
                                        <img v-else :src="'../src/assets/user.png'" alt="Avatar Tailwind CSS Component"
                                            class="" />

                                    </div>
                                </div>
                                <div>
                                    <div class="font-bold">{{ user.nombre }}</div>
                                    <div class="hidden md:block text-sm opacity-50">{{ user.apellido }}</div>
                                    <div class="md:hidden text-sm opacity-50">{{ user.correo }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="hidden md:table-cell ">{{ user.correo }}</td>

                        <td class="hidden sm:table-cell ">
                            <div class="badge badge-success">
                                <p class="text-white">{{ user.sucursal }}</p>
                            </div>
                            <p class="opacity-80 lg:hidden">{{ user.rol }}</p>
                        </td>

                        <td class="hidden lg:table-cell ">{{ user.rol }}</td>
                        <th>
                            <button class="btn btn-ghost btn-xs " onclick="detalle.showModal()"
                                @click="nuevoDetalle(user)">Detalles</button>
                        </th>
                        <td>
                            <button class="btn btn-error btn-xs" @click="eliminar(user)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!---VIsta de detalles-->
        <dialog id="detalle" class="modal w-4/5 ">
            <div class="absolute overflow-hidden rounded-xl bg-slate-100 p-5 md:w-[100vh] w-full">
                <div class="flex flex-col w-full">
                    <div class="flex flex-col w-full p-3">

                        <span class="text-xl text-center w-full mb-2 p-2 border-b-2 border-gray-300">Datos
                            Personales</span>
                        <div class="flex justify-between md:flex-row flex-col">

                            <label class="flex flex-nowrap m-2">
                                <h2 class="font-bold text-lg mr-2">Nombre:</h2>
                                <h3 class="font-normal text-lg">{{ detalles.nombre }} {{ detalles.apellido }}</h3>
                            </label>
                            <label class="flex flex-nowrap m-2">
                                <h2 class="font-bold text-lg mr-2">User:</h2>
                                <h3 class="font-normal text-lg">{{ detalles.user }}</h3>
                            </label>
                            <label class="flex flex-nowrap m-2">
                                <h2 class="font-bold text-lg mr-2">Edad:</h2>
                                <h3 class="font-normal text-lg">{{ detalles.edad }}</h3>
                            </label>
                        </div>
                        <div class="flex justify-between md:flex-row flex-col">

                            <label class="flex flex-nowrap m-2">
                                <h2 class="font-bold text-lg mr-2">Correo:</h2>
                                <h3 class="font-normal text-lg">{{ detalles.correo }}</h3>
                            </label>
                            <label class="flex flex-nowrap m-2">
                                <h2 class="font-bold text-lg mr-2">Telefono:</h2>
                                <h3 class="font-normal text-lg">{{ detalles.telefono }}</h3>
                            </label>
                        </div>
                    </div>

                    <div class="flex flex-col w-full p-3 pt-0">
                        <span class="text-xl text-center w-full mb-2 p-2 border-b-2 border-gray-300">
                            Datos Laborales</span>
                        <div class="flex justify-between md:flex-row flex-col">

                            <label class="flex flex-nowrap m-2">
                                <h2 class="font-bold text-lg mr-2">Rol:</h2>
                                <h3 class="font-normal text-lg">{{ detalles.rol }}</h3>
                            </label>
                            <label class="flex flex-nowrap m-2">
                                <h2 class="font-bold text-lg mr-2">Sucursal:</h2>
                                <h3 class="font-normal text-lg">{{ detalles.sucursal }}</h3>
                            </label>
                        </div>
                        <div class="flex justify-between md:flex-row flex-col">
                            <label class="flex flex-nowrap m-2">
                                <h2 class="font-bold text-lg mr-2">Horario:</h2>
                                <h3 class="font-normal text-lg">{{ detalles.hora_inicio }} a {{ detalles.hora_fin }}
                                </h3>
                            </label>
                        </div>
                        <div class="flex justify-between md:flex-row flex-col">
                            <label class="flex flex-nowrap m-2">
                                <h2 class="font-bold text-lg mr-2">Dias:</h2>
                                <h3 class="font-normal text-lg">{{ detalles.dias }}</h3>
                            </label>
                            <label class="flex flex-nowrap m-2">
                                <h2 class="font-bold text-lg mr-2">Sueldo:</h2>
                                <h3 class="font-normal text-lg">{{ detalles.sueldo }}</h3>
                            </label>
                        </div>
                    </div>

                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>

        <!---Auxiliar para testear formularios-- pasar proximamente a un modal--->
        <dialog id="formulario" class="modal max-w-96">
            <div class="relative h-5/6 overflow-y-auto overscroll-auto rounded-l-xl sm:w-4/6 w-full scroll-estilo">
                <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <FormularioUsuarios />
            </div>
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
            empleados: [],
            empleadosCopia: [],
            detalles: {},
            roles: "Todos",
            filtro: "Todos",
            orden: "Nombre",

        };
    },
    components: {
        FormularioUsuarios,
    },
    async created() {
        const dataBase = await db.collection('empleado');
        const dbResults = await dataBase.get();
        console.log(dbResults)
        dbResults.forEach((doc) => {
            const data = {
                nombre: doc.data().nombre,
                apellido: doc.data().apellido,
                edad: doc.data().edad,
                correo: doc.data().email,
                telefono: doc.data().telefono,
                user: doc.data().userName,
                hora_inicio: doc.data().horario.horaDeEntrada,
                hora_fin: doc.data().horario.horaDeSalida,
                dias: doc.data().horario.dias.toString(),
                rol: doc.data().rol,
                sueldo: doc.data().sueldo,
                sucursal: doc.data().sucursal,
                imagen: doc.data().imagen,
                id: doc.id,
            }
            this.empleados.push(data);
            this.empleadosCopia = this.empleados;
        })
    },
    methods: {
        nuevoDetalle(item) {
            this.detalles = item;
        },

        eliminar(user) {
            console.log(user.id)

            if (user.imagen) {

                const imagenRef = firebase.storage().refFromURL(user.imagen);

                imagenRef.delete().then(() => {
                    console.log("Imagen borrada");
                }).catch((error) => {
                    console.error("Error al borrar la imagen: ", error);
                });
            } else {
                console.log("No hay imagen para borrar");

            }

            firebase.firestore().collection('empleado').doc(user.id).delete()
                .then(() => {
                    console.log('Documento eliminado correctamente');
                })
                .catch((error) => {
                    console.error('Error al eliminar el documento:', error);
                });


            location.reload(true);
        },

        ordenar(opcion) {
            if (opcion === 'Nombre') {
                this.empleados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            } else if (opcion === 'Sucursal') {
                this.empleados.sort((a, b) => a.sucursal.localeCompare(b.sucursal));
            } else if (opcion === 'Edad menor a mayor') {
                this.empleados.sort((a, b) => a.edad - b.edad);
            } else if (opcion === 'Edad mayor a menor') {
                this.empleados.sort((a, b) => b.edad - a.edad);
            }

            this.$forceUpdate();
        },
        filtrar(opcion) {
            if (opcion == "Todos") {
                this.empleados = this.empleadosCopia;
            } else if (opcion == "Taqueria El TaquerITO") {
                this.empleados = this.empleados.filter(elemento => elemento.sucursal === "Taqueria" || elemento.rol === "Gerente General");
            } else if (opcion == "Estetica El cortITO") {
                this.empleados = this.empleados.filter(elemento => elemento.sucursal === "Barberia" || elemento.rol === "Gerente General");
            }
        },

        rolChange(opcion) {
            if (opcion != "Todos")
                this.empleados = this.empleados.filter(elemento => elemento.rol == opcion);
        },
        filtroOrden() {
            this.empleados = this.empleadosCopia;
            this.empleadosCopia = this.empleados;
            this.filtrar(this.filtro);
            this.rolChange(this.roles);
            this.ordenar(this.orden);

        }
    }


}

</script>

<style></style>
