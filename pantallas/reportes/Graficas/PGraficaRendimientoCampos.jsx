import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { CartesianChart, HorizontalBarGroup } from 'victory-native';
import { useFont } from '@shopify/react-native-skia';
import { useNavigation } from '@react-navigation/native';


export default function PGraficaRendimientoCampos({ graficaCampos = [] }) {
    
    const navigation = useNavigation();

    const font = useFont(
        require('../../../assets/fonts/Roboto-Regular.ttf'),
        10
    );

    const ALTO_POR_CAMPO = 34;
    const MIN_CAMPOS_VISUALES = 4;

    const datosRendimineto = graficaCampos.map((campo) => {
        console.log(campo)
        const ingresos = Number(campo.ingresos || 0);
        const gastos = Number(campo.gastos || 0);
        const superficie = Number(campo.superficie || 0);

        console.log("ingresos: " + ingresos)
        console.log("gastos: " + gastos)
        console.log("superficie: " + superficie)


        const rendimiento = ingresos > 0 ? ((ingresos - gastos) / superficie) : 0;

        console.log("redimiento: " + rendimiento)

        return {
            ...campo,
            rendimiento,
        };
    });

    const numeroCamposVisuales = Math.max(
        datosRendimineto.length,
        MIN_CAMPOS_VISUALES
    );
    const alturaGrafica =
        numeroCamposVisuales * ALTO_POR_CAMPO;

    const calcularEje = (datos) => {
        if (!datos.length) {
            return {
                minEje: 0,
                maxEje: 10,
                ticks: [0, 5, 10],
            };
        }

        const valores = datos
            .map(campo => Number(campo.rendimiento))
            .filter(Number.isFinite);

        if (!valores.length) {
            return {
                minEje: 0,
                maxEje: 10,
                ticks: [0, 5, 10],
            };
        }

        const maxValor = Math.max(...valores, 0);
        const minValor = Math.min(...valores, 0);

        const calcularLimite = (valor) => {
            if (valor === 0) return 10;

            const absoluto = Math.abs(valor);

            const magnitud = Math.pow(
                10,
                Math.floor(Math.log10(absoluto))
            );

            const normalizado = absoluto / magnitud;

            let salto;

            if (normalizado <= 1) {
                salto = 1;
            } else if (normalizado <= 2) {
                salto = 2;
            } else if (normalizado <= 5) {
                salto = 5;
            } else {
                salto = 10;
            }

            return salto * magnitud;
        };

        const maxEje = calcularLimite(maxValor);

        // Solo ponemos eje negativo si realmente hay beneficios negativos
        if (minValor < 0) {
            const minEje = -calcularLimite(minValor);

            return {
                minEje,
                maxEje,
                ticks: [
                    minEje,
                    0,
                    maxEje
                ],
            };
        }

        return {
            minEje: 0,
            maxEje,
            ticks: [
                0,
                maxEje / 2,
                maxEje
            ],
        };
    };

    const { minEje, maxEje, ticks } = calcularEje(datosRendimineto);
    const hayDatosEconomicos = datosRendimineto.some(
        campo => campo.rendimiento !== 0
    );

    return (
        <TouchableOpacity>
            <View style={styles.contenedor}>
                <View style={styles.cardGrafica}>
                    <View style={styles.cabecera}>
                        <Text style={styles.titulo}></Text>
                    </View>
                    <View style={[styles.grafica, { height: alturaGrafica }]} >

                        {font && graficaCampos.length > 0 && (

                            hayDatosEconomicos ? (

                                <CartesianChart
                                    data={datosRendimineto}
                                    xKey="nomCampo"
                                    yKeys={["rendimiento"]}
                                    orientation="horizontal"
                                    domain={{ x: [minEje, maxEje] }}
                                    domainPadding={{
                                        top: 50,
                                        bottom: 50,
                                    }}
                                    padding={{
                                        top: 10,
                                        bottom: 20,
                                        left: 5,
                                        right: 25,
                                    }}
                                    xAxis={{
                                        font,
                                        tickValues: ticks,
                                        labelColor: "#9A978F",
                                        lineColor: "#EEE9E1",
                                        formatXLabel: (value) =>
                                            `${Math.round(Number(value))}`
                                    }}
                                    yAxis={[{
                                        font,
                                        yKeys: ["beneficio"],
                                        tickCount: datosRendimineto.length,
                                        lineWidth: 0,
                                        labelColor: "#77736D",
                                        formatYLabel: (value) =>
                                            String(value),
                                    }]}>
                                    {({ points, chartBounds }) => (
                                        <HorizontalBarGroup
                                            chartBounds={chartBounds}
                                            barWidth={8}
                                            betweenGroupPadding={0.65}
                                            withinGroupPadding={0}>
                                            <HorizontalBarGroup.Bar
                                                points={points.rendimiento}
                                                color="#356B3D"
                                                labels={{
                                                    font,
                                                    position: "right",
                                                    color: "#77736D",
                                                }} />
                                        </HorizontalBarGroup>
                                    )}
                                </CartesianChart>
                            ) : (
                                <View style={styles.sinDatos}>
                                    <Text style={styles.sinDatosTitulo}>
                                        No hay datos económicos por campo
                                    </Text>

                                    <Text style={styles.sinDatosTexto}>
                                        El margen aparecerá aquí cuando haya movimientos registrados.
                                    </Text>
                                </View>
                            )
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({

    contenedor: {
        alignItems: "center",
        paddingBottom: 10,
    },

    cardGrafica: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 18,
        padding: 16,
        borderColor: "#e5e2da",
    },

    cabecera: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },

    titulo: {
        fontSize: 13,
        color: "#444",
    },

    leyenda: {
        flexDirection: "row",
        gap: 10,
    },

    leyendaItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    cuadroLeyenda: {
        width: 9,
        height: 9,
        borderRadius: 2,
    },

    textoLeyenda: {
        fontSize: 10,
        color: "#77736D",
    },

    grafica: {
        marginTop: 4,
        width: "100%",
    },
    sinDatos: {
        flex: 1,
        minHeight: 140,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    sinDatosTitulo: {
        fontSize: 13,
        color: "#555",
        marginBottom: 6,
        textAlign: "center",
    },
    sinDatosTexto: {
        fontSize: 11,
        color: "#99958D",
        textAlign: "center",
        lineHeight: 16,
    },
});