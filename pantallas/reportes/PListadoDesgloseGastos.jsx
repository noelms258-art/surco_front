
import { View, Text, StyleSheet } from 'react-native';
import { prepararDesgloseGastos } from '../../src/utils/desgloseGastosUtils';

export default function PListadoDesgloseGastos({
    desgloseGastos = null
}) {

    const datos = prepararDesgloseGastos(desgloseGastos);

    const totalGastos = datos.reduce(
        (total, gasto) => total + gasto.value,
        0
    );

    const formatearImporte = (importe) => {
        return Number(importe).toLocaleString('es-ES', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }) + ' €';
    };

    const calcularPorcentaje = (importe) => {
        if (totalGastos <= 0) return 0;

        return (importe / totalGastos) * 100;
    };

    return (
        <View style={styles.contenedor}>
            <View style={styles.card}>

                {datos.length > 0 ? (
                    <>
                        {datos.map((gasto, index) => (

                            <View
                                key={gasto.id}
                                style={[
                                    styles.fila,
                                    index === datos.length - 1 &&
                                        styles.ultimaFila
                                ]}>

                                <View
                                    style={[
                                        styles.indicador,
                                        {
                                            backgroundColor: gasto.color
                                        }]}/>

                                <View style={styles.informacion}>

                                    <Text style={styles.nombre}>
                                        {gasto.label}
                                    </Text>

                                    <Text style={styles.porcentaje}>
                                        {calcularPorcentaje(
                                            gasto.value
                                        ).toLocaleString('es-ES', {
                                            maximumFractionDigits: 1
                                        })}% del gasto
                                    </Text>

                                </View>

                                <Text style={styles.importe}>
                                    {formatearImporte(gasto.value)}
                                </Text>

                            </View>
                        ))}

                        <View style={styles.filaTotal}>
                            <Text style={styles.textoTotal}>
                                Total de gastos
                            </Text>

                            <Text style={styles.importeTotal}>
                                {formatearImporte(totalGastos)}
                            </Text>
                        </View>
                    </>
                ) : (
                    <Text style={styles.sinDatos}>No hay gastos registrados</Text>
                )}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    contenedor: {
        width: '100%',
        paddingBottom: 10,
    },

    titulo: {
        fontSize: 13,
        fontWeight: '600',
        color: '#444',
        marginBottom: 8,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        paddingHorizontal: 16,
    },

    fila: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e5e2da',
    },

    ultimaFila: {
        borderBottomWidth: 0,
    },

    indicador: {
        width: 23,
        height: 23,
        borderRadius: 5,
        marginRight: 13,
    },

    informacion: {
        flex: 1,
    },

    nombre: {
        fontSize: 12,
        fontWeight: '600',
        color: '#222',
    },

    porcentaje: {
        fontSize: 10,
        color: '#99958D',
        marginTop: 5,
    },

    importe: {
        fontSize: 12,
        fontWeight: '600',
        color: '#222',
        marginLeft: 8,
    },

    filaTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#e5e2da',
    },

    textoTotal: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#356B3D',
    },

    importeTotal: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#356B3D',
    },

    sinDatos: {
        fontSize: 12,
        color: '#99958D',
        textAlign: 'center',
        paddingVertical: 20,
    },
});
