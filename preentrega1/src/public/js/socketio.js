// * conexion socket(FRONT)
console.log("hola front");
const socketCliente = io();

function subirInfo() {
  // funcion para que recolecte la informacion del input y la plasme en la consola.
  let infoProducts = [
    (inputNombre = document.getElementById("nombre")),
    (inputDescription = document.getElementById("description")),
    (inputPrecio = document.getElementById("precio")),
    (inputStock = document.getElementById("stockDisp")),
  ];

  socketCliente.emit("subirProductos", infoProducts);
}

// socket.on("bienvenida", (data) => {
//   console.log(`mensaje del back para el front: ${data}`);
// });
// socket.emit("llamada", "Hola! te llamo desde el front");
