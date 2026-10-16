import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ScrollView
} from 'react-native';

import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { insertGastos } from '../../../src/services/gastosService';
import Toast from 'react-native-toast-message';


export default function PGastosAdministrativos({ navigation, route }) {

    const [gastos, setGastos] = useState([]);

    const addGasto = (gasto) => {
        setGastos((prev) => [...prev, gasto]);

        Toast.show({
            type: 'success',
            text1: 'Gasto guardado correctamente',
            visibilityTime: 2000,
        });
    };

    const updateGasto = (index, gastoActualizado) => {
        setGastos((prev) =>
            prev.map((p, i) => (
                i === index ? gastoActualizado : p
            ))
        );

        Toast.show({
            type: 'success',
            text1: 'Gasto guardado correctamente',
            visibilityTime: 2000,
        });
    };

    const guardar = async () => {
        try {
            await insertGastos(gastos);

            navigation.navigate('Gastos', { guardado: true });

        } catch (error) {
            console.log('Error en la llamada campos:', error);
        }
    };

    useEffect(() => {

        if (gastos.length === 0 && !route.params?.gasto) {
            navigation.navigate('Añadir Gastos Administrativos', {
                onAdd: addGasto,
                primeraEntrada: true
            });
        }

    }, [gastos.length, route.params?.gasto, navigation]);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            {gastos.map((gasto, index) => (
                <TouchableOpacity
                    key={`${gasto.nomGasto}-${index}`}
                    style={styles.card}
                    onPress={() =>
                        navigation.navigate(
                            'Añadir Gastos Administrativos',
                            {
                                gasto: gasto,
                                index,
                                onUpdate: updateGasto,
                                primeraEntrada: false
                            })}>
                    <Text style={styles.textCard}>{gasto.nomGasto}</Text>
                </TouchableOpacity>
            ))}

            <View style={styles.addIcono}>
                <TouchableOpacity
                    style={styles.icon}
                    activeOpacity={0.7}
                    onPress={() =>
                        navigation.navigate(
                            'Añadir Gastos Administrativos',
                            {
                                onAdd: addGasto,
                                primeraEntrada: false
                            })}>
                    <Ionicons
                        name="add"
                        size={25}
                        color="#69B878" />
                </TouchableOpacity>


                <Text style={styles.textNvProd}>Introducir nuevo gasto</Text>

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