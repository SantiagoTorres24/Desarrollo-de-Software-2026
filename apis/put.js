import { productos } from "./data.js";
import { productSchema } from "./productSchema.js";

const PATH_PRODUCTOS_V1 = "/productos";

export function registerPutEndpoints(app) {
  app.put(PATH_PRODUCTOS_V1 + "/:id", (req, res) => {
    const body = req.body;
    const resultBody = productSchema.safeParse(body);

    if (resultBody.error) {
      res.status(400).json(resultBody.error.issues);
      return;
    }

    const updateData = resultBody.data;
    const id = req.params.id;

    const productoExistente = productos.find(p => p.id === id);

    if (!productoExistente) {
      res.status(404).json({ error: "No existe un producto con ese ID" });
      return;
    }

    const productoExistenteNombre = productos.find(
      (p) =>
        p.nombre === updateData.nombre &&
        p.categoria === updateData.categoria &&
        p.id !== id,
    );

    if (productoExistenteNombre) {
      res.status(409).json({ error: "Ya existe otro producto con ese nombre" });
      return;
    }

    productoExistente.nombre = updateData.nombre;
    productoExistente.precioBase = updateData.precioBase;
    productoExistente.descripcion = updateData.descripcion;
    productoExistente.categoria = updateData.categoria;

    res.status(200).json(productoExistente);
  });
}