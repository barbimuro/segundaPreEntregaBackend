import CartManager from "./cartManager.js";
import ProductsManager from "./productsManager.js";
const PATH = "src/files/products.json";

export const cartsService = new CartManager(PATH);
export const productsService = new ProductsManager(PATH);
