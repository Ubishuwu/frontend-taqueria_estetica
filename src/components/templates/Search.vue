<template>
        <div class="search m-2">
            <input class="p-1.5 pe-10 ps-3 " placeholder="Buscar..." type="text">
            <button class="rounded-full h-full absolute bg-info top-0 right-0 text-secondary cursor-pointer " type="submit"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
        </div>
</template>

<script>
</script>

<style scoped>
.search {
  display: inline-block;
  position: relative;
}

.search input[type="text"] {
  border: none;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.search button[type="submit"] {
    aspect-ratio: 1/1;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: .9s ease;

}



.search button[type="submit"]:hover {
  transform: scale(1.03);
  color: rgb(255, 255, 255);
  background-color: blue;
}

</style>