import { z } from "zod";

export const productSchema = z.object({
  nombre: z.string().min(3).max(10),
  descripcion: z.string(),
  precioBase: z.number().nonnegative(),
  categoria: z.enum(["Bebidas", "Alimentos"]),
});