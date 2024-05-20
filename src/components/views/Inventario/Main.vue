<template>
  <div class="text-primary">Ventas</div>
  <div class="stats shadow stats-vertical sm:stats-horizontal w-full sm:w-auto">
      <!-- Dashbpard de ventas por áreas
    <div class="stat bg-slate-300">
      <div class="stat-figure text-primary">
      </div>
      <div class="stat-title">Ventas</div>

      <div class="stat-value text-primary">$ {{ totalVenta }}</div>
      <div class="stat-desc text-error">
        <font-awesome-icon :icon="['fas', 'arrow-trend-down']" />
        90 (14%)
      </div>
      <div class="stat-desc text-error">
        $1,000 para recuperar la inversion
      </div>
    </div>

    <div class="stat bg-[#d5e4fa]">
      <div class="stat-figure text-3xl">
        <font-awesome-icon :icon="['fas', 'utensils']" />
      </div>
      <div class="stat-title">Taqueria</div>
      <div class="stat-value ">- $10,000</div>
      <div class="stat-desc">21% mas que el mes pasado</div>
    </div>
    <div class="stat bg-[#e5d6fb] ">
      <div class="stat-figure text-3xl">
        <font-awesome-icon :icon="['fas', 'store']" />
      </div>
      <div class="stat-title">Estetica</div>
      <div class="stat-value ">- $10,000</div>
      <div class="stat-desc">21% mas que el mes pasado</div>
    </div>
  -->
  </div>


  <div class="mt-5 overflow-auto h-[calc(100vh-theme('spacing.7'))] min-h-72">
    <table class="table border-collapse">
      <!-- head -->
      <thead class="sticky z-10 top-0 bg-gray-100">
        <tr>
          <th></th>
          <th>Sucursal</th>
          <th class="hidden md:table-cell ">Total</th>
          <th class="hidden sm:table-cell ">Vendedor</th>
          <th class="hidden lg:table-cell ">Fecha y dia</th>
          <th></th>
        </tr>
      </thead>

      <tbody class="">
        <tr v-for="(ticket, index) in ventas" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="flex items-center gap-3">
              <div>
                <div class="font-bold">{{ ticket.sucursal=="Todas"? "General" : ticket.sucursal}}</div>
              </div>
            </div>
          </td>
          <td class="hidden md:table-cell ">{{ ticket.total }}</td>

          <td class="hidden sm:table-cell ">
              <p class="badge badge-success text-white">{{ ticket.vendedor }}</p>
          </td>

          <td class="hidden lg:table-cell text-nowrap">{{ ticket.dia}} {{ ticket.fecha }}</td>
          <th v-if="false">
            <button class="btn btn-ghost btn-xs " onclick="detalle.showModal()"
              @click="nuevoDetalle(ticket)">Detalles</button>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import "firebase/auth";
import db from "../../../firebase/firebaseInit"
import firebase from "firebase/app";

export default {

  data() {
    return {
      ventas: [],
      totalVenta: 0,
    };
  },
  methods: {
  },
  async created() {
    const dataBase = await db.collection('ticket');
    const dbResults = await dataBase.get();
    console.log("VENTAS", dbResults)
    dbResults.forEach(async (doc) => {
      const data = {
        dia: doc.data().dia,
        fecha: doc.data().fecha,
        sucursal: doc.data().sucursal,
        vendedor: (await doc.data().vendedor.get()).data().nombre,
        total: doc.data().total,
        id: doc.id,

      }
      
      this.totalVenta += doc.data().total;
      this.ventas.push(data);
    });

  },
}
</script>

<style></style>
