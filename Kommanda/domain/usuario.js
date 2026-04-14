const { RolEnum } = require('./enums');
const { menu } = require('./menu');

class Usuario {
    constructor(nombre, rol) {
        if (nombre === undefined || rol === undefined) {
            throw new Error('Nombre y rol son requeridos');
        }

        this.nombre = nombre;
        this.rol = rol;
    }

    agregarPlato(plato) {
        if (this.rol !== RolEnum.ADMIN) {
            throw new Error('No tienes permisos para agregar platos');
        }

        menu.agregarPlato(plato);
    }

    quitarPlato(plato) {
        if (this.rol !== RolEnum.ADMIN) {
            throw new Error('No tienes permisos para quitar platos');
        }

        menu.eliminarPlato(plato);
    }

    cambiarDisponibilidadPlato(plato, nuevaDisponibilidad) {
        if (this.rol !== RolEnum.ADMIN) {
            throw new Error('No tienes permisos para cambiar la disponibilidad de platos');
        }

        plato.cambiarDisponibilidad(nuevaDisponibilidad);
    }
}

module.exports = { Usuario };