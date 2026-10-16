import { View, Text, StyleSheet, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getDesgloseGastos } from '../../src/services/reportesEconomicosServices';
import PGraficaDesgloseGastos from './Graficas/PGraficaDesgloseGastos';
import PListadoDesgloseGastos from './PListadoDesgloseGastos';


export default function PDetalleCampo({ route }) {

    const { campo = [] } = route.params ?? {};


    const [desgloseGastos, setDesgloseGastos] = useState({});

    const obtenerDesgloseGastos = async () => {
        try {
            const data = await getDesgloseGastos(campo.campo);
            setDesgloseGastos(data[String(campo.campo)] ?? null)
        } catch (error) {
            console.log('Error en la llamada desglose de gastos:', error)
        }
    }

    useEffect(() => {
        obtenerDesgloseGastos();
    }, []);

    const ingresos = Number(campo.ingresos || 0) * 1000;
    const gastos = Number(campo.gastos || 0) * 1000;
    const superficie = Number(campo.superficie || 0);
    const kgIngreso = Number(campo.kgIngreso || 0);
    const beneficio = ingresos - gastos;
    const rendimiento = beneficio > 0 ? (beneficio / superficie) : 0;
    const margen = beneficio > 0 ? (beneficio / ingresos) * 100 : 0;
    const beneficioKg = beneficio > 0 ? (beneficio / kgIngreso) : 0;

    const formatearNumero = (valor, decimales = 2) => {
        return new Intl.NumberFormat('es-ES', {
            minimumFractionDigits: decimales,
            maximumFractionDigits: decimales,
        }).format(valor);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.cards}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>BENEFICIOS</Text>
                    <Text style={styles.cardValue}>{formatearNumero(beneficio)}€</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>RENDIMIENTO (€/hng)</Text>
                    <Text style={styles.cardValue}>{formatearNumero(rendimiento)}€</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>BENEFICIOS/KG</Text>
                    <Text style={styles.cardValue}>{formatearNumero(beneficioKg)}€</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>MARGEN</Text>
                    <Text style={styles.cardValue}>{formatearNumero(margen)}%</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>ESTRUCTURA DE GASTOS</Text>
            <View style={{ alignItems: "center", paddingBottom: 10 }}>
                <View style={styles.cardGrafica}>
                </View>
            </View>

            <View style={{ alignItems: "center", paddingBottom: 10 }}>
                <View style={styles.cardGrafica}>
                    <PGraficaDesgloseGastos desgloseGastos={desgloseGastos} />
                </View>
            </View>

            <PListadoDesgloseGastos desgloseGastos={desgloseGastos} />

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F4EB'
    },
    cards: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 14,
        padding: 10,
    },
    card: {
        width: "48%",
        backgroundColor: "white",
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e5e2da",
    },
    cardTitle: {
        color: "#99998f",
        fontSize: 12,
        fontWeight: "800",
        letterSpacing: 1.2,
    },
    cardValue: {
        fontSize: 34,
        fontWeight: "800",
        marginVertical: 8,
        color: "#25262b",
    },
    sectionTitle: {
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom: 12,
        color: "#346b3a",
        fontWeight: "800",
        letterSpacing: 1,
    },
    grafica: {
        marginTop: 4,
        width: "110%",
        alignSelf: "center",
    },
    cardGrafica: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#e5e2da",
    },
    tag: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFF200',
        borderRadius: 5,
        paddingHorizontal: 7,
        paddingVertical: 3,
        marginTop: 6,
    },
    tag: {
        alignSelf: 'flex-start',
        backgroundColor: '#f2eeaa',
        borderRadius: 5,
        paddingHorizontal: 7,
        paddingVertical: 3,
        marginTop: 6,
    },

    tagText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#596000',
    },
    tagV: {
        alignSelf: 'flex-start',
        backgroundColor: '#b0ceac',
        borderRadius: 5,
        paddingHorizontal: 7,
        paddingVertical: 3,
        marginTop: 6,
    },
})