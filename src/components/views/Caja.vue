<template>
    <div class="flex flex-col md:flex-row md:h-screen ">

        <div id="cajaProductosInicio" class="scroll-estilo md:grow md:overflow-y-auto md:w-2/3">

            <CajaNavBar :filtros="filtro" @filtroselect="filtrocambio" @lista="modolistado" />

            <div v-if="cargando" class="h-3/4 w-full flex justify-center items-center">
                <h1 class="text-green-600 font-semibold font-mono  text-5xl p-5 m-6">Cargando....</h1>
            </div>
            <div v-if="listaPorcionada.length === 0 && !cargando" class="h-3/4 w-full flex justify-center items-center">
                <h1 class="text-red-700 font-semibold font-mono text-center text-5xl p-5 m-6">Uy!! No hay nada aqui,
                    registre algo y regrese</h1>
            </div>

            <div class=" min-h-3_4 " v-if="listaPorcionada.length != 0">

                <div class="p-0 m-0 flex flex-wrap flex-row justify-center">
                    <Tarjeta v-for="item in listaPorcionada" :producto="item" :stock_venta="verificarcompra(item)"
                        @carrito="agregar_compra" :lista="modolista" :key="item.id" />
                </div>
            </div>


            <div class="">
                <Paginacion :paginas="paginas" :elementosmax="elementosmax" :elementosxpagina="elementosxpagina"
                    :pag="pagina_actual" @nueva_pagina="recibirpagina" />
            </div>

        </div>

        <div class="overflow-y-hidden h-screen" ref="cancelar">
            <ListaCompra :lista="compra" @actualizar="actualizar" @eliminar="eliminar" @pagar="realizarventa"
                @cancelar="cancelar(sis)" />
        </div>

        <!---Auxiliar para testear formularios-- pasar proximamente a un modal--->
        <dialog v-if="total != 0" id="pago" class="modal max-w-96">
            <div class="relative  overflow-y-auto overscroll-auto rounded-xl sm:w-4/6 w-full scroll-estilo">
                <form method="dialog" v-if="!ventaExitosa">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div class="bg-accent w-full h-full flex flex-col items-center p-5">
                    <h1 class="text-xl font-medium m-4">Total a pagar: {{ total }} $ </h1>
                    <form class="bg-primary flex flex-col w-full h-full rounded-lg p-3" method="dialog">
                        <label class="flex flex-col w-full p-2 ">
                            <div class="flex flex-nowrap w-full ">
                                <span class=" font-sans text-md text-gray-200 my-1 mx-3 font-semibold">Pago con:</span>
                                <input v-if="!ventaExitosa" type="number" placeholder="00.00"
                                    :class="['input input-bordered input-md grow font-medium', { 'input-disabled file-input-disabled': ventaExitosa }]"
                                    v-model="pago" />
                                <span v-else
                                    class=" input input-bordered input-md grow font-medium flex items-center">{{ pago
                                    }}</span>

                                <span class=" font-sans text-md text-gray-200 my-1 mx-3 font-semibold"> $</span>
                            </div>
                            <span v-if="v$.pago.$error || pagomenor"
                                class="font-mono text-sm text-red-50 bg-red-500 brightness-150 text-right m-2 rounded-md p-1">Pago
                                Requerido
                                y mayor al monto total</span>
                        </label>
                        <label class="flex flex-col w-full p-2 my-5 bg-blue-900 rounded-lg">
                            <div class="flex flex-nowrap w-full ">
                                <span class=" font-sans text-md text-gray-200 my-1 mx-3 font-semibold">Cambio:</span>
                                <span class=" font-sans text-md text-gray-200 my-1 mx-3 font-semibold">{{ cambio
                                    }}</span>
                                <span class=" font-sans text-md text-gray-200 my-1 mx-3 font-semibold"> $</span>
                            </div>
                        </label>
                        <div v-if="!ventaExitosa" class="flex flex-nowrap justify-between">
                            <button @click="cancelarCobro"
                                class="btn btn-md w-1/4 hover:brightness-125 btn-error brightness-50 text-secondary hover:text-secondary mx-2">Cancelar</button>
                            <input @click.prevent="guardar" type="submit" value="Confirmar Venta"
                                class="btn btn-md w-1/4 hover:btn-success hover:text-secondary mx-2 grow" />
                        </div>
                        <input v-else @click.prevent="finalizar" type="submit" value="Finalizar"
                            class="btn btn-md btn-warning hover:btn-success hover:text-secondary mx-2 grow" />

                    </form>
                </div>
            </div>
        </dialog>

    </div>
</template>

<script>

import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, minValue, maxValue, alpha, decimal, email, sameAs, helpers, numeric } from '@vuelidate/validators'


import firebase from "firebase/app";
import "firebase/auth";
import db from "../../firebase/firebaseInit"
import Tarjeta from '../templates/Tarjeta.vue'
import ListaCompra from '../templates/ListaCompra.vue'
import CajaNavBar from '../templates/CajaNavBar.vue'
import Paginacion from '../templates/Paginacion.vue'
import { list } from "postcss";

export default {
    props: {},
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            usuario: "",
            cargando: true,
            elementosmax: 80,
            pagina_actual: 1,
            paginas: 1,
            elementosxpagina: 10,
            lista: [],
            lista_original: [],
            platillos: [],
            productos: [],
            compra: [],//elemtos en la lista de venta
            listaPorcionada: [],///elementos por pagina
            filtro: [
                'Todo', 'Otros'
            ],
            ventaExitosa: false,
            filtrado: 'todo',
            modolista: false,
            sucursal: "todas",
            total: 0,
            pago: "",
            cambio: 0.00,
            pagomenor: false,
            imagen:"",
        }
    },
    components: {
        Tarjeta,
        ListaCompra,
        CajaNavBar,
        Paginacion,

    },
    validations: {
        pago: {
            required, decimal, minValue: minValue(0)
        }
    },
    async created() {
        /*const usuarioLoad = db.collection('empleado').doc(firebase.auth().currentUser.uid);
        const usuariodata = await usuarioLoad.get();
        console.log(usuariodata.data())*/
        //console.log((await db.collection('empleado').doc(firebase.auth().currentUser.uid).get()).data())
        this.usuario = (await db.collection('empleado').doc(firebase.auth().currentUser.uid).get()).data();
        console.log(this.usuario);

        this.sucursal = this.usuario.sucursal;
        var dataBase = null;
        var dbResults = null;
        const servicios = [];
        const productos = [];
        const platillos = [];

        ///si es barberia
        if (this.sucursal != 'Taqueria') {
            console.log("cargando Barberia")

            this.filtro.push(
                'Servicios',
                'Productos'
            );

            dataBase = await db.collection('servicios');
            dbResults = await dataBase.get();
            dbResults.forEach((doc) => {
                const data = {
                    nombre: doc.data().nombre,
                    tipo: doc.data().tipo,
                    precio: doc.data().precio,
                    id: doc.id,
                    imagen: doc.data().imagen
                }

                servicios.push(data);
            })

            dataBase = await db.collection('productos');
            dbResults = await dataBase.get();
            dbResults.forEach((doc) => {
                if (doc.data().sucursal == "Barberia") {
                    const data = {
                        nombre: doc.data().nombre,
                        tipo: doc.data().tipo,
                        precio: doc.data().precio,
                        id: doc.id,
                        imagen: doc.data().imagen
                    }
                    productos.push(data)
                }
            })

            //this.lista_original = this.lista = [...this.lista, ...this.servicios]


        }

        ///si es taqueria
        if (this.sucursal != 'Barberia') {
            console.log("cargando Taqueria")
            this.filtro.push(
                'Bebidas',
                'Comidas',
                'Postres'
            );

            dataBase = await db.collection('platillos');
            dbResults = await dataBase.get();
            dbResults.forEach((doc) => {
                const data = {
                    nombre: doc.data().nombre,
                    tipo: doc.data().tipo,
                    precio: doc.data().precio,
                    id: doc.id,
                    imagen: doc.data().imagen
                }
                platillos.push(data);
            })

            dataBase = await db.collection('productos');
            dbResults = await dataBase.get();
            dbResults.forEach((doc) => {
                if (doc.data().tipo == "De venta" && doc.data().sucursal == "Taqueria") {
                    const data = {
                        nombre: doc.data().nombre,
                        tipo: doc.data().tipo,
                        precio: doc.data().precio,
                        id: doc.id,
                        imagen: doc.data().imagen
                    }
                    productos.push(data)
                }
            })
            console.log(productos)

            //this.lista_original = this.lista = [...this.lista, ...this.platillos]

        }

        this.lista_original = this.lista = [...this.lista, ...productos, ...platillos, ...servicios]

        this.lista.sort((a, b) => a.nombre.localeCompare(b.nombre));//solo ordena d acuerdo a los nombre(repetir si c vuelven a cargar listas en otras partes)
        this.cargando = false;
        this.lista_porcionada();
    },
    methods: {
        async guardar() {
            try {
                this.pagomenor = false;

                const isFormCorrect = await this.v$.$validate()
                if (isFormCorrect) {
                    if (this.pago >= this.total) {
                        this.ventaExitosa = true;
                        this.cambio = this.pago - this.total;

                        const dataBase = db.collection("ticket").doc();

                        const listacompra = [];///hacer enlace a la tabla de productos
                        this.compra.forEach((item) => {
                            // console.log(item.producto.id)
                            listacompra.push({
                                producto: db.collection('productos').doc(item.producto.id),
                                cantidad: item.cantidad
                            })
                        })

                        const date = new Date();
                        const dia =
                            ("0" + date.getDate()).slice(-2) + "-" +
                            ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
                            date.getFullYear();
                        const hora =
                            ("0" + date.getHours()).slice(-2) + ":" +
                            ("0" + date.getMinutes()).slice(-2) + ":" +
                            ("0" + date.getSeconds()).slice(-2);

                        console.log(listacompra);

                        await dataBase.set({
                            fecha: dia,
                            dia: hora,
                            vendedor: db.collection('empleado').doc(firebase.auth().currentUser.uid),
                            compra: listacompra,
                            pagoRecibido: this.pago,
                            cambio: this.cambio,
                        })
                        console.log(dataBase);

                    } else {
                        this.pagomenor = true;
                    }
                } else {
                    console.log(error, this.v$.error);
                }

            } catch (error) {
            }
        },
        finalizar() {
            location.reload();
        },

        evitarCerrarConEsc(event) {
            if (this.ventaExitosa && event.key === 'Escape') {
                // Prevenir el comportamiento predeterminado (cerrar el diálogo)
                event.preventDefault();
            }
        },
        modolistado(valor) {
            this.modolista = valor;
        },
        filtrocambio(tipo) {
            //dependiendo como se reciban los datos
            //console.log(tipo.toLowerCase().substring(0,tipo.length-1));

            if (tipo == 'Todo') {
                this.lista = this.lista_original;
            }
            else if (tipo == 'Otros') {
                this.lista = this.lista_original.filter(elemento => elemento.tipo.toLowerCase() != this.filtro[2].toLowerCase().substring(0, this.filtro[2].length - 1) && elemento.tipo.toLowerCase() != this.filtro[3].toLowerCase().substring(0, this.filtro[3].length - 1));
            }
            else
                this.lista = this.lista_original.filter(elemento => elemento.tipo.toLowerCase() === tipo.toLowerCase().substring(0, tipo.length - 1));

        },
        realizarventa(valor) {
            //acccion para enviar la venta al back
            console.log(valor);
            this.total = valor;
            console.log(this.total)
            //this.cancelar();
        },
        cancelar() {
            console.log("eliminadndo");
            this.compra.splice(0, this.compra.length);
        },
        async cancelarCobro() {

            await this.$nextTick();
            const sectionElement = this.$refs.cancelar;
            sectionElement.scrollIntoView({ behavior: 'smooth' });
        },
        eliminar(producto) {
            const indice = this.compra.findIndex((elemento) => elemento.producto === producto);
            this.compra.splice(indice, 1);
            console.log(indice, "eliminado");

        },
        actualizar(producto) {
            const indice = this.compra.findIndex((elemento) => elemento.producto === producto.producto);
            // Verifica si el producto existe en el arreglo
            if (indice !== -1) {
                if (this.compra[indice].cantidad == this.compra[indice].producto.cantidad && producto.valor == 1 && this.compra[indice].producto.tipo.toLowerCase() == 'producto') { } else {
                    this.compra[indice].cantidad = this.compra[indice].cantidad + producto.valor; // actualiza cantidad
                    if (this.compra[indice].cantidad == 0)
                        this.compra.splice(indice, 1);
                }

            } else
                console.log("no encontrado");
        },
        verificarcompra(producto) {
            const indice = this.compra.findIndex((elemento) => elemento.producto === producto);
            // Verifica si el producto existe en el arreglo
            if (indice !== -1) {
                return this.compra[indice].cantidad;
            } else {
                return null;
            }
        },
        recibirpagina(nueva) {
            this.pagina_actual = nueva;
            console.log(nueva)
            this.regresarAlInicio();
        },
        regresarAlInicio() {
            var divConScroll = document.getElementById('cajaProductosInicio');
            divConScroll.scrollTop = 0;
            this.$nextTick(() => {
                window.scrollTo(0, 0);
            });
        },
        agregar_compra(producto) {
            const indice = this.compra.findIndex((elemento) => elemento.producto === producto.producto);
            // Verifica si el producto existe en el arreglo
            if (indice !== -1) {
                // Modifica la cantidad del producto existente
                this.compra[indice].cantidad = producto.cantidad; // Aumenta la cantidad
                //console.log('Cantidad actualizada:', this.compra[indice].cantidad, ' de ', this.compra[indice].producto);
            } else {
                // Si el producto no existe, lo agrega al arreglo
                this.compra.push({
                    producto: producto.producto,
                    cantidad: producto.cantidad
                });
                //console.log('Producto agregado:', producto.producto, producto.cantidad);
            }
        },
        lista_porcionada() {
            // Calcula el final del rango teniendo en cuenta la longitud de la lista
            const fin = Math.min((this.pagina_actual - 1) * this.elementosxpagina + this.elementosxpagina, this.lista.length);
            // Devuelve la porción de la lista desde el índice de inicio hasta el final del rango
            this.listaPorcionada = this.lista.slice((this.pagina_actual - 1) * this.elementosxpagina, fin);
        },
    },
    watch: {
        pagina_actual(newValue) {
            this.lista_porcionada()
        },
        lista() {
            this.lista_porcionada();
            this.elementosmax = this.lista.length;
            this.paginas = Math.ceil(this.elementosmax / this.elementosxpagina);
            this.pagina_actual = 1;
        }
    }
    ,
    beforeMount() {///cargar cantidad de elementos en la paginacion.. camiar si es necesario a mount o asi dependiendo la forma de carga de datos
        this.elementosmax = this.lista.length;
        this.paginas = Math.ceil(this.elementosmax / this.elementosxpagina);



    },
    mounted() {
        document.addEventListener('keydown', this.evitarCerrarConEsc);
        //const 
        /*sucursal = 'taqueria';
 
        if (sucursal == 'taqueria') {
            this.filtro.push(
                'Bebidas',
                'Comidas');
            //agregar parte de agregar los elementos de la bd a la lista_original(o remplazar lista origninal y añadirlos directamente a lista
        }
        else {
            this.filtro.push(
                'Servicios',
                'Productos');
            //agregar parte de agregar los elementos de la bd a la lista_original(o remplazar lista origninal y añadirlos directamente a lista)
 
        }*/

        //this.lista = this.lista_original;// cambiar dependiendo como c enviend datos


    }

}
</script>

<style scoped></style>