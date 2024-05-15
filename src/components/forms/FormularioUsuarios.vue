<template>
    <div class="border border-1 border-r-0 border-accent bg-neutral ">


        <form @submit.prevent="validar" class="flex flex-col justify-center items-center p-3 m-2 ">

            <h1 class="text-2xl font-semibold ">Nuevo Usuario</h1>

            <!---Datos personales-->
            <div class="relative flex flex-col items-center justify-center m-5 mb-0 p-4 w-full bg-neutral">

                <div class="bg-neutral absolute top-0 left-20 z-40 p-1 px-8 rounded-xl border-2 border-primary">
                    <h1 class="text-xl font-mono font-medium">Datos Personales</h1>
                </div>

                <div
                    class="flex flex-col border border-1 border-primary p-4 shadow-sm shadow-gray-500 justify-center w-full bg-primary rounded-md">

                    <div class="flex flex-col md:flex-row w-full mt-2">
                        <label class="flex flex-col w-full p-2">
                            <span class=" font-sans text-md text-gray-200 mb-1">Nombre(s):</span>
                            <input type="text" placeholder="Nombre(s)" class="input input-bordered input-sm w-full"
                                v-model="name" @blur="validarCampo('name')" @input="validarCampo('name')" />
                            <span v-if="v$.name.$error || validName"
                                class="font-mono text-sm text-red-500 text-right">Nombre(s) Requerido,
                                Verifiquelo</span>
                        </label>

                        <label class="flex flex-col w-full p-2">
                            <span class=" font-sans text-md text-gray-200 mb-1">Apellido(s):</span>
                            <input type="text" placeholder="Apellido(s)" class="input input-bordered input-sm w-full"
                                id="lastname" v-model="lastname" @blur="validarCampo('lastname')"
                                @input="validarCampo('lastname')" />
                            <span v-if="(v$.lastname.$error || validLastN)"
                                class="font-mono text-sm text-red-500 text-right">Apellido(s) Requerido,
                                Verifiquelo</span>
                        </label>

                    </div>

                    <div class="flex flex-col md:flex-row flex-nowrap    w-full">
                        <label class="flex flex-col w-full p-2">
                            <span class=" font-sans text-md text-gray-200 mb-1">Edad:</span>
                            <input type="number" placeholder="00" class="input input-bordered input-sm w-full" id="edad"
                                v-model="edad" @blur="validarCampo('edad')" @input="validarCampo('edad')" />
                            <span v-if="v$.edad.$error" class="font-mono text-sm text-red-500 text-right">Edad no
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
                                class="input input-bordered input-sm w-full" id="telefono" v-model="telefono"
                                @blur="validarCampo('telefono')" @input="validarCampo('telefono')" />
                            <span v-if="v$.telefono.$error" class="font-mono text-sm text-red-500 text-right">Telefono
                                no valido,
                                Verifiquelo</span>
                        </label>

                        <label class="flex flex-col w-full p-2">
                            <span class=" font-sans text-md text-gray-200 mb-1">Correo ELectronico:</span>
                            <input type="email" placeholder="example@example.com"
                                class="input input-bordered input-sm w-full" id="correo" v-model="correo"
                                @blur="validarCampo('correo')" @input="validarCampo('correo')" />
                            <span v-if="v$.correo.$error" class="font-mono text-sm text-red-500 text-right">Correo no
                                valido,
                                Verifiquelo</span>
                        </label>
                    </div>

                    <div class="flex flex-col md:flex-row w-full">
                        <label class="flex flex-col w-full p-2">
                            <span class=" font-sans text-md text-gray-200 mb-1">Contraseña:</span>
                            <input type="password" placeholder="Password" class="input input-bordered input-sm w-full"
                                id="password" v-model="password" @blur="validarCampo('password')"
                                @input="validarCampo('password')" />
                            <span v-if="v$.password.$error"
                                class="font-mono text-sm text-red-500 text-right">Contraseña Requerida,
                                Verifiquela</span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="m-5 mt-0" v-if="v$.name.$error && v$.correo.$error && v$.edad.$error">
                <div role="alert" class="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Datos personales incorrectos.</span>
                </div>
            </div>

            <div class="relative flex flex-col items-center justify-center m-5 mt-0 mb-0 p-4 w-full bg-neutral">


                <div class="bg-neutral absolute top-0 left-20 z-40 p-1 px-8 rounded-xl border-2 border-primary">
                    <h1 class="text-xl font-mono font-medium">Datos del Empleado</h1>
                </div>

                <div
                    class="flex flex-col border border-1 border-primary p-4 shadow-sm shadow-gray-500 justify-center w-full bg-primary rounded-md">
                    <div class="flex flex-col w-full p-2 mt-2 border border-1 border-white rounded-xl justify-center">
                        <span class=" font-sans text-xl text-gray-200 m-1">Horario:</span>
                        <div class="flex flex-col min-[1180px]:flex-row w-full p-2">
                            <div class="flex flex-row p-2">
                                <span class=" font-sans text-sm text-gray-200 m-1">Dias:</span>
                                <div class="flex flex-row flex-nowrap">
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" v-model="dias"
                                            @blur="validardias('dias')" @input="validardias('dias')" value="lunes" />
                                        <span class="font-sans text-sm text-gray-200 m-1">L</span>
                                    </label>
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" v-model="dias"
                                            @blur="validardias('dias')" @input="validardias('dias')" value="martes" />
                                        <span class="font-sans text-sm text-gray-200 m-1">M</span>
                                    </label>
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" v-model="dias"
                                            @blur="validardias('dias')" @input="validardias('dias')"
                                            value="miercoles" />
                                        <span class="font-sans text-sm text-gray-200 m-1">M</span>
                                    </label>
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" v-model="dias"
                                            @blur="validardias('dias')" @input="validardias('dias')" value="jueves" />
                                        <span class="font-sans text-sm text-gray-200 m-1">J</span>
                                    </label>
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" v-model="dias"
                                            @blur="validardias('dias')" @input="validardias('dias')" value="viernes" />
                                        <span class="font-sans text-sm text-gray-200 m-1">V</span>
                                    </label>
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" v-model="dias"
                                            @blur="validardias('dias')" @input="validardias('dias')" value="sabado" />
                                        <span class="font-sans text-sm text-gray-200 m-1">S</span>
                                    </label>
                                    <label class="label cursor-pointer flex flex-col">
                                        <input type="checkbox" class="checkbox bg-accent checkbox-info" v-model="dias"
                                            @blur="validardias('dias')" @input="validardias('dias')" value="domingo" />
                                        <span class="font-sans text-sm text-gray-200 m-1">D</span>
                                    </label>
                                </div>
                                <span v-if="!validDias" class="font-mono text-sm text-red-500 text-right">Dias
                                    requeridos,
                                    Verifiquela</span>
                            </div>

                            <div class="flex flex-col p-2 items-start ">
                                <label class="flex flex-row w-full items-center justify-between">
                                    <div class="flex md:flex-row flex-col items-center justify-between">

                                        <span class=" font-sans text-sm text-gray-200 m-1">Hora Inicio:</span>
                                        <input type="time" placeholder="Horas" class="input input-bordered input-sm "
                                            id="horai" v-model="horai" @blur="validarhora('horai')"
                                            @input="validarhora('horai')" />
                                    </div>
                                    <div class="flex md:flex-row flex-col items-center justify-between">

                                        <span class=" font-sans text-sm text-gray-200 m-1">Hora Fin:</span>

                                        <input type="time" placeholder="Horas" class="input input-bordered input-sm "
                                            id="horaf" v-model="horaf" @blur="validarhora('horaf')"
                                            @input="validarhora('horaf')" />
                                    </div>

                                </label>
                                <span v-if="v$.horai.$error || v$.horaf.$error || validHora"
                                    class="font-mono text-sm text-red-500 text-right pt-2">
                                    La hora es requerida.
                                </span>
                            </div>

                        </div>

                    </div>
                    <div class="flex flex-col  min-[1000px]:flex-row items-center justify-center w-full p-2 mt-2">

                        <div class="flex flex-col w-full">
                            <label class="flex flex-col m-2 p-2 items-center">
                                <div class="flex md:flex-row flex-col w-full">

                                    <span class="font-sans text-md text-gray-200 m-1">Rol:</span>
                                    <select class="select select-bordered select-sm grow xl-max-w-56" id="rol"
                                        v-model="rol" v-on:change.prevent="change" @blur="validarCampo('rol')"
                                        @input="validarCampo('rol')">
                                        <option>Gerente General</option>
                                        <option>Gerente de Sucursal</option>
                                        <option>Empleado</option>
                                    </select>
                                </div>
                                <span v-if="v$.rol.$error" class="font-mono text-sm text-red-500 text-right">Rol
                                    Requerido</span>
                            </label>

                            <label class=" flex flex-col items-center m-2 p-2">
                                <div class="flex md:flex-row w-full flex-col">
                                    <span class="font-sans text-md text-gray-200 m-1">Sucursal: </span>
                                    <select v-model="sucursal" class="select select-bordered select-sm grow xl:w-52"
                                        @blur="validarCampo('sucursal')" @input="validarCampo('sucursal')">
                                        <option v-if="!gerente" disabled selected>Selecciona una</option>
                                        <option v-if="gerente" selected>Todas</option>
                                        <option v-if="!gerente">Taqueria</option>
                                        <option v-if="!gerente">Barberia</option>
                                    </select>
                                </div>
                                <span v-if="v$.sucursal.$error" class="font-mono text-sm text-red-500 text-right">Rol
                                    Requerido</span>
                            </label>
                        </div>

                        <label class="flex flex-col items-center w-full m-2 p-2">
                            <div class="flex md:flex-row flex-col w-full">

                                <span class=" font-sans text-md text-gray-200 m-1">Sueldo(por Hora):</span>
                                <input type="number" v-model.number="sueldo" placeholder="00.00" v-validate="'decimal'"
                                    class="input input-bordered input-sm grow" @blur="validarCampo('sueldo')"
                                    @input="validarCampo('sueldo')" />
                            </div>
                            <span v-if="v$.sueldo.$error" class="font-mono text-sm text-red-500 text-right">Sueldo
                                Requerido,
                                Verifiquelo</span>
                        </label>
                    </div>
                </div>


            </div>

            <div class="m-5 my-0" id="alert1" v-if="v$.rol.$error">
                <div role="alert" class="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Informacion del Empleado incorrectos</span>
                </div>
            </div>

            <div class="relative flex flex-col items-center justify-center m-5 mb-0 p-4 w-full bg-neutral">

                <div class="bg-neutral absolute top-0 left-20 z-40 p-1 px-8 rounded-xl border-2 border-primary">
                    <h1 class="text-xl font-mono font-medium">Foto de Perfil</h1>
                </div>

                <div
                    class="flex flex-col border border-1 border-primary p-4 shadow-sm shadow-gray-500 justify-center w-full bg-primary rounded-md">

                    <label class="form-control w-full ">
                        <div class="label">
                            <span class=" font-sans text-md text-gray-200 m-1">Imagen</span>
                        </div>
                        <input @change="cambioImagen($event)" type="file" id="imagen" accept="image/*"
                            class="input input-bordered w-full" />
                    </label>
                </div>

            </div>

            <input @click.prevent="guardar" type="submit" value="Guardar"
                class="btn btn-md w-1/4 hover:btn-success hover:text-secondary" />
        </form>
    </div>
</template>

<script>

import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, minValue, maxValue, alpha, decimal, email, sameAs, numeric } from '@vuelidate/validators'
import { storage } from '../../firebase/firebaseInit';


import firebase from "firebase/app";
import "firebase/auth";
import db from "../../firebase/firebaseInit"
const ref = storage.ref();

const nameRegex = /^[a-zA-ZÑñÁáÉéÍíÓóÚú]{3,}(\s[a-zA-ZÑñÁáÉéÍíÓóÚú]{3,})?$/;
const lastRegex = /^[a-zA-ZÑñÁáÉéÍíÓóÚú]{3,}(\s[a-zA-ZÑñÁáÉéÍíÓóÚú]{3,})?$/;

const passRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&()_\-+={}\[\]'<>?\/~])[a-zA-Z0-9!@#$%&()_\-+={}\[\]'<>?\/~ÑñÁáÉéÍíÓóÚú]{4,}$/;

const emailRegex = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/;



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
            sucursal: "",
            dias: [],
            enviado: false,
            Imagen: "",
            validDias: true,
            validHora: false,
            validName: false,
            validLastN: false,
            gerente: false,
        }
    },
    validations: {
        name: {
            required,
            isValid(value) {
                return nameRegex.test(value);
            },
        },
        lastname: {
            required,
            isValid(value) {
                return lastRegex.test(value);
            },
        },
        edad: { required, numeric, minValue: minValue(18), maxValue: maxValue(100) },
        correo: {
            email, 
        },
        telefono: { numeric, maxLength: maxLength(10), minLength: minLength(10) ,required},
        // user: { required },
        password: {
            required, minLength: minLength(4), isValid(value) {
                return passRegex.test(value);
            },
        },
        //passwordv: { required, minLength: minLength(5), sameAsPassword: sameAs(() => passwordval()) },
        horaf: { required },
        horai: { required },
        sueldo: { decimal, required, minValue: minValue(0) },
        rol: { required },
        sucursal: { required, decimal }

    },
    methods: {
        async validar() {
            const isFormCorrect = await this.v$.$validate()
            this.enviado = true;
            this.validarDatos();
            if (!isFormCorrect || this.validHora || !this.validDias || this.validName || this.validLastN) {
                console.log("error...");
                console.log("errores:");
                console.log(this.v$.$errors);
                console.log(this.validHora);
                console.log(this.validDias)

                return;
            }
            console.log('Formulario válido. Enviando...');
        },
        validateFloat(event) {
            this.sueldo = event.target.value.replace(/[^0-9.]/g, '');
        },
        async validarDatos() {
            //validar que se ingresen horas validas
            if (this.horai != 0 && this.horaf != 0) { this.validHora = false; }
            else { this.validHora = true; }

            console.log('dias:' + this.dias)
            if (this.dias.length > 0) {
                this.validDias = true;
            } else {
                this.validDias = false;
            }

            var regex = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/;
            if (regex.test(this.name)) {
                this.validName = false;
            }

            if (regex.test(this.lastname)) {
                this.validLastN = false;
            }

        },
        async validarCampo(campo) {
            console.log(campo)
            console.log(this.v$[campo].$validate())
            const verif = await this.v$[campo].$validate();
        },
        async validardias(campo) {
            
            console.log('dias:' + this.dias)
            if (this.dias.length > 0) {
                this.validDias = true;
            } else {
                this.validDias = false;
            }

        },
        async validarhora(campo) {
            console.log(this.v$[campo].$validate())
            const verif = await this.v$[campo].$validate();
            if (this.horai != 0 && this.horaf != 0) { this.validHora = false; }
            else { this.validHora = true; }

        },
        cambioImagen(e) {
            this.imagen = e.target.files[0];
            console.log(this.imagen)

        },

        async guardar() {
            let res = await this.v$.$validate();
            await this.validar();
            console.log(res)
            console.log(this.v$.$errors);
            if (res) {

                const createUser = await firebase.auth().createUserWithEmailAndPassword(this.correo, this.password);
                const result = await createUser.user.uid;

                /*Activar cuando la base de datos ya c encuentre completa*/
                const dataBase = db.collection("empleado").doc(result);
                try {
                    let downloadURL = null;
                    if (this.imagen != null && this.imagen != "") {
                        const refImg = ref.child("imagenes/" + dataBase.id + ".jpg");
                        const metadata = {
                            contentType: 'img/jpeg'
                        }

                        await refImg.put(this.imagen, metadata);
                        downloadURL = await refImg.getDownloadURL();

                        console.log('Archivo cargado exitosamente');

                    }

                    let rol = "";
                    if (this.rol == "Gerente de Sucursal") {
                        rol = "Gerente " + this.sucursal;
                    } else {
                        rol = this.rol;
                    }

                    await dataBase.set({
                        nombre: this.name,
                        apellido: this.lastname,
                        edad: this.edad,
                        email: this.correo,
                        telefono: this.telefono,
                        userName: this.user,
                        horario: {
                            dias: this.dias,
                            horaDeEntrada: this.horai,
                            horaDeSalida: this.horaf,
                        },
                        rol: rol,
                        sueldo: this.sueldo,
                        sucursal: this.sucursal,
                        imagen: downloadURL,
                    })
                    await this.$nextTick();

                    location.reload(true);
                } catch (error) {
                    console.error('Error al cargar el archivo:', error);
                    errorEnvio = true;
                }

                //this.$el.closest('dialog').close();

                //location.reload();


            }

        },
        change() {
            if (this.rol == "Gerente General")
                this.gerente = true;
            else
                this.gerente = false;
        }
    },
}
</script>