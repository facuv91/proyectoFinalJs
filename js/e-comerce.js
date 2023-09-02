

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const IVA_RATE = 0.21;
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total');
const botonComprar = document.getElementById('comprar');
const botonLimpiar = document.getElementById('limpiar');
const productos = document.querySelectorAll('.producto');

function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function calcularIVA(producto) {
  return producto.precio * IVA_RATE;
}

function actualizarCarrito() {
  listaCarrito.innerHTML = '';

  const carritoConIVA = carrito.map(producto => ({
    ...producto,
    iva: calcularIVA(producto),
  }));

  const subtotal = carritoConIVA.reduce((subtotal, producto) => subtotal + producto.precio, 0);
  const totalIVA = carritoConIVA.reduce((total, producto) => total + producto.iva, 0);
  const totalConIVA = subtotal + totalIVA;

  carritoConIVA.forEach((producto, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      ${producto.nombre} - $${producto.precio.toFixed(2)} (IVA: $${producto.iva.toFixed(2)})
      <button class="eliminar" data-index="${index}">Eliminar</button>
    `;
    listaCarrito.appendChild(listItem);
  });

  totalCarrito.textContent = `Subtotal: $${subtotal.toFixed(2)} | IVA: $${totalIVA.toFixed(2)} | Total con IVA: $${totalConIVA.toFixed(2)}`;
}

function agregarProducto(e) {
  const productoSeleccionado = e.target.parentElement;
  const nombreProducto = productoSeleccionado.querySelector('span:nth-child(2)').textContent;
  const precioProducto = parseFloat(productoSeleccionado.querySelector('.precio').textContent.slice(1));
  const imagenProducto = productoSeleccionado.querySelector('img').src;

  carrito.push({ nombre: nombreProducto, precio: precioProducto, imagen: imagenProducto });
  guardarCarritoEnLocalStorage();
  actualizarCarrito();
}


function eliminarProducto(e) {
  const index = e.target.getAttribute('data-index');
  carrito.splice(index, 1);
  guardarCarritoEnLocalStorage();
  actualizarCarrito();
}

productos.forEach(producto => {
  producto.querySelector('.agregar').addEventListener('click', agregarProducto);
});

listaCarrito.addEventListener('click', e => {
  if (e.target.classList.contains('eliminar')) {
    eliminarProducto(e);
  }
});

botonComprar.addEventListener('click', () => {
  const confirmMessage = `¿Deseas confirmar la compra?\nTotal: $${totalCarrito.textContent.slice(8)}`;
  if (window.confirm(confirmMessage)) {
    carrito.length = 0;
    guardarCarritoEnLocalStorage();
    actualizarCarrito();
  }
});

botonLimpiar.addEventListener('click', () => {
  const confirmMessage = `¿Deseas limpiar el carrito?`;
  if (window.confirm(confirmMessage)) {
    carrito.length = 0;
    guardarCarritoEnLocalStorage();
    actualizarCarrito();
  }
});

actualizarCarrito();

const carritoIcon = document.getElementById('carrito-icon');

carritoIcon.addEventListener('click', () => {
  const previewContent = carrito.map(producto => `${producto.nombre} - $${producto.precio.toFixed(2)}`).join('\n');
  alert(`Productos en el carrito:\n${previewContent}\nTotal: $${totalCarrito.textContent.slice(8)}`);
});

const volverInicioButton = document.getElementById('volver-inicio');

volverInicioButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});

