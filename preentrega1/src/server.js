import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import routerProducts from "./routes/productsRouter.js";
import routerCart from "./routes/cartRouter.js";

const app = express(); //ejecuto la funcion express y la guardo en la constante app

//------- SETEO DE HANDLEBARS---------
app.engine("handlebars", handlebars.engine); // se setea el motor de vistas
app.set("views", `${__dirname}./views`); // le digo donde van a estar las vistas
app.set("view engine", "handlebars"); // aca le digo cual es el motor que se va a utilizar para leer esas vistas

//-------- USO DE MIDDLWARES ------
app.use(express.urlencoded({ extended: true })); //Esto me sirve para req.query para transformar el texto plano a objeto
app.use(express.json());

//---------- ABREVIACION DE RUTAS PARA USO DE EXPRESS ---------------
app.use("/api/cart", routerCart);
app.use("/api/products", routerProducts);

app.get("/", (req, res) => {
  res.render("index", { nombre: "Gabriela" });
});

// const manager = new ProductManager("./files.json");

// // app.get("/metodos", (req, res) => {
// //   res.send({ esEstudiante: true }); // en el Send puedo agregar las {} y darle con esto la indicacion de que es un objeto lo que envio
// // }); // tambien en vez de send, puedo escribir res.json y con eso indicar lo mismo

// // app.put("/metodos", (req, res) => {
// //   res.send("Hola desde put");
// // });

// // app.post("/metodos", (req, res) => {
// //   res.send(`<h1>Hola Mundo</h1>`);
// // });

// // app.listen(8080, () => {
// //   console.log("Escuchando desde el puerto 8080!");
// // });

// // app.get("/productos", async (req, rest) => {
// //   const products = await manager.getProducts();
// //   rest.send(products);
// // });

// // app.get("/producto/stock", async (req, rest) => {
// //   //devuelve el producto que busques por id
// //   const { stock } = req.params;
// //   const products = await manager.getProducts();
// //   rest.send;
// //   stock ? products.find((product) => product.id == id) : products;
// // });

// app.get("/productos/stock", async (req, rest) => {
//   //Filtra por stock disponible
//   const { stock } = req.query;
//   const products = await manager.getProducts();
//   rest.send(products.filter((product) => product.stock == stock));
// });

app.listen(8081, () => {
  console.log("conectado correctamente");
});
