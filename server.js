import express from "express";
import routerProducts from "./routes/routerProducts.js";
import routerCarritos from "./routes/routerCarritos.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", routerProducts);
app.use("/api/carrito", routerCarritos);
app.use("*", (req, res) => {
  const path = req.params;
  const method = req.method;
  res.send({
    error: -2,
    descripcion: `ruta '${path[0]}' método '${method}' no implementada`,
  });
});

const server = app.listen(PORT, () =>
  console.log(`Serve running on PORT ${PORT}`)
);
server.on("error", (err) => console.log(err));
 