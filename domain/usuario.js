const { RolEnum } = require('./enums');
const { menu } = require('./plato');

class Usuario {
    constructor(rol){
        if(rol === undefined) {
            throw new Error("No hay un rol definido");
        }
        this.rol = rol;
    }

    agregarPlato(plato) {
        if (this.rol !== RolEnum.ADMIN) {
            throw new Error("No tienes permisos para agregar platos");
        } else {
            menu.platosDisponibles.push(plato);
        }
    }

    quitarPlato(plato) {
        if (this.rol !== RolEnum.ADMIN) {
            throw new Error("No tienes permisos para quitar platos");
        } else {
            menu.platosDisponibles.filter(e => !e === plato);
        }
    }

    cambiarDisponibilidadPlato(plato, nuevaDisponibilidad) {
        if (this.rol !== RolEnum.ADMIN) {
            throw new Error("No tienes permisos para cambiar la disponibilidad de platos");
        } else {
            plato.cambiarDisponibilidad(nuevaDisponibilidad);
        }
    }
}