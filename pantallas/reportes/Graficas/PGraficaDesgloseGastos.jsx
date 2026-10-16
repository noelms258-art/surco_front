
import { View, Text, StyleSheet } from 'react-native';
import { PolarChart, Pie } from 'victory-native';
import { useFont } from '@shopify/react-native-skia';
import { prepararDesgloseGastos } from '../../../src/utils/desgloseGastosUtils';

export default function PGraficaDesgloseGastos({ desgloseGastos = null}) {

    const font = useFont(
        require('../../../assets/fonts/Roboto-Regular.ttf'),
        12
    );

    const datosGrafica = prepararDesgloseGastos(desgloseGastos);
    console.log(datosGrafica)

    const totalGastos = datosGrafica.reduce(
        (total, gasto) => total + gasto.value,
        0
    );

    const formatearImporte = (importe) =>
        Number(importe).toLocaleString('es-ES', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }) + ' €';

    return (
        <View style={styles.contenedor}>

            <View style={styles.cardGrafica}>
                <Text style={styles.descripcion}>Importe en miles por concepto de gasto</Text>

                {datosGrafica.length > 0 ? (
                    <View style={styles.grafica}>

                        <PolarChart
                            data={datosGrafica}
                            labelKey="label"
                            valueKey="value"
                            colorKey="color">
                            <Pie.Chart innerRadius="65%">
                                {({ slice }) => (
                                    <>
                                        <Pie.Slice>
                                            {font && slice.sweepAngle >= 18 && (
                                                <Pie.Label
                                                    font={font}
                                                    color="#FFFFFF"
                                                    text={String(
                                                        Math.round(slice.value / 1000)
                                                    )}/>
                                            )}
                                        </Pie.Slice>

                                        <Pie.SliceAngularInset
                                            angularInset={{
                                                angularStrokeWidth: 3,
                                                angularStrokeColor: '#FFFFFF'
                                            }}/>
                                    </>
                                )}
                            </Pie.Chart>
                        </PolarChart>

                        <View
                            style={styles.centro}
                            pointerEvents="none">
                            <Text
                                style={styles.total}
                                numberOfLines={1}
                                adjustsFontSizeToFit>
                                {formatearImporte(totalGastos)}
                            </Text>

                            <Text style={styles.subtitulo}>Gasto total</Text>
                        </View>
                    </View>

                ) : (
                    <View style={styles.sinDatos}>
                        <Text style={styles.sinDatosTexto}>No hay gastos registrados</Text>
                    </View>
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

    cardGrafica: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 16,
        borderColor: '#e5e2da',
    },

    titulo: {
        fontSize: 13,
        color: '#444',
        fontWeight: '600',
        marginBottom: 5,
    },

    descripcion: {
        fontSize: 10,
        color: '#99958D',
    },

    grafica: {
        height: 260,
        width: '100%',
        position: 'relative',
        marginTop: 10,
    },

    centro: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    total: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
        maxWidth: '50%',
        textAlign: 'center',
    },

    subtitulo: {
        fontSize: 11,
        color: '#99958D',
        marginTop: 4,
    },

    sinDatos: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },

    sinDatosTexto: {
        fontSize: 12,
        color: '#99958D',
    },

});
