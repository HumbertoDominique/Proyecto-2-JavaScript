//ESTE SEGMENTO PERMITE MOSTRAR O ESCONDER EL CARRITO//

let display_carrito = document.getElementById("display_carrito");

display_carrito.addEventListener("click",function(){


    let body_carrito = document.getElementById("body_carrito");

    if( body_carrito.style.display != "none"){

        body_carrito.style.display = "none";
    }
    else{
        body_carrito.style.display = "block";
    }
})

// ESTE SEGMENTO RENDERIZA LOS PRODUCTOS DESDE UN ARREGLO 

let lista_productos_oro = [
    {codigo: "A", articulo: "Botella de Vino Dorado 500mL", precio: 22, cantidad: 1, img: "imagen"},
    {codigo: "B",articulo: "Botella de Vino Dorado 1L", precio: 37, cantidad: 1, img: "imagen"},
    {codigo: "C", articulo: "Racimo de uvas doradas", precio: 17, cantidad: 1, img: "imagen"},
];

let carta_producto = document.getElementById("body_productos");

for( let producto of lista_productos_oro ){

    let carta = document.createElement("div");
    carta.innerHTML = `<div class="col-sm-12 col-md-4 mt-4 carta">
                       <div class="card">
                       <img src="./assets/images/${producto.img}.png" class="card-img-top imgProducto">
                       <div class="card-body">
                       <h3 class="card-title">${producto.articulo}</h3>
                       <span class="precioProducto">${producto.precio} USD</span>
                       <a href="#" class="btn btn-primary boton_compra">Agregar al carrito</a>
                       </div>
                       </div>
                       </div>`;

    carta_producto.append( carta );
}

// ESTE SEGMENTO DESARROLLA LA FUNCIÓN DE AGREGAR ELEMENTOS AL ARREGLO CARRITO

let carrito = [];

function agregar_a_carrito(e){

    let nodo_hijo = e.target;
    let nodo_padre = nodo_hijo.parentNode;
    let nodo_abuelo = nodo_hijo.parentNode.parentNode;

    let nombreProducto = nodo_padre.querySelector("h3").textContent;
    let precioProducto = nodo_padre.querySelector(".precioProducto").textContent;
    let imgProducto = nodo_abuelo.querySelector(".imgProducto").src;

    let articulo = {
        nombre: nombreProducto,
        precio: precioProducto,
        cantidad: 1,
        img: imgProducto,
    }
     
    function filtrar_duplicados (){
        return articulo.nombre == nombreProducto
    }

    console.log("articulo.nombre: ", articulo.nombre);
    console.log("nombreProducto: ", nombreProducto);

    let evaluar_duplicados = carrito.some(filtrar_duplicados)
    console.log(evaluar_duplicados);

    carrito.push ( articulo );

    let carrito_JSON = JSON.stringify(carrito);
    localStorage.setItem("articulos_carrito", carrito_JSON);

    function eliminar_duplicados(articulo){
        return  nombreProducto != articulo.nombre
    }

    let lista_compra = carrito.filter(eliminar_duplicados);
    console.log(carrito);

    mostrar_carrito();

}


let btn_compra = document.querySelectorAll(".boton_compra");

for (let boton of btn_compra){

    boton.addEventListener("click", agregar_a_carrito);
}

//ESTE SEGMENTO AGREGA ELEMENTOS AL CARRITO

function mostrar_carrito (){

    let tabla = document.getElementById("tabla_carrito");
    tabla.innerHTML = ""; //PENSAR SOLUCION

    for (let articulo of carrito){
        
        let fila = document.createElement("tr");
        fila.innerHTML = `<td><img src="${articulo.img}"></td>
                          <td><p>${articulo.nombre}</p></td>
                          <td class="cantidad_elemento">${articulo.cantidad}</td>
                          <td>${articulo.precio}</td>
                          <td><button class="btn btn-danger sumar_elemento">+</  button></td>
                          <td><button class="btn btn-danger   restar_elemento">-</button></td>`;
                        
        tabla.append( fila );

    }

}
