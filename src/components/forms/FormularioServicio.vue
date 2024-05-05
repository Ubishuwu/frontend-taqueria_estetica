<template>
    <div>
        <form @submit.prevent="save" enctype="multipart/form-data">
            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text font-bold">Tipo de servicio</span>
                </div>
                <select v-model="tipo" class="select select-bordered">
                    <option selected>Corporal</option>
                    <option>Tratamiento de cabello</option>
                    <option>Tratamiento de vello</option>
                </select>
            </label>
            <label class="form-control w-full ">
                <div class="label">
                    <span class="label-text font-bold">Nombre</span>
                </div>
                <input type="text" v-model="nombre" id="nombre" class="input input-bordered w-full" required
                    autocomplete="off" />
            </label>
            <label class="form-control w-full ">
                <div class="label">
                    <span class="label-text font-bold">Precio</span>
                </div>
                <input type="number" v-model="precio" id="nombre" class="input input-bordered w-full" required />
            </label>
            <label class="form-control w-full ">
                <div class="label">
                    <span class="label-text font-bold">Imagen</span>
                </div>
                <input @change="change($event)" type="file" id="imagen" accept="image/*"
                    class="input input-bordered w-full" />
            </label>
            <div class="border-y-2 border-gray-400 my-4 flex flex-col">
                <div class="label">
                    <span class="label-text font-bold">Agregar productos:</span>
                </div>
                <div class="flex flex-nowrap">

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
                    <label class="flex m-2 items-center ">
                        <span class="label-text">Cantidad({{ unidad }}):</span>
                        <input v-model="cantidad" type="number" class="mx-2 w-14 rounded-md p-1 ">
                        <button @click.prevent="agregar" class="btn-square btn-sm bg-green-400 rounded-xl ">+</button>
                    </label>
                </div>
                <div class="bg-base-200 w-full rounded-box mt-5 px-5 py-2">
                    <li v-for="prod in elementos" :key="prod.producto.id" class="flex flex-row justify-between my-1">
                        <div class="flex flex-row justify-around mx-4 grow">

                            <div>{{ prod.producto.nombre }}</div>
                            :
                            <div>{{ prod.cantidad }}</div>

                            <div>{{ prod.producto.medida }}</div>

                        </div>
                        <button @click="eliminar(prod)"
                            class="btn-square btn-xs hover:bg-error rounded-md  bg-white">x</button>
                    </li>
                </div>
            </div>
            <label class="form-control">
                <div class="label">
                    <span class="label-text font-bold">Descripción/Comentarios (opcional)</span>
                </div>
                <textarea v-model="comentario" class="textarea textarea-bordered h-24"
                    placeholder="En este servicio se necesitan 40 minutos..." autocomplete="off"></textarea>
            </label>

            <div class="m-5" v-if="errorEnvio" ref="error">
                <div role="alert" class="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Error al guardar... intente denuevo</span>
                </div>
            </div>

            <label class="form-control w-full mt-5">
                <button class="btn" type="submit" @click.prevent="save">Registrar</button>
            </label>

        </form>
    </div>

</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, decimal } from '@vuelidate/validators'
import { storage } from '../../firebase/firebaseInit';

import "firebase/auth";
import db from "../../firebase/firebaseInit"

const ref = storage.ref();

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            nombre: "",
            tipo: "",
            precio: "",
            comentario: "",
            validNombre: true,
            imagen: "",
            elementos: [],
            productos: [],
            producto: "",
            cantidad: "",
            unidad: "",
            errorEnvio: false,
        }
    },
    validations: {
        nombre: { required },
        tipo: { required },
        precio: { required, decimal, minValue: minValue(0) },
        cantidad: { required, decimal },
        producto: { required }
    },
    methods: {
        eliminar(item) {
            const nuevaLista = this.elementos.filter((items) => items !== item);
            this.elementos = nuevaLista;
        },
        cambiarUnidad() {
            console.log(this.producto)
            const resultado = this.productos.find(prod => prod.nombre == this.producto);
            console.log(resultado)
            this.unidad = resultado.medida;
        },
        async agregar() {//agrega a la lista de productos q se usan
            const vefProd = await this.v$.producto.$validate();
            const vefCant = await this.v$.cantidad.$validate();
            if (vefProd && vefCant) {
                this.elementos.push({
                    producto: this.productos.find(prod => prod.nombre == this.producto),
                    cantidad: this.cantidad
                });
                console.log(this.elementos)
            }
        },
        async save() {
            const validNombre = await this.v$.nombre.$validate();
            const validTipo = await this.v$.tipo.$validate();
            const validPrecio = await this.v$.precio.$validate();
            // console.log(validNombre && validTipo && validPrecio)
            if (validNombre && validTipo && validPrecio) {

                const elementosUsados = [];///hacer enlace a la tabla de productos
                this.elementos.forEach((item) => {
                    // console.log(item.producto.id)
                    elementosUsados.push({
                        producto: db.collection('productos').doc(item.producto.id),
                        cantidad: item.cantidad
                    })
                })

                const dataBase = db.collection("servicios").doc();

                try {
                    const downloadURL = null;
                    if (this.imagen != null && this.imagen != "") {
                        const refImg = ref.child("imagenes/" + dataBase.id + ".jpg");
                        const metadata = {
                            contentType: 'img/jpeg'
                        }
                        await refImg.put(this.imagen, metadata);
                        downloadURL = await refImg.getDownloadURL();
                        //console.log('URL de descarga:', downloadURL);
                        console.log('Archivo cargado exitosamente');
                    }
                    await dataBase.set({
                        nombre: this.nombre,
                        tipo: this.tipo,
                        precio: this.precio,
                        items: elementosUsados,
                        comentario: this.comentario,
                        imagen: downloadURL,
                    })

                    await this.$nextTick();
                    location.reload(true);
                } catch (error) {
                    console.error('Error al cargar el archivo:', error);
                    errorEnvio = true;
                }


            }
        },
        change(e) {
            this.imagen = e.target.files[0];
            console.log(this.imagen)
        }
    },

    async created() {
        const dataBase = await db.collection('productos');
        const dbResults = await dataBase.get();
        //docs = dbResults.docs;
        dbResults.forEach((doc) => {
            if (doc.data().sucursal == "Barberia") {
                const data = {
                    nombre: doc.data().nombre,
                    medida: doc.data().medida,
                    proveedor: doc.data().proveedor,
                    inventarioActual: doc.data().inventarioActual,
                    inventarioMinimo: doc.data().inventarioMinimo,
                    tipo: doc.data().tipo,
                    sucursal: doc.data().sucursal,
                    id: doc.id,
                }
                this.productos.push(data)
            }
        })


    },
}
</script>