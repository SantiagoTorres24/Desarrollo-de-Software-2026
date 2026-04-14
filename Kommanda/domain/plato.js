const { CategoriaEnum } = require('./enums');

class Plato {
    constructor(nombre, categoria, precio, descripcion, disponible = true) {
        if ([nombre, categoria, precio, descripcion].some(e => e === undefined)) {
            throw new Error('Faltan datos del plato');
        }

        if (!Object.values(CategoriaEnum).includes(categoria)) {
            throw new Error('Categoría de plato inválida');
        }

        if (typeof precio !== 'number' || precio < 0) {
            throw new Error('Precio inválido');
        }

        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.descripcion = descripcion;
        this.disponible = Boolean(disponible);
    }

    marcarNoDisponible() {
        this.disponible = false;
    }

    cambiarDisponibilidad(nuevaDisponibilidad) {
        if (typeof nuevaDisponibilidad === 'boolean') {
            this.disponible = nuevaDisponibilidad;
            return;
        }

        if (nuevaDisponibilidad === 'Disponible') {
            this.disponible = true;
            return;
        }

        if (nuevaDisponibilidad === 'No Disponible') {
            this.disponible = false;
            return;
        }

        throw new Error("La disponibilidad debe ser 'Disponible', 'No Disponible' o un booleano");
    }
}

module.exports = { Plato };