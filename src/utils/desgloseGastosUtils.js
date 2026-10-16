export const COLORES_GASTOS = [
    '#356B3D',
    '#75B47C',
    '#B2E5A3',
    '#B48951',
    '#9747E8',
    '#4A90A4',
    '#D99555',
    '#9B6585',
];

const NOMBRES_GASTOS = {
    salarios: 'Mano de obra',
    activos: 'Activos',
    productos: 'Productos',
};

// Genera un índice de color estable según el nombre
const obtenerColorGasto = (clave) => {
    let hash = 0;

    for (let i = 0; i < clave.length; i++) {
        hash = ((hash * 31) + clave.charCodeAt(i)) | 0;
    }

    return COLORES_GASTOS[
        (hash >>> 0) % COLORES_GASTOS.length
    ];
};

export const prepararDesgloseGastos = (gastos = {}) => {

    if (!gastos) return [];

    return Object.entries(gastos)
        .filter(([clave, valor]) =>
            clave !== 'codCampo' &&
            valor !== null &&
            valor !== '' &&
            Number.isFinite(Number(valor)) &&
            Number(valor) > 0
        )
        .map(([clave, valor]) => ({
            id: clave,
            label: NOMBRES_GASTOS[clave] ??
                clave.replaceAll('_', ' '),
            value: Number(valor),
            color: obtenerColorGasto(clave),
        }));
};