//----------------- Funcionalidad Shopping cart -------------------

//Clase para Items

class item{
    constructor(name, cost, count){
        this.name = name
        this.cost = cost
        this.count = count
    }
}

//items
const item1 = new item("Zapatillas",50, 1);
const item2 = new item("Busos", 70, 1)
const item3 = new item("Yoger", 30, 1)

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
    
}

addShopItem("Zapatillas",50, 1)
addShopItem("Zapatillas",50, 2)


console.log(shoppingCart)

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
    
}

// function countCart()? -> Contar carrito?

function totalCart(){
    let total = 0;
    for (let i in shoppingCart){
        total += (shoppingCart[i].cost * shoppingCart[i].count);
    }
    return total;
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

//Limpiar lista
const cleanButton = document.getElementById("clear-button");
cleanButton.addEventListener('click', clearShoppingCart());

//Añadiendo objetos a la lista
const compra1 = document.getElementById("producto1");
compra1.addEventListener('click', addShopItem(item1.name, item1.cost, item1.count))



//Renderizar lista
    const padre = document.getElementById("shop-list-item-container");
    for (let i in shoppingCart) {
        // const imagen = document.createElement('img');
        // imagen.src = "ruta";

        const contenedor = document.createElement('div');
        contenedor.classList.add("shop-list-item");

        const nombre = document.createElement('h6');
        nombre.textContent = shoppingCart[i].name;

        const menos = document.createElement('span');
        menos.textContent = "-";
        menos.classList.add('less-items');

        const cantidad = document.createElement('h6');
        cantidad.textContent = shoppingCart[i].count;

        const mas = document.createElement('span');
        mas.textContent = "+";

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