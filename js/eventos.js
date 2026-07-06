// Este archivo responde a los eventos del DOM
// interactuando con el usuario y los datos de modulos.js

document.addEventListener("DOMContentLoaded", () => {

    // Mostrar productos y carrito al iniciar
    mostrarProductos();
    mostrarCarrito();

    //==============================
    // BOTÓN AGREGAR PRODUCTO
    //==============================

    const btnAgregar = document.querySelector("#btn-agregar");

    btnAgregar.addEventListener("click", () => {

        document.querySelector("#form-agregar").style.display = "block";

    });

    //==============================
    // CERRAR FORMULARIO
    //==============================

    document.querySelector(".btn-cerrar-formAgregar")
    .addEventListener("click", (e)=>{

        e.preventDefault();

        document.querySelector("#form-agregar").style.display = "none";

    });

    //==============================
    // AGREGAR PRODUCTO
    //==============================

    const formAgregar = document.querySelector("#form-agregar");

    formAgregar.addEventListener("submit",(e)=>{

        e.preventDefault();

        const nuevoProducto = {

            nombre: formAgregar.nombre.value,

            precio: Number(formAgregar.precio.value),

            codigo: Number(formAgregar.codigo.value)

        };

        agregarProducto(nuevoProducto);

        formAgregar.reset();

        formAgregar.style.display = "none";

    });

    //==============================
    // BUSCAR PRODUCTO
    //==============================

    const formBuscar = document.querySelector("#form-buscar");

    formBuscar.addEventListener("submit",(e)=>{

        e.preventDefault();

        const productoBuscado = {

            nombre: formBuscar.nombre.value,

            codigo: Number(formBuscar.codigo.value)

        };

        buscarProductos(productoBuscado);

    });

    //==============================
    // LIMPIAR FILTROS
    //==============================

    document.querySelector("#btn-filtros")
    .addEventListener("click",()=>{

        formBuscar.reset();

        mostrarProductos();

    });

    //==============================
    // VACIAR CARRITO
    //==============================

    document.querySelector("#btn-vaciar")
    .addEventListener("click",()=>{

        vaciarCarrito();

    });

});