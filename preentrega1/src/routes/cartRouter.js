import { Router } from "express";
import CartManager from "../classCartManager.js";
import ProductManager from "../classProductManager.js";
const routerCart = Router();
const managerCart = new CartManager();
const managerProduct = new ProductManager();

//crea un nuevo carrito (FUNCIONA CORRECTAMENTE Y CREA UN CARRITO NUEVO SIN PROBLEMAS.)
routerCart.post("/", async (req, res) => {
  const body = req.body;
  const newCart = await managerCart.createCart(body);
  res.send(console.log(newCart));
});

//obtiene carrito por id (FUNCIONA CORRECTAMENTE)
routerCart.get("/:id", async (req, res) => {
  const { id } = req.params;
  const cart = await managerCart.getCartById(id);
  res.send(cart);
});

//agrega el producto al array “products” del carrito seleccionado ()
routerCart.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const addproducts = await managerCart.addProductToCart(
    await managerCart.getCartById(+cid),
    await managerProduct.getProductById(+pid)
  );
  res.send(addproducts);
});

export default routerCart;
