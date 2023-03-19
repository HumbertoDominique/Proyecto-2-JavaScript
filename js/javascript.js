//CON ESTA PRIMERA SECCIÓN RESGUARDO LA INFORMACIÓN DEL CARRITO EN EL LOCAL STORAGE.

let carrito = JSON.parse(localStorage.getItem('articulos_carrito')) || [];

mostrar_carrito();

//ESTE SEGMENTO PERMITE MOSTRAR O ESCONDER EL CARRITO//

let display_carrito = document.getElementById("display_carrito");

display_carrito.addEventListener("click",function(){

    let body_carrito = document.getElementById("body_carrito");
    let imagen_carrito = document.getElementById("imagen_carrito");

    if (body_carrito.classList.contains("display_carrito")){

        body_carrito.classList.remove("display_carrito");
        imagen_carrito.src = "./assets/images/carrito_lleno.svg";
    }
    else{

        body_carrito.classList.add("display_carrito");
        imagen_carrito.src = "./assets/images/carrito_vacio.svg";
    }
})

// ESTE SEGMENTO RENDERIZA LOS PRODUCTOS DESDE UN ARREGLO 

let lista_productos_oro = [
    {id: "1", articulo: "Botella de Vino Dorado 0.5L", precio: 22, cantidad: 1, img: "botella_05L_dorada.jpg"},
    {id: "2", articulo: "Botella de Vino Dorado 1L", precio: 37, cantidad: 1, img: "botella_1L_dorada.jpg"},
    {id: "3", articulo: "Racimo de uvas doradas", precio: 17, cantidad: 1, img: "uvas_doradas_producto.png"},
];

let lista_productos_plata = [
    {id: "4", articulo: "Botella de Vino Plateado 0.5L", precio: 20, cantidad: 1, img: "botella_05L_plateada.jpg"},
    {id: "5",articulo: "Botella de Vino Plateado 1L", precio: 35, cantidad: 1, img: "botella_1L_plateada.jpg"},
    {id: "6", articulo: "Racimo de uvas plateadas", precio: 15, cantidad: 1, img: "uvas_plateadas_producto.png"},
];

let carta_producto = document.getElementById("body_productos");

let tipo_productos = "oro";

function renderizarProductos(productos) {
    carta_producto.innerHTML = "";

    for (let producto of productos) {
        let carta = document.createElement("div");
        carta.innerHTML = `<div class="div_borde mb-3 bg-secondary rounded centrar">
                           <div class="card div_prod_2 text-center">
                           <img src="./assets/images/${producto.img}" class="card-img-top imgProducto">
                           <div class="card-body">
                           <h3 class="card-title nombreProducto">${producto.articulo}</h3>
                           <span class="precioProducto text-center">${producto.precio}</span>
                           <span>USD</span>
                           <span class="cantidadProducto d-none">${producto.cantidad}</span>
                           <br>
                           <a href="#PRODUCTOS" class="btn btn-secondary boton_compra">Agregar al carrito</a>
                           </div>
                           </div>
                           </div>`;
        
        carta_producto.append(carta);
    }
}

// ESTA SECCIÓN DA LA FUNCIONALIDAD AL BOTÓN QUE CAMBIA LOS ARREGLOS A RENDERIZAR (DORADOS-PLATEADOS)

function cambiarProductos() {
    if (tipo_productos === "oro") {
        tipo_productos = "plata";
        renderizarProductos(lista_productos_plata);
        document.getElementById("cambiarProductos").innerText = "Ver sección de uvas doradas";
        document.getElementById("cambiarProductos").classList.add("boton_plateado");
        document.getElementById("section_div").classList.add("section_div_2")
        capturar_botones_compra();
    } else {
        tipo_productos = "oro";
        renderizarProductos(lista_productos_oro);
        document.getElementById("cambiarProductos").innerText = "Ver sección de uvas plateadas";
        document.getElementById("cambiarProductos").classList.remove("boton_plateado");
        document.getElementById("section_div").classList.remove("section_div_2")
        capturar_botones_compra();
    }
}

renderizarProductos(lista_productos_oro);

document.getElementById("cambiarProductos").addEventListener("click", cambiarProductos);


// ESTE SEGMENTO DESARROLLA LA FUNCIÓN DE AGREGAR ELEMENTOS AL ARREGLO CARRITO

function agregar_a_carrito(e){

    let nodo_hijo = e.target;
    let nodo_padre = nodo_hijo.parentNode;
    let nodo_abuelo = nodo_hijo.parentNode.parentNode;

    let nombreProducto = nodo_padre.querySelector("h3").textContent;
    let precioProducto = nodo_padre.querySelector(".precioProducto").textContent;
    let cantidadProducto = nodo_padre.querySelector(".cantidadProducto").textContent;
    let imgProducto = nodo_abuelo.querySelector(".imgProducto").src;

    let articulo = {
        nombre: nombreProducto,
        precio: precioProducto,
        cantidad: cantidadProducto,
        img: imgProducto,
    }
     
    function duplicados (articulo){
        if (articulo.nombre == nombreProducto){
            return true
        }
    }

    let evaluar_duplicados = carrito.some (duplicados);

    function agregar_cantidad(articulo){
        if(articulo.nombre == nombreProducto){
            articulo.cantidad++;
        }
    }

    if(evaluar_duplicados){
        carrito.map(agregar_cantidad);
    }
    else{
        carrito.push(articulo);
    }

    // AGREGO LIBRERÍA TOASTIFY PARA ASIGNAR UNA NOTIFICACIÓN CUANDO SE AGREGA UN ELEMENTO AL CARRITO

    Toastify({
        text: "Has agregado un elemento al carrito",
        duration: 1000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #939393, #efd472)",
            color: "black",
            fontSize: "0.8rem",
        },
    }).showToast();
    mostrar_carrito();

}

function capturar_botones_compra(){

    let btn_compra = document.querySelectorAll(".boton_compra");

    for (let boton of btn_compra){
        boton.addEventListener("click", agregar_a_carrito);
    }
}

capturar_botones_compra();

//ESTE SEGMENTO RENDERIZA LOS ELEMENTOS DEL ARREGLO DENTRO DEL CARRITO

function mostrar_carrito (){

    let tabla = document.getElementById("tabla_carrito");
    tabla.innerHTML = "";

    for (let articulo of carrito){
        
        let fila = document.createElement("tr");
        fila.innerHTML = `<td><img src="${articulo.img}" class="img_en_carrito rounded"></td>
                          <td><p>${articulo.nombre}</p></td>
                          <td class="cantidad_elemento">${articulo.cantidad}</td>
                          <td class="precio_elemento">${articulo.precio}</td>
                          <td>USD</td>
                          <td><button id="${articulo.nombre}" class="btn btn-success sumar_elemento">+</  button></td>
                          <td><button id="${articulo.nombre}" class="btn btn-danger restar_elemento">-</button></td>`;
                        
        tabla.append( fila );
    }

    let btn_sumar = document.querySelectorAll(".sumar_elemento");

    for(let btn of btn_sumar){
        btn.addEventListener("click", sumar_cant);
    }

    let btn_resta = document.querySelectorAll(".restar_elemento");

    for(let btns of btn_resta){
        btns.addEventListener("click", restar_cant);
    }

    let carrito_JSON = JSON.stringify(carrito);
    localStorage.setItem("articulos_carrito", carrito_JSON);

}

//FUNCIONES PARA INTERACTUAR CON EL CARRITO

function sumar_cant(e){

    let index_prod = carrito.findIndex( parametro => parametro.nombre == e.target.id, 0);         

    carrito[index_prod].cantidad++;

    mostrar_carrito();
}

function eliminar_producto( producto ){

    return producto.cantidad >= 1;
}

function restar_cant(e){
        
    let index_prod = carrito.findIndex( parametro => parametro.nombre == e.target.id, 0);   
    carrito[index_prod].cantidad--;

    if (carrito[index_prod].cantidad < 1){
        e.target.parentNode.parentNode.remove();
    }

    let resultado_filter = carrito.filter( eliminar_producto );

    carrito = resultado_filter;
    console.log( carrito );

    mostrar_carrito();
}


//FUNCIÓN PARA VACIAR EL CARRITO

let elemento_adicional_carrito = document.querySelector(".fondo_carrito");

let div_vaciar = document.createElement("div");
    div_vaciar.innerHTML = `<button class="btn btn-danger position-bottom-0 boton_elemento borrar_elemento me-3 mb-2">VACIAR CARRITO</button>`;

elemento_adicional_carrito.append(div_vaciar);

let boton_vaciar = document.querySelector(".borrar_elemento");

boton_vaciar.addEventListener("click", function(){
    carrito = [];
    mostrar_carrito();
});

// FUNCIÓN PARA CALCULAR EL PRECIO TOTAL DE LOS ELEMENTOS EN EL CARRITO

function calcular_total(acu, el){

        acu = acu + (el.precio * el.cantidad);
        return acu;
}

let barra_total = document.querySelector(".total_elemento");
barra_total.addEventListener("click", function(){
    let venta_total = carrito.reduce (calcular_total, 0);
    barra_total.innerText =`El total de su compra es: ${venta_total}
                            Toque para actualizar`;
});


// CAMBIO DE FONDO EN SEGMENTO INICIAL DE LA PÁGINA A TRAVÉS DE SET INTERVAL

let fondo_inicio = document.getElementById ("main_div");
let imagen_icono = document.getElementById("logo_principal");

function cambio_de_fondo (){

    if( fondo_inicio.classList.contains("main_div_2")){
        
        fondo_inicio.classList.remove("main_div_2");
        imagen_icono.src = "./assets/images/logo_principal.svg";
    }
    else{

        fondo_inicio.classList.add("main_div_2");
        imagen_icono.src = "./assets/images/logo_principal_negro2.svg";
    }
}

setInterval (cambio_de_fondo, 8000);

// USO DE API Y FETCH PARA OBTENER LOS DATOS DE LAS CONDICIONES AMBIENTALES DEL VIÑEDO

function ubicar_posicion (){

    let latitud = 44.60;
    let longitud = 7.93;
    let key = "13974642d635376c034fbd3848760215";


    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${key}&units=metric&lang=es`)
        .then( response => response.json())
        .then( dataAPI => {
                            let evento_fetch = document.getElementById("evento_fetch");

                            let info_clima = document.createElement("div");
                            let info_clima_2 = document.createElement("div");

                            info_clima.innerHTML = `<p>Clima: ${dataAPI.weather[0].description}</p>
                                                    <p>Temperatura: ${dataAPI.main.temp}°C</p>
                                                    <p>Humedad: ${dataAPI.main.humidity}%</p>`
                            
                            evento_fetch.append(info_clima);

                                                    if (dataAPI.main.temp >40 && dataAPI.main.humidity <30){
                                                        info_clima_2.innerHTML = `<p class="bg-warning text-black rounded">Las condiciones climáticas actuales favorecen el cultivo de uvas doradas.</p>`
                                                    }
                                                    else if (dataAPI.main.temp <20 && dataAPI.main.humidity >60){
                                                        info_clima_2.innerHTML = `<p class="bg-secondary text-white rounded">Las condiciones climáticas actuales favorecen el cultivo de uvas plateadas.</p>`
                                                    } 
                                                    else{
                                                        info_clima_2.innerHTML = `<p class="bg-dark text-white rounded">Las condiciones climáticas actuales no favorecen el cultivo de nuestras uvas.</p>`
                                                    }

                            evento_fetch.append(info_clima_2);
                            })

}

ubicar_posicion();

// FUNCIÓN PARA RESETEAR EL CARRITO CUANDO SE PRESIONA EL BOTÓN DE IR A COMPRAR.

let boton_submit = document.getElementById("boton_submit");

boton_submit.addEventListener("click", function(){
    carrito = [];
    mostrar_carrito();
});