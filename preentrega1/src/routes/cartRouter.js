import { Router } from "express";
import CartManager from "../classCartManager.js";
const routerCart = Router();
const managerCart = new CartManager("./db/cartFiles.json");

//agrega un nuevo carrito (FUNCIONA CORRECTAMENTE Y CREA UN CARRITO NUEVO SIN PROBLEMAS.)
routerCart.post("/", async (req, res) => {
  const body = req.body;
  const newCart = await managerCart.createCart(body);
  res.send(console.log(newCart));
});

//obtiene carrito por id (FUNCIONA CORRECTAMENTE)
routerCart.get("/:cid", async (req, res) => {
  const { id } = req.params;
  const cart = await managerCart.getCartById(id);
  res.send(cart);
});

//agrega el producto al arreglo “products” del carrito seleccionado ( NO LLEGUE A HACER LA LOGICA)
routerCart.post("/:cid/product/:pid", async (req, res) => {});

export default routerCart;
