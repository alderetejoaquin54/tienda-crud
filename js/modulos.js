//=========================================
// CARGA INICIAL DE PRODUCTOS
//=========================================

let productos = JSON.parse(localStorage.getItem("productos")) || [];

if(productos.length == 0){

    productos = [

        {
            nombre:"Leche",
            precio:1800,
            seccion:"Heladera"
        },

        {
            nombre:"Pan",
            precio:1200,
            seccion:"Panaderia"
        },

        {
            nombre:"Arroz",
            precio:1500,
            seccion:"Almacen"
        },

        {
            nombre:"Fideos",
            precio:1300,
            seccion:"Almacen"
        },

        {
            nombre:"Agua",
            precio:900,
            seccion:"Heladera"
        },

        {
            nombre:"Gaseosa",
            precio:2100,
            seccion:"Heladeras"
        },

        {
            nombre:"Aceite",
            precio:2500,
            seccion:"Almacen"
        },

        {
            nombre:"Azúcar",
            precio:1400,
            seccion:"Almacen"
        }

    ];

    localStorage.setItem("productos", JSON.stringify(productos));

}

//=========================================
// AGREGAR PRODUCTO
//=========================================

const agregarProducto = (nuevoProducto)=>{

    productos = JSON.parse(localStorage.getItem("productos")) || [];

    productos.push(nuevoProducto);

    localStorage.setItem("productos", JSON.stringify(productos));

    mostrarMensaje("Producto agregado");

    mostrarProductos();

}

//=========================================
// MOSTRAR PRODUCTOS
//=========================================

const mostrarProductos = (productosEncontrados)=>{

    const contenedor = document.querySelector("#listadoProductos");

    contenedor.innerHTML = "";

    const lista = productosEncontrados
        ? productosEncontrados
        : JSON.parse(localStorage.getItem("productos")) || [];

    if(lista.length === 0){

        contenedor.innerHTML = "<p>No hay productos para mostrar.</p>";

        return;

    }

    lista.forEach(p=>{

        contenedor.innerHTML += `

        <div class="producto">

            <div class="info">

                <p><b>${p.nombre}</b></p>

                <p>Precio: $${p.precio}</p>

                <p>Seccion: ${p.seccion}</p>

            </div>

            <div class="botones">

                <button class="btn-agregar-carrito" onclick="agregarAlCarrito(${p.seccion})">
                    Agregar al carrito
                </button>

                <button class="btn-editar" onclick="abrirEditar(${p.seccion})">
                    Editar
                </button>

                <button class="btn-eliminar-producto" onclick="eliminarProducto(${p.seccion})">
                    Eliminar
                </button>

            </div>

        </div>

        `;

    });

}

//=========================================
// BUSCAR PRODUCTOS
//=========================================

const buscarProductos = (productoBuscado)=>{

    productos = JSON.parse(localStorage.getItem("productos")) || [];

    const encontrados = productos.filter(p=>{

        return p.nombre.toLowerCase().includes(productoBuscado.nombre.toLowerCase())

        ||

        p.seccion == productoBuscado.seccion;

    });

    mostrarProductos(encontrados);

}//=========================================
// CARRITO
//=========================================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//=========================================
// AGREGAR AL CARRITO
//=========================================

const agregarAlCarrito = (codigo)=>{

    productos = JSON.parse(localStorage.getItem("productos")) || [];

    const producto = productos.find(p => p.seccion == seccion);

    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existe = carrito.find(p => p.seccion == seccion);

    if(existe){

        existe.cantidad++;

    }else{

        carrito.push({
            seccion: producto.seccion,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });

    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarMensaje("Producto agregado al carrito");

    mostrarCarrito();

}

//=========================================
// MOSTRAR CARRITO
//=========================================

const mostrarCarrito = ()=>{

    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const contenedor = document.querySelector("#listadoCarrito");

    contenedor.innerHTML = "";

    let total = 0;

    if(carrito.length == 0){

        contenedor.innerHTML = "<p>El carrito está vacío.</p>";

    }

    carrito.forEach(p=>{

        total += p.precio * p.cantidad;

        contenedor.innerHTML += `

        <div class="itemCarrito">

            <div>

                <p><b>${p.nombre}</b></p>

                <p>$${p.precio} x ${p.cantidad}</p>

            </div>

            <button onclick="eliminarDelCarrito(${p.seccion})">
                Eliminar
            </button>

        </div>

        `;

    });

    document.querySelector("#total").textContent =
        "Total: $" + total;

}

//=========================================
// ELIMINAR DEL CARRITO
//=========================================

const eliminarDelCarrito = (seccion)=>{

    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito = carrito.filter(p => p.seccion != seccion);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarMensaje("Producto eliminado");

    mostrarCarrito();

}

//=========================================
// VACIAR CARRITO
//=========================================

const vaciarCarrito = ()=>{

    carrito = [];

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarMensaje("Carrito vaciado");

    mostrarCarrito();

}

//=========================================
// ELIMINAR PRODUCTO DEL LISTADO
//=========================================

const eliminarProducto = (seccion)=>{

    productos = JSON.parse(localStorage.getItem("productos")) || [];

    productos = productos.filter(p => p.seccion != seccion);

    localStorage.setItem("productos", JSON.stringify(productos));

    // Si el producto estaba en el carrito, también lo eliminamos
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(p => p.seccion != seccion);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarMensaje("Producto eliminado del listado");

    mostrarProductos();

    mostrarCarrito();

}

//=========================================
// ABRIR FORMULARIO EDITAR
//=========================================

const abrirEditar = (seccion)=>{

    productos = JSON.parse(localStorage.getItem("productos")) || [];

    const producto = productos.find(p => p.seccion == seccion);

    if(!producto) return;

    const formEditar = document.querySelector("#form-editar");

    formEditar.nombre.value = producto.nombre;

    formEditar.precio.value = producto.precio;

    formEditar.seccionOriginal.value = producto.seccionOriginal;

    formEditar.style.display = "block";

    formEditar.scrollIntoView({ behavior: "smooth" });

}

//=========================================
// EDITAR PRODUCTO (UPDATE)
//=========================================

const editarProducto = (e)=>{

    e.preventDefault();

    const formEditar = document.querySelector("#form-editar");

    const seccionOriginal = Number(formEditar.seccionOriginal.value);

    const nuevoNombre = formEditar.nombre.value;

    const nuevoPrecio = Number(formEditar.precio.value);

    productos = JSON.parse(localStorage.getItem("productos")) || [];

    const indice = productos.findIndex(p => p.codigo == seccionOriginal);

    if(indice !== -1){

        productos[indice].nombre = nuevoNombre;

        productos[indice].precio = nuevoPrecio;

        localStorage.setItem("productos", JSON.stringify(productos));

        // Actualizar también en el carrito si existe
        carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const enCarrito = carrito.find(p => p.seccion == seccionOriginal);

        if(enCarrito){

            enCarrito.nombre = nuevoNombre;

            enCarrito.precio = nuevoPrecio;

            localStorage.setItem("carrito", JSON.stringify(carrito));

            mostrarCarrito();

        }

        mostrarMensaje("Producto editado correctamente");

        mostrarProductos();

    }

    formEditar.reset();

    formEditar.style.display = "none";

}