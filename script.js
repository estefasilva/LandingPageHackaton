//----------------- Funcionalidad Shopping cart -------------------

//Clase completa

class list{
    constructor(name, cost, count){
        this.name = name
        this.cost = cost
        this.count = count
    }
}


//Clase para Items

class item{
    constructor(name, cost, count){
        this.name = name
        this.cost = cost
        this.count = count
    }
}

//items
const item1 = new item("Camiseta Cyberpunk", 29.99 , 1);
const item2 = new item("Pantalón Tech", 49.99, 1)
const item3 = new item("Blusa Futurista", 34.99, 1)
const item4 = new item("Leggings Neón", 39.99, 1)
const item5 = new item("Chaqueta Digital", 75.99, 1)
const item6 = new item("Vestido Holográfico", 59.99, 1)
const item7 = new item("Sudadera Neon", 45.99, 1)
const item8 = new item("Falda Tecnológica", 42.99, 1)

//Carrito
let shoppingCart = [];

//Funciones

function addShopItem(name, cost, count){
    //Sumar la cuenta si el item es repetido
    for (let i in shoppingCart){
        if (shoppingCart[i].name === name){
            shoppingCart[i].count += count;
            return;
        }
    }
    //Caso base
    let articulo = new item(name, cost, count);
    shoppingCart.push(articulo);

    renderList();
}

function removeShopItem(name){
    for (let i in shoppingCart){
        //Elimina si hay mas de uno, si es cero lo quita.
        if (shoppingCart[i].name == name){
            shoppingCart[i] -= count;
            if (shoppingCart[i].count = 0){
                shoppingCart.splice(i, 1);
            }
            break;
        }
    }
    renderList();
    totalCart();
}

// function countCart()? -> Contar carrito?

function totalCart(){
    let total = 0;
    for (let i in shoppingCart){
        total += ((shoppingCart[i].cost) * (shoppingCart[i].count));
    }
    return total
}

function removeAllItemType(name){ 
    for (let i in shoppingCart){
        if (shoppingCart[i].name === name){
            shoppingCart.splice(i, 1);
            break;
        }
    }
    
}

function clearShoppingCart(){
    let zero = [];
    shoppingCart = zero;
    return shoppingCart = zero;
}


//---------------- Manipulación de DOM ------------------------------

//Mostrar / ocultar lista de compras
let shopList = document.getElementById("shopping-list");
let botonShopList = document.getElementById("shop-cart");

botonShopList.addEventListener('click', () => {
    if (shopList.classList.contains('shop-hidden')){
        shopList.classList.remove('shop-hidden');
    } else {
        shopList.classList.add('shop-hidden');
    }
})

//Renderizar lista
function renderList(){
    const padre = document.getElementById("shop-list-item-container");

    while(padre.firstChild){
        padre.removeChild(padre.firstChild)
    }

    for (let objetos in shoppingCart) {

        const contenedor = document.createElement('div');
        contenedor.classList.add("shop-list-item");

        const nombre = document.createElement('h6');
        nombre.textContent = shoppingCart[objetos].name;

        const menos = document.createElement('span');
        menos.textContent = "-";
        menos.classList.add('less-items');

        const cantidad = document.createElement('h6');
        cantidad.textContent = shoppingCart[objetos].count;

        const mas = document.createElement('span');
        mas.textContent = "+";
        mas.classList.add('more-items');

        const eliminar = document.createElement('span');
        eliminar.textContent = "X";
        eliminar.classList.add("delete-all-item");

        contenedor.appendChild(nombre);
        contenedor.appendChild(menos);
        contenedor.appendChild(cantidad);
        contenedor.appendChild(mas);
        contenedor.appendChild(eliminar);

        padre.appendChild(contenedor)
    }
    //Total de la lista
    const totalGlobal = document.getElementById("total-shop-list");
    totalGlobal.textContent = totalCart();
}

//Limpiar lista
const cleanButton = document.getElementById("clear-button");
cleanButton.addEventListener('click', clearShoppingCart, renderList);


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
          <button class="producto__boton" onclick="agregarAlCarrito(${p.id})" id="producto${p.id}">Añadir al carrito</button>
        </div>
      </div>
    </div>`;
  });
  
  document.querySelector('.catalogo__productos').innerHTML = html || 
    '<div class="col-12 text-center"><p>No hay productos</p></div>';
}

// Función simple para el botón
// function agregarAlCarrito(id) {
//   alert("Producto añadido al carrito");
// }

//Añadiendo objetos a la lista

const compra1 = document.getElementById("producto5");
compra1.addEventListener('click', () => {
    
    addShopItem(item5.name, item5.cost, item5.count)
    totalCart()
});

const compra2 = document.getElementById("producto7");
compra2.addEventListener('click', () => {
    
    addShopItem(item7.name, item7.cost, item7.count)
    totalCart()
})
