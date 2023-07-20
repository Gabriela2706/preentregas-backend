import { Router } from "express";
import ProductManager from "../classProductManager.js";
const routerProducts = Router();
const manager = new ProductManager("../routes/products.json");

//devuelve una nueva lista recortada dependiendo la cantidad que que pongas en cantidad.
routerProducts.get("/", async (req, res) => {
  const { cantidad } = req.query;
  let products = await manager.getProducts();
  if (cantidad) products = products.slice(0, +cantidad);
  res.send(products);
});
//obtiene productos por id (FUNCIONA CORRECTAMENTE)
routerProducts.get("/:id", async (req, res) => {
  const { id } = req.params;
  let products = await manager.getProductById(id);
  res.send(products);
  //products.find((product) => product.id == id);
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

// cambia algun dato de un producto, sin modificar el ID (FUNCIONA CORRECTAMENTE)
routerProducts.put("/:id", async (req, res) => {
  const { id } = req.params;
  let product = req.body;
  const changes = await manager.updateProducts(+id, product);
  res.send({ update: true });
});

// Elimina un producto de la base de datos (FUNCIONA, BORRA EL ID, PERO NO PERSISTE EL CAMBIO, NO DESCUBRI EL PORQUE AUN)
routerProducts.delete("/:id", async (req, res) => {
  const { id } = req.params;
  let product = await manager.getProducts();
  const newList = product.filter((product) => product.id !== +id);
  res.send(newList);
});

export default routerProducts;
