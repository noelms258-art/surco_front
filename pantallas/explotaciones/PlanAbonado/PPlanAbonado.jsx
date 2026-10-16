import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function PPlanAbonado({ navigation, route }) {

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>

            <TouchableOpacity
                onPress={() => navigation.navigate('Visualizar plan abonado', {
                    codCampo: route.params?.codCampo, nomCampo: route.params?.nomCampo, mesCierre: route.params?.mesCierre
                })}
                style={styles.card}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="file-eye-outline" size={26} color="#B7834A"/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textCard}>Visualizar plan abonado</Text>
                    <Text style={styles.description} numberOfLines={2}>
                        Cuaderno de campo y reportes económicos y productivos
                    </Text>
                </View>
                <View style={styles.arrow}>
                    <Ionicons name="chevron-forward" size={17} color="#9A968C" />
                </View>
            </TouchableOpacity>
            {route.params?.tienePlan === 1 && (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Editar plan abonado', {
                        codCampo: route.params?.codCampo, nomCampo: route.params?.nomCampo, mesCierre: route.params?.mesCierre
                    })}
                    style={styles.card}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name='pen' size={20} color='#B7834A' style={styles.icono} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textCard}>Editar plan abonado</Text>
                        <Text style={styles.description} numberOfLines={2}>
                            Introducción de los objetivos de abonado mensual en productos o nutrientes
                        </Text>
                    </View>
                    <View style={styles.arrow}>
                        <Ionicons name="chevron-forward" size={17} color="#9A968C" />
                    </View>
                </TouchableOpacity>
            )}
            {route.params?.tienePlan === 0 && (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Crear plan abonado', {
                        codCampo: route.params?.codCampo, nomCampo: route.params?.nomCampo, mesCierre: route.params?.mesCierre
                    })}
                    style={styles.card}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name='pen' size={20} color='#B7834A' style={styles.icono} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textCard}>Crear plan abonado</Text>
                        <Text style={styles.description} numberOfLines={2}>
                            Introducción de los objetivos de abonado mensual en productos o nutrientes
                        </Text>
                    </View>
                    <View style={styles.arrow}>
                        <Ionicons name="chevron-forward" size={17} color="#9A968C" />
                    </View>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F4EB',
    },
    content: {
        paddingTop: 17,
        paddingBottom: 30,
    },
    izquierda: {
        flex: 1
    },
    derecha: {
        width: 65
    },
    boton: {
        width: '92%',
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 14,
        alignItems: 'center',
        marginBottom: 11,
        borderWidth: 1,
        borderColor: '#F0ECE2',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    separador: {
        width: 1,
        height: 43,
        backgroundColor: '#E5DFD1',
        marginHorizontal: 12
    },
    fila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2
    },
    texto: {
        fontSize: 12,
        color: '#918B7F',
    },
    valor: {
        fontSize: 12,
        fontWeight: '700',
        color: '#37653A',
    },
    textCumplimiento: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1F2A24',
    },
    card: {
        width: '92%',
        minHeight: 77,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 13,
        paddingVertical: 10,
        alignSelf: 'center',
        marginBottom: 11,
        borderWidth: 1,
        borderColor: '#F0ECE2',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    textCard: {
        flex: 1,
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2A24',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: '#F5EADF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 13,
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
    description: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#918B7F',
        lineHeight: 16,
    },
    textContainer: {
        flex: 1,
    },
})