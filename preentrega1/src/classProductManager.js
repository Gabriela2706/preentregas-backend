import fs from "fs";

export default class ProductManager {
  #id = 0;

  constructor() {
    this.products = [];
    this.path = "./preentrega1/src/db/products.json";
  }

  getProducts = async () => {
    const fileProducts = await fs.promises.readFile(this.path, "utf8");
    const productParseado = JSON.parse(fileProducts);

    return productParseado;
  };
  //------------------------------------------------------------------------------
  //AGREGAR PRODUCTOS NUEVOS

  addProducts = async (prod) => {
    try {
      const {
        title,
        description,
        price,
        thumbnail = [],
        code,
        stock,
        category,
        status = true,
      } = prod;
      const fileProducts = await fs.promises.readFile(this.path, "utf8");
      const productParseado = JSON.parse(fileProducts);
      //----

      // Primera validacion: busca si el producto nuevo tiene un code ya existente
      const validation = this.products.some(
        (productfind) => productfind.code === code
      );
      if (validation) {
        console.log("Producto con codigo ya existente");
        return;
      }
      //----
      // Almacenamos el ultimo elemento del array en una variable (ponemos -1 porque el indice arranca desde 0)
      const lastProduct = productParseado[productParseado.length - 1];
      if (!lastProduct) {
        this.#id = 0;
      } else {
        const lastIdProduct = lastProduct.id;
        this.#id = lastIdProduct + 1;
      }
      const newProduct = {
        id: this.#id++,
        ...prod,
      };

      this.products = productParseado;
      productParseado.push(newProduct); //Pusheo este nuevo producto al array parseado

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
      ); //Escribo en el archivo el nuevo producto pasado a stringify
      return productParseado;
    } catch (e) {
      console.log(e);
    }
  };
  //------------------------------------------------------------------------------------------
  //OBTENCION DE PRODUCTO POR ID

  getProductById = async (idProduct) => {
    const fileProducts = await fs.promises.readFile(this.path, "utf8");
    const productParseado = JSON.parse(fileProducts);

    const findProduct = productParseado.find(
      (product) => product.id == idProduct
    );
    if (findProduct) {
      console.log(`Producto Encontrado!! `);
      return findProduct;
    } else {
      return `El producto con id ${idProduct} no se encuentra en nuestra lista`;
    }
  };
  //-------------------------------------------------------------------------------------------
  //CAMBIO DE ALGUN ELEMENTO EN EL PRODUCTO.

  updateProducts = async (idUpdateProducts, update) => {
    const products = await this.getProducts(); // En products guardo la obtencion de productos
    //---

    //Validacion para saber si el el producto con cierto ID esta en nuestra base

    let productFound = products.find(
      (product) => product.id == idUpdateProducts
    );
    if (!productFound) {
      return `El producto con id ${idUpdateProducts} no se encontro.`;
    }
    //---
    //Funcion para cambiar algun dato del producto

    let updateProducts = products.map((p) => {
      if (p.id === idUpdateProducts) {
        return { ...p, ...update };
      }
      return p;
    });
    //---
    //Le doy permanencia a la lista nueva modificada
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(updateProducts, null, 2)
    );
    //---
    //Finalizamos con un mensaje y retornamos el producto modificado
    console.log("Producto modificado correctamente");
    return updateProducts.find((p) => p.id === idUpdateProducts);
  };
  //---------------------------------------------------------------------------------

  //ELIMINAR UN PRODUCTO DE LA LISTA

  deleteProduct = async (idProductDelete) => {
    const products = await this.getProducts();
    const newListOfProducts = products.filter(
      (product) => product.id !== idProductDelete
    );
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(newListOfProducts, null, 2)
    );
    return newListOfProducts;
  };
}
const productManager = new ProductManager();

// await productManager.addProducts({
//   title: `Remera Guason`,
//   description: `Remera mangas cortas al cuerpo`,
//   price: `6420`,
//   thumbnail: `https://res.cloudinary.com/dy66f9pgr/image/upload/v1687020677/guason_cntzhv.jpg`,
//   code: `R_21`,
//   stock: 20,
// });
// await productManager.addProducts({
//   title: `Remera Batman`,
//   description: `Remera mangas cortas al cuerpo`,
//   price: `7520`,
//   thumbnail: `https://res.cloudinary.com/dy66f9pgr/image/upload/v1687020680/batman_djggwa.png`,
//   code: `R_25`,
//   stock: 17,
// });
// await productManager.addProducts({
//   title: `Remera Capitan America`,
//   description: `Remera mangas cortas al cuerpo`,
//   price: `6420`,
//   thumbnail: `https://res.cloudinary.com/dy66f9pgr/image/upload/v1687020677/capitan_america_k4zgbn.jpg`,
//   code: `R_35`,
//   stock: 15,
// });

// //funcion para obtener los productos ingresados
//console.log(await productManager.getProducts());

// //funcion para buscar un producto por ID
//console.log(await productManager.getProductById(3));

// //funcion para eliminar un producto por su id
//console.log(await productManager.deleteProduct(5));

// //funcion para cambiar un dato de un producto
//console.log(await productManager.updateProducts(6, 2));
