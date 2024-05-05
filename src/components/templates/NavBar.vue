<template>
    <nav class="bg-primary sticky z-50 top-0">
        <div class="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <button type="button" @click="menu"
                        class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        aria-controls="mobile-menu" aria-expanded="false">
                        <span class="absolute -inset-0.5"></span>
                        <span class="sr-only">Open main menu</span>
                        <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex flex-shrink-0 items-center">
                        <h1 class="text-lg text-secondary">{{ titulo }}</h1>
                    </div>
                    <div v-if="usuarioAutenticado != null" class="hidden sm:ml-6 sm:!block size-full">
                        <div class="flex flex-nowrap justify-end">
                            <div>
                                <RouterLink :to="Object.keys(ruta)[0]" class="w-full" v-for="(ruta, nombre) in rutas"
                                    :key="ruta">
                                    <button type="button"
                                        v-if="ruta[Object.keys(ruta)[0]] == 'rol' || usuario && usuario.rol && ruta[Object.keys(ruta)[0]] && (usuario.rol).includes(ruta[Object.keys(ruta)[0]])"
                                        class="text-secondary hover:bg-primary hover:brightness-150 rounded-md px-3 py-2 text-sm font-medium"
                                        id="lista-escritorio-navbar">
                                        {{ nombre }}
                                    </button>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Usuario-->
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <!----->
                    <div v-if="usuarioAutenticado == null">
                        <button class="btn btn-sm" onclick="my_modal_5.showModal()">
                            Entrar
                        </button>
                        <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
                            <div class="modal-box">

                                <div v-if="errorMessage != ''" role="alert" class="alert alert-error">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6"
                                        fill="none" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Credenciales no válidas</span>
                                </div>
                                <!---FOrm inicio secion-->
                                <form>
                                    <label class="form-control w-full ">
                                        <div class="label">
                                            <span class="label-text font-bold">Correo</span>
                                        </div>
                                        <input type="email" v-model="email" class="input input-bordered w-full"
                                            required />
                                    </label>
                                    <label class="form-control w-full">
                                        <div class="label">
                                            <span class="label-text font-bold">Contraseña</span>
                                        </div>
                                        <input type="password" v-model="password" class="input input-bordered w-full "
                                            required />
                                    </label>
                                    <p class="mt-2">¿Aún no tienes cuenta? <a href="/register"
                                            class="underline text-primary">Registrate </a></p>
                                    <label class="form-control w-full mt-5">
                                        <button class="btn" type="submit" @click.prevent="login">Entrar</button>
                                    </label>

                                </form>
                            </div>
                        </dialog>
                    </div>
                    <div class="flex" v-else>
                        <button type="button"
                            class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span class="absolute -inset-1.5"></span>
                            <span class="sr-only">View notifications</span>
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                        </button>

                        <!-- Profile dropdown -->
                        <div class="relative ml-3">
                            <div>
                                <button type="button" @click="menuUser"
                                    class="px-2 relative flex flex-col rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <div class="justify-center items-center flex">

                                        <span class="absolute -inset-1.5"></span>
                                        <span class="sr-only">Open user menu</span>
                                        <img v-if="usuario.imagen" class="h-8 w-8 rounded-full object-cover "
                                            :src="usuario.imagen" alt="">
                                        <img v-else class="h-8 w-8 rounded-full object-cover "
                                            src="../../assets/user.png" alt="">
                                        <p class="text-white text-xs mx-2">{{ this.usuario.userName }}</p>
                                    </div>
                                    <p class="text-white text-xs">{{ this.usuarioAutenticado.email }}</p>
                                </button>
                            </div>

                            <div class="hidden z-50 mt-2 border border-1 border-gray-400 right-0 w-48 origin-top-right rounded-md bg-white shadow-lg  ring-black ring-opacity-5 focus:outline-none"
                                role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button"
                                id="user-menu">


                                <RouterLink to="/config" @click="retraerUser">
                                    <a type="button"
                                        class="hover:bg-primary hover:text-white hover:brightness-150 rounded-md block px-4 py-2 text-sm">
                                        Configuracion
                                    </a>
                                </RouterLink>
                                <RouterLink to="/user" @click="retraerUser">
                                    <a type="button"
                                        class="hover:bg-primary hover:text-white hover:brightness-150 rounded-md block px-4 py-2 text-sm">
                                        Mi perfil
                                    </a>
                                </RouterLink>

                                <a @click="logout" type="button"
                                    class="hover:bg-primary hover:text-white hover:brightness-150 rounded-md block px-4 py-2 text-sm">
                                    Cerrar Sesión
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile menu, show/hide based on menu state. -->
        <div class="hidden sm:hidden" id="mobile-menu">
            <div class="space-y-1 px-2 pb-3 pt-2">
                <RouterLink :to="Object.keys(ruta)[0]" @click="retraer" v-for="(ruta, nombre) in rutas" :key="ruta">
                    <a type="button"
                        class="text-secondary hover:bg-primary hover:brightness-150 block rounded-md px-3 py-2 text-base font-medium">
                        {{
                            nombre
                        }}
                        <!----{{ ruta[Object.keys(ruta)[0]] }}    para optener el rol-->
                    </a>
                </RouterLink>
            </div>
        </div>
    </nav>

</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import db from "../../firebase/firebaseInit"

export default {
    name: "Side_Bar",
    props: {
        titulo: {
            default: "Taco de Mazapan",
        },
    },
    data() {
        return {
            usuarioAutenticado: firebase.auth().currentUser,
            usuario: "",
            email: "",
            password: "",
            errorMessage: '',
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
        // Verificar si hay un usuario autenticado al cargar el componente
        setTimeout(() => {
            this.usuarioAutenticado = firebase.auth().currentUser;
        }, 500);

    },
    async created() {
        this.usuario = (await db.collection('empleado').doc(firebase.auth().currentUser.uid).get()).data();
        //console.log(this.usuario);
    },
    computed: {},
    methods: {
        retraer() {
            document.getElementById("mobile-menu").classList.add("hidden");
        },
        retraerUser() {
            document.getElementById("user-menu").classList.add("absolute");
            document.getElementById("user-menu").classList.remove("hidden");
        },
        menu() {
            if (document.getElementById("mobile-menu").classList.contains("hidden")) {
                document.getElementById("mobile-menu").classList.remove("hidden");
            } else {
                document.getElementById("mobile-menu").classList.add("hidden");
            }
        },
        menuUser() {
            if (document.getElementById("user-menu").classList.contains("absolute")) {
                document.getElementById("user-menu").classList.remove("absolute");
                document.getElementById("user-menu").classList.add("hidden");
            } else {
                document.getElementById("user-menu").classList.add("absolute");
                document.getElementById("user-menu").classList.remove("hidden");
            }
        },
        mostrarUser() {



        },
        login() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    console.log(firebase.auth().currentUser.uid);
                    if (firebase.auth().currentUser) {
                        location.reload();
                    }
                }).catch((error) => {
                    this.errorMessage = error;
                })
        },
        logout() {
            firebase.auth().signOut().then(() => {
                //location.reload();
                this.$router.push('/Login');
            })

        }

    }
};
</script>

<style></style>
