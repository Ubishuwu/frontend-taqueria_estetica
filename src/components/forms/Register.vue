<template>
    <div class="flex justify-center items-center h-screen w-screen bg-cover bg-center"
        style="background-image: url('../src/assets/fondo.png')">
        <form @submit.prevent="validar"
            class="flex flex-col border border-1 border-primary rounded-xl p-5 shadow-lg shadow-gray-700 bg-primary md:w-3/6 sm:w-4/6 w-11/12 h-4/6 items-center justify-center">
            <h1 class="font-sans text-2xl font-bold text-gray-200 mb-5 border-0 border-b-2 border-white">Registro
            </h1>
            <label class="flex flex-col w-full p-2">
                <span class=" font-sans text-md text-gray-200 mb-1">Nombre de Usuario:</span>
                <input type="text" placeholder="Nombre" class="input input-bordered input-sm w-full" id="user"
                    v-model="user" required />
                <span v-if="enviado && !validUser" id="spanUser"
                    class="font-mono text-sm text-red-500 text-right">Usuario Requerido, Verifiquelo</span>
            </label>
            <label class="flex flex-col w-full p-2">
                <span class=" font-sans text-md text-gray-200 mb-1">Correo</span>
                <input type="email" placeholder="ejemplo@ejemplo" class="input input-bordered input-sm w-full"
                    id="email" v-model="email" required />
                <span v-if="enviado && !validEmail" id="spanUser"
                    class="font-mono text-sm text-red-500 text-right">Email Requerido, Verifiquelo</span>
            </label>
            <label class="flex flex-col w-full p-2">
                <span class=" font-sans text-md text-gray-200 mb-1">Contraseña:</span>
                <div class="flex flex-row">
                    <input :type="inputType" placeholder="*****" class="input input-bordered input-sm w-full mr-10"
                        id="password" v-model="password" @input="validatePassword" required />
                    <button @click="toggleInputType"
                        class="bg-white rounded-md px-2 hover:bg-success hover:text-secondary">
                        <font-awesome-icon :icon="['fas', 'eye-slash']" />
                    </button>
                </div>
                <p v-if="!isPasswordValid" class="text-red-500 ">La contraseña debe contener al menos una mayúscula, un
                    número y un signo.</p>
            </label>
            <div v-show="error" class="align-middle font-[12px] text-red-600">
                {{ this.errorMsg }}
            </div>
            <input type="submit" value="Iniciar Sesión"
                class="btn btn-sm hover:btn-success hover:text-secondary mt-5 w-3/4" @click.prevent="register" />

        </form>
    </div>
</template>


<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../../firebase/firebaseInit"


export default {
    setup: () => ({ v$: useVuelidate() }),
    contains: (param) =>
  (value) => !helpers.req(value) || value.indexOf(param) >= 0,
    data() {
        return {
            user: "",
            password: "",
            email: "",
            enviado: false,
            validPassword: true,
            validUser: true,
            validEmail: true,
            inputType: 'password',
            error: null,
            errorMsg: "",
            isFormCorrect: false,
        }
    },
    validations: {
        user: { required },
        password: { required, minLength: minLength(5) },
        email: {required, email}
    },
    methods: {
        
        async validar() {
            const isFormCorrect = await this.v$.$validate()
            this.enviado = true;

            this.validPassword = await this.v$.password.$validate()
            this.validUser = await this.v$.user.$validate()
            this.validEmail = await this.v$.email.$validate()

            console.log("validando")
            ///console.log(this.validPassword)

            if (!isFormCorrect) {
                console.log("error...");
            }else{
                console.log('Formulario válido. Enviando...');
            }
            
            ///proceso para enviar y redirigir a la pagina owo

        },
        toggleInputType() {
            this.inputType = this.inputType === 'password' ? 'text' : 'password';
        },
        validatePassword() {
            const regexUpperCase = /[A-Z]/;
            const regexNumber = /[0-9]/;
            const regexSymbol = /[*#?¿!]/;

            const hasUpperCase = regexUpperCase.test(this.password);
            const hasNumber = regexNumber.test(this.password);
            const hasSymbol = regexSymbol.test(this.password);

            this.isPasswordValid = hasUpperCase && hasNumber && hasSymbol;
        },
        async register() {
            await this.validar();
            console.log(this.validUser && this.validPassword)
            if (this.validUser && this.validPassword && this.validEmail) {
                this.error = false;
                this.errorMsg = "";
                const firebaseAuth = await firebase.auth();
                const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
                const result = await createUser;
                const dataBase = db.collection("users").doc(result.user.uid);
                await dataBase.set({
                    userName: this.user,
                    email: this.email
                })
                this.$router.push('/');
            } 
        
    }
}
}
</script>