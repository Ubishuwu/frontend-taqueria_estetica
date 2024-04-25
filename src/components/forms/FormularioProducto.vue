<template>
    <div>
        <form>
            <label class="form-control w-full ">
                <div class="label">
                    <span class="label-text font-bold">Nombre</span>
                </div>
                <input type="text" v-model="nombre" id="nombre" class="input input-bordered w-full" required />
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text font-bold">Tipo de producto</span>
                </div>
                <select v-on:change.prevent="change" v-model="tipo" class="select select-bordered">
                    <option selected>Ingrediente</option>
                    <option>De venta</option>
                </select>
            </label>
            <label v-if="isForSell" class="form-control w-full ">
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
            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text font-bold">Sucursal</span>
                </div>
                <select v-model="sucursal" class="select select-bordered">
                    <option disabled selected>Selecciona una</option>
                    <option>Taqueria</option>
                    <option>Barberia</option>
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
                    <span class="label-text font-bold">Cantidad de producto a tiempo de registro</span>
                </div>
                <input v-model="inventarioactual" type="number" class="input input-bordered w-full" required />
            </label>
            <label class="form-control">
                <div class="label">
                    <span class="label-text font-bold">Descripción (opcional)</span>
                </div>
                <textarea v-model="comentario" class="textarea textarea-bordered h-24" placeholder="Este ingrediente solo se compra en temporada de verano......."></textarea>
            </label>
            <label class="form-control w-full mt-5">
                <button class="btn" type="submit" @click.prevent="save">Registrar</button>
            </label>

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
    data(){
        return{
            nombre:"",
            tipo:"",
            proveedor:"",
            medida:"",
            sucursal:"",
            inventariominimo:"",
            inventarioactual:"",
            comentario:"",
            precio:0,
            validNombre:true,
            isForSell:false,
        }
    },
    validations:{
        nombre: {required},
        tipo: {required},
        proveedor: {required},
        medidad:{required}, 
        inventariominimo:{required},
        inventarioactual:{required},
    },
    methods:{
        async save(){
            console.log(this.nombre);
            const validNombre = await this.v$.nombre.$validate();
            console.log(validNombre)
            const dataBase = db.collection("productos").doc();
            await dataBase.set({
                nombre: this.nombre,
                tipo: this.tipo,
                proveedor: this.proveedor,
                medida: this.medida, 
                inventarioMinimo: this.inventariominimo,
                inventarioActual: this.inventarioactual,
                sucursal: this.sucursal,
                precio: this.precio,
            })
            location.reload();
        },
        change(){
            console.log("Hola mundo")
            this.tipo == "De venta"? this.isForSell =  true : this.isForSell = false 
        }
    }
}
</script>