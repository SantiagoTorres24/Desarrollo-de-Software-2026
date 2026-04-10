let menu = {
    platosDisponibles: []
}

class Plato {
    constructor(nombre, categoria, precio, descripcion, disponibilidad) {
        let valores = [nombre, categoria, precio, descripcion, disponibilidad]
        if (valores.some(e => e === undefined)) {
            throw new Error("No hay un/unos estado/s definido/s");
        }
        
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.descripcion = descripcion;
        this.disponibilidad = disponibilidad;
    }

    cambiarDisponibilidad(nuevaDisponibilidad) {
        if (nuevaDisponibilidad !== "Disponible" && nuevaDisponibilidad !== "No Disponible") {
            throw new Error("La disponibilidad debe ser 'Disponible' o 'No Disponible'");
        }
        this.disponibilidad = nuevaDisponibilidad;
    }
}

module.exports = { menu, Plato };