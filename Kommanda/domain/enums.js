const CategoriaEnum = Object.freeze({
    ENTRADA: 'Entrada',
    PRINCIPAL: 'Principal',
    POSTRE: 'Postre',
    BEBIDA: 'Bebida'
});

const RolEnum = Object.freeze({
    ADMIN: 'admin',
    ENCARGADO: 'encargado',
    MOZO: 'mozo'
});

const EstadoComandaEnum = Object.freeze({
    INGRESADO: "ingresado",
    ENTRADAS_LISTAS: "entradas_listas",
    PRINCIPALES_LISTOS: "principales_listos",
    POSTRES_LISTOS: "postres_listos",
    ENTREGADO: "entregado",
    PAGADO: "pagado"
});