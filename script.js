// Variables básicas
let productos = [];
let filtroGenero = "hombre";
let filtroTipo = "todos";
let filtroTalla = "todas";

// Carga y muestra productos
document.addEventListener('DOMContentLoaded', function() {
  // Cargar JSON
  fetch('./productos.json')
    .then(respuesta => respuesta.json())
    .then(datos => {
      productos = datos.productos;
      mostrarProductos();
      
      // Eventos de botones de filtro
      document.querySelectorAll('.catalogo__boton').forEach(boton => {
        boton.addEventListener('click', function() {
          const filtro = this.getAttribute('data-filtro');
          const valor = this.getAttribute('data-valor');
          
          if (filtro === 'genero') filtroGenero = valor;
          if (filtro === 'tipo') filtroTipo = valor;
          if (filtro === 'talla') filtroTalla = valor;
          
          document.querySelectorAll(`.catalogo__boton[data-filtro="${filtro}"]`)
            .forEach(b => b.classList.remove('catalogo__boton--activo'));
          this.classList.add('catalogo__boton--activo');
          
          mostrarProductos();
        });
      });
    });
});

// Mostrar productos filtrados
function mostrarProductos() {
  const filtrados = productos.filter(p => 
    (p.genero === filtroGenero) && 
    (filtroTipo === "todos" || p.tipo === filtroTipo) &&
    (filtroTalla === "todas" || p.talla.includes(filtroTalla))
  );
  
  let html = '';
  filtrados.forEach(p => {
    html += `<div class="col">
      <div class="producto">
        <div class="producto__imagen-container">
          <img src="${p.imagen}" alt="${p.nombre}" class="producto__imagen">
        </div>
        <div class="producto__info">
          <h3 class="producto__nombre">${p.nombre}</h3>
          <p class="producto__precio">$${p.precio.toFixed(2)}</p>
          <button class="producto__boton" onclick="agregarAlCarrito(${p.id})">Añadir al carrito</button>
        </div>
      </div>
    </div>`;
  });
  
  document.querySelector('.catalogo__productos').innerHTML = html || 
    '<div class="col-12 text-center"><p>No hay productos</p></div>';
}

// Función simple para el botón
function agregarAlCarrito(id) {
  alert("Producto añadido al carrito");
}