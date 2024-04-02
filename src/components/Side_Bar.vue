<template>
    <nav>
        <ul class="menu">
            <li class="logo">{{ titulo }}</li>

            <li class="item" id="itemNav" v-for="(ruta, nombre) in rutas" :key="ruta">
                <RouterLink :to="Object.keys(ruta)[0]" @click="retraer">{{ nombre }}</RouterLink>
                <!----{{ ruta[Object.keys(ruta)[0]] }}    para optener el rol-->
            </li>
            <!---
            <li class="item button"><a href="#">Log In</a></li>
            <li class="item button secondary"><a href="#">Sign Up</a></li>
-->
            <li class="toggle" id="toggle"><button @click="desplegar"><font-awesome-icon
                        :icon="['fas', 'ellipsis-vertical']" /></button></li>
        </ul>
    </nav>
</template>

<script>

export default {
    name: "Side_Bar",
    props: {
        titulo: 'SideBar'
    },
    data() {
        return {
            rutas: {///agregar las rutas
                'Inicio': { '/': 'rol' },
                'Caja': { '/caja': 'rol' },
                'Inventario': { '/inventario': 'rol' }
            }
        }
    },
    computed: {},
    methods: {
        desplegar() {
            if (document.getElementById("itemNav").classList.contains("active")) {
                retraer();
            } else {
                const elementos = document.querySelectorAll('.item');
                elementos.forEach(el => el.classList.add('active'))
                
            }
        },
        retraer() {
            const elementos = document.querySelectorAll('.item');
                elementos.forEach(el => el.classList.remove('active'))
        }
    }
}

</script>

<style scoped>
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

button {
    font-size: large;
    height: 2rem;
    aspect-ratio: 1 / 1;

}

body {
    font-family: sans-serif;

}

nav {
    padding: 1px 5px;
    @apply bg-primary
}

ul {
    list-style-type: none;
}

a,
.toggle,
.logo {
    @apply text-neutral;
    /*color: white;*/
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.logo {
    /*color: white;*/
    text-decoration: none;
    font-size: 30px;
    text-align: justify;
}

.menu li {
    font-size: 16px;
    padding: 15px 5px;
    white-space: nowrap;
}


.toggle a {
    font-size: 20px;
}


/* Mobile menu */
.menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}

.toggle {
    order: 1;
}

.item.button {
    order: 2;
}

.item {
    width: 100%;
    text-align: center;
    order: 3;
    display: none;

}

.item.active {
    display: block;
}

.item:hover {
    @apply bg-info;
}

/* Tablet menu */
@media all and (min-width: 600px) {
    .menu {
        justify-content: center;
    }

    .logo {
        flex: 1;

    }

    .toggle {
        flex: 1;
        text-align: right;
    }

    .item.button {
        width: auto;
        order: 1;
        display: block;
    }

    .toggle {
        order: 2;
    }

    .button a {
        padding: 7.5px 15px;
        background: teal;
        border: 1px #006d6d solid;
    }


    .button a:hover {
        text-decoration: none;
    }

    .item:hover {
        background: none;
    }

}

/* Desktop menu */
@media all and (min-width: 900px) {
    .item {
        display: block;
        width: auto;
        order: 1;

    }

    .toggle {
        display: none;
    }

    .logo {
        order: 0;
        text-align: center;
    }


    .button {
        order: 2;
    }

    .menu li {
        padding: 15px 10px;
    }

    .menu li.button {
        padding-right: 0;
    }
}
</style>