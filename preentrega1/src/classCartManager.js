import fs from "fs";

export default class CartManager {
  #id = 0;
  constructor() {
    this.cart = [];
  }

  getCart = async () => {
    const fileCart = await fs.promises.readFile("./db/cart.json", "utf-8");
    const carritoParseado = JSON.parse(fileCart);
    return carritoParseado;
  };

  createCart = async () => {
    const cartOfProducts = [];
    const fileCart = await fs.promises.readFile("./db/cart.json", "utf-8");
    const carritoParseado = JSON.parse(fileCart);

    const lastCart = carritoParseado[carritoParseado.length - 1];
    if (!lastCart) {
      this.#id = 0;
    } else {
      const lastIdCart = lastCart.id;
      this.#id = lastIdCart + 1;
    }

    const newCart = {
      id: this.#id++,
      ...cartOfProducts,
    };

    this.cart = carritoParseado;
    carritoParseado.push(newCart);

    await fs.promises.writeFile(
      "./db/cart.json",
      JSON.stringify(this.cart, null, 2)
    );
    return carritoParseado;
  };

  getCartById = async (idCart) => {
    const fileCart = await fs.promises.readFile("./db/cart.json", "utf-8");
    const carritoParseado = JSON.parse(fileCart);

    const findCart = carritoParseado.find((cart) => cart.id == idCart);
    if (findCart) {
      return findProduct;
    } else {
      return `El carrito con id ${idProduct} no se genero aun`;
    }
  };
}
