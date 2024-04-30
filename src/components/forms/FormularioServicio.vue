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
                <input type="text" v-model="nombre" id="nombre" class="input input-bordered w-full" required autocomplete="off"/>
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
                <input @change="change($event)" type="file" id="imagen" accept="image/*" class="input input-bordered w-full" />
            </label>
            <label class="form-control">
                <div class="label">
                    <span class="label-text font-bold">Descripción/Comentarios (opcional)</span>
                </div>
                <textarea v-model="comentario" class="textarea textarea-bordered h-24" placeholder="En este servicio se necesitan 40 minutos..." autocomplete="off"></textarea>
            </label>
            <label class="form-control w-full mt-5">
                <button class="btn" type="submit" @click.prevent="save">Registrar</button>
            </label>

        </form>
    </div>

</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { storage } from '../../firebase/firebaseInit';

import "firebase/auth";
import db from "../../firebase/firebaseInit"

const ref = storage.ref();

export default {
    setup: () => ({ v$: useVuelidate() }),
    data(){
        return{
            nombre:"",
            tipo:"",
            precio:0,
            comentario:"",
            validNombre:true,
            imagen:""
        }
    },
    validations:{
        nombre: {required},
        tipo: {required},
        precio: {required}
    },
    methods:{
        async save(){
            const validNombre = await this.v$.nombre.$validate();
            console.log(validNombre)
            const dataBase = db.collection("servicios").doc();
            await dataBase.set({
                nombre: this.nombre,
                tipo: this.tipo,
                precio: this.precio,
                comentario: this.comentario
            })
            const refImg = ref.child("imagenes/"+this.validNombre);
            const metaData = {
                contentType: 'image/jpeg'
            }
            refImg.put(this.imagen, metaData)
                .then((e) => {
                    console.log(e)
                })
            location.reload();
        },
        change(e){
            this.imagen = e.target.files[0];
            console.log(this.imagen)
        }
    }
}
</script>