<template>
    <div>
        <form>
            <div class="m-5 mt-0" v-if="!valido" ref="error">
                <div role="alert" class="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Datos incompletos o incorrectos... Verifiquelos</span>
                </div>
            </div>

            <label class="form-control w-full ">
                <div class="label">
                    <span class="label-text font-bold">Nombre</span>
                </div>
                <input type="text" v-model="nombre" id="nombre" class="input input-bordered w-full" required />
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text font-bold">Sucursal</span>
                </div>
                <select v-model="sucursal" class="select select-bordered" v-on:change.prevent="cambiarTipo">
                    <option disabled selected>Selecciona una</option>
                    <option>Taqueria</option>
                    <option>Barberia</option>
                </select>
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text font-bold">Tipo de producto</span>
                </div>
                <select v-on:change.prevent="change" v-model="tipo" class="select select-bordered">
                    <option v-if="tipos.length == 0" disabled selected>Selecciona una Sucursal</option>
                    <option v-else disabled selected>Selecciona una</option>
                    <option v-for="tipo in tipos">{{ tipo }}</option>
                </select>
            </label>
            <label class="form-control w-full ">
                <div class="label">
                    <span class="label-text font-bold">Precio</span>
                </div>
                <input type="number" v-model="precio" id="nombre" class="input input-bordered w-full" required />
            </label>
            <label class="form-control w-full ">
                <div class="label">
                    <span class="label-text font-bold">Proveedor</span>
                </div>
                <input type="text" v-model="proveedor" class="input input-bordered w-full" required />
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text font-bold">Medida</span>
                </div>
                <select v-model="medida" class="select select-bordered">
                    <option disabled selected>Selecciona una</option>
                    <option>Kilo</option>
                    <option>Gramo</option>
                    <option>Litro</option>
                    <option>Miligramo</option>
                    <option>Bulto</option>
                    <option>Unidad</option>
                </select>
            </label>
            <label class="form-control w-full ">
                <div class="label">
                    <span class="label-text font-bold">Inventario minimo</span>
                </div>
                <input v-model="inventariominimo" type="number" class="input input-bordered w-full" required />
            </label>
            <label class="form-control w-full ">
                <div class="label">
                    <span class="label-text font-bold">Cantidad de producto a tiempo de registro (Stock inicial)</span>
                </div>
                <input v-model="inventarioactual" type="number" class="input input-bordered w-full" required />
            </label>
            <label class="form-control w-full ">
                <div class="label">
                    <span class="label-text font-bold">Imagen</span>
                </div>
                <input @change="cambioImagen($event)" type="file" id="imagen" accept="image/*"
                    class="input input-bordered w-full" />
            </label>
            <label class="form-control">
                <div class="label">
                    <span class="label-text font-bold">Descripción (opcional)</span>
                </div>
                <textarea v-model="comentario" class="textarea textarea-bordered h-24"
                    placeholder="Este ingrediente solo se compra en temporada de verano..."></textarea>
            </label>
            <label class="form-control w-full mt-5">
                <button class="btn" type="submit" @click.prevent="save">Registrar</button>
            </label>

        </form>
    </div>

</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, decimal, minValue } from '@vuelidate/validators'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../../firebase/firebaseInit"
import { storage } from '../../firebase/firebaseInit';
const ref = storage.ref();

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            nombre: "",
            tipo: "",
            proveedor: "",
            medida: "",
            sucursal: "",
            inventariominimo: "",
            inventarioactual: "",
            comentario: "",
            precio: "",
            validNombre: true,
            isForSell: false,
            valido: true,
            imagen: "",
            tipos: [],
        }
    },
    validations: {
        nombre: { required },
        tipo: { required },
        proveedor: { required },
        medida: { required },
        inventariominimo: { required, decimal, minValue: minValue(0) },
        inventarioactual: { required, decimal, minValue: minValue(0) },
        sucursal: { required },
        precio: { required, decimal, minValue: minValue(0) }
    },
    methods: {
        cambiarTipo() {
            if (this.sucursal == "Taqueria")
                this.tipos = ["Ingrediente", "De venta"]
            if (this.sucursal == "Barberia")
                this.tipos = ["Producto"]
        }
        ,
        async save() {
            const validNombre = await this.v$.nombre.$validate();
            const validTipo = await this.v$.tipo.$validate();
            const validPrecio = await this.v$.precio.$validate();
            const valid = await this.v$.$validate();
            if (validNombre && validTipo && validPrecio && valid) {

                const dataBase = db.collection("productos").doc();

                try {
                    let downloadURL = null;
                    if (this.imagen != null && this.imagen != "") {
                        const refImg = ref.child("imagenes/" + dataBase.id + ".jpg");
                        const metadata = {
                            contentType: 'img/jpeg'
                        }
                        await refImg.put(this.imagen, metadata);
                        downloadURL = await refImg.getDownloadURL();
                        //console.log('URL de descarga:', downloadURL);
                        console.log('Archivo cargado exitosamente')
                    }
                    await dataBase.set({
                        nombre: this.nombre,
                        tipo: this.tipo,
                        proveedor: this.proveedor,
                        medida: this.medida,
                        inventarioMinimo: this.inventariominimo,
                        inventarioActual: this.inventarioactual,
                        sucursal: this.sucursal,
                        precio: this.precio,
                        comentario: this.comentario,
                        imagen: downloadURL,
                    })
                } catch (error) {
                    console.error('Error al cargar el archivo:', error);
                    errorEnvio = true;
                }

                await this.$nextTick();
                location.reload();

            } else {
                await this.$nextTick();
                const sectionElement = this.$refs.error;
                sectionElement.scrollIntoView({ behavior: 'smooth' });

            }
        },
        change() {
            console.log(this.tipo)
            this.tipo == "De venta" ? this.isForSell = true : this.isForSell = false
        },
        cambioImagen(e) {
            this.imagen = e.target.files[0];
            console.log(this.imagen)
        }
    }
}
</script>