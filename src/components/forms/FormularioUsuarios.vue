<template>
    <div class="border border-1 border-r-0 border-accent bg-neutral ">
        <form @submit.prevent="validar" class="flex flex-col justify-center items-center p-3 m-2 ">
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
                                v-model="name" />
                            <span v-if="enviado && v$.name.$error"
                                class="font-mono text-sm text-red-500 text-right">Nombre(s) Requerido,
                                Verifiquelo</span>
                        </label>

                        <label class="flex flex-col w-full p-2">
                            <span class=" font-sans text-md text-gray-200 mb-1">Apellido(s):</span>
                            <input type="text" placeholder="Apellido(s)" class="input input-bordered input-sm w-full"
                                id="lastname" v-model="lastname" />
                            <span v-if="enviado && v$.lastname.$error"
                                class="font-mono text-sm text-red-500 text-right">Apellido(s) Requerido,
                                Verifiquelo</span>
                        </label>

                    </div>

                    <div class="flex flex-col md:flex-row flex-nowrap    w-full">
                        <label class="flex flex-col w-full p-2">
                            <span class=" font-sans text-md text-gray-200 mb-1">Edad:</span>
                            <input type="number" placeholder="00" class="input input-bordered input-sm w-full" id="edad"
                                v-model="edad" />
                            <span v-if="enviado && v$.edad.$error"
                                class="font-mono text-sm text-red-500 text-right">Edad no
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
                            <span v-if="enviado && v$.telefono.$error"
                                class="font-mono text-sm text-red-500 text-right">Telefono no valido,
                                Verifiquelo</span>
                        </label>

                        <label class="flex flex-col w-full p-2">
                            <span class=" font-sans text-md text-gray-200 mb-1">Correo ELectronico:</span>
                            <input type="email" placeholder="example@example.com"
                                class="input input-bordered input-sm w-full" id="correo" v-model="correo" />
                            <span v-if="enviado && v$.correo.$error"
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
                        <span v-if="enviado && v$.user.$error" class="font-mono text-sm text-red-500 text-right">Usuario
                            Requerido,
                            Verifiquelo</span>
                    </label>

                    <div class="flex flex-col md:flex-row w-full">
                        <label class="flex flex-col w-full p-2">
                            <span class=" font-sans text-md text-gray-200 mb-1">Contraseña:</span>
                            <input type="password" placeholder="Password" class="input input-bordered input-sm w-full"
                                id="password" v-model="password" />
                            <span v-if="enviado && v$.password.$error"
                                class="font-mono text-sm text-red-500 text-right">Contraseña Requerida,
                                Verifiquela</span>
                        </label>
                        <!----
                        <label class="flex flex-col w-full p-2">
                            <span class=" font-sans text-md text-gray-200 mb-1">Confirmar Contraseña:</span>
                            <input type="password" placeholder="Password" class="input input-bordered input-sm w-full"
                                id="passwordv" v-model="passwordv" />
                            <span v-if="enviado && v$.passwordv.$error"
                                class="font-mono text-sm text-red-500 text-right">Contraseña Requerida,
                                Verifiquela</span>
                            </label>
                        -->
                    </div>
                    <div class="flex flex-col w-full p-2 mt-2 border border-1 border-white rounded-xl justify-center">
                        <span class=" font-sans text-xl text-gray-200 m-1">Horario:</span>
                        <div class="flex flex-col xl:flex-row w-full p-2">
                            <label class="flex flex-row p-2">
                                <span class=" font-sans text-sm text-gray-200 m-1">Dias:</span>
                                <div class="flex flex-row flex-nowrap">
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" v-model="dias"
                                            value="lunes" />
                                        <span class="font-sans text-sm text-gray-200 m-1">L</span>
                                    </label>
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" v-model="dias"
                                            value="martes" />
                                        <span class="font-sans text-sm text-gray-200 m-1">M</span>
                                    </label>
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" v-model="dias"
                                            value="miercoles" />
                                        <span class="font-sans text-sm text-gray-200 m-1">M</span>
                                    </label>
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" v-model="dias"
                                            value="jueves" />
                                        <span class="font-sans text-sm text-gray-200 m-1">J</span>
                                    </label>
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" v-model="dias"
                                            value="viernes" />
                                        <span class="font-sans text-sm text-gray-200 m-1">V</span>
                                    </label>
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" v-model="dias"
                                            value="sabado" />
                                        <span class="font-sans text-sm text-gray-200 m-1">S</span>
                                    </label>
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" v-model="dias"
                                            value="domingo" />
                                        <span class="font-sans text-sm text-gray-200 m-1">D</span>
                                    </label>
                                </div>
                                <span v-if="enviado && !validDias"
                                    class="font-mono text-sm text-red-500 text-right">Dias requeridos,
                                    Verifiquela</span>
                            </label>

                            <label class="flex flex-col p-2 items-start ">
                                <div class="flex md:flex-row flex-col items-center justify-between">
                                    <span class=" font-sans text-sm text-gray-200 m-1">Hora Inicio:</span>

                                    <input type="time" placeholder="Horas" class="input input-bordered input-sm "
                                        id="horai" v-model="horai" />
                                    <span class=" font-sans text-sm text-gray-200 m-1">Hora Fin:</span>

                                    <input type="time" placeholder="Horas" class="input input-bordered input-sm "
                                        id="horaf" v-model="horaf" />

                                </div>
                                <span v-if="enviado && validHora"
                                    class="font-mono text-sm text-red-500 text-right pt-2">
                                    La hora es requerida.
                                </span>

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
                            <span v-if="enviado && v$.rol.$error" class="font-mono text-sm text-red-500 text-right">Rol
                                Requerido</span>
                        </label>

                        <label class="flex xl:flex-row flex-col w-full mt-2 p-2">
                            <span class=" font-sans text-md text-gray-200 m-1">Sueldo(por Hora):</span>
                            <input type="text" v-model="sueldo" placeholder="00.00" @input="validateFloat"
                                class="input input-bordered input-sm" />
                            <span v-if="enviado && v$.sueldo.$error"
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
import { required, minLength, maxLength, minValue, maxValue, alpha, decimal, email, sameAs, helpers, numeric } from '@vuelidate/validators'

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            name: "",
            lastname: "",
            edad: null,
            correo: "",
            telefono: null,
            user: "",
            password: "",
            // passwordv: "",
            horai: 0,
            horaf: 0,
            sueldo: '',
            rol: "",
            dias: [],
            enviado: false,
            /*
                        validName: true,
                        validLastName: true,
                        validEdad: true,
                        validCorreo: true,
                        validTelefono: true,
                        validUser: true,
                        validPassword: true,
                        //validPasswordv: true,
                        validHora: true,
                        validHoraf: true,
                        validSueldo: true,
                        validRol: true,
                        */
            validDias: true,
            validHora: true,
        }
    },
    validations: {
        name: { required, alpha },
        lastname: { required, alpha },
        edad: { required, numeric, minValue: minValue(18), maxValue: maxValue(100) },
        correo: { email },
        telefono: { numeric, maxLength: maxLength(10), minLength: minLength(10) },
        user: { required },
        password: { required, minLength: minLength(5) },
        //passwordv: { required, minLength: minLength(5), sameAsPassword: sameAs(() => passwordval()) },
        horaf: { required },
        horai: { required },
        sueldo: { required, decimal },
        rol: { required },

    },
    methods: {
        async validar() {
            const isFormCorrect = await this.v$.$validate()
            this.enviado = true;

            this.validarDatos();
            if (!isFormCorrect || this.validHora || !this.validDias) {
                console.log("error...");
                console.log("errores:");
                console.log(this.v$.$errors);
                console.log(this.validHora);
                console.log(this.validDias)

                return;
            }
            console.log('Formulario válido. Enviando...');
            ///proceso para enviar y redirigir a la pagina owo// o cerrar modal(no c como xd)
            this.$router.push('/');
        },
        validateFloat(event) {
            this.sueldo = event.target.value.replace(/[^0-9.]/g, '');
        },
        async validarDatos() {
            //validar que se ingresen horas validas
            if (this.horai != 0 && this.horaf != 0) { this.validHora = false; }
            else { this.validHora = true; }

            console.log('dias:'+this.dias)
            if (this.dias.length > 0)
                this.validDias = true;
            else
                this.validDias = false;
        },
    },
}
</script>