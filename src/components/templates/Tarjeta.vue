<template>
  <div
    :class="['w-full ', { flex: lista == true }, { 'hidden ': lista == false }]"
  >
    <div
      :class="[
        'flex flex-row flex-nowrap w-full mx-5 my-2 p-2 border border-accent rounded-lg bg-secondary shadow-md items-center justify-center',
        {
          'brightness-50':
            this.stock_restante <= 0 && this.producto.tipo == 'producto',
        },
      ]"
    >
      <img
        class="rounded-full h-20 aspect-square object-cover border-2 border-gray-100"
        @click="activar()"
        :src="`../src/assets/${producto.tipo}.png`"
        alt="user"
      />
      <div class="mx-3 m-0 justify-center items-center">
        <h2>{{ producto.nombre }}</h2>
        <div class="flex-row flex flex-nowrap">
          <p class="my-3 text-gray-500">{{ producto.tipo }}</p>
          <p class="m-3">${{ producto.precio }}</p>
        </div>
      </div>

      <div class="grow flex flex-nowrap justify-end items-center">
        <button
          @click="disminuir()"
          id="izq"
          class="btn-sm btn-square shadow-md border"
        >
          -
        </button>
        <p class="h-8 w-8 shadow-md border text-center text-">{{ canti }}</p>
        <button
          @click="aumentar()"
          id="der"
          class="btn-sm btn-square shadow-md border"
        >
          +
        </button>
        <button
          class="ml-2 rounded-md border border-success hover:bg-success hover:text-white hover:brightness-125"
          ref="boton"
          @click="agregar()"
        >
          agregar
        </button>
      </div>
    </div>
    <div
      v-if="this.stock_restante <= 0 && this.producto.tipo == 'producto'"
      class="flex absolute -rotate-12 my-1 items-center bg-accent rounded-lg border-b-2 border-primary"
    >
      <span
        class="m-3 mx-6 text-red-600 brightness-150 sm:text-3xl text-xl font-bold"
        >Sin Stock</span
      >
    </div>
  </div>
  <div
    :class="[
      ' m-3 w-2/4 min-[420px]:w-2/6 min-[550px]:w-4/12 sm:w-3/12 md:w-5/12 min-[900px]:w-3/12 lg:w-3/12 min-[1120px]:w-1/5 xl:w-1/6',
      { hidden: lista == true },
      { 'flex content': lista == false },
    ]"
    ref="princi"
  >
    <div class="ficha" ref="ficha">
      <div
        v-if="this.stock_restante <= 0 && this.producto.tipo == 'producto'"
        class="absolute h-full w-full bg-slate-500 bg-opacity-65 rounded-2xl z-30 justify-center items-center flex"
      >
        <div class="-rotate-45">
          <span class="text-white sm:text-3xl text-xl">Sin Stock</span>
        </div>
      </div>
      <div class="cantidad" ref="aumentador">
        <button @click="disminuir()" id="izq">-</button>
        <p>{{ canti }}</p>
        <button @click="aumentar()" id="der">+</button>
      </div>

      <img
        class="imag border-2 border-accent shadow-sm"
        ref="imag"
        @click="activar()"
        :src="`../src/assets/${producto.tipo}.png`"
        :alt="`${producto.tipo}`"
      />
      <div class="data" ref="data" @click="activar()">
        <h2>{{ producto.nombre }}</h2>
        <p class="tipo">{{ producto.tipo }}</p>
        <p class="precio">${{ producto.precio }}</p>
      </div>
    </div>
    <button class="agregar" ref="boton" @click="agregar()">agregar</button>
  </div>
</template>

<script>
export default {
  props: {
    producto: {
      type: Object,
      required: true,
    },
    stock_venta: {
      type: Number,
      default: 0,
    },
    lista: {
      default: false,
    },
  },
  data() {
    return {
      canti: 0,
      stock: 0,
      stock_restante: null,
    };
  },
  mounted() {
    //console.log(this.producto.nombre, this.stock_venta)
    this.stock = this.stock_venta;
    if (this.producto.tipo.toLowerCase() == "producto")
      if (this.stock_venta != 0) {
        this.stock_restante = this.producto.cantidad - this.stock;
      } else this.stock_restante = this.producto.cantidad;
  },
  computed: {},
  watch: {
    stock_venta() {
      this.stock = this.stock_venta;
      if (this.producto.tipo.toLowerCase() == "producto")
        if (this.stock_venta != 0) {
          this.stock_restante = this.producto.cantidad - this.stock;
        } else this.stock_restante = this.producto.cantidad;
    },
  },
  methods: {
    activar() {
      if (!(this.stock_restante <= 0 && this.producto.tipo == "producto")) {
        if (!this.$refs.princi.classList.contains("activo")) {
          this.$refs.princi.classList.add("activo");
          this.$refs.ficha.classList.add("activo");
          this.$refs.aumentador.classList.add("activo");
          this.$refs.imag.classList.add("activo");
          this.$refs.data.classList.add("activo");
          this.$refs.boton.classList.add("activo");
        }
      }
    },
    aumentar() {
      if (this.stock_restante > this.canti || this.stock_restante == null)
        this.canti++;
    },
    disminuir() {
      if (this.canti != 0 || this.stock_restante == null) this.canti--;
    },
    agregar() {
      if (this.canti != 0) {
        this.stock = this.stock + this.canti;
        if (this.producto.tipo == "producto")
          this.stock_restante = this.producto.cantidad - this.stock;

        this.$emit("carrito", {
          cantidad: this.stock,
          producto: this.producto,
        });
        this.canti = 0;
      }
      this.base();
    },
    base() {
      this.$refs.princi.classList.remove("activo");
      this.$refs.ficha.classList.remove("activo");
      this.$refs.aumentador.classList.remove("activo");
      this.$refs.imag.classList.remove("activo");
      this.$refs.data.classList.remove("activo");
      this.$refs.boton.classList.remove("activo");
    },
  },
};
</script>

<style scoped>
/**normal */
.content {
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  position: relative;

  /*margin: 1rem;*/
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

.data.activo .precio {
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
  @apply bg-success text-secondary;
}

button:hover {
  @apply brightness-90;
}

.agregar:hover {
  @apply bg-success brightness-110;
}
</style>
