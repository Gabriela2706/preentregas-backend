import fs from "fs";

export default class CartManager {
  #idCarrito = 0;
  constructor() {
    this.cart = [];
    this.path = "./preentrega1/src/db/cart.json";
  }
  // OBTENER CARRITO DE PRODUCTOS
  getCart = async () => {
    const fileCart = await fs.promises.readFile(this.path, "utf-8");
    const carritoParseado = JSON.parse(fileCart);
    return carritoParseado;
  };
  //CREAR CARRITO DE PRODUCTOS
  createCart = async () => {
    const cartOfProducts = { productOfCart: { quantity: "", id: "" } }; //creo un carrito de productos, con un array que tenga los productos de carrito
    // declaro que productos del carrito tenga dos propiedades: quantity y id
    const fileCart = await fs.promises.readFile(this.path, "utf-8");
    const carritoParseado = JSON.parse(fileCart);

    // ALMACENO EL ULTIMO CARRITO DE PRODUCTOS ASI HACER EL ID INCREMENTABLE
    const lastCart = carritoParseado[carritoParseado.length - 1];
    if (!lastCart) {
      this.#idCarrito = 0;
    } else {
      const lastIdCart = lastCart.id;
      this.#idCarrito = lastIdCart + 1;
    }

    const newCart = {
      id: this.#idCarrito++,
      ...cartOfProducts,
    };

    this.cart = carritoParseado;
    carritoParseado.push(newCart);

    await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, 2));
    return carritoParseado;
  };
  // obtener carrito por id (funciona)
  getCartById = async (idCart) => {
    const fileCart = await fs.promises.readFile(this.path, "utf-8");
    const carritoParseado = JSON.parse(fileCart);

    const findCart = carritoParseado.find((cart) => cart.id == idCart);
    if (findCart) {
      return findCart;
    } else {
      return `El carrito con id ${idProduct} no se genero aun`;
    }
  };
  // agregar un producto al carrito de compras
  addProductToCart = async (productInCart) => {
    const cartProducts = await this.getCart(); // obtengo el carrito
    let searchProductInCart = cartProducts.find(
      (product) => product.id == productInCart // verifico si el id del producto existe o no.
    );
    if (searchProductInCart) {
      return; // aca deberia retornar el cartProduct (usando el pread...) + el quantity del producto actualizado. Pero no se como plasmarlo.
    }
  };
}

const cartManager = new CartManager();

//EJECUCION DEL CREATE (FUNCIONA, pero no agrega las propiedades del productOfCart)
// await cartManager.createCart({
//   productOfCart: {
//     quantity: 4,
//     id: 1,
//   },
// });
// await cartManager.createCart({
//   productOfCart: {
//     quantity: 4,
//     id: 2,
//   },
// });
// await cartManager.createCart({
//   productOfCart: {
//     quantity: 4,
//     id: 4,
//   },
// });
// await cartManager.createCart({
//   productOfCart: {
//     quantity: 4,
//     id: 6,
//   },
// });
