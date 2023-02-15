//FUNCIONES//

function compra (){
    // Esta función muestra en pantalla los detalles del artículo que seleccionó el cliente.//
        console.log("Usted ha seleccionado el siguiente artículo:");
        console.log("Producto: ", resultado_find.articulo);
        console.log("Precio: ", resultado_find.precio , "USD")
        console.log("Cantidad: ", cantidad_usuario, "unidad/es");
        console.log("");
}
function buscar_articulo (producto){
    //Esta función me permite utilizar el método "find" para ubicar la opción del cliente dentro del arreglo de producto. // 
    return producto.codigo == codigo
}

function sub_total (){
    //Esta función muestra en pantalla el sub total del precio del producto que seleccionó el cliente multiplicado por la cantidad solicitada//
    let sub_total = cantidad_usuario * resultado_find.precio;
    console.log("Sub_total: ", sub_total, "USD");
    console.log("");
}

function agregar_cantidad(lista_compra){
    //Esta función me permite utilizar el método "map" para agregar la cantidad de unidades que seleccionó el cliente como dato del producto dentro del arreglo, con el propósito de poder mostrar todo el detalle en pantalla a través del resumen de compra.// 
    return{
        articulo: lista_compra.articulo,
        precio: lista_compra.precio,
        cantidad: cantidad_usuario
    }
}
function confirmar_compra(lista_compra){
    //Esta función me permite mostrar detalladamente el resumen de artículos seleccionados para la compra. //
    console.log("-", lista_compra.articulo, "x", lista_compra.cantidad, "=", lista_compra.precio*lista_compra.cantidad, "USD");
}

function calcular_total(acu, lista_compra){
    //Esta función me permite utilizar el método "reduce" para calcular el precio total de todos los artículos que seleccionó el cliente. //
    acu = acu + (lista_compra.precio*lista_compra.cantidad);
    return acu
}

function respuesta_compra (){
// Esta función imprime las respuestas de la gestión de compra dependiendo de la opción que seleccione el usuario//
    
confirmar = prompt ("Para confirmar tu compra, presiona Y \n \nPara volver al menú anterior, presiona Z \nPara salir del sistema, presiona X");

    if(confirmar == "Y"){
        console.log("");
        console.log("COMPRA REALIZADA");
        alert("¡Gracias por su compra!");
        inicio = "salida"
        opcion = "salida";
    }
    else if(confirmar == "X"){
        console.log("");
        console.log("COMPRA CANCELADA");
        inicio = "salida"
        opcion = "salida";
    }
    else if(confirmar == "Z"){
        inicio = "1";
        opcion = "1";
    }
    else{
        console.log("");
        console.log("Menú inválido");
        alert("Menú inválido. \n\nIntente su operación nuevamente.");
        //Este elemento lo coloqué en caso de que se ingrese una opción distinta a la confirmación o cancelación de la compra, de manera que restaura la lista de compra en cero para comenzar nuevamente.// 
        lista_compra = [];
        inicio = "1"
        opcion = "salida";
    }
}

// VARIABLES //

let inicio = "";
let opcion = "";
let producto = "";
let cantidad = "";
let cantidad_usuario = "";
let confirmar = "";
let resultado_find = "";
let lista_compra = [];
let menu = "";
let resultado_map = "";
let venta_total = "";

// ARREGLOS DE OBJETOS (Lista de productos a seleccionar) //

let lista_productos_oro = [
    {codigo: "A", articulo: "Botella de Vino Dorado 500mL", precio: 22, cantidad: ""},
    {codigo: "B",articulo: "Botella de Vino Dorado 1L", precio: 37, cantidad: ""},
    {codigo: "C", articulo: "Racimo de uvas doradas", precio: 17, cantidad: ""},
];

let lista_productos_plata = [
    {codigo: "A", articulo: "Botella de Vino Plateado 500mL", precio: 20, cantidad: ""},
    {codigo: "B",articulo: "Botella de Vino Plateado 1L", precio: 35, cantidad: ""},
    {codigo: "C", articulo: "Racimo de uvas plateadas", precio: 15, cantidad: ""},
];

// CREACIÓN DE OBJETOS (Los artículos seleccionados se adicionan como objetos dentro de un arreglo vacío para generar la lista de compra.) //

class Producto {
    constructor ( codigo, articulo, precio, cantidad){
        this.codigo = codigo;
        this.articulo = articulo;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

alert ("Bienvenido a VINEBULA.\nViñedo de Uvas Exóticas.");

inicio = prompt ("Para acceder a la tienda virtual, presiona 1.\n Para salir del sistema, presiona 0.");

while (inicio == "1"){
//La intención de este primer ciclo es para generar un retorno al menú inicial desde las opciones del panel//

    opcion = prompt ("<---MENÚ INICIAL---> \n\n Selecciona la opción que deseas cotizar: \n Uvas Doradas - presiona '1' \n Uvas Plateadas - presiona '2' \n Para salir del sistema, presiona 'X'");

    if(opcion == "1"){

                codigo = prompt("Selecciona el producto que deseas adquirir:\n A - Botella Vino 500mL Dorado - 22 USD \n B - Botella Vino 1L Dorado - 37 USD \n C - Racimo de Uvas doradas - 17 USD");

                cantidad_usuario = prompt("Selecciona el número de unidades que deseas comprar:");

                for (let Producto of lista_productos_oro){
                    resultado_find = lista_productos_oro.find (buscar_articulo);
                }
                
                resultado_find.cantidad = cantidad_usuario
                lista_compra.push (resultado_find);

                resultado_map = lista_compra.map(agregar_cantidad)
                compra();
                sub_total();

                menu = prompt("¿Desea adicionar otro producto?\n Si: Presione 1\n Confirmar compra: Presione 2");

                if (menu == 1){
                    inicio = "1"
                    opcion = "salida";
                }
                else if(menu == 2){
                    console.log ("Resumen de compra:");
                    lista_compra.forEach (confirmar_compra);
                    venta_total = lista_compra.reduce (calcular_total, 0);
                    console.log("");
                    console.log("El total de la compra es: ", venta_total, "USD");
                    respuesta_compra();
                }
    }
    if(opcion == "2"){

        codigo = prompt("Selecciona el producto que deseas adquirir:\n A - Botella Vino 500mL Plateado - 20 USD \n B - Botella Vino 1L Plateado - 35 USD \n C - Racimo de Uvas plateadas - 15 USD");

        cantidad_usuario = prompt("Selecciona el número de unidades que deseas comprar:");

        for (let Producto of lista_productos_plata){
            resultado_find = lista_productos_plata.find (buscar_articulo);
        }
        
        resultado_find.cantidad = cantidad_usuario
        lista_compra.push (resultado_find);

        resultado_map = lista_compra.map(agregar_cantidad)
        compra();
        sub_total();

        menu = prompt("¿Desea adicionar otro producto?\n Si: Presione 1\n Confirmar compra: Presione 2");

        if (menu == 1){
            inicio = "1"
            opcion = "salida";
        }
        else if(menu == 2){
            console.log ("Resumen de compra:");
            lista_compra.forEach (confirmar_compra);
            venta_total = lista_compra.reduce (calcular_total, 0);
            console.log("");
            console.log("El total de la compra es: ", venta_total, "USD");
            respuesta_compra();
        }
}
    while (opcion == "X"){
    inicio = "salida"
    opcion = "salida";
    }    
}

console.log("Has salido del sistema.")
alert ("Gracias por visitar la tienda online");
