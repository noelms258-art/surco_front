import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { CartesianChart, BarGroup } from 'victory-native';
import { useFont } from '@shopify/react-native-skia';
import Svg, { Circle } from 'react-native-svg';
import { getCumplimientoMacros, getCumplimientoProductos, getCumplimientoTotal } from '../../src/services/cumplimientoService';

export default function PCumplimientoAbonado({ route }) {

    const [dataGrafica, setDataGrafica] = useState([]);
    const [macrosAnuales, setMacrosAnuales] = useState({});
    const [vista, setVista] = useState('nutrientes');
    const [productosPendientes, setProductosPendientes] = useState([]);

    const font = useFont(require('../../assets/fonts/Roboto-Regular.ttf'), 10);

    const pctMensual = Number(route.params?.pctMensual ?? 0);
    const pctAnual = Number(route.params?.pctAnual ?? 0);
    const mesActual = new Date().toLocaleDateString('es-ES', { month: 'long' });

    const nutrientes = {
        'macroP': 'Fósforo (P)',
        'macroN': 'Nitrógeno (N)',
        'macroK': 'Potasio (K)',
        'macroCa': 'Calcio (Ca)',
        'microFe': 'Hierro (Fe)',
        'microZn': 'Zinc (Zn)',
        'microMn': 'Manganeso (Mn)',
        'microCu': 'Cobre (Cu)'
    };

    const obtenerCumplimiento = async () => {
        try {
            const data = await getCumplimientoTotal(route.params?.codCampo);
            const datosFormateados = [
                { mes: '', cumplimiento: 0, objetivo: 0 },
                ...(data ?? []).map((item) => ({
                    mes: item.mes ? item.mes.slice(0, 3) : '',
                    cumplimiento: Number(item.cumplimiento ?? 0),
                    objetivo: Number(item.objetivo ?? 0),
                })).filter((item) => item.mes !== ''),
                { mes: '', cumplimiento: 0, objetivo: 0 },
            ];
            setDataGrafica(datosFormateados);
        } catch (error) {
            console.log('Error en la llamada obtener Cumplimiento:', error);
        }
    };

    const obtenerCumplimientoMacros = async () => {
        try {
            const data = await getCumplimientoMacros(route.params?.codCampo);
            console.log('DATA COMPLETA:', data);
            console.log('DATA MACROS:', data.macros_anuales);
            setMacrosAnuales(data.macros_anuales ?? {});
        } catch (error) {
            console.log('Error en la llamada obtener Cumplimiento:', error);
        }
    };

    const obtenerCumplimientoProductos = async () => {
        try {
            const data = await getCumplimientoProductos(route.params?.codCampo);
            setProductosPendientes(data.productos ?? []);
        } catch (error) {
            console.log('Error en la llamada obtener Cumplimiento:', error);
        }
    };

    const circuloProgreso = (porcentaje, color) => {
        const size = 92;
        const strokeWidth = 8;
        const radio = (size - strokeWidth) / 2;
        const circunferencia = 2 * Math.PI * radio;
        const pct = Math.min(Math.max(porcentaje, 0), 100);
        const offset = circunferencia - (pct / 100) * circunferencia;

        return (
            <View style={styles.circuloContainer}>
                <Svg width={size} height={size}>
                    <Circle cx={size / 2} cy={size / 2} r={radio} stroke="#EEECE4" strokeWidth={strokeWidth} fill="none" />
                    <Circle cx={size / 2} cy={size / 2} r={radio} stroke={color} strokeWidth={strokeWidth} fill="none" strokeDasharray={circunferencia} strokeDashoffset={offset} rotation="-90" origin={`${size / 2}, ${size / 2}`} />
                </Svg>
                <Text style={styles.porcentaje}>{Math.round(porcentaje)}%</Text>
            </View>
        );
    };

    useEffect(() => {
        obtenerCumplimiento();
        obtenerCumplimientoMacros();
        obtenerCumplimientoProductos();
    }, []);

    if (!font && Platform.OS !== 'web') {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.resumenFila}>
                <View style={styles.resumenCard}>
                    <Text style={styles.resumenTitulo}>Mes actual</Text>
                    {circuloProgreso(pctMensual, '#37653A')}
                </View>
                <View style={styles.resumenCard}>
                    <Text style={styles.resumenTitulo}>Acumulado anual</Text>
                    {circuloProgreso(pctAnual, '#F8BE2C')}
                </View>
            </View>

            <Text style={styles.tituloPendiente}>Abonado pendiente · {mesActual}</Text>

            <View style={styles.selectorContainer}>
                <TouchableOpacity style={[styles.selectorBoton, vista === 'productos' && styles.selectorActivo]} onPress={() => setVista('productos')}>
                    <Text style={[styles.selectorTexto, vista === 'productos' && styles.selectorTextoActivo]}>Productos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.selectorBoton, vista === 'nutrientes' && styles.selectorActivo]} onPress={() => setVista('nutrientes')}>
                    <Text style={[styles.selectorTexto, vista === 'nutrientes' && styles.selectorTextoActivo]}>Nutrientes</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.pendienteCard}>
                {vista === 'nutrientes' && Object.entries(nutrientes)
                    .filter(([key]) => Number(macrosAnuales[key]?.objetivo ?? 0) > 0)
                    .map(([key, nombre], index, array) => {
                        const objetivo = Number(macrosAnuales[key]?.objetivo ?? 0);
                        const cumplimiento = Number(macrosAnuales[key]?.cumplimiento ?? 0);
                        const pendiente = Math.max(objetivo - cumplimiento, 0);
                        const progreso = objetivo > 0 ? Math.min((cumplimiento / objetivo) * 100, 100) : 0;

                        return (
                            <View key={key} style={[styles.elementoPendiente, index === array.length - 1 && styles.elementoFinal]}>
                                <View style={styles.iconoNutriente} />
                                <View style={styles.infoPendiente}>
                                    <View style={styles.nombreFila}>
                                        <Text style={styles.nombreNutriente}>{nombre}</Text>
                                        <Text style={styles.valorNutriente}>{pendiente.toLocaleString('es-ES')} kg</Text>
                                    </View>
                                    <View style={styles.barraFondo}>
                                        <View style={[styles.barraProgreso, { width: `${progreso}%` }]} />
                                    </View>
                                    <View style={styles.datosBarra}>
                                        <Text style={styles.textoBarra}>Aplicado · <Text style={styles.valorBarra}>{cumplimiento.toLocaleString('es-ES')} kg</Text></Text>
                                        <Text style={styles.textoBarra}>Objetivo · <Text style={styles.valorBarra}>{objetivo.toLocaleString('es-ES')} kg</Text></Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })
                }
                {vista === 'productos' && (productosPendientes.length === 0 ? (
                    <View style={styles.sinDatos}>
                        <Text style={styles.sinDatosTexto}>Datos de productos pendientes de cargar</Text>
                    </View>
                ) : (productosPendientes.map((producto, index) => {
                    const objetivo = Number(producto.objetivo ?? 0);
                    const cumplimiento = Number(producto.cumplimiento ?? 0);
                    const pendiente = Math.max(objetivo - cumplimiento, 0);
                    const progreso = objetivo > 0 ? Math.min((cumplimiento / objetivo) * 100, 100) : 0;

                    return (
                        <View key={producto.codProd} style={[styles.elementoPendiente, index === productosPendientes.length - 1 && styles.elementoFinal]}>
                            <View style={styles.iconoNutriente} />
                            <View style={styles.infoPendiente}>
                                <View style={styles.nombreFila}>
                                    <Text style={styles.nombreNutriente}>{producto.nomProd}</Text>
                                    <Text style={styles.valorNutriente}>{pendiente.toLocaleString('es-ES')} kg</Text>
                                </View>
                                <View style={styles.barraFondo}>
                                    <View style={[styles.barraProgreso, { width: `${progreso}%` }]} />
                                </View>
                                <View style={styles.datosBarra}>
                                    <Text style={styles.textoBarra}> Aplicado · <Text style={styles.valorBarra}>{cumplimiento.toLocaleString('es-ES')} kg</Text>
                                    </Text>
                                    <Text style={styles.textoBarra}>Objetivo · <Text style={styles.valorBarra}>{objetivo.toLocaleString('es-ES')} kg</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                    );
                })))}
            </View>

            <Text style={styles.tituloGrafica}>Cumplimiento mensual</Text>

            <View style={styles.cardGrafica}>
                <View style={styles.leyenda}>
                    <View style={styles.leyendaElemento}>
                        <View style={[styles.leyendaCuadro, { backgroundColor: '#37653A' }]} />
                        <Text style={styles.leyendaTexto}>Cumplimiento</Text>
                    </View>
                    <View style={styles.leyendaElemento}>
                        <View style={[styles.leyendaCuadro, { backgroundColor: '#C49A6C' }]} />
                        <Text style={styles.leyendaTexto}>Objetivo</Text>
                    </View>
                </View>

                {dataGrafica.length > 0 && Platform.OS !== 'web' && (
                    <View style={styles.chartContainer}>
                        <CartesianChart
                            data={dataGrafica}
                            xKey="mes"
                            yKeys={['cumplimiento', 'objetivo']}
                            padding={{ top: 20, bottom: 10 }}
                            axisOptions={{
                                font,
                                formatXLabel: (value) => String(value),
                                formatYLabel: (value) => `${Math.round(value)}%`,
                                labelColor: '#777268',
                                lineColor: '#D9D4C9',
                                tickCount: 12,
                            }}>
                            {({ points, chartBounds }) => {
                                if (!points?.cumplimiento || !points?.objetivo || !chartBounds) return null;
                                return (
                                    <BarGroup chartBounds={chartBounds}>
                                        <BarGroup.Bar points={points.objetivo} color="#C49A6C" />
                                        <BarGroup.Bar points={points.cumplimiento} color="#37653A" />
                                    </BarGroup>
                                );
                            }}
                        </CartesianChart>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F4EB',
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 17,
        paddingBottom: 40,
    },
    resumenFila: {
        flexDirection: 'row',
        gap: 11,
        marginBottom: 22,
    },
    resumenCard: {
        flex: 1,
        height: 155,
        backgroundColor: '#FFFFFF',
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#F0ECE2',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    resumenTitulo: {
        fontSize: 13,
        fontWeight: '700',
        color: '#37653A',
        marginBottom: 5,
    },
    circuloContainer: {
        width: 92,
        height: 92,
        alignItems: 'center',
        justifyContent: 'center',
    },
    porcentaje: {
        position: 'absolute',
        fontSize: 25,
        fontWeight: '800',
        color: '#1F2A24',
    },
    tituloPendiente: {
        fontSize: 19,
        fontWeight: '700',
        color: '#37653A',
        marginBottom: 12,
    },
    selectorContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: '#ECE7DB',
        borderRadius: 22,
        padding: 3,
        marginBottom: 13,
    },
    selectorBoton: {
        paddingHorizontal: 22,
        height: 34,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectorActivo: {
        backgroundColor: '#37653A',
    },
    selectorTexto: {
        fontSize: 13,
        color: '#918B7F',
    },
    selectorTextoActivo: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
    pendienteCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 17,
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderWidth: 1,
        borderColor: '#F0ECE2',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    elementoPendiente: {
        minHeight: 77,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE8DC',
    },
    elementoFinal: {
        borderBottomWidth: 0,
    },
    iconoNutriente: {
        width: 43,
        height: 43,
        borderRadius: 11,
        backgroundColor: '#37653A',
        marginRight: 13,
    },
    infoPendiente: {
        flex: 1,
    },
    nombreFila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    nombreNutriente: {
        flex: 1,
        fontSize: 14,
        color: '#1F2A24',
        marginRight: 10,
    },
    valorNutriente: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1F2A24',
    },
    barraFondo: {
        width: '100%',
        height: 9,
        backgroundColor: '#EEEAE1',
        borderRadius: 6,
        overflow: 'hidden',
    },
    barraProgreso: {
        height: '100%',
        backgroundColor: '#F8BE2C',
        borderRadius: 6,
    },
    sinDatos: {
        minHeight: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sinDatosTexto: {
        fontSize: 13,
        color: '#918B7F',
    },
    tituloGrafica: {
        fontSize: 19,
        fontWeight: '700',
        color: '#37653A',
        marginTop: 27,
        marginBottom: 12,
    },
    cardGrafica: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        paddingHorizontal: 12,
        paddingTop: 14,
        paddingBottom: 16,
        borderWidth: 1,
        borderColor: '#F0ECE2',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    leyenda: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 14,
        marginRight: 8,
        marginBottom: 4,
    },
    leyendaElemento: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    leyendaCuadro: {
        width: 8,
        height: 8,
        borderRadius: 2,
    },
    leyendaTexto: {
        fontSize: 10,
        color: '#918B7F',
    },
    chartContainer: {
        height: 320,
    },
});