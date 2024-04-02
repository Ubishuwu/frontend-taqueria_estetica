<template>
    <nav>
        <ul class="menu">
            <li class="logo">{{ titulo }}</li>

            <li class="item" id="item" v-for="(ruta, nombre) in rutas" :key="ruta">
                <RouterLink :to="Object.keys(ruta)[0]">{{ nombre }}</RouterLink>
                <!----{{ ruta[Object.keys(ruta)[0]] }}    para optener el rol-->
            </li>
<!---
            <li class="item button"><a href="#">Log In</a></li>
            <li class="item button secondary"><a href="#">Sign Up</a></li>
-->
            <li class="toggle" id="toggle" ><button @click="desplegar"><font-awesome-icon :icon="['fas', 'ellipsis-vertical']" /></button></li>
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
                'Inicio': {'/':'rol'},
                'Caja': {'/caja':'rol'},
                'Inventario': {'/inventario':'rol'}
            }
        }
    },
    computed: {},
    methods: {
        desplegar() {
            if (document.getElementById("item").classList.contains("active")) {
                //document.getElementById("item").classList.remove("active");
                const elementos = document.querySelectorAll('.item');
                elementos.forEach(el => el.classList.remove('active'))
            } else {
                ///document.getElementById("item").classList.add("active");
                const elementos = document.querySelectorAll('.item');
                elementos.forEach(el => el.classList.add('active'))
            }
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

button{
    font-size: large;
    height: 2rem;
    aspect-ratio: 1 / 1 ;

}

body {
    font-family: sans-serif;
    background: #f1f1f1;
}

nav {
    background: #222;
    padding: 1px 5px;
}

ul {
    list-style-type: none;
}

a,.toggle{
    color: white;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.logo {
    color: white;
    text-decoration: none;
    font-size: 25px;
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

.button.secondary {
    border-bottom: 1px #444 solid;
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

    .button.secondary {
        border: 0;
    }

    .button a {
        padding: 7.5px 15px;
        background: teal;
        border: 1px #006d6d solid;
    }

    .button.secondary a {
        background: transparent;
    }

    .button a:hover {
        text-decoration: none;
    }

    .button:not(.secondary) a:hover {
        background: #006d6d;
        border-color: #005959;
    }

    .button.secondary a:hover {
        color: #ddd;
    }
}

/* Desktop menu */
@media all and (min-width: 900px) {
    .item {
        display: block;
        width: auto;
    }

    .toggle {
        display: none;
    }

    .logo {
        order: 0;
        text-align: center;
    }

    .item {
        order: 1;
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