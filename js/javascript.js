function compra (producto , precio){
// Esta función simplifica la repetitividad del algoritmo para la selección de tipos de producto en cada bucle//
// producto = Ver lista de productos (A, B, C)//
// precio = Ver lista de precios (precio_A, precio_B, precio_C)//
    console.log("Usted está realizando la siguiente compra:");
    console.log("Producto: ", producto , "Oro");
    console.log("Precio: ", precio , "USD")
    console.log("Cantidad: ", cantidad, "unidad/es");
}

function respuesta_compra (){
// Esta función imprime las respuestas de la gestión de compra dependiendo de la opción que seleccione el usuario//
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
        console.log("");
        console.log("Compra cancelada.")
        console.log("");
        inicio = "1";
        opcion = "1";
    }
    else if(confirmar == "0"){
        console.log("");
        console.log("Compra cancelada.")
        console.log("");
        inicio = "1";
        opcion = "salida";
    }
    else{
        console.log("");
        console.log("Menú inválido - Has salido del sistema.");
        alert("Menú inválido. \n\nIntente su operación nuevamente.");
        inicio = "salida"
        opcion = "salida";
    }
}

function seleccion_cantidad (){
    cantidad = prompt("Selecciona el número de unidades que deseas comprar:");
}

function confirmar_compra (){
    confirmar = prompt ("Para confirmar tu compra, presiona Y \n \nPara volver al menú anterior, presiona Z \nPara volver al menú inicial, presiona 0 \nPara salir del sistema, presiona X");
}

function total ( precio ){
//Esta función multiplica la cantidad de productos que seleccione el usuario por el precio del producto seleccionado//
// precio: está preestablecido entre las opciones que puede seleccionar el usuario//

    let monto = precio * cantidad;
    console.log("Valor total: ", monto, "USD");
}

// Variables //
let inicio = "";
let opcion = "";
let producto = "";
let cantidad = "";
let confirmar = "";

//Lista de productos y precios //
let A = "Botella Vino 500mL";
let B = "Botella Vino 1L";
let C = "Racimo de Uvas";
let precio_A = 20; "USD"
let precio_B = 35; "USD"
let precio_C = 10; "USD"

inicio = prompt ("Para acceder a la tienda virtual, presiona 1.\n Para salir del sistema, presiona 0.");

while (inicio == "1"){
//La intención de este primer ciclo es para generar un retorno al menú inicial desde las opciones del panel//

    opcion = prompt ("<---MENÚ INICIAL---> \n\n Selecciona la opción que deseas cotizar: \n Uvas Oro - presiona '1' \n Uvas Plata - presiona '2' \n Para salir del sistema, presiona 'X'");

    while(opcion == "1"){
        //Este segundo ciclo, le permite al usuario devolverse hasta las opciones para seleccionar un producto diferente//

        producto = prompt("Selecciona el producto que deseas adquirir:\n A - Botella Vino 500mL Oro - 20 USD \n B - Botella Vino 1L Oro - 35 USD \n C - Racimo de Uvas Oro - 10 USD");
        
        while (producto == "A"){

            producto = A;
            seleccion_cantidad();
            compra ( A , precio_A);
            total (precio_A);
            confirmar_compra ();
            respuesta_compra ();
    
        }
        while (producto == "B"){

            producto = B;
            seleccion_cantidad();
            compra ( B , precio_B);
            total (precio_B);
            confirmar_compra ();
            respuesta_compra ();
    
        }
        while (producto == "C"){

            producto = C;
            seleccion_cantidad();
            compra ( C , precio_C);
            total (precio_C);
            confirmar_compra ();
            respuesta_compra ();
    
        }
    }
    while(opcion == "2"){

        producto = prompt("Selecciona el producto que deseas adquirir:\n A - Botella Vino 500mL Plata - 20 USD \n B - Botella Vino 1L Plata - 35 USD \n C - Racimo de Uvas Plata - 10 USD");
        
        while (producto == "A"){

            producto = A;
            seleccion_cantidad();
            compra ( A , precio_A);
            total (precio_A);
            confirmar_compra ();
            respuesta_compra ();
    
        }
        while (producto == "B"){

            producto = B;
            seleccion_cantidad();
            compra ( B , precio_B);
            total (precio_B);
            confirmar_compra ();
            respuesta_compra ();
    
        }
        while (producto == "C"){

            producto = C;
            seleccion_cantidad();
            compra ( C , precio_C);
            total (precio_C);
            confirmar_compra ();
            respuesta_compra ();
    
        }
    }
    while (opcion == "X"){
        inicio = "salida"
        opcion = "salida";
    }
}

console.log("Has salido del sistema.")
alert ("Gracias por visitar la tienda online");
