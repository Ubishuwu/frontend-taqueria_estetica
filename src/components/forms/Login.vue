<template>
    <div class="flex justify-center items-center h-screen w-screen bg-cover bg-center"
        style="background-image: url('../src/assets/fondo.png')">
        <form @submit.prevent="validar"
            class="flex flex-col border border-1 border-primary rounded-xl p-5 shadow-lg shadow-gray-700 bg-primary md:w-3/6 sm:w-4/6 w-11/12 h-3/6 items-center justify-center">
            <h1 class="font-sans text-2xl font-bold text-gray-200 mb-5 border-0 border-b-2 border-white">Inicie Sesión
            </h1>
            <label class="flex flex-col w-full p-2">
                <span class=" font-sans text-md text-gray-200 mb-1">Nombre de Usuario:</span>
                <input type="text" placeholder="User" class="input input-bordered input-sm w-full" id="user"
                    v-model="user" />
                <span v-if="enviado && !validUser" id="spanUser"
                    class="font-mono text-sm text-red-500 text-right">Usuario Requerido, Verifiquelo</span>
            </label>
            <label class="flex flex-col w-full p-2">
                <span class=" font-sans text-md text-gray-200 mb-1">Contraseña:</span>
                <input type="password" placeholder="Password" class="input input-bordered input-sm w-full" id="password"
                    v-model="password" />
                <span v-if="enviado && !validPassword" id="spanUser"
                    class="font-mono text-sm text-red-500 text-right">Contraseña Requerida, Verifiquela</span>
            </label>

            <input type="submit" value="Iniciar Sesión"
                class="btn btn-sm hover:btn-success hover:text-secondary mt-5 w-3/4" />

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
            user: "",
            password: "",
            enviado: false,
            validPassword: true,
            validUser: true,
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