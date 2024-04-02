<template>
    <div class="content" ref="princi">
        <div class="ficha" ref="ficha">
            <div class="cantidad" ref="aumentador">
                <button @click="disminuir()" id="izq">-</button>
                <p>{{ canti }}</p>
                <button @click="aumentar()" id="der">+</button>
            </div>


            <img class="imag" ref="imag" @click="activar()" src="../../assets/miku.png" alt="user">
            <div class="data" ref="data" @click="activar()">
                <h2>{{ titulo }}</h2>
                <p class="tipo">{{ tipo }}</p>
                <p class="precio">${{ precio }}</p>
            </div>
        </div>
        <button class="agregar" ref="boton" @click="agregar()">agregar</button>
        
    </div>
</template>

<script>
export default {
    props: {
        titulo: {
            default: 'titulo',
        },
        tipo: {
            default: "orden",
        },
        precio: {
            default: "49.80",
        },
    },
    data() {
        return {
            canti: 0
        }
    },
    computed: {},
    methods: {
        activar() {
            if (!this.$refs.princi.classList.contains("activo")) {
                this.$refs.princi.classList.add('activo');
                this.$refs.ficha.classList.add('activo');
                this.$refs.aumentador.classList.add('activo');
                this.$refs.imag.classList.add('activo');
                this.$refs.data.classList.add('activo');
                this.$refs.boton.classList.add('activo');
            }
        },
        aumentar() {
            this.canti++;
        },
        disminuir() {
            if (this.canti != 0)
                this.canti--;
        },
        agregar() {
            this.base();
            this.canti = 0;
        },
        base() {
            this.$refs.princi.classList.remove('activo');
            this.$refs.ficha.classList.remove('activo');
            this.$refs.aumentador.classList.remove('activo');
            this.$refs.imag.classList.remove('activo');
            this.$refs.data.classList.remove('activo');
            this.$refs.boton.classList.remove('activo');
        }
    }
}
</script>

<style scoped>
/**normal */
.content {
    font-family: Verdana, Geneva, Tahoma, sans-serif;

    position: relative;
    width: 80%;

    margin: 1rem;
    padding-top: 0rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;

    padding-bottom: auto;
}

h2 {
    font-size: larger;
    font-variant: small-caps;
}

.tipo {
    border-radius: 20px;
    font-size: small;
    margin: 0px 8%;
    @apply bg-accent text-primary;
}

.precio {
    color: rgb(8, 119, 8);
    -webkit-text-stroke: 1px rgb(12, 141, 46);
}

/**estructura ficha */
.ficha {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 20px;
    background-color: rgba(8, 8, 74, 0);


    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;

    padding: auto;

    transition-property: background-color;
    transition-duration: 0.5s;
    transition-timing-function: ease-in;
}


.data {
    border-radius: 20px;
    border-width: 1px;
    border-style: solid;

    /*config solo*/
    padding: 15px;
    padding-top: 30%;
    margin-top: 30%;

    width: 100%;

    display: flex;
    flex-direction: column;


    text-align: center;

    transition-property: margin;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
    @apply shadow-xl bg-secondary border-accent;
}

.imag {
    border-radius: 100%;
    position: absolute;
    object-fit: cover;
    left: 20%;
    top: 0;
    width: 60%;
    aspect-ratio: 1/1;
    @apply shadow-xl;
}

/***pagar-cantidad */
.imag.activo {
    display: none;
}

.content.activo {
    /**para pagar */
    padding-bottom: 15px;
}
.data.activo .precio{
    @apply text-success;
}
.ficha.activo {

    /**compra */
    padding: 15px;
    
    transition: background-color 0.5s ease;
    @apply shadow-2xl bg-primary;
}

.data.activo {
    /**config compra */
    margin: 0;
    margin-bottom: 10px;
    padding: 0px;
    background-color: rgba(240, 248, 255, 0);
    border-width: 0;
    height: 100%;
    transition-property: margin;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
    @apply shadow-none text-secondary;
}

.cantidad,
.agregar {
    display: none;
}


button {
    padding: 5px;
    @apply bg-secondary; 
}

#izq {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
}

#der {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
}

.cantidad.activo {
    @apply bg-neutral;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    width: 80%;
    aspect-ratio: 3/1;
    justify-content: space-between;
    align-items: center;

    font-size: large;
    margin: 5px;
}

.cantidad button {
    height: 100%;
    aspect-ratio: 1/1;
}

.agregar.activo {
    display: block;
    width: 80%;
    border-radius: 10px;
    position: absolute;
    
    bottom: 0;
    @apply bg-success text-secondary ;
    
}

button:hover {
    @apply brightness-90; 
}

.agregar:hover {
    @apply bg-success brightness-110; 
}


@media all and (min-width: 420px) {
    .content {
        width: 42%;
    }
}

@media all and (min-width: 600px) {
    .content {
        width: 25%;
    }
}

@media all and (min-width: 900px) {
    .content {
        width: 20%;
    }

}
</style>