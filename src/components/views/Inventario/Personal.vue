<template>

    <div class="flex flex-col lg:max-h-[calc(100vh-3rem)] max-h-[calc(100vh-8rem)] overflow-none">

        <div>
            <button class="btn" onclick="formulario.showModal()">Registar Usuario</button>
        </div>

        <!---Tabla-->
        <div class="mt-5 overflow-auto h-[calc(100vh-theme('spacing.7'))] min-h-72">
            <table class="table border-collapse">
                <!-- head -->
                <thead class="sticky z-10 top-0 bg-gray-100">
                    <tr>
                        <th>Nombre</th>
                        <th class="hidden min-[520px]:table-cell ">Correo</th>
                        <th class="hidden md:table-cell ">Usuario</th>
                        <th class="hidden sm:table-cell ">Sucursal</th>
                        <th class="hidden sm:table-cell ">Rol</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody class="">
                    <tr v-for="user in empleados" :key="user.correo">
                        <td>
                            <div class="flex items-center gap-3">
                                <div class="avatar">
                                    <div class="mask mask-squircle w-12 h-12 ">
                                        <img :src="'../src/assets/miku.png'" alt="Avatar Tailwind CSS Component" class=""/>
                                    </div>
                                </div>
                                <div>
                                    <div class="font-bold">{{ user.nombre }}</div>
                                    <div class="text-sm opacity-50">{{ user.apellido }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="hidden min-[520px]:table-cell ">{{ user.correo }}</td>
                        <th class="hidden md:table-cell ">{{ user.user }}</th>
                        <td class="hidden sm:table-cell ">
                            <div class="badge badge-success">
                                <p class="text-white">{{ user.sucursal }}</p>
                            </div>
                        </td>

                        <td class="hidden sm:table-cell ">{{ user.rol }}</td>
                        <th>
                            <button class="btn btn-ghost btn-xs " onclick="detalle.showModal()"
                                @click="nuevoDetalle(user)">Detalles</button>
                        </th>

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


export default {

    data() {
        return {
            empleados: [
                {
                    nombre: "juan",
                    apellido: "perez",
                    edad: "22",
                    correo: "juanin@empresa.com",
                    telefono: 9519519551,
                    user: "juanin",
                    hora_inicio: "15:02:23 AM",
                    hora_fin: "15:02:23 AM",
                    dias: "Lunes,Martes",
                    rol: "Cocina",
                    sueldo: 54.5,
                    sucursal: "Taqueria",
                },
            ],
            detalles: {}
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
            }
            this.empleados.push(data)
        })
    },
    methods: {
        nuevoDetalle(item) {
            this.detalles = item;
        }
    }


}

</script>

<style></style>
