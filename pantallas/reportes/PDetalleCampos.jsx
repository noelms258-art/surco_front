import { View, Text, StyleSheet, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import PGraficaBeneficiosCampos from './Graficas/PGraficaBeneficiosCampos';
import PGraficaMargenCampo from './Graficas/PGraficaMargenCampo';
import PGraficaRendimientoCampos from './Graficas/PGraficaRendimientoCampos';


export default function PDetalleCampos({ route, navigation }) {

    const { campos = [] } = route.params ?? {};

    const [tipoGrafica, setTipoGrafica] = useState("beneficio");

    return (
        <ScrollView style={styles.container}
            contentContainerStyle={styles.contenido}
            showsVerticalScrollIndicator={false}>
            <View style={styles.tabs}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={[styles.tab, tipoGrafica === "beneficio" && styles.tabActivo]}
                    onPress={() => setTipoGrafica("beneficio")}>
                    <Text style={[styles.textoTab, tipoGrafica === "beneficio" && styles.textoTabActivo]}>
                        Beneficio
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.9}
                    style={[styles.tab, tipoGrafica === "rendimiento" && styles.tabActivo]}
                    onPress={() => setTipoGrafica("rendimiento")}>
                    <Text style={[styles.textoTab, tipoGrafica === "rendimiento" && styles.textoTabActivo]} >
                        Rendimiento
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.9}
                    style={[styles.tab, tipoGrafica === "margen" && styles.tabActivo]}
                    onPress={() => setTipoGrafica("margen")}>
                    <Text style={[styles.textoTab, tipoGrafica === "margen" && styles.textoTabActivo]}>
                        Margen
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardGrafica}>
                {tipoGrafica === "beneficio" && (
                    <View>
                        <Text style={styles.tituloGrafica}>Beneficio por campo en €</Text>
                        <PGraficaBeneficiosCampos graficaCampos={campos} />
                    </View>
                )}
                {tipoGrafica === "rendimiento" && (
                    <View>
                        <Text style={styles.tituloGrafica}>Rendimiento por campo</Text>
                        <PGraficaRendimientoCampos graficaCampos={campos} />
                    </View>
                )}
                {tipoGrafica === "margen" && (
                    <View>
                        <Text style={styles.tituloGrafica}> Margen por campo</Text>
                        <PGraficaMargenCampo graficaCampos={campos} />
                    </View>
                )}
            </View>

            <View style={styles.cabeceraDetalle}>
                <Text style={styles.tituloDetalle}>Detalle campos</Text>
                <Text style={styles.textoEntrar}>Toca para ver el campo </Text>
            </View>

            {campos.map((campo) => {
                const ingresos = Number(campo.ingresos ?? 0);
                const gastos = Number(campo.gastos ?? 0);
                const beneficio =
                    ingresos - gastos;
                const margen =
                    ingresos > 0
                        ? (beneficio / ingresos) * 100
                        : 0;
                return (
                    <TouchableOpacity onPress={() => navigation.navigate("Detalle campo", { campo: campo })}
                        key={campo.codCampo ?? campo.campo}>
                        <View style={styles.cardCampo} >
                            <View style={styles.iconoCampo}>
                            </View>
                            <View style={styles.infoCampo}>
                                <Text style={styles.nombreCampo}>{campo.nomCampo}</Text>
                                <Text style={styles.cultivoCampo}>Cultivo del campo</Text>
                            </View>
                            <View style={styles.datosCampo}>
                                <Text style={styles.beneficioCampo}>
                                    {beneficio.toFixed(2)}€
                                </Text>
                                <Text style={styles.margenCampo}>
                                    {Math.round(margen)}% margen
                                </Text>
                            </View>
                            <View style={styles.arrow}>
                                <MaterialIcons
                                    name="chevron-right"
                                    size={20}
                                    color="#9A968C"
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F4EB'
    },
    contenido: {
        padding: 12,
        paddingBottom: 40,
    },
    tabs: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 16,
    },
    tab: {
        flex: 1,
        height: 50,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DDD8CE",
        justifyContent: "center",
        alignItems: "center",
    },
    tabActivo: {
        backgroundColor: "#356B3D",
        borderColor: "#356B3D",
    },
    textoTab: {
        fontSize: 15,
        color: "#928D82",
    },
    textoTabActivo: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    cardGrafica: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: 16,
        minHeight: 210,
        marginBottom: 28,
    },
    tituloGrafica: {
        fontSize: 13,
        fontStyle: "italic",
        color: "#928D82",
    },
    cabeceraDetalle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        marginBottom: 14,
    },
    tituloDetalle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#356B3D",
    },
    textoEntrar: {
        fontSize: 12,
        fontStyle: "italic",
        color: "#C18A4E",
    },
    cardCampo: {
        minHeight: 82,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 12,
    },
    iconoCampo: {
        width: 48,
        height: 48,
        borderRadius: 13,
        backgroundColor: "#E3F0E1",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },
    infoCampo: {
        flex: 1,
    },
    nombreCampo: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#25302A",
    },
    cultivoCampo: {
        fontSize: 13,
        color: "#99958D",
        marginTop: 3,
    },
    datosCampo: {
        alignItems: "flex-end",
        marginRight: 12,
    },
    beneficioCampo: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#25302A",
    },
    margenCampo: {
        fontSize: 12,
        color: "#99958D",
        marginTop: 3,
    },
    botonEntrar: {
        width: 35,
        height: 35,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#DDD8CE",
        justifyContent: "center",
        alignItems: "center",
    },
    arrow: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#DFDBCF',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
})