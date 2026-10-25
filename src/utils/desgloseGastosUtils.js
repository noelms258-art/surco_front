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

export const prepararDesgloseGastos = (desgloseGastos) => {

    if (!desgloseGastos) return [];

    const categorias = {
        salarios: {
            label: "Salarios",
            color: "#E69B59"
        },
        activos: {
            label: "Activos",
            color: "#7DAA85"
        },
        productos: {
            label: "Productos",
            color: "#C39A69"
        }
    };

    return Object.entries(desgloseGastos)
        .filter(([clave, valor]) =>
            categorias[clave] !== undefined &&
            Number.isFinite(Number(valor)) &&
            Number(valor) > 0
        )
        .map(([clave, valor]) => ({
            id: clave,
            label: categorias[clave].label,
            value: Number(valor),
            color: categorias[clave].color
        }));
};