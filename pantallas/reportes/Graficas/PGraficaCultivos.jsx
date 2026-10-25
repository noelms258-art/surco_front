
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { CartesianChart, HorizontalBarGroup } from 'victory-native';
import { useFont } from '@shopify/react-native-skia';
import { getGraficaCultivos } from '../../../src/services/reportesEconomicosServices';
import { useNavigation } from '@react-navigation/native';

export default function PGraficaCultivos() {
    const navigation = useNavigation();

    const [graficaCultivos, setGraficaCultivos] = useState([]);

    const font = useFont(
        require('../../../assets/fonts/Roboto-Regular.ttf'),
        10
    );

    const MIN_CULTIVOS_VISUALES = 5;
    const ALTO_POR_CULTIVO = 34;

    const numeroCultivosVisuales = Math.max(
        graficaCultivos.length,
        MIN_CULTIVOS_VISUALES
    );

    const alturaGrafica =
        numeroCultivosVisuales * ALTO_POR_CULTIVO;

    const obtenerGraficaCultivos = async () => {
        try {
            const data = await getGraficaCultivos();

            const list = Object.values(data ?? {});

            const chartData = list.map((cultivo) => ({
                codFruta: cultivo.codFruta,
                nomFruta:
                    cultivo.nomFruta ??
                    `Cultivo ${cultivo.codFruta}`,
                kgIngreso: Number(cultivo.kgIngreso ?? 0),
                ingresos: Number(cultivo.ingresos ?? 0) / 1000,
                gastos: Number(cultivo.gastos ?? 0) / 1000,
            }));

            console.log("CHART DATA CULTIVOS:", chartData);

            setGraficaCultivos(chartData);

        } catch (error) {
            console.log(
                'Error en la llamada grafica cultivos:',
                error
            );
        }
    };

    useEffect(() => {
        obtenerGraficaCultivos();
    }, []);

    const calcularEje = (datos) => {
        if (!datos.length) {
            return {
                maxEje: 10,
                ticks: [0, 5, 10],
            };
        }

        const valores = datos
            .flatMap(cultivo => [
                Number(cultivo.ingresos),
                Number(cultivo.gastos)
            ]).filter(Number.isFinite);

        const maxValor = valores.length ? Math.max(...valores) : 0;

        if (maxValor <= 0) {
            return {
                maxEje: 10,
                ticks: [0, 5, 10],
            };
        }

        const mitad = maxValor / 2;
        const magnitud = Math.pow(10, Math.floor(Math.log10(mitad)));
        const normalizado = mitad / magnitud;

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

        salto *= magnitud;

        const maxEje = salto * 2;

        return {
            maxEje,
            ticks: [
                0,
                salto,
                maxEje
            ],
        };
    };

    const { ticks } = calcularEje(graficaCultivos);

    const hayDatosEconomicos = graficaCultivos.some(
        cultivo =>
            cultivo.ingresos > 0 ||
            cultivo.gastos > 0
    );

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate(
                "Detalle cultivos",
                { cultivos: graficaCultivos }
            )}>
            <View style={styles.contenedor}>
                <View style={styles.cardGrafica}>
                    <View style={styles.cabecera}>
                        <Text style={styles.titulo}>Rendimiento por cultivo</Text>
                        <View style={styles.leyenda}>
                            <View style={styles.leyendaItem}>
                                <View
                                    style={[
                                        styles.cuadroLeyenda,
                                        { backgroundColor: "#356B3D" }
                                    ]}/>
                                <Text style={styles.textoLeyenda}>Ingresos</Text>
                            </View>

                            <View style={styles.leyendaItem}>
                                <View
                                    style={[ styles.cuadroLeyenda, { backgroundColor: "#C39A69" }]}/>
                                <Text style={styles.textoLeyenda}>Gastos</Text>
                            </View>
                        </View>
                    </View>

                    <View
                        style={[
                            styles.grafica,
                            { height: alturaGrafica }
                        ]}>
                        {font && (
                            hayDatosEconomicos ? (
                                <CartesianChart
                                    data={graficaCultivos}
                                    xKey="nomFruta"
                                    yKeys={["ingresos", "gastos"]}
                                    orientation="horizontal"

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

                                    yAxis={[
                                        {
                                            font,
                                            yKeys: ["ingresos", "gastos"],
                                            tickCount: graficaCultivos.length,
                                            lineWidth: 0,
                                            labelColor: "#77736D",
                                            formatYLabel: (value) =>
                                                String(value),
                                        }
                                    ]}>
                                    {({ points, chartBounds }) => (
                                        <HorizontalBarGroup
                                            chartBounds={chartBounds}
                                            barWidth={8}
                                            betweenGroupPadding={0.65}
                                            withinGroupPadding={0}>
                                            <HorizontalBarGroup.Bar
                                                points={points.ingresos}
                                                color="#356B3D"
                                                labels={{
                                                    font,
                                                    position: "right",
                                                    color: "#77736D",
                                                }}/>

                                            <HorizontalBarGroup.Bar
                                                points={points.gastos}
                                                color="#C39A69"
                                                labels={{
                                                    font,
                                                    position: "right",
                                                    color: "#77736D",
                                                }}/>
                                        </HorizontalBarGroup>
                                    )}
                                </CartesianChart>
                            ) : (
                                <View style={styles.sinDatos}>
                                    <Text style={styles.sinDatosTitulo}>
                                        No hay datos económicos por cultivo
                                    </Text>

                                    <Text style={styles.sinDatosTexto}>
                                        Los ingresos y gastos aparecerán
                                        aquí cuando haya movimientos registrados.
                                    </Text>
                                </View>
                            )
                        )}
                    </View>

                    <Text style={styles.pieGrafica}>
                        Importe en miles de € por cultivo
                    </Text>
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
    pieGrafica: {
        marginTop: 4,
        fontSize: 12,
        fontStyle: "italic",
        color: "#99958D",
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
