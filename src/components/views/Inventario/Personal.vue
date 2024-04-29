<template>

    <div class="flex flex-col lg:max-h-[calc(100vh-3rem)] max-h-[calc(100vh-8rem)] overflow-none">

        <div>
            <button class="btn" onclick="formulario.showModal()">Registar Usuario</button>
        </div>

        <!---Tabla-->
        <div class="mt-5 overflow-auto h-[calc(100vh-theme('spacing.7'))]">
            <table class="table border-collapse">
                <!-- head -->
                <thead class="z-50 sticky top-0 bg-gray-100">
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Usuario</th>
                        <th>Sucursal</th>
                        <th>Rol</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody class="">
                    <tr v-for="user in empleados" :key="user.correo">
                        <td>
                            <div class="flex items-center gap-3">
                                <div class="avatar">
                                    <div class="mask mask-squircle w-12 h-12">
                                        <img :src="'../src/assets/miku.png'" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div class="font-bold">{{ user.nombre }}</div>
                                    <div class="text-sm opacity-50">{{ user.apellido }}</div>
                                </div>
                            </div>
                        </td>
                        <td>{{ user.correo }}</td>
                        <th>{{ user.user }}</th>
                        <td>
                            <div class="badge badge-success">
                                <p class="text-white">{{ user.sucursal }}</p>
                            </div>
                        </td>

                        <td>{{ user.rol }}</td>
                        <th>
                            <button class="btn btn-ghost btn-xs">Detalles</button>
                        </th>

                    </tr>
                </tbody>
            </table>
        </div>

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
            ]
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
                dias: doc.data().horario.dias,
                rol: doc.data().rol,
                sueldo: doc.data().sueldo,
                sucursal: doc.data().sucursal,
            }
            this.empleados.push(data)
        })
    }


}

</script>

<style></style>
