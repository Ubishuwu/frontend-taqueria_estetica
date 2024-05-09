<template>
    <div class="fixed h-screen w-full bg-cover -z-50" style="background-image: url('../src/assets/fondo.png')"></div>
    <div class="p-4 flex justify-center">
        <div class="card w-96 bg-base-100 shadow-xl md:shadow-xl">
            <div style="display: flex; align-items: center; justify-content: center;">
                <h2 class="card-title mt-4">Editar perfil</h2>
            </div>
            <figure class="px-10 pt-5">
                <!-- <img :src="logoURL" alt="Avatar del usuario" class="rounded-full w-52"> -->
                <img v-if="usuario.imagen" class="rounded-full w-52"
                                            :src="usuario.imagen" alt="">
                                        <img v-else class="rounded-full w-52"
                                            src="../../assets/user.png" alt="">
            </figure>

            <div class="datos">
                <strong>{{ this.usuario.userName }}</strong>
                <!--<p class="text-gray-500 text-sm">Cambiar foto de perfil</p>-->
            </div>

            <div class="card-body items-center text-center pt-2">
                <div class="form-control w-full max-w-xs">
                    <label>
                        <span>Correo</span>
                    </label>
                    <input type="email" placeholder="`{{ this.usuarioAutenticado.email }}`"
                        class="input input-bordered w-full max-w-xs" v-model="this.usuario.email" disabled="true">
                </div>
                <div class="form-control w-full max-w-xs">
                    <label>
                        <span>Cambiar contraseña</span>
                    </label>
                    <label class="label">
                        <span class="label-text">Contraseña actual</span>
                    </label>
                    <input type="password" class="input input-bordered w-full max-w-xs" v-model="passwordCurrent">
                    <span v-if="this.correctPass"
                                class="font-mono text-sm text-red-500 text-right">La contraseña no coincide, verifique.</span>
                    <label class="label">
                        <span class="label-text">Nueva contraseña</span>
                    </label>
                    <input type="password" class="input input-bordered w-full max-w-xs" v-model="passwordNew">
                    <span v-if="this.longitud"
                                class="font-mono text-sm text-red-500 text-right">La contraseña debe contener más de 6 letras.</span>
                    <label class="label">
                        <span class="label-text">Repetir contraseña</span>
                    </label>
                    <input type="password" class="input input-bordered w-full max-w-xs" v-model="passwordConfirm">
                    <span v-if="this.passwordError"
                                class="font-mono text-sm text-red-500 text-right">Las nuevas contraseñas no coinciden, verifique.</span>
                </div>
                <div class="card-actions">
                    <button class="btn btn-black" @click="updateProfile">Guardar cambios</button>
                    <span v-if="this.errorNetwork"
                                class="font-mono text-sm text-red-500 text-right">Error de conexión, espere un momento...</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import db from "../../firebase/firebaseInit"

export default {
    data() {
        return {
            usuarioAutenticado: firebase.auth().currentUser,
            usuario: "",
            email: "",
            password: "",
            errorMessage: '',
            passwordCurrent: "",
            passwordConfirm: "",
            passwordNew: "",
            correctPass: false,
            longitud:false,
            errorNetwork:false,
            passwordError: false,
            rutas: {
                ///agregar las rutas
                Inicio: { "/inicio": "rol" },
                Caja: { "/caja": "rol" },
                Administrar: { "/inventario": "Gerente" },
            },
            rutasUser: {
                ///rutas para configuracion o que tenga q ver con usuario
                "Mi Perfil": { "/user": "all" },
                Configuracion: { "/config": "rol" },
            },
        };
    },
    mounted() {
        setTimeout(() => {
            this.usuarioAutenticado = firebase.auth().currentUser;
        }, 500);

    },
    async created() {
        this.usuario = (await db.collection('empleado').doc(firebase.auth().currentUser.uid).get()).data();
    },
    computed: {},
    methods: {
        async updateProfile() {
            if(this.passwordNew === this.passwordConfirm){
                try {
                const user = firebase.auth().currentUser;
                const credential = firebase.auth.EmailAuthProvider.credential(
                    user.email,
                    this.passwordCurrent
                );
                await user.reauthenticateWithCredential(credential);
                await user.updatePassword(this.passwordNew);
                this.longitud = false;
                location.reload()
            } catch (error) {
                const mensaje = error.message;
                if(mensaje.includes("A network error")){
                    this.errorNetwork = true;
                    this.correctPass = false;
                    this.longitud = false;
                }else if(mensaje.includes("INVALID_LOGIN_CREDENTIALS")){
                    this.correctPass = true;
                    this.longitud = false;
                    this.errorNetwork = false;
                }else if(mensaje.includes("Password should")){
                    this.longitud = true;
                    this.correctPass = false;
                    this.errorNetwork = false;
                }
                console.log(error)
            }
            }else{
                this.passwordError = true;
            }
        },
    }
};
</script>


<style scoped>

figcaption p {
    margin-top: 4px;
}

button {
    margin-top: 10px;
}

.text-gray-500 {
    color: #6b7280;
}

.text-sm {
    font-size: 0.875rem;
}

.datos {
    text-align: center;
    margin-top: 1rem;
}

.btn-black {
    background-color: #000000;
    color: white;
}

@media (max-width: 1024px) {
    .card {
        width: 100%;
        margin-left: 4rem;
    }
}
</style>