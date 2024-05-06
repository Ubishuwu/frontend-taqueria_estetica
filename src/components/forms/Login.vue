<template>
    <div class="flex justify-center items-center h-screen w-screen bg-cover bg-center"
        style="background-image: url('../src/assets/fondo.png')">

        <form @submit.prevent="validar"
            class="flex flex-col border border-1 border-primary rounded-xl p-5 shadow-lg shadow-gray-700 bg-primary md:w-3/6 sm:w-4/6 w-11/12 h-4/6 items-center justify-center">
            <h1 class="font-sans text-2xl font-bold text-gray-200 mb-5 border-0 border-b-2 border-white">Inicio de
                Sesión
            </h1>
            <div v-if="errorMessage != ''" role="alert" class="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Credenciales no válidas</span>
            </div>
            <!----
            <label class="flex flex-col w-full p-2">
                <span class=" font-sans text-md text-gray-200 mb-1">Nombre de Usuario:</span>
                <input type="text" placeholder="User" class="input input-bordered input-sm w-full" id="user"
                    v-model="user" />
                <span v-if="enviado && !validUser" id="spanUser"
                    class="font-mono text-sm text-red-500 text-right">Usuario Requerido, Verifiquelo</span>
            </label>
        -->
            <label class="flex flex-col w-full p-2">
                <span class=" font-sans text-md text-gray-200 mb-1">Correo Electronico:</span>
                <input type="email" placeholder="Correo Electrónico" class="input input-bordered input-sm w-full"
                    id="email" v-model="email" required />
                <span v-if="enviado && v$.email.$error" id="spanUser"
                    class="font-mono text-sm text-red-500 text-right">Usuario Requerido, Verifiquelo</span>
            </label>
            <label class="flex flex-col w-full p-2">
                <span class=" font-sans text-md text-gray-200 mb-1">Contraseña:</span>
                <input type="password" placeholder="Contraseña" class="input input-bordered input-sm w-full"
                    id="password" v-model="password" required />
                <span v-if="enviado && !validPassword" id="spanUser"
                    class="font-mono text-sm text-red-500 text-right">Contraseña Requerida, Verifiquela</span>
            </label>

            <p v-if="false" class="mt-2 text-white">¿Aún no tienes cuenta? <a href="/Register"
                    class="underline text-info">Registrate
                </a>
            </p>

            <input type="submit" value="Iniciar Sesión"
                class="btn btn-sm hover:btn-success hover:text-secondary mt-5 w-3/4" />

        </form>
    </div>
</template>


<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'

import db from "../../firebase/firebaseInit"
import firebase from "firebase/app";
import "firebase/auth";

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            usuarioAutenticado: null,
            user: "",
            email: "",
            password: "",
            errorMessage: '',
            enviado: false,
            validPassword: true,
            validUser: true,
        }
    },
    validations: {
        //user: { required },
        email: { required, email },
        password: { required, minLength: minLength(5) }
    },
    methods: {
        login() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(async () => {
                    console.log(firebase.auth().currentUser.uid);
                    if (firebase.auth().currentUser) {
                        //location.reload();
                        try {
                            const usuario = (await db.collection('empleado').doc(firebase.auth().currentUser.uid).get()).data();
                            console.log("usuaruio", usuario)
                            if (usuario)
                                this.$router.push('/');
                            else {
                                const user = firebase.auth().currentUser;

                                user.delete().then(() => {
                                    // User deleted.
                                }).catch((error) => {
                                    // An error ocurred
                                    // ...
                                }).finally(()=>{
                                    this.errorMessage = "error";
                                });
                            }
                        } catch (error) {
                            console.error(error)
                        }

                    }
                }).catch((error) => {
                    this.errorMessage = error;
                })
        },
        async validar() {
            const isFormCorrect = await this.v$.$validate()
            this.enviado = true;

            this.validPassword = await this.v$.password.$validate()
            //this.validUser = await this.v$.user.$validate()

            ///console.log(this.validPassword)

            if (!isFormCorrect) {
                console.log("error...");
                return;
            }
            console.log('Formulario válido. Enviando...');
            this.login();
            ///proceso para enviar y redirigir a la pagina owo
            //this.$router.push('/');
        },
    },

}
</script>