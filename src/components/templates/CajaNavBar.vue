<template>
    <div class="flex flex-row justify-center w-full">
        <div class="border-b-2 border-accent flex flex-col lg:flex-row justify-between w-11/12">
            <div class="flex flex-row flex-nowrap items-center">
                <button @click="menufiltro()"
                    class="btn bg-transparent btn-circle m-y-1 border-transparent hover:brightness-110"><font-awesome-icon
                        :icon="['fas', 'filter']" /></button>
                    <div  v-if="activo"  class=" fixed z-10 mt-16 top-12 ml-3 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu" aria-orientation="vertical">
                        <!-- Active: "bg-gray-100", Not Active: "" -->
                        <a type="button" v-for="item in filtros" @click="filtrando(item)"
                            class="hover:bg-primary hover:text-white hover:brightness-150 rounded-md block px-4 py-2 text-sm">{{item}}
                        </a>
                    </div>
                <h1 class="p-3 font-semibold text-2xl grow ">{{ filtro }}</h1>

            </div>
            <div class="flex flex-row flex-nowrap items-center justify-end">
                <Search />
                <button
                    class="btn bg-transparent btn-circle m-y-1  border-transparent hover:brightness-110"><font-awesome-icon
                        :icon="['fas', 'list']" /></button>
                <button
                    class="btn bg-transparent btn-circle m-y-1 border-transparent hover:brightness-110"><font-awesome-icon
                        :icon="['fas', 'grip-vertical']" /></button>
            </div>
        </div>

    </div>

</template>

<script>
import Search from './Search.vue'

export default {
    props: {
        filtros: {
            default: ['Todo',]
        }
    },
    data() {
        return {
            filtro: 'Todo',
            activo: false
        }
    },
    components: {
        Search,
    },
    methods: {
        menufiltro() {
            this.activo = (!this.activo);
        },
        filtrando(item){
            this.filtro=item;
            //console.log(item);
            this.menufiltro();
            this.$emit("filtroselect",item);
        }
    }

}
</script>

<style></style>