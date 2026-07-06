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

    if(productosEncontrados){

        productosEncontrados.forEach(p=>{

            contenedor.innerHTML += `

            <div class="producto">

                <div class="info">

                    <p><b>${p.nombre}</b></p>

                    <p>Precio: $${p.precio}</p>

                    <p>Código: ${p.codigo}</p>

                </div>

                <div class="botones">

                    <button onclick="agregarAlCarrito(${p.codigo})">

                        Agregar al carrito

                    </button>

                </div>

            </div>

            `;

        });

    }

    else{

        productos = JSON.parse(localStorage.getItem("productos")) || [];

        productos.forEach(p=>{

            contenedor.innerHTML += `

            <div class="producto">

                <div class="info">

                    <p><b>${p.nombre}</b></p>

                    <p>Precio: $${p.precio}</p>

                    <p>Código: ${p.codigo}</p>

                </div>

                <div class="botones">

                    <button onclick="agregarAlCarrito(${p.codigo})">

                        Agregar al carrito

                    </button>

                </div>

            </div>

            `;

        });

    }

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