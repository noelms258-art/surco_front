import { View, Text, StyleSheet, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getIngresosTotales, getGastosTotales } from '../../src/services/reportesEconomicosServices';
import PGraficaCampos from './Graficas/PGraficaCampos';
import PGraficaCultivos from './Graficas/PGraficaCultivos';


export default function PReportesEconomicos({ navigation }) {

    const [ingresoTotal, setIngresoTotal] = useState("");
    const [gastoTotal, setGastoTotal] = useState("");

    const [graficaCultivo, setGraficaCultivo] = useState([]);

    const obtenerIngresoTotal = async () => {
        try {
            const data = await getIngresosTotales();
            setIngresoTotal(data[0].ingresoTotal)
        } catch (error) {
            console.log('Error en la llamada ingresos totales:', error)
        }
    }

    const obtenerGastosTotales = async () => {
        try {
            const data = await getGastosTotales();
            setGastoTotal(data[0].gastosTotales)
        } catch (error) {
            console.log('Error en la llamada gastos totales:', error)
        }
    }

    useEffect(() => {
        obtenerIngresoTotal();
    }, []);

    useEffect(() => {
        obtenerGastosTotales();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.cards}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>INGRESOS TOTALES</Text>
                    <Text style={styles.cardValue}>{Number(ingresoTotal).toLocaleString('es-ES', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}€</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>GASTOS TOTALES</Text>
                    <Text style={styles.cardValue}>{Number(gastoTotal).toLocaleString('es-ES', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}€</Text>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>incl. impuestos</Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>BENEFICIOS TOTALES</Text>
                    <Text style={styles.cardValue}>{Number(ingresoTotal - gastoTotal).toLocaleString('es-ES', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}€</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>MARGEN</Text>
                    <Text style={styles.cardValue}>{Math.trunc(((ingresoTotal - gastoTotal) / ingresoTotal) * 100)}%</Text>
                    <View style={styles.tagV}>
                        <Text style={styles.tagText}>sobre ingresos</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.sectionTitle}>RENDIMIENTO POR CAMPO</Text>
            <View style={{ alignItems: "center", paddingBottom: 10 }}>
                <View style={styles.cardGrafica}>
                    <PGraficaCampos style={styles.graficaCampo} />
                </View>
            </View>

            <Text style={styles.sectionTitle}>RENDIMIENTO POR CULTIVO</Text>
            <View style={{ alignItems: "center", paddingBottom: 10 }}>
                <View style={styles.cardGrafica}>
                    <PGraficaCultivos style={styles.graficaCultivo} />
                </View>
            </View>
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