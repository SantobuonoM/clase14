import Container from "./container.js";
import productsController from "./controllerProducts.js";

const carritos = new Container("./data/carritos.json");

////////Agrega Carrito/////////////////

const addCarrito = async (req, res) => {
  const { name, description } = req.body;
  //if (!products) return carrito.save([]);

  await carritos.save({ name, description, products: [] });
  res.json({ message: "Carrito agregado" });
};
/////////////  Borra un  producto ///////////////////

const deleteCarrito = (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res
      .status(400)
      .send({ message: "Ingresa el ID de un carrito listado" });
  const carritoDeleted = carritos.deleteById(id);
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
  const carritoSelected = carritos.getById(id);
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
  const productSaved = await saveProduct(idCarrito, idProduct);
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
  const productDeleted = deleteOneProduct(id, id_prod);
  if (productDeleted == -1 || !productDeleted)
    return res.status(404).send({ message: "Error" });
  res.json({ message: "Producto eliminado" });
};
const saveProduct = async (idCarrito, idProduct) => {
  try {
    const carrito = carritos.getById(idCarrito);
    if (carrito == null) return;
    const productSelected = productsController.products.getById(idProduct);
    if (productSelected == null) return;
    carrito.products.push(productSelected);
    await carritos.writeData();
    return "Product agregado!";
  } catch (err) {
    console.log(err);
    return "Error al agregar producto";
  }
};
const deleteOneProduct = (idCarrito, idProduct) => {
  try {
    const carrito = carritos.getById(idCarrito);
    if (carrito == null) return;
    const productToDelete = carrito.products.findIndex(
      (product) => product.id === idProduct
    );
    if (productToDelete == -1) return;
    carrito.products.splice(productToDelete, 1);
    carritos.writeData();
    return "Producto eliminado!";
  } catch (error) {
    console.log(error);
  }
};
export {
  addCarrito,
  deleteCarrito,
  getProducts,
  addProductToCarrito,
  deleteProduct,
};
