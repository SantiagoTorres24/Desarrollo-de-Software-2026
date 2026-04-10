class Mesa {
    constructor(numero, capacidad) {
        if (!Number.isInteger(numero) || numero <= 0) {
            throw new Error('Número de mesa inválido');
        }

        if (!Number.isInteger(capacidad) || capacidad <= 0) {
            throw new Error('Capacidad de mesa inválida');
        }

        this.numero = numero;
        this.capacidad = capacidad;
    }
}

module.exports = { Mesa };