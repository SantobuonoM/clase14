import Container from "./container.js";

let administrador;
const carrito = new Container("./data/carritos.json");

////////Agrega Carrito/////////////////

const addCarrito = async (req, res) => {
  const { name, description } = req.body;
  //if (!products) return carrito.save([]);

  await carrito.save({name, description, products:[]});
  res.json({ message: "Carrito agregado" });
};
/////////////  Borra un  producto ///////////////////

const deleteCarrito = (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res
      .status(400)
      .send({ message: "Ingresa el ID de un carrito listado" });
  const carritoDeleted = carrito.deleteById(id);
  if (carritoDeleted === -1)
    return res
      .status(404)
      .json({ message: "El ID no pertenece a un carrito listado" });
  res.json({ message: "Carrito eliminado" });
};

/////////////  Producto especifico de un Carrito  ///////////////////

const getProducts = (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res
      .status(400)
      .send({ message: "Ingresa el ID de un carrito listado" });
  const carritoSelected = carrito.getById(id);
  if (carritoSelected == null)
    return res
      .status(404)
      .send({ message: "Ingresa el ID de un carrito listado" });
  res.json({ Productos: carritoSelected.products });
};

/////////////  Agregar un producto al Carrito///////////////////

const addProductToCarrito = async (req, res) => {
  const idCarrito = Number(req.params.id);
  if (isNaN(idCarrito))
    return res
      .status(400)
      .send({ message: "Ingresa el ID de un carrito listado" });
  const { idProduct } = req.body;
  const productSaved = await carrito.saveProduct(idCarrito, idProduct);
  if (!productSaved) return res.status(404).send({ message: "Error" });
  res.json({ message: productSaved });
};

/////////////  Borra un  product del Carrito ///////////////////

const deleteProduct = (req, res) => {
  const id = Number(req.params.id);
  const id_prod = Number(req.params.id_prod);
  if (isNaN(id) || isNaN(id_prod))
    return res
      .status(400)
      .send({ message: "Ingresa el ID de un carrito listado" });
  const productDeleted = carrito.deleteProduct(id, id_prod);
  if (productDeleted == -1 || !productDeleted)
    return res.status(404).send({ message: "Error" });
  res.json({ message: "Producto eliminado" });
};

export {
  addCarrito,
  deleteCarrito,
  getProducts,
  addProductToCarrito,
  deleteProduct,
};
