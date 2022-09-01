import express from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/controllerProducts.js";
const routerProducts = express.Router();

routerProducts.get("/:id?", (req, res) => getProducts(req, res));

routerProducts.post("/", (req, res) => addProduct(req, res));


routerProducts.put("/:id", (req, res) => updateProduct(req, res));

routerProducts.delete("/:id", (req, res) => deleteProduct(req, res));

export default routerProducts;
