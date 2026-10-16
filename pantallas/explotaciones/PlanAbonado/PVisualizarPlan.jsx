import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { getPlanAbon } from '../../../src/services/planAbonadoService';
import { Ionicons } from '@expo/vector-icons';

export default function PVisualizarPlan({ navigation, route }) {

    const [tabActiva, setTabActiva] = useState('productos');
    const [mesAbierto, setMesAbierto] = useState(null);
    const [meses, setMeses] = useState([]);
    /*const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ];*/

    const crearPlanInicial = () => {
        const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
        ];

        const base = {};

        meses.forEach((mes) => {
            base[mes] = {
                productos: [],
                nutrientes: {
                    fosforo: '',
                    nitrogeno: '',
                    potasio: '',
                    calcio: '',
                    hierro: '',
                    zinc: '',
                    manganeso: '',
                    cobre: ''
                }
            };
        });

        return base;
    };

    const [planAbon, setPlanAbon] = useState({});

    const obtenerPlanAbonado = async () => {
        try {
            const data = await getPlanAbon(route.params?.codCampo);
            setMeses(Object.keys(data))
            setPlanAbon((prev) => ({
                ...crearPlanInicial(),
                ...data,
            }));
        } catch (error) {
            console.log('Error en la llamada obtener Plan Abonado:', error);
        }
    };

    useEffect(() => {
        obtenerPlanAbonado();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.tabs}>
                <Pressable
                    style={[styles.tab, tabActiva === 'productos' && styles.tabActiva]}
                    onPress={() => setTabActiva('productos')}
                >
                    <Text style={[styles.textoTab, tabActiva === 'productos' && styles.textoTabActivo]}>
                        Productos
                    </Text>
                </Pressable>

                <Pressable
                    style={[styles.tab, tabActiva === 'nutrientes' && styles.tabActiva]}
                    onPress={() => setTabActiva('nutrientes')}
                >
                    <Text style={[styles.textoTab, tabActiva === 'nutrientes' && styles.textoTabActivo]}>
                        Nutrientes
                    </Text>
                </Pressable>
            </View>

            <ScrollView
                style={styles.contenido}
                showsVerticalScrollIndicator={false}>
                {meses.map((mes, index) => {
                    const productos = planAbon?.[mes]?.productos || [];
                    const nutrientes = planAbon?.[mes]?.nutrientes || {};
                    const macros = [
                        { label: 'Fósforo (P)', valor: nutrientes.fosforo },
                        { label: 'Nitrógeno (N)', valor: nutrientes.nitrogeno },
                        { label: 'Potasio (K)', valor: nutrientes.potasio },
                        { label: 'Calcio (Ca)', valor: nutrientes.calcio },
                    ].filter((item) => item.valor);
                    const micros = [
                        { label: 'Hierro (Fe)', valor: nutrientes.hierro },
                        { label: 'Zinc (Zn)', valor: nutrientes.zinc },
                        { label: 'Manganeso (Mn)', valor: nutrientes.manganeso },
                        { label: 'Cobre (Cu)', valor: nutrientes.cobre },
                    ].filter((item) => item.valor);

                    const abierto = mesAbierto === mes;

                    return (
                        <View key={index} style={styles.accordion}>
                            <Pressable
                                style={styles.accordionHeader}
                                onPress={() =>
                                    setMesAbierto((prev) =>
                                        prev === mes ? null : mes
                                    )}>
                                <Text style={styles.tituloMes}> {mes} </Text>
                                <View style={styles.arrow}>
                                    <Ionicons name="chevron-forward" size={17} color="#9A968C" />
                                </View>
                            </Pressable>
                            {abierto && (
                                <View style={styles.accordionBody}>
                                    {tabActiva === 'productos' && (
                                        <View>
                                            {productos.map((item, i) => (
                                                <View key={i}
                                                    style={[
                                                        styles.fila,
                                                        i === productos.length - 1 &&
                                                        styles.filaFinal]}>
                                                    <Text style={styles.textoProducto}>
                                                        {item.nomProd}
                                                    </Text>
                                                    <Text style={styles.valor}>
                                                        {item.cant}
                                                    </Text>
                                                </View>
                                            ))}
                                            {productos.length === 0 && (
                                                <Text style={styles.sinDatos}>
                                                    Sin productos
                                                </Text>
                                            )}
                                        </View>
                                    )}
                                    {tabActiva === 'nutrientes' && (
                                        <View>
                                            {macros.length > 0 && (
                                                <View style={styles.seccionNutr}>
                                                    <Text style={styles.subtituloNutr}>
                                                        Macronutrientes
                                                    </Text>
                                                    {macros.map((item, i) => (
                                                        <View
                                                            key={i}
                                                            style={styles.fila}>
                                                            <Text style={styles.textoProducto}>
                                                                {item.label}
                                                            </Text>
                                                            <Text style={styles.valor}>
                                                                {item.valor} mg
                                                            </Text>
                                                        </View>
                                                    ))}
                                                </View>
                                            )}
                                            {micros.length > 0 && (
                                                <View style={styles.seccionNutr}>
                                                    <Text style={styles.subtituloNutr}>
                                                        Micronutrientes
                                                    </Text>
                                                    {micros.map((item, i) => (
                                                        <View
                                                            key={i}
                                                            style={styles.fila}>
                                                            <Text style={styles.textoProducto}>
                                                                {item.label}
                                                            </Text>
                                                            <Text style={styles.valor}>
                                                                {item.valor} mg
                                                            </Text>
                                                        </View>
                                                    ))}
                                                </View>
                                            )}
                                            {macros.length === 0 && micros.length === 0 && (
                                                <Text style={styles.sinDatos}>
                                                    Sin nutrientes
                                                </Text>
                                            )}
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F4EB',
        paddingHorizontal: 14,
        paddingTop: 14,
    },
    tabs: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 14,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#DFDBCF',
        borderRadius: 7,
        padding: 3,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    tab: {
        width: 125,
        paddingVertical: 7,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    },
    tabActiva: {
        backgroundColor: '#78B77B',
    },
    textoTab: {
        fontSize: 13,
        color: '#AAA69C',
    },
    textoTabActivo: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
    contenido: {
        flex: 1,
    },
    accordion: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DDD9D0',
        marginBottom: 9,
        overflow: 'hidden',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.04,
        shadowRadius: 3,
    },
    accordionHeader: {
        minHeight: 54,
        paddingHorizontal: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
    },
    tituloMes: {
        fontSize: 17,
        fontWeight: '700',
        color: '#276A37',
    },
    iconoAccordion: {
        width: 27,
        height: 27,
        borderRadius: 14,
        backgroundColor: '#E8F5E9',
        color: '#37653A',
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    accordionBody: {
        paddingHorizontal: 13,
        paddingBottom: 10,
        borderTopWidth: 1,
        borderTopColor: '#E8E4DB',
    },
    fila: {
        minHeight: 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE8DC',
    },
    filaFinal: {
        borderBottomWidth: 0,
    },
    textoProducto: {
        flex: 1,
        fontSize: 13,
        fontWeight: '600',
        color: '#1F2A24',
        marginRight: 12,
    },
    valor: {
        fontSize: 13,
        fontWeight: '700',
        color: '#37653A',
    },
    seccionNutr: {
        marginTop: 8,
    },
    subtituloNutr: {
        fontSize: 15,
        fontWeight: '700',
        color: '#67A86E',
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    sinDatos: {
        fontSize: 13,
        color: '#918B7F',
        textAlign: 'center',
        paddingVertical: 14,
    },
    arrow: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#DFDBCF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});