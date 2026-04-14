class Bebida {
    constructor(nombre, precio, descripcion, lista = false) {
        if ([nombre, precio, descripcion].some(e => e === undefined)) {
            throw new Error('Faltan datos de la bebida');
        }

        if (typeof precio !== 'number' || precio < 0) {
            throw new Error('Precio inválido');
        }

        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.lista = Boolean(lista);
    }

    bebidaLista() {
        this.lista = true;
    }
}

module.exports = { Bebida };