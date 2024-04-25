<template>
    <div class="flex flex-col md:flex-row md:h-screen ">

        <div id="cajaProductosInicio" class="scroll-estilo md:grow md:overflow-y-auto md:w-2/3">

            <CajaNavBar :filtros="filtro" @filtroselect="filtrocambio" @lista="modolistado" />

            <div class="p-0 m-0 flex flex-wrap flex-row justify-center">
                <Tarjeta v-for="item in listaPorcionada" :producto="item" :stock_venta="verificarcompra(item)"
                    @carrito="agregar_compra" :lista="modolista" :key="item.id" />
            </div>


            <div class="">
                <Paginacion :paginas="paginas" :elementosmax="elementosmax" :elementosxpagina="elementosxpagina"
                    :pag="pagina_actual" @nueva_pagina="recibirpagina" />
            </div>

        </div>

        <div class="overflow-y-hidden h-screen">
            <ListaCompra :lista="compra" @actualizar="actualizar" @eliminar="eliminar" @pagar="realizarventa(total)"
                @cancelar="cancelar(sis)" />
        </div>
    </div>
</template>

<script>
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
    data() {
        return {
            elementosmax: 80,
            pagina_actual: 1,
            paginas: 1,
            elementosxpagina: 10,
            lista: [],
            platillos: [],
            productos: [],
            lista_original: [///elementos recibidos del back
                {
                    id: 1,
                    nombre: 'salchipapa',
                    cantidad: 5,
                    tipo: 'producto',
                    precio: 50.5
                },
                {
                    id: 2,
                    nombre: 'agua pura',
                    cantidad: 3,
                    tipo: 'servicio',
                    precio: 25.0
                }, {
                    id: 3,
                    nombre: 'sabrita',
                    cantidad: 5,
                    tipo: 'platillo',
                    precio: 50.5
                },
                {
                    id: 4,
                    nombre: 'chocomenta',
                    cantidad: 8,
                    tipo: 'producto',
                    precio: 25.0
                },
                {
                    id: 5,
                    nombre: 'malteada',
                    cantidad: 8,
                    tipo: 'bebida',
                    precio: 21.0
                },
                {
                    id: 6,
                    nombre: 'jugo',
                    cantidad: 8,
                    tipo: 'bebida',
                    precio: 21.0
                },
            ],
            compra: [],//elemtos en la lista de venta
            listaPorcionada: [],///elementos por pagina
            filtro: [
                'Todo',
            ],
            filtrado: 'todo',
            modolista: false
        }
    },
    components: {
        Tarjeta,
        ListaCompra,
        CajaNavBar,
        Paginacion,

    },
    async created() {
        var dataBase = await db.collection('platillos');
        var dbResults = await dataBase.get();
        console.log("plat")
        console.log(dbResults)
        dbResults.forEach((doc) => {
            const data = {
                nombre: doc.data().nombre,
                tipo: doc.data().tipo,
                precio: doc.data().precio,
            }
            
            this.platillos.push(data)
        })

        dataBase = await db.collection('productos');
        dbResults = await dataBase.get();
        console.log("prods")
        console.log(dbResults)
        dbResults.forEach((doc) => {
            const data = {
                nombre: doc.data().nombre,
                tipo: doc.data().tipo,
                precio: doc.data().precio,
            }
            console.log(data);
            if(doc.data().tipo == "De venta"){
                this.productos.push(data)
            }
        })
        console.log(this.productos)

        this.lista_original = this.lista = [...this.lista, ...this.platillos, ...this.productos]
    },
    methods: {
        modolistado(valor) {
            this.modolista = valor;
        },
        filtrocambio(tipo) {
            //dependiendo como se reciban los datos
            //console.log(tipo.toLowerCase().substring(0,tipo.length-1));
            if (tipo == 'Todo'){
                this.lista = this.lista_original;
            }
            else
                this.lista = this.lista_original.filter(elemento => elemento.tipo.toLowerCase() === tipo.toLowerCase().substring(0, tipo.length - 1));
                
        },
        realizarventa(total) {
            //acccion para enviar la venta al back
            this.cancelar();
        },
        cancelar(sis) {
            console.log("eliminadndo");
            this.compra.splice(0, this.compra.length);
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
        const sucursal = 'taqueria';

        if (sucursal == 'taqueria') {
            this.filtro.push(
                'Bebidas',
                'Platillos');
            //agregar parte de agregar los elementos de la bd a la lista_original(o remplazar lista origninal y añadirlos directamente a lista
        }
        else {
            this.filtro.push(
                'Servicios',
                'Productos');
            //agregar parte de agregar los elementos de la bd a la lista_original(o remplazar lista origninal y añadirlos directamente a lista)

        }

        this.lista = this.lista_original;// cambiar dependiendo como c enviend datos
        this.lista.sort((a, b) => a.nombre.localeCompare(b.nombre));//solo ordena d acuerdo a los nombre(repetir si c vuelven a cargar listas en otras partes)
        this.lista_porcionada();
    }

}
</script>

<style scoped></style>