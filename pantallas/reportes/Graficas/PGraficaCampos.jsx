import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { CartesianChart, HorizontalBarGroup } from 'victory-native';
import { useFont } from '@shopify/react-native-skia';
import { getGraficaCampos } from '../../../src/services/reportesEconomicosServices';
import { useNavigation } from '@react-navigation/native';


export default function PGraficaCampos() {
    const navigation = useNavigation();

    const [graficaCampos, setGraficaCampos] = useState([]);


    const font = useFont(
        require('../../../assets/fonts/Roboto-Regular.ttf'),
        10
    );

    // Configuración visual de la gráfica
    const MIN_CAMPOS_VISUALES = 5;
    const ALTO_POR_CAMPO = 34;

    const numeroCamposVisuales = Math.max(
        graficaCampos.length,
        MIN_CAMPOS_VISUALES
    );

    const alturaGrafica = numeroCamposVisuales * ALTO_POR_CAMPO;


    const obtenerGraficaCampos = async () => {

        try {
            const data = await getGraficaCampos();
            const list = Object.values(data);
            const chartData = list.map((campo) => ({
                campo: String(campo.codCampo),
                nomCampo:
                    campo.nomCampo ??
                    `Campo ${campo.codCampo}`,
                superficie: Number(campo.superficie ?? 0),
                kgIngreso: Number(campo.kgIngreso ?? 0),
                ingresos:
                    Number(campo.ingresos ?? 0) / 1000,
                gastos:
                    Number(campo.gastos ?? 0) / 1000,
            }));

            console.log("CHART DATA CAMPOS:", chartData);
            setGraficaCampos(chartData);
        } catch (error) {
            console.log('Error en la llamada grafica campos:', error);
        }
    };

    useEffect(() => {
        obtenerGraficaCampos();
    }, []);

    const calcularEje = (datos) => {
        if (!datos.length) {
            return { maxEje: 10, ticks: [0, 5, 10], };
        }

        const valores = datos
            .flatMap(campo => [
                Number(campo.ingresos),
                Number(campo.gastos)
            ])
            .filter(Number.isFinite);

        const maxValor = valores.length
            ? Math.max(...valores)
            : 0;

        // Evitamos generar [0, 0, 0]
        if (maxValor <= 0) {
            return {
                maxEje: 10,
                ticks: [0, 5, 10],
            };
        }

        const mitad = maxValor / 2;

        const magnitud = Math.pow(
            10,
            Math.floor(Math.log10(mitad))
        );

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

    const { maxEje, ticks } = calcularEje(graficaCampos);
    const hayDatosEconomicos = graficaCampos.some(
        campo => campo.ingresos > 0 || campo.gastos > 0);

    return (
        <TouchableOpacity onPress={() => navigation.navigate("Detalle campos", { campos: graficaCampos })}>
            <View style={styles.contenedor}>
                <View style={styles.cardGrafica}>
                    <View style={styles.cabecera}>
                        <Text style={styles.titulo}> Rendimiento por campo</Text>
                        <View style={styles.leyenda}>
                            <View style={styles.leyendaItem}>
                                <View
                                    style={[
                                        styles.cuadroLeyenda, { backgroundColor: "#356B3D" }
                                    ]} />
                                <Text style={styles.textoLeyenda}>Ingresos </Text>
                            </View>

                            <View style={styles.leyendaItem}>
                                <View style={[styles.cuadroLeyenda, { backgroundColor: "#C39A69" }]} />
                                <Text style={styles.textoLeyenda}>Gastos</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.grafica, { height: alturaGrafica }]} >

                        {font && graficaCampos.length > 0 && (

                            hayDatosEconomicos ? (

                                <CartesianChart
                                    data={graficaCampos}
                                    xKey="nomCampo"
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
                                            tickCount: graficaCampos.length,
                                            lineWidth: 0,
                                            labelColor: "#77736D",
                                            formatYLabel: (value) =>
                                                String(value),
                                        }
                                    ]}
                                >
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
                                                }} />
                                            <HorizontalBarGroup.Bar
                                                points={points.gastos}
                                                color="#C39A69"
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
                                        Los ingresos y gastos aparecerán aquí cuando haya movimientos registrados.
                                    </Text>
                                </View>
                            )
                        )}
                    </View>
                    <Text style={styles.pieGrafica}>Importe en miles de € por campo</Text>
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