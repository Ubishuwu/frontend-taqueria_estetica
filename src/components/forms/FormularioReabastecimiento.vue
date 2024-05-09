<template>

    <div class=" bg-secondary  h-[calc(69vh)] align-top py-5 pt-12">
        <form @submit.prevent="validar" class="flex flex-col justify-center items-center p-3 m-2 h-full">
            <h1 class="text-2xl font-semibold ">Compras</h1>


            <div class="border-y-2  my-4 flex flex-col  h-full w-full">
                <div class="label">
                    <span class="label-text font-bold">Agregar productos:</span>
                </div>
                <div class="flex flex-wrap">

                    <label class="flex m-2 items-center grow">
                        <div class="label">
                            <span class="label-text">Producto:</span>
                        </div>
                        <select v-model="producto" class="select select-primary select-sm grow"
                            v-on:change.prevent="cambiarUnidad">
                            <option disabled selected>Seleccione uno</option>
                            <option v-for="prod in productos">{{ prod.nombre }}</option>
                        </select>
                    </label>
                    <div class="flex flex-nowrap">

                        <label class="flex m-2 items-center ">
                            <span class="label-text">Cantidad({{ unidad }}):</span>
                            <input v-model="cantidad" type="number" class="mx-2 w-14 rounded-md p-1 input-sm input input-bordered ">
                        </label>
                        <label class="flex m-2 items-center ">
                            <span class="label-text">Precio:</span>
                            <input v-model="precio" type="number" class="mx-2 w-14 rounded-md p-1 input-sm input input-bordered">
                            <button @click.prevent="agregar"
                                class="btn-square btn-sm bg-green-400 rounded-xl m-2">+</button>
                        </label>
                    </div>
                </div>


                <div class="bg-base-200 mt-5 w-full rounded-box overflow-auto min-h-64 max-h-72  ">
                    <table class="table bg-zinc-50 border border-3 ">
                        <!-- head -->
                        <thead class="sticky z-10 top-0 bg-zinc-100">
                            <tr>
                                <th></th>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(prod, index) in elementos" :key="prod.producto" >
                                <td class="border-r-2 border-r-gray-100">{{ index + 1 }}</td>
                                <td class="border-r-2 border-r-gray-100">
                                    <div class="flex items-center gap-3">
                                        <div class="avatar">
                                            <div class="mask mask-squircle w-12 h-12 ">
                                                <img v-if="prod.producto.imagen"
                                                    class="h-8 w-8 rounded-full object-cover "
                                                    :src="prod.producto.imagen" alt="">
                                                <img v-else :src="`../src/assets/${prod.producto.tipo}.png`"
                                                    alt="Avatar Tailwind CSS Component" class="" />

                                            </div>
                                        </div>
                                        <div class="flex flex-col">
                                            <div class="font-bold">{{ prod.producto.nombre }}</div>
                                            <div class="text-sm opacity-50 ">{{
                                                prod.producto.medida }}</div>
                                        </div>
                                    </div>
                                </td>

                                <td class="border-r-2 border-r-gray-100">
                                    <div class="flex flex-nowrap">

                                        <input v-model.number="prod.cantidad" type="number"
                                            v-validate="'required|decimal'"
                                            class="mx-2 max-w-16 rounded-md p-1 disabled:bg-transparent "
                                            :ref="prod.producto.id" @blur="guardar(prod)" :disabled="!prod.editable">
                                        <button v-if="!prod.editable" class="btn btn-neutral btn-xs m-2"
                                            @click="editable(prod)">
                                            <font-awesome-icon :icon="['fas', 'pen']" class="mx-2" />
                                        </button>
                                        <button v-else
                                            class="btn btn-neutral btn-xs bg-warning text-secondary hover:bg-success m-2"
                                            @click="guardar(prod)">
                                            <font-awesome-icon :icon="['fas', 'floppy-disk']" class="mx-2" />
                                        </button>
                                    </div>
                                </td>

                                <td class="border-r-2 border-r-gray-100">
                                    <div class="flex flex-nowrap">

                                        <input v-model.number="prod.precio" type="number"
                                            v-validate="'required|decimal'"
                                            class="mx-2 max-w-16 rounded-md p-1 disabled:bg-transparent "
                                            :ref="prod.producto.id" @blur="guardarPrec(prod)"
                                            :disabled="!prod.editablePrec">
                                        <button v-if="!prod.editablePrec" class="btn btn-neutral btn-xs m-2"
                                            @click="editablePrec(prod)">
                                            <font-awesome-icon :icon="['fas', 'pen']" class="mx-2" />
                                        </button>
                                        <button v-else
                                            class="btn btn-neutral btn-xs bg-warning text-secondary hover:bg-success m-2"
                                            @click="guardarPrec(prod)">
                                            <font-awesome-icon :icon="['fas', 'floppy-disk']" class="mx-2" />
                                        </button>
                                    </div>
                                </td>
                                <td class="flex flex-wrap justify-between">

                                    <button class="btn btn-error btn-xs flex m-2 " @click="eliminarlista(prod)">
                                        <font-awesome-icon :icon="['fas', 'trash']" class="mx-2" />
                                    </button>

                                </td>

                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            <input @click.prevent="procesar" type="submit" value="Guardar"
                class="btn btn-md w-1/4 hover:btn-success hover:text-secondary" />
        </form>
    </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, decimal } from '@vuelidate/validators'

import db from "../../firebase/firebaseInit"

export default {
    setup: () => ({ v$: useVuelidate() }),
    props: {
        productos: [],
    },
    data() {
        return {
            cantidad: "",
            producto: "",
            cantidad: "",
            elementos: [],
            antes: "",
            costoTotal: 0,
            precio: ""

        }
    },

    validations: {
        cantidad: { required, decimal },
        producto: { required },
        precio: {required,decimal}
    },
    methods: {
        editable(item) {
            this.$nextTick(() => {
                item.editable = !item.editable;
                this.antes = item.cantidad;
                console.log(item.editable)
                if (item.editable) {
                    this.$nextTick(() => {
                        const input = item.producto.id
                        // console.log(this.$refs[input])
                        this.$refs[input][0].focus();
                    });
                }
            });
        },
        guardar(item) {
            const a = item.cantidad;
            console.log(a, this.antes)
            this.editable(item);
            if (a < 0 || a == "") {
                item.cantidad = this.antes;
            }
        },

        editablePrec(item) {
            this.$nextTick(() => {
                item.editablePrec = !item.editablePrec;
                this.antes = item.precio;
                console.log(item.editablePrec)
                if (item.editablePrec) {
                    this.$nextTick(() => {
                        const input = item.producto.id
                        // console.log(this.$refs[input])
                        this.$refs[input][1].focus();
                    });
                }
            });
        },
        guardarPrec(item) {
            const a = item.precio;
            console.log(a, this.antes)
            this.editablePrec(item);
            if (a < 0 || a == "") {
                item.precio = this.antes;
            }
        },
        eliminarlista(item) {
            const nuevaLista = this.elementos.filter((items) => items !== item);
            this.elementos = nuevaLista;
        },
        cambiarUnidad() {
            //console.log(this.producto)
            const resultado = this.productos.find(prod => prod.nombre == this.producto);
            //console.log(resultado)
            this.unidad = resultado.medida;
        },
        async agregar() {//agrega a la lista de productos q se usan
            const vefProd = await this.v$.producto.$validate();
            const vefCant = await this.v$.cantidad.$validate();
            const vefPrec = await this.v$.precio.$validate();
            if (vefProd && vefCant && vefPrec && this.cantidad > 0) {
                try {

                    const product = this.productos.find(prod => prod.nombre == this.producto);
                    //console.log(product.id)
                    if (product) {
                        const indice = this.elementos.findIndex((item) => item.producto === product);
                        //console.log(indice)
                        if (indice !== -1) {
                            //  console.log("modificando")
                            this.elementos[indice].cantidad += this.cantidad; // Aumenta la cantidad
                            this.elementos[indice].precio = this.precio; // remplaza el precio

                        } else {
                            this.elementos.push({
                                producto: product,
                                cantidad: this.cantidad,
                                precio: this.precio,
                                editable: false,
                                editablePrec: false,
                            });
                        }
                        console.log(this.elementos)
                        this.cantidad = "";
                        this.producto = "";
                        this.precio = "";

                    }
                } catch (error) {
                    console.error(error);
                }
            }
        },
        async procesar() {
            const elementosUsados = [];///hacer enlace a la tabla de productos
            this.elementos.forEach((item) => {
                // console.log(item.producto.id)
                const prod = db.collection('productos').doc(item.producto.id);
                elementosUsados.push({
                    producto: prod,
                    cantidad: item.cantidad,
                    precio: item.precio,
                });
                let nuevacantidad = item.producto.inventarioActual + item.cantidad;
                console.log(item.producto.inventarioActual, item.cantidad, nuevacantidad);
                db.collection('productos').doc(item.producto.id).update({ inventarioActual: nuevacantidad });

                this.costoTotal += item.precio
            })

            const dataBase = db.collection("compras").doc();

            try {

                const date = new Date();
                const dia =
                    ("0" + date.getDate()).slice(-2) + "-" +
                    ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
                    date.getFullYear();
                const hora =
                    ("0" + date.getHours()).slice(-2) + ":" +
                    ("0" + date.getMinutes()).slice(-2) + ":" +
                    ("0" + date.getSeconds()).slice(-2);

                await dataBase.set({
                    fecha: dia,
                    hora: hora,
                    compra: elementosUsados,
                    costo: this.costoTotal,
                })

                await this.$nextTick();
                location.reload(true);
            } catch (error) {
                console.error('Error al cargar el archivo:', error);
            }
        }
    }
}
</script>


<style>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>