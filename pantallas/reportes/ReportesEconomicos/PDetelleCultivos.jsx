
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';


export default function PDetalleCultivos({ route, navigation }) {

    const { cultivos = [] } = route.params ?? {};

    const [tipoGrafica, setTipoGrafica] = useState("beneficio");

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contenido}
            showsVerticalScrollIndicator={false}>
            <View style={styles.tabs}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={[
                        styles.tab,
                        tipoGrafica === "beneficio" && styles.tabActivo
                    ]}
                    onPress={() => setTipoGrafica("beneficio")}>
                    <Text style={[
                        styles.textoTab,
                        tipoGrafica === "beneficio" && styles.textoTabActivo
                    ]}>
                        Beneficio
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.9}
                    style={[
                        styles.tab,
                        tipoGrafica === "rendimiento" && styles.tabActivo
                    ]}
                    onPress={() => setTipoGrafica("rendimiento")}>
                    <Text style={[
                        styles.textoTab,
                        tipoGrafica === "rendimiento" && styles.textoTabActivo
                    ]}>
                        Rendimiento
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.9}
                    style={[
                        styles.tab,
                        tipoGrafica === "margen" && styles.tabActivo
                    ]}
                    onPress={() => setTipoGrafica("margen")}>
                    <Text style={[
                        styles.textoTab,
                        tipoGrafica === "margen" && styles.textoTabActivo
                    ]}>
                        Margen
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardGrafica}>

                {tipoGrafica === "beneficio" && (
                    <View>
                        <Text style={styles.tituloGrafica}>
                            Beneficio por cultivo en €
                        </Text>

                        {/* GRÁFICA PENDIENTE DE CREAR */}
                        {/* <PGraficaBeneficiosCultivos
                            graficaCultivos={cultivos}
                        /> */}
                    </View>
                )}

                {tipoGrafica === "rendimiento" && (
                    <View>
                        <Text style={styles.tituloGrafica}>
                            Rendimiento por cultivo
                        </Text>

                        {/* GRÁFICA PENDIENTE DE CREAR */}
                        {/* <PGraficaRendimientoCultivos
                            graficaCultivos={cultivos}
                        /> */}
                    </View>
                )}

                {tipoGrafica === "margen" && (
                    <View>
                        <Text style={styles.tituloGrafica}>
                            Margen por cultivo
                        </Text>

                        {/* GRÁFICA PENDIENTE DE CREAR */}
                        {/* <PGraficaMargenCultivos
                            graficaCultivos={cultivos}
                        /> */}
                    </View>
                )}

            </View>
            <View style={styles.cabeceraDetalle}>
                <Text style={styles.tituloDetalle}>
                    Detalle cultivos
                </Text>

                <Text style={styles.textoEntrar}>
                    Toca para ver el cultivo
                </Text>
            </View>

            {cultivos.map((cultivo, index) => {

                const ingresos = Number(cultivo.ingresos ?? 0);
                const gastos = Number(cultivo.gastos ?? 0);

                const beneficio = ingresos - gastos;

                const margen = ingresos > 0
                    ? (beneficio / ingresos) * 100
                    : 0;

                return (
                    <TouchableOpacity
                        key={cultivo.codFruta ?? index}
                        activeOpacity={0.9}
                        onPress={() =>
                            navigation.navigate(
                                "Detalle cultivo",
                                { cultivo: cultivo }
                            )
                        }>
                        <View style={styles.cardCultivo}>
                            <View style={styles.iconoCultivo}>
                                <MaterialCommunityIcons
                                    name="sprout"
                                    size={25}
                                    color="#356B3D"/>
                            </View>

                            <View style={styles.infoCultivo}>
                                <Text style={styles.nombreCultivo}>
                                    {cultivo.nomFruta ??
                                        `Cultivo ${cultivo.codFruta}`}
                                </Text>

                                <Text style={styles.descripcionCultivo}>
                                    {Number(cultivo.kgIngreso ?? 0)
                                        .toLocaleString('es-ES')} kg recolectados
                                </Text>
                            </View>

                            <View style={styles.datosCultivo}>
                                <Text style={styles.beneficioCultivo}>
                                    {(beneficio * 1000).toLocaleString(
                                        'es-ES',
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        }
                                    )} €
                                </Text>
                                <Text style={styles.margenCultivo}>
                                    {Math.round(margen)}% margen
                                </Text>
                            </View>

                            <View style={styles.arrow}>
                                <MaterialIcons
                                    name="chevron-right"
                                    size={20}
                                    color="#9A968C"/>
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
    cardCultivo: {
        minHeight: 82,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 12,
    },
    iconoCultivo: {
        width: 48,
        height: 48,
        borderRadius: 13,
        backgroundColor: "#E3F0E1",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },
    infoCultivo: {
        flex: 1,
    },
    nombreCultivo: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#25302A",
    },
    descripcionCultivo: {
        fontSize: 13,
        color: "#99958D",
        marginTop: 3,
    },
    datosCultivo: {
        alignItems: "flex-end",
        marginRight: 12,
    },
    beneficioCultivo: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#25302A",
    },
    margenCultivo: {
        fontSize: 12,
        color: "#99958D",
        marginTop: 3,
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
});
