import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import routerProducts from "./routes/productsRouter.js";
import routerCart from "./routes/cartRouter.js";
import routerViews from "./routes/productsViewsRouter.js";
import { Server as SocketServer } from "socket.io";
import ProductManager from "./classProductManager.js";

const app = express(); //ejecuto la funcion express y la guardo en la constante app

//------- SETEO DE HANDLEBARS---------
app.engine("handlebars", handlebars.engine()); // se setea el motor de vistas
app.set("views", `${__dirname}/views`); // le digo donde van a estar las vistas
app.set("view engine", "handlebars"); // aca le digo cual es el motor que se va a utilizar para leer esas vistas

//-------- USO DE MIDDLWARES ------
app.use(express.urlencoded({ extended: true })); //Esto me sirve para req.query para transformar el texto plano a objeto
app.use(express.json());

//---------- ABREVIACION DE RUTAS PARA USO DE EXPRESS ---------------
app.use("/api/cart", routerCart);
app.use("/api/products", routerProducts);
app.use("/api/views", routerViews);

//---------- CONTENIDO ESTATICO ---------------------------
app.use(express.static(`${__dirname}/public`));

// inicializacion de express
const appServer = app.listen(8081, () => {
  console.log("conectado correctamente");
});

// envoltorio de socke io
const io = new SocketServer(appServer);

// conexion con el cliente
const prodManager = new ProductManager();
io.on("connection", async (SocketServer) => {
  console.log(`Cliente se ha conectado con el id ${SocketServer.id}`);

  SocketServer.on("subirProductos", async (data) => {
    console.log(data);
    await prodManager.addProducts(data);

    //console.log(`Se subio el siguiente producto:${data} `);
  });
  //             evento        msj del evento
  // socket.emit("bienvenida", "Bienvenidx a mi tienda!"); //con emit envio un msj al front.

  // socket.on("llamada", (data) => {
  //   console.log(`llamada desde el front: ${data}`);
  // });
});
