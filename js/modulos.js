//=========================================
// CARGA INICIAL DE PRODUCTOS
//=========================================

let productos = JSON.parse(localStorage.getItem("productos")) || [];

if(productos.length == 0){

    productos = [

        {
            nombre:"Leche",
            precio:1800,
            codigo:1
        },

        {
            nombre:"Pan",
            precio:1200,
            codigo:2
        },

        {
            nombre:"Arroz",
            precio:1500,
            codigo:3
        },

        {
            nombre:"Fideos",
            precio:1300,
            codigo:4
        },

        {
            nombre:"Agua",
            precio:900,
            codigo:5
        },

        {
            nombre:"Gaseosa",
            precio:2100,
            codigo:6
        },

        {
            nombre:"Aceite",
            precio:2500,
            codigo:7
        },

        {
            nombre:"Azúcar",
            precio:1400,
            codigo:8
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

                <p>Código: ${p.codigo}</p>

            </div>

            <div class="botones">

                <button class="btn-agregar-carrito" onclick="agregarAlCarrito(${p.codigo})">
                    Agregar al carrito
                </button>

                <button class="btn-editar" onclick="abrirEditar(${p.codigo})">
                    Editar
                </button>

                <button class="btn-eliminar-producto" onclick="eliminarProducto(${p.codigo})">
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

        p.codigo == productoBuscado.codigo;

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

    const producto = productos.find(p => p.codigo == codigo);

    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existe = carrito.find(p => p.codigo == codigo);

    if(existe){

        existe.cantidad++;

    }else{

        carrito.push({
            codigo: producto.codigo,
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

            <button onclick="eliminarDelCarrito(${p.codigo})">
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

const eliminarDelCarrito = (codigo)=>{

    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito = carrito.filter(p => p.codigo != codigo);

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

const eliminarProducto = (codigo)=>{

    productos = JSON.parse(localStorage.getItem("productos")) || [];

    productos = productos.filter(p => p.codigo != codigo);

    localStorage.setItem("productos", JSON.stringify(productos));

    // Si el producto estaba en el carrito, también lo eliminamos
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(p => p.codigo != codigo);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarMensaje("Producto eliminado del listado");

    mostrarProductos();

    mostrarCarrito();

}

//=========================================
// ABRIR FORMULARIO EDITAR
//=========================================

const abrirEditar = (codigo)=>{

    productos = JSON.parse(localStorage.getItem("productos")) || [];

    const producto = productos.find(p => p.codigo == codigo);

    if(!producto) return;

    const formEditar = document.querySelector("#form-editar");

    formEditar.nombre.value = producto.nombre;

    formEditar.precio.value = producto.precio;

    formEditar.codigoOriginal.value = producto.codigo;

    formEditar.style.display = "block";

    formEditar.scrollIntoView({ behavior: "smooth" });

}

//=========================================
// EDITAR PRODUCTO (UPDATE)
//=========================================

const editarProducto = (e)=>{

    e.preventDefault();

    const formEditar = document.querySelector("#form-editar");

    const codigoOriginal = Number(formEditar.codigoOriginal.value);

    const nuevoNombre = formEditar.nombre.value;

    const nuevoPrecio = Number(formEditar.precio.value);

    productos = JSON.parse(localStorage.getItem("productos")) || [];

    const indice = productos.findIndex(p => p.codigo == codigoOriginal);

    if(indice !== -1){

        productos[indice].nombre = nuevoNombre;

        productos[indice].precio = nuevoPrecio;

        localStorage.setItem("productos", JSON.stringify(productos));

        // Actualizar también en el carrito si existe
        carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const enCarrito = carrito.find(p => p.codigo == codigoOriginal);

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