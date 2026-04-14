import { productos } from "./data.js";

const PATH = "/productos";

export function registerGetEndpoints(app) {

  app.get("/healthcheck", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get(PATH, (req, res) => {
    console.log("QUERY:", req.query);

    const precioMenorQue = Number(req.query.precio_lt);
    const categoria = req.query.categoria;

    let productosFiltrados = productos;

    if (precioMenorQue) {
      productosFiltrados = productosFiltrados.filter(
        (producto) => producto.precioBase < precioMenorQue
      );
    }

    if (categoria) {
      productosFiltrados = productosFiltrados.filter(
        (producto) => producto.categoria === categoria
      );
    }

    res.json(productosFiltrados);

  });

  app.get(PATH + "/:id", (req, res) => {
    const id = req.params.id;
    const producto = productos.find((p) => p.id === id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto);
  });

}