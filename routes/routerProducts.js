import express from "express";
import productController from "../controllers/controllerProducts.js";

const routerProducts = express.Router();

routerProducts.get("/:id?", (req, res) =>productController.getProducts(req, res));

routerProducts.post("/", (req, res) => productController.addProduct(req, res));

routerProducts.put("/:id", (req, res) => productController.updateProduct(req, res));

routerProducts.delete("/:id", (req, res) => productController.deleteProduct(req, res));

export default routerProducts;
