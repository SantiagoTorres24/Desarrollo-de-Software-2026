import express from 'express';
import { registerGetEndpoints } from './get.js';
import { registerPostEndpoints } from './post.js';
import { registerPutEndpoints } from './put.js';
import { registerDeleteEndpoints } from './delete.js';

const app = express();
app.use(express.json());

registerGetEndpoints(app);
registerPostEndpoints(app);
registerPutEndpoints(app);
registerDeleteEndpoints(app);

const puerto = 3000;
app.listen(puerto, () => {
  console.log("El servidor inicializo correctamente en el puerto " + puerto);
});