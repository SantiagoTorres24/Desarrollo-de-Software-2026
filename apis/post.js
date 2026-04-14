import { productos } from "./data.js";
import { productSchema } from "./productSchema.js";

const PATH = "/productos";

export function registerPostEndpoints(app) {

  app.post(PATH, (req, res) => {
    const body = req.body;

    const result = productSchema.safeParse(body);

    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const nuevoProducto = result.data;

    const productoExistente = productos.find(
      p => p.nombre === nuevoProducto.nombre
    );

    if (productoExistente) {
      return res.status(400).json({
        error: "Ya existe un producto con ese nombre"
      });
    }

    productos.push(nuevoProducto);

    res.status(201).json(nuevoProducto);
  });

}