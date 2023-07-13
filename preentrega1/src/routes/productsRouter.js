import { Router } from "express";
import ProductManager from "../classProductManager.js";
const routerProducts = Router();
const manager = new ProductManager("./routes/products.json");

//obtiene todos los productos (FUNCIONA CORRECTAMENTE)
routerProducts.get("/", async (req, res) => {
  const products = await manager.getProducts();

  res.send(products);
});

//obtiene productos por id (FUNCIONA CORRECTAMENTE)
routerProducts.get("/:id", async (req, rest) => {
  const { id } = req.params;
  const products = await manager.getProductById(id);
  rest.send(products);
  //products.find((product) => product.id == id);
});

//devuelve una nueva lista recortada dependiendo la cantidad que que pongas en cantidad.
//(NO FUNCIONA, NO ENCUENTRO EL ERROR)
//PROBE CON: /?CANTIDAD=3 /?=3 /=3 /CANTIDAD?CANTIDAD=3
routerProducts.get("/cantidad", async (req, rest) => {
  const { cantidad } = req.query;
  const products = await manager.getProducts();
  rest.send(products.slice(0, +cantidad));
});

//agrega un nuevo producto (FUNCIONA CORRECTAMENTE Y CREA UN ID NUEVO SIN PROBLEMAS.)
routerProducts.post("/", async (req, res) => {
  const body = req.body;
  try {
    const newProduct = await manager.addProducts(body);
    res.send(newProduct);
  } catch (err) {
    res.status(502).send({ error: true });
  }
});

// cambia algun dato de un producto, sin modificar el ID (NO FUNCIONA, CUANDO LO EJECUTO ME TRANSFORMA TODO EN NULL)
routerProducts.put("/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const changes = await manager.updateProducts(id, product);
  res.send({ update: true });
});

// Elimina un producto de la base de datos (FUNCIONA, BORRA EL ID, PERO NO PERSISTE EL CAMBIO, NO DESCUBRI EL PORQUE AUN)
routerProducts.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await manager.getProducts();
  const newList = product.filter((product) => product.id !== +id);
  res.send(newList);
});

export default routerProducts;
