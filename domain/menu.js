const { Plato } = require('./plato');

class Menu {
    constructor() {
        this.platos = [];
    }

    agregarPlato(plato) {
        if (!(plato instanceof Plato)) {
            throw new Error('Solo se pueden agregar objetos Plato al menú');
        }

        this.platos.push(plato);
    }

    eliminarPlato(plato) {
        const inicial = this.platos.length;
        this.platos = this.platos.filter(item => item !== plato);

        if (this.platos.length === inicial) {
            throw new Error('El plato no existe en el menú');
        }
    }

    marcarPlatoNoDisponible(plato) {
        const encontrado = this.platos.find(item => item === plato);
        if (!encontrado) {
            throw new Error('El plato no existe en el menú');
        }

        encontrado.marcarNoDisponible();
    }

    obtenerPlatosDisponibles() {
        return this.platos.filter(item => item.disponible);
    }
}

const menu = new Menu();

module.exports = { Menu, menu };