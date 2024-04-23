<template>
    <div class="border border-1 border-r-0 border-accent bg-neutral ">
        <form class="flex flex-col justify-center items-center p-3 m-2 ">
            <h1 class="text-2xl font-semibold ">Nuevo Usuario</h1>

            <!---Datos personales-->
            <div class="relative flex flex-col items-center justify-center m-5 p-4 w-full bg-neutral">

                <div class="bg-neutral absolute top-0 left-20 z-40 p-1 px-8 rounded-xl border-2 border-primary">
                    <h1 class="text-xl font-mono font-medium">Datos Personales</h1>
                </div>

                <div
                    class="flex flex-col border border-1 border-primary p-4 shadow-sm shadow-gray-500 justify-center w-full bg-primary rounded-md">

                    <div class="flex flex-col md:flex-row w-full mt-2">
                        <label class="flex flex-col w-full p-2">
                            <span class=" font-sans text-md text-gray-200 mb-1">Nombre(s):</span>
                            <input type="text" placeholder="Nombre(s)" class="input input-bordered input-sm w-full"
                                id="name" v-model="name" />
                            <span v-if="enviado && !validName"
                                class="font-mono text-sm text-red-500 text-right">Nombre(s) Requerido,
                                Verifiquelo</span>
                        </label>

                        <label class="flex flex-col w-full p-2">
                            <span class=" font-sans text-md text-gray-200 mb-1">Apellido(s):</span>
                            <input type="text" placeholder="Apellido(s)" class="input input-bordered input-sm w-full"
                                id="lastname" v-model="lastname" />
                            <span v-if="enviado && !validLastName"
                                class="font-mono text-sm text-red-500 text-right">Apellido(s) Requerido,
                                Verifiquelo</span>
                        </label>

                    </div>

                    <div class="flex flex-col md:flex-row flex-nowrap    w-full">
                        <label class="flex flex-col w-full p-2">
                            <span class=" font-sans text-md text-gray-200 mb-1">Edad:</span>
                            <input type="number" placeholder="00" class="input input-bordered input-sm w-full" id="edad"
                                v-model="edad" />
                            <span v-if="enviado && !validEdad" class="font-mono text-sm text-red-500 text-right">Edad no
                                valida,
                                Verifiquela</span>
                        </label>

                        <label class="flex flex-col w-full p-2">
                            <span class=" font-sans text-md text-gray-200 mb-1">Genero:</span>
                            <!---modificar a un select-->
                            <div class="flex ">
                                <label class="p-2 flex items-center grow">
                                    <input type="radio" name="radio-1" class="radio radio-primary bg-accent" checked />
                                    <span class=" font-sans text-md text-gray-200 mb-1 ml-1">No Binario</span>
                                </label>
                                <label class="p-2 flex items-center grow">
                                    <input type="radio" name="radio-1" class="radio radio-primary bg-accent" />
                                    <span class=" font-sans text-md text-gray-200 mb-1 ml-1">Mujer</span>
                                </label>
                                <label class="p-2 flex items-center grow">
                                    <input type="radio" name="radio-1" class="radio radio-primary bg-accent" />
                                    <span class=" font-sans text-md text-gray-200 mb-1 ml-1">Hombre</span>
                                </label>
                            </div>
                        </label>
                    </div>

                    <div>
                        <label class="flex flex-col w-full p-2">
                            <span class=" font-sans text-md text-gray-200 mb-1">Telefono:</span>
                            <input type="number" placeholder="000-000-00-00"
                                class="input input-bordered input-sm w-full" id="telefono" v-model="telefono" />
                            <span v-if="enviado && !validTelefono"
                                class="font-mono text-sm text-red-500 text-right">Telefono no valido,
                                Verifiquelo</span>
                        </label>

                        <label class="flex flex-col w-full p-2">
                            <span class=" font-sans text-md text-gray-200 mb-1">Correo ELectronico:</span>
                            <input type="email" placeholder="example@example.com"
                                class="input input-bordered input-sm w-full" id="correo" v-model="correo" />
                            <span v-if="enviado && !validCorreo"
                                class="font-mono text-sm text-red-500 text-right">Correo no valido,
                                Verifiquelo</span>
                        </label>
                    </div>

                </div>
            </div>


            <div class="relative flex flex-col items-center justify-center m-5 mt-0 p-4 w-full bg-neutral">

                <div class="bg-neutral absolute top-0 left-20 z-40 p-1 px-8 rounded-xl border-2 border-primary">
                    <h1 class="text-xl font-mono font-medium">Datos del Empleado</h1>
                </div>

                <div
                    class="flex flex-col border border-1 border-primary p-4 shadow-sm shadow-gray-500 justify-center w-full bg-primary rounded-md">

                    <label class="flex flex-col w-full mt-2 p-2">
                        <span class=" font-sans text-md text-gray-200 mb-1">Usuario:</span>
                        <input type="text" placeholder="user" class="input input-bordered input-sm w-full" id="user"
                            v-model="user" />
                        <span v-if="enviado && !validUser" class="font-mono text-sm text-red-500 text-right">Usuario
                            Requerido,
                            Verifiquelo</span>
                    </label>

                    <div class="flex flex-col md:flex-row w-full">
                        <label class="flex flex-col w-full p-2">
                            <span class=" font-sans text-md text-gray-200 mb-1">Contraseña:</span>
                            <input type="password" placeholder="Password" class="input input-bordered input-sm w-full"
                                id="password" v-model="password" />
                            <span v-if="enviado && !validPassword"
                                class="font-mono text-sm text-red-500 text-right">Contraseña Requerida,
                                Verifiquela</span>
                        </label>

                        <label class="flex flex-col w-full p-2">
                            <span class=" font-sans text-md text-gray-200 mb-1">Confirmar Contraseña:</span>
                            <input type="password" placeholder="Password" class="input input-bordered input-sm w-full"
                                id="passwordv" v-model="passwordv" />
                            <span v-if="enviado && !validPasswordv"
                                class="font-mono text-sm text-red-500 text-right">Contraseña Requerida,
                                Verifiquela</span>
                        </label>

                    </div>
                    <div class="flex flex-col w-full p-2 mt-2 border border-1 border-white rounded-xl justify-center">
                        <span class=" font-sans text-xl text-gray-200 m-1">Horario:</span>
                        <div class="flex flex-col xl:flex-row w-full p-2">
                            <label class="flex flex-row p-2">
                                <span class=" font-sans text-sm text-gray-200 m-1">Dias:</span>
                                <div class="flex flex-row flex-nowrap">
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" />
                                        <span class="font-sans text-sm text-gray-200 m-1">L</span>
                                    </label>
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" />
                                        <span class="font-sans text-sm text-gray-200 m-1">M</span>
                                    </label>
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" />
                                        <span class="font-sans text-sm text-gray-200 m-1">M</span>
                                    </label>
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" />
                                        <span class="font-sans text-sm text-gray-200 m-1">J</span>
                                    </label>
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" />
                                        <span class="font-sans text-sm text-gray-200 m-1">V</span>
                                    </label>
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" />
                                        <span class="font-sans text-sm text-gray-200 m-1">S</span>
                                    </label>
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" />
                                        <span class="font-sans text-sm text-gray-200 m-1">D</span>
                                    </label>
                                </div>
                                <span v-if="enviado && !validDias"
                                    class="font-mono text-sm text-red-500 text-right">Dias requeridos,
                                    Verifiquela</span>
                            </label>

                            <label class="flex sm:flex-row flex-col p-2 ">
                                <span class=" font-sans text-sm text-gray-200 m-1">Hora Inicio:</span>

                                <input type="time" placeholder="Horas" class="input input-bordered input-sm " id="horai"
                                    v-model="horai" />
                                <span class=" font-sans text-sm text-gray-200 m-1">Hora Fin:</span>

                                <input type="time" placeholder="Horas" class="input input-bordered input-sm " id="horaf"
                                    v-model="horaf" />
                                <span v-if="enviado && !validHora"
                                    class="font-mono text-sm text-red-500 text-right">Horas requeridos</span>
                            </label>
                        </div>

                    </div>
                    <div class="flex flex-col sm:flex-row w-full p-2 mt-2">

                        <label class="flex flex-col w-full m-2 p-2 ">
                            <div class="flex md:flex-row flex-col">

                                <span class="font-sans text-md text-gray-200 m-1">Rol:</span>
                                <select class="select select-bordered select-sm w-full" id="rol" v-model="rol">
                                    <option>Cajero</option>
                                    <option>Gerente</option>
                                    <option>Dueño</option>
                                </select>
                            </div>
                            <span v-if="enviado && !validRol || true"
                                class="font-mono text-sm text-red-500 text-right">Rol
                                Requerido</span>
                        </label>

                        <label class="flex xl:flex-row flex-col w-full mt-2 p-2">
                            <span class=" font-sans text-md text-gray-200 m-1">Sueldo(por Hora):</span>
                            <input type="" placeholder="00.00" class="input input-bordered input-sm " id="sueldo"
                                v-model="sueldo" />
                            <span v-if="enviado && !validSueldo"
                                class="font-mono text-sm text-red-500 text-right">Sueldo
                                Requerido,
                                Verifiquelo</span>
                        </label>
                    </div>
                </div>
            </div>

            <input type="submit" value="Guardar" class="btn btn-md w-1/4 hover:btn-success hover:text-secondary" />
        </form>
    </div>
</template>

<script>

import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            personal: {
                name: "",
                lastname: "",
                edad: 0,
                correo: "",
                telefono: 0,
            },
            empleado: {
                user: "",
                password: "",
                horai: 0,
                haraf: 0,
                sueldo: 0.0,
                rol: ""
            },
            enviado: false,
        }
    },
    validations: {
        user: { required },
        password: { required, minLength: minLength(5) }
    },
    methods: {
        async validar() {
            const isFormCorrect = await this.v$.$validate()
            this.enviado = true;

            this.validPassword = await this.v$.password.$validate()
            this.validUser = await this.v$.user.$validate()

            ///console.log(this.validPassword)

            if (!isFormCorrect) {
                console.log("error...");
                return;
            }
            console.log('Formulario válido. Enviando...');
            ///proceso para enviar y redirigir a la pagina owo
            this.$router.push('/');
        }
    }
}
</script>