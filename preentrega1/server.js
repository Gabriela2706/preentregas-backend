import express from "express";
import ProductManager from "./classProductManager.js";

const app = express(); //ejecuto la funcion express y la guardo en la constante app
app.use(express.urlencoded({ extended: true })); //Esto me sirve para req.query para transformar el texto plano a objeto
const manager = new ProductManager("./files.json");

// app.get("/metodos", (req, res) => {
//   res.send({ esEstudiante: true }); // en el Send puedo agregar las {} y darle con esto la indicacion de que es un objeto lo que envio
// }); // tambien en vez de send, puedo escribir res.json y con eso indicar lo mismo

// app.put("/metodos", (req, res) => {
//   res.send("Hola desde put");
// });

// app.post("/metodos", (req, res) => {
//   res.send(`<h1>Hola Mundo</h1>`);
// });

// app.listen(8080, () => {
//   console.log("Escuchando desde el puerto 8080!");
// });

// app.get("/productos", async (req, rest) => {
//   const products = await manager.getProducts();
//   rest.send(products);
// });

app.get("/producto/stock", async (req, rest) => {
  //devuelve el producto que busques por id
  const { stock } = req.params;
  const products = await manager.getProducts();
  rest.send;
  stock ? products.find((product) => product.id == id) : products;
});

app.get("/productos/stock", async (req, rest) => {
  //Filtra por stock disponible
  const { stock } = req.query;
  const products = await manager.getProducts();
  rest.send(products.filter((product) => product.stock == stock));
});

app.get("/productos/cantidad", async (req, rest) => {
  //devuelve una nueva lista recortada dependiendo la cantidad que que pongas en cantidad.
  const { cantidad } = req.query;
  const products = await manager.getProducts();
  const nuevaListaProductos = products.slice(2, 4); // aca deberia ir (candidad), pero si pongo asi deja de tener funcionalidad el slice

  rest.send(nuevaListaProductos);
});

app.listen(8080, () => {
  console.log("conectado correctamente");
});
