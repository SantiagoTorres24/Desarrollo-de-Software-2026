import { productos } from "./data.js";

const PATH_PRODUCTOS_V1 = "/productos";

export function registerDeleteEndpoints(app) {
  app.delete(PATH_PRODUCTOS_V1 + "/:id", (req, res) => {
    const id = req.params.id;
    const index = productos.findIndex(p => p.id === id);
    if (index === -1) {
      res.status(404).json({ error: "No existe un producto con ese ID" });
      return;
    }
    productos.splice(index, 1);
    res.status(204).send();
  });
}