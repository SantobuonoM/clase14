import express from "express";
import {
  addCarrito,
  deleteCarrito,
  getProducts,
  addProductToCarrito,
  deleteProduct,
} from "../controllers/controllerCarritos.js";
const routerCarritos = express.Router();

routerCarritos.post("/", (req, res) => addCarrito(req, res));

routerCarritos.delete("/:id", (req, res) => deleteCarrito(req, res));

routerCarritos.get("/:id/products", (req, res) => getProducts(req, res));

routerCarritos.post("/:id/products", (req, res) => addProductToCarrito(req, res));

routerCarritos.delete("/:id/products/:id_prod", (req, res) =>
  deleteProduct(req, res)
);

export default routerCarritos;
