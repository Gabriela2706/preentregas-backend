import { Router } from "express";
import ProductManager from "../classProductManager.js";
const routerViews = Router();
const manager = new ProductManager("../routes/products.json");

//devuelve la lista de todos nuestros productos
routerViews.get("/", async (req, res) => {
  let products = await manager.getProducts();

  res.render(`home`, { prod: products });
});
// devuelve una vista para ingresar un producto nuevo
routerViews.get("/realtimeproducts", async (req, res) => {
  res.render(`realTimeProducts`);
});

export default routerViews;
