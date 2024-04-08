<template>
    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 shadow-accent shadow-xl">
        <div class="flex flex-1 justify-between sm:hidden">
            <button @click="prev_pagina" :class="['relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
                , { 'btn-disabled bg-accent': pag == 1 }
            ]">Anterior</button>
            <p>
                <span class="font-medium text-sm">pagina: {{ pag }}</span>
            </p>
            <button @click="next_pagina" :class="['relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
                , { 'btn-disabled bg-accent': pag == paginas }
            ]">Siguiente</button>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-gray-700">
                    Mostrando del
                    <span class="font-medium">{{ ElemActualInicio }}</span>
                    al
                    <span class="font-medium">{{ ElemActualFin }}</span>
                    de
                    <span class="font-medium">{{ elementosmax }}</span>
                    resultados
                </p>
                <p>
                    <span class="font-medium text-sm">pagina: {{ pag }}</span>
                </p>
            </div>
            <div>
                <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <a v-if="pag > 1" @click="prev_pagina"
                        class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span class="sr-only">Anterior</span>
                        <font-awesome-icon :icon="['fas', 'chevron-left']" />
                    </a>


                    <!----1-->
                    <button @click="pag != 1 ? setpagina(1) : null" aria-current="page" :class="[
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-accent hover:bg-secondary hover:brightness-90 focus:z-20 focus:outline-offset-0',
                { 'bg-info text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info btn-disabled ': pag == 1 },
            ]">1</button>

                    <span :class="[
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0',
                { 'md:hidden': !(pag == numPaginas[1] && pag > 4 && pag < paginas - 2) || paginas < 8 },
                { 'hidden md:inline-flex': !(pag == numPaginas[3]) || paginas < 5 }
            ]">...</span>

                    <!---2-->
                    <button v-if="paginas > 1" @click="pag != 2 ? setpagina(2) : null" aria-current="page" :class="[
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-accent hover:bg-secondary hover:brightness-90 focus:z-20 focus:outline-offset-0',
                { 'bg-info text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info btn-disabled ': pag == 2 }
                , { 'md:hidden': (pag == numPaginas[1] && pag > 4) && paginas > 7 },
                { 'hidden md:inline-flex': (pag > 3 && pag < paginas) && paginas > 5 }
            ]">2</button>

                    <!----numPaginas[0]-->
                    <button v-if="paginas > 2" @click="pag != numPaginas[0] ? setpagina(numPaginas[0]) : null"
                        aria-current="page" :class="[
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-accent hover:bg-secondary hover:brightness-90 focus:z-20 focus:outline-offset-0',
                { 'bg-info text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info btn-disabled ': pag == numPaginas[0] }
                , { 'md:hidden': (pag == numPaginas[2]) && paginas > 7 },
                { 'hidden md:inline-flex': (pag < 2 || pag >= numPaginas[2]) && paginas > 5 }
            ]">{{
                numPaginas[0] }}</button>

                    <span :class="['relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0'
                , { 'md:hidden': (pag < numPaginas[2]) || paginas < 8 },
                { 'hidden md:inline-flex': (pag >= numPaginas[0] && pag <= numPaginas[3]) || paginas < 5 }
            ]">...</span>

                    <!---numPaginas[1]-->
                    <button v-if="paginas > 3" @click="pag != numPaginas[1] ? setpagina(numPaginas[1]) : null"
                        aria-current="page" :class="[
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-accent hover:bg-secondary hover:brightness-90 focus:z-20 focus:outline-offset-0',
                { 'bg-info text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info btn-disabled ': pag == numPaginas[1] }
                , { 'md:hidden': (pag < numPaginas[0] || pag > numPaginas[2]) && paginas > 7 },
                { 'hidden md:inline-flex': (pag < numPaginas[0] || pag > numPaginas[2]) && paginas > 5 }
            ]">{{
                numPaginas[1] }}</button>

                    <span :class="['relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0'
                , { 'md:hidden': (pag > numPaginas[0]) || paginas < 8 },
                { 'hidden md:inline-flex': true }
            ]">...</span>

                    <!---numPaginas[2]-->
                    <button v-if="paginas > 4" @click="pag != numPaginas[2] ? setpagina(numPaginas[2]) : null"
                        aria-current="page" :class="[
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-accent hover:bg-secondary hover:brightness-90 focus:z-20 focus:outline-offset-0',
                { 'bg-info text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info btn-disabled ': pag == numPaginas[2] }
                , { 'md:hidden': (pag == numPaginas[0]) && paginas > 7 },
                { 'hidden md:inline-flex': (pag > numPaginas[3] || pag <= numPaginas[0]) && paginas > 5 }
            ]">{{
                numPaginas[2] }}</button>

                    <!---numPaginas[3]-->
                    <button v-if="paginas > 6" @click="pag != numPaginas[3] ? setpagina(numPaginas[3]) : null"
                        aria-current="page" :class="[
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-accent hover:bg-secondary hover:brightness-90 focus:z-20 focus:outline-offset-0',
                { 'bg-info text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info btn-disabled ': pag == numPaginas[3] }
                , { 'md:hidden': (pag == numPaginas[1] && pag < numPaginas[3]) && paginas > 7 },
                { 'hidden md:inline-flex': (pag > 1 && pag < (paginas - 2)) && paginas > 5 }
            ]">{{
                numPaginas[3] }}</button>

                    <span :class="['relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0'
                , { 'md:hidden': !(pag == numPaginas[1] && pag > 3 && pag < paginas - 2) || paginas < 8 },
                { 'hidden md:inline-flex': true }
            ]">...</span>

                    <!----paginas-->
                    <button v-if="paginas > 5" @click="pag != paginas ? setpagina(paginas) : null" aria-current="page"
                        :class="[
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-accent hover:bg-secondary hover:brightness-90 focus:z-20 focus:outline-offset-0',
                { 'bg-info text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info btn-disabled ': pag == paginas }]">{{
                paginas }}</button>

                    <a v-if="pag < paginas" @click="next_pagina"
                        class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span class="sr-only">Siguiente</span>
                        <font-awesome-icon :icon="['fas', 'chevron-right']" />
                    </a>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    props: {
        paginas: {
            type: Number,
            default: 10,
        },
        elementosmax: {
            type: Number,
            default: 110,

        },
        pag: {
            type: Number,
            default: 1,
        },
        elementosxpagina: {
            type: Number,
            default: 12,
        }
    },
    data() {
        return {
            ElemActualInicio: 1,
            ElemActualFin: 1,
            numPaginas: [3, 4, 5, 6]
        }
    },
    computed: {},
    methods: {
        next_pagina() {
            this.$router.push('/caja#cajaProductosInicio');
            /////console.log("clik")
            this.$emit('nueva_pagina', (this.pag + 1));
        },
        prev_pagina() {
            this.$emit('nueva_pagina', (this.pag - 1));
        },
        pagina_elemento() {
            const fin = this.pag * this.elementosxpagina;
            if (fin <= this.elementosmax)
                this.ElemActualFin = fin;
            else
                this.ElemActualFin = this.elementosmax;

        },
        setpagina(pag) {
            this.$emit('nueva_pagina', pag);
        },
        numeroPaginas() {
            if (this.paginas <= 7) {
                ///console.log("caso 0");
                this.numPaginas[0] = 3;
                this.numPaginas[1] = 4;
                this.numPaginas[2] = 5;
            } else {
                if (this.pag == 1 || this.pag == 2 || this.pag == (this.paginas - 1) || this.pag == this.paginas) {
                    ///console.log("caso 1");
                    this.numPaginas[0] = 3;
                    this.numPaginas[1] = 4;
                    this.numPaginas[2] = this.paginas - 2;
                } else
                    if (this.pag == 3) {
                        ///console.log("caso 2");
                        this.numPaginas[1] = 4;
                    } else
                        if (this.pag == (this.numPaginas[3] - 1)) {
                            ///console.log("caso 3");
                            this.numPaginas[1] = this.pag - 1;
                            this.numPaginas[2] = this.pag;
                        } else
                            if (this.pag == 4) {
                                ///console.log("caso 4");
                                this.numPaginas[0] = 3;
                                this.numPaginas[1] = 4;
                                this.numPaginas[2] = 5;
                            } else
                                if (this.pag == (this.numPaginas[3] - 2)) {
                                    ///console.log("caso 5");
                                    this.numPaginas[0] = this.pag - 1;
                                    this.numPaginas[1] = this.pag;
                                    this.numPaginas[2] = this.pag + 1;
                                } else
                                    if (this.pag > 4 && this.pag < (this.numPaginas[3] - 2)) {
                                        ///console.log("caso 6");
                                        this.numPaginas[0] = this.pag - 1;
                                        this.numPaginas[1] = this.pag;
                                        this.numPaginas[2] = this.pag + 1;
                                    }

            }
        }
    },
    mounted() {
        this.ElemActualInicio = (this.pag - 1) * this.elementosxpagina + 1;
        this.numPaginas[3] = this.paginas - 1;
        this.pagina_elemento();
        this.numeroPaginas();
    },
    watch: {
        pag(newValue) {
            this.ElemActualInicio = (this.pag - 1) * this.elementosxpagina + 1;
            this.pagina_elemento();
            this.numeroPaginas();
        },
        elementosmax(newValue) {
            this.pagina_elemento();
        },
        paginas(newValue) {
            this.numPaginas[3] = this.paginas - 1;
        }
    }
}

</script>