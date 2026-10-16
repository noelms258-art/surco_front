import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ScrollView
} from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { insertIngresos } from '../../../src/services/ingresosService';


export default function PIngresos({ navigation, route }) {

    const [ingresos, setIngresos] = useState([]);

    const addIngreso = (ingreso) => {
        setIngresos((prev) => [...prev, ingreso]);

        Toast.show({
            type: 'success',
            text1: 'Ingreso guardado correctamente',
            visibilityTime: 2000,
        });
    };

    const updateIngreso = (index, ingresoActualizado) => {
        setIngresos((prev) =>
            prev.map((p, i) => (
                i === index ? ingresoActualizado : p
            ))
        );

        Toast.show({
            type: 'success',
            text1: 'Ingreso guardado correctamente',
            visibilityTime: 2000,
        });
    };

    const guardar = async () => {
        try {
            await insertIngresos(ingresos);

            navigation.navigate('Gastos', { guardado: true });

        } catch (error) {
            mostrarError("Ha ocurrido un error al insertar los ingresos")
            console.log('Error al insertar ingresos:', error);
        }
    };

    const mostrarError = (mensaje) => {
        Toast.show({
            type: 'error',
            text1: mensaje,
            visibilityTime: 2000,
        });
    }

    useEffect(() => {

        if (ingresos.length === 0 && !route.params?.ingreso) {
            navigation.navigate('Añadir ingreso', {
                onAdd: addIngreso,
                primeraEntrada: true
            });
        }

    }, [ingresos.length, route.params?.ingreso, navigation]);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            {ingresos.map((ingreso, index) => (
                <TouchableOpacity
                    key={`${ingreso.nomIngreso}-${index}`}
                    style={styles.card}
                    onPress={() =>
                        navigation.navigate(
                            'Añadir ingreso',
                            {
                                ingreso: ingreso,
                                index,
                                onUpdate: updateIngreso,
                                primeraEntrada: false
                            })}>
                    <Text style={styles.textCard}>{ingreso.nomIngreso}</Text>
                </TouchableOpacity>
            ))}

            <View style={styles.addIcono}>
                <TouchableOpacity
                    style={styles.icon}
                    activeOpacity={0.7}
                    onPress={() =>
                        navigation.navigate(
                            'Añadir ingreso',
                            {
                                onAdd: addIngreso,
                                primeraEntrada: false
                            })}>
                    <Ionicons
                        name="add"
                        size={25}
                        color="#69B878" />
                </TouchableOpacity>


                <Text style={styles.textNvProd}>Introducir nuevo ingreso</Text>

            </View>

            <TouchableOpacity
                onPress={guardar}
                style={styles.buttonGuardar}
                activeOpacity={0.8}>
                <Text style={styles.textGuardar}> Guardar </Text>
            </TouchableOpacity>

            <Toast />

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F7F4EB',
        padding: 16,
    },
    content: {
        paddingTop: 17,
        paddingBottom: 30,
    },
    card: {
        width: '70%',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    textCard: {
        color: '#444',
        fontWeight: 'bold',
    },
    addIcono: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
    },
    icon: {
        width: 42,
        height: 42,
        borderRadius: 21,
        borderWidth: 1,
        borderColor: '#69B878',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 9,
    },
    textNvProd: {
        color: '#99968E',
        fontSize: 12,

        fontStyle: 'italic',
        fontWeight: '400',
    },
    buttonGuardar: {
        width: '100%',
        height: 49,
        backgroundColor: '#E1EEDC',
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 11,
    },
    textGuardar: {
        color: '#37653A',
        fontWeight: '700',
        fontSize: 15,
    },

});