import express from "express";
import productController from "../controllers/controllerProducts.js";
import { config } from "../utils/config.js";

const routerProducts = express.Router();

const esAdmin = config.isAdmin;
function soloAdmins(req,res,next){
  if(!esAdmin){
    res.status(403).json({code: 403, msg: `Forbbiden Acces ${req.method} ${req.baseUrl}${req.url}`});
  
  }else{
    next();
  }
}


routerProducts.get("/:id?", (req, res) =>
  productController.getProducts(req, res)
);

routerProducts.post("/",soloAdmins, (req, res) => productController.addProduct(req, res));

routerProducts.put("/:id",soloAdmins, (req, res) =>
  productController.updateProduct(req, res)
);

routerProducts.delete("/:id",soloAdmins, (req, res) =>
  productController.deleteProduct(req, res)
);

export default routerProducts;
