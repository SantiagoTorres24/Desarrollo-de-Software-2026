const { EstadoComandaEnum, CategoriaEnum } = require('./enums');
const { Bebida } = require('./bebida');

class Comanda {
    constructor(mesa, platos = []) {
        if (!mesa) {
            throw new Error('Debe especificarse una mesa para la comanda');
        }

        this.mesa = mesa;
        this.estado = EstadoComandaEnum.INGRESADO;
        this.platos = [];
        this.bebidas = [];

        platos.forEach(elemento => this.agregarPlato(elemento));
    }

    agregarPlato(plato, nota = '') {
        if (!plato) {
            throw new Error('Debe indicarse un plato o bebida para agregar a la comanda');
        }

        const item = {
            plato,
            nota: String(nota),
            listo: false
        };

        if (plato instanceof Bebida || plato.categoria === CategoriaEnum.BEBIDA) {
            this.bebidas.push({ bebida: plato, nota: String(nota), lista: false });
        } else {
            this.platos.push(item);
        }

        this._recalcularEstado();
    }

    eliminarPlato(plato) {
        const platosAntes = this.platos.length + this.bebidas.length;

        this.platos = this.platos.filter(item => item.plato !== plato);
        this.bebidas = this.bebidas.filter(item => item.bebida !== plato);

        const platosDespues = this.platos.length + this.bebidas.length;

        if (platosAntes === platosDespues) {
            throw new Error('El plato o bebida no forma parte de la comanda');
        }

        this._recalcularEstado();
    }

    cambiarEstado(estado) {
        if (!Object.values(EstadoComandaEnum).includes(estado)) {
            throw new Error('Estado de comanda inválido');
        }

        this.estado = estado;
    }

    verEstado() {
        return this.estado;
    }

    verBebidasListas() {
        return this.bebidas.filter(item => item.lista).map(item => item.bebida);
    }

    verBebidasPendientes() {
        return this.bebidas.filter(item => !item.lista).map(item => item.bebida);
    }

    marcarBebidasListas(bebidas) {
        if (!Array.isArray(bebidas)) {
            throw new Error('Debe proporcionar una lista de bebidas para marcar como listas');
        }

        bebidas.forEach(bebida => {
            const item = this.bebidas.find(elemento => elemento.bebida === bebida);
            if (!item) {
                throw new Error('La bebida no forma parte de la comanda');
            }
            item.lista = true;
        });

        this._recalcularEstado();
    }

    verPlatosPendientes() {
        return this.platos.filter(item => !item.listo).map(item => item.plato);
    }

    marcarPlatosListos(platos) {
        if (!Array.isArray(platos)) {
            throw new Error('Debe proporcionar una lista de platos para marcar como listos');
        }

        platos.forEach(plato => {
            const item = this.platos.find(elemento => elemento.plato === plato);
            if (!item) {
                throw new Error('El plato no forma parte de la comanda');
            }
            item.listo = true;
        });

        this._recalcularEstado();
    }

    verTotal() {
        const totalPlatos = this.platos.reduce((suma, item) => suma + Number(item.plato.precio), 0);
        const totalBebidas = this.bebidas.reduce((suma, item) => suma + Number(item.bebida.precio), 0);
        return totalPlatos + totalBebidas;
    }

    _recalcularEstado() {
        const entradasPendientes = this.platos.filter(item => item.plato.categoria === CategoriaEnum.ENTRADA && !item.listo);
        const principalesPendientes = this.platos.filter(item => item.plato.categoria === CategoriaEnum.PRINCIPAL && !item.listo);
        const postresPendientes = this.platos.filter(item => item.plato.categoria === CategoriaEnum.POSTRE && !item.listo);

        const tieneEntradas = this.platos.some(item => item.plato.categoria === CategoriaEnum.ENTRADA);
        const tienePrincipales = this.platos.some(item => item.plato.categoria === CategoriaEnum.PRINCIPAL);
        const tienePostres = this.platos.some(item => item.plato.categoria === CategoriaEnum.POSTRE);

        if (this._tieneItemsPendientes()) {
            if (entradasPendientes.length > 0) {
                this.estado = EstadoComandaEnum.INGRESADO;
                return;
            }

            if (tieneEntradas && principalesPendientes.length > 0) {
                this.estado = EstadoComandaEnum.ENTRADAS_LISTAS;
                return;
            }

            if ((tieneEntradas || tienePrincipales) && postresPendientes.length > 0) {
                this.estado = EstadoComandaEnum.PRINCIPALES_LISTOS;
                return;
            }

            if (tienePostres) {
                this.estado = EstadoComandaEnum.POSTRES_LISTOS;
                return;
            }

            if (tienePrincipales) {
                this.estado = EstadoComandaEnum.PRINCIPALES_LISTOS;
                return;
            }

            if (tieneEntradas) {
                this.estado = EstadoComandaEnum.ENTRADAS_LISTAS;
                return;
            }

            this.estado = EstadoComandaEnum.INGRESADO;
            return;
        }

        if (this.estado === EstadoComandaEnum.PAGADO || this.estado === EstadoComandaEnum.ENTREGADO) {
            return;
        }

        if (tienePostres || tienePrincipales || tieneEntradas) {
            if (tienePostres) {
                this.estado = EstadoComandaEnum.POSTRES_LISTOS;
                return;
            }

            if (tienePrincipales) {
                this.estado = EstadoComandaEnum.PRINCIPALES_LISTOS;
                return;
            }

            if (tieneEntradas) {
                this.estado = EstadoComandaEnum.ENTRADAS_LISTAS;
                return;
            }
        }

        this.estado = EstadoComandaEnum.INGRESADO;
    }

    _tieneItemsPendientes() {
        return this.platos.some(item => !item.listo) || this.bebidas.some(item => !item.lista);
    }
}

module.exports = { Comanda };