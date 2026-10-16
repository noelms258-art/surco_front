import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { insertTareas } from '../../../src/services/tareasService';


export default function PTareas({ navigation, route }) {

    const [tareas, setTareas] = useState([]);

    const addTarea = (tarea) => {
        setTareas((prev) => [...prev, tarea]);

        Toast.show({
            type: 'success',
            text1: 'Tarea guardada correctamente',
            visibilityTime: 2000,
        });
    };

    const updateTarea = (index, tareaActu) => {
        setTareas((prev) =>
            prev.map((p, i) => (
                i === index ? tareaActu : p
            ))
        );

        Toast.show({
            type: 'success',
            text1: 'Tarea guardada correctamente',
            visibilityTime: 2000,
        });
    };

    const guardar = async () => {
        try {
            await insertTareas(tareas);

            navigation.navigate('Campo', { guardado: true, codCampo: route.params?.codCampo, tienePlan: route.params?.tienePlan });

        } catch (error) {
            mostrarError('No se ha podido insertar las tareas')
            console.log('Error al insertar tareas:', error);
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

        if (tareas.length === 0 && !route.params?.tarea) {
            navigation.navigate('Añadir tarea', {
                onAdd: addTarea,
                primeraEntrada: true
            });
        }

    }, [tareas.length, route.params?.tarea, navigation]);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            {tareas.map((tarea, index) => (
                <TouchableOpacity
                    key={`${tarea}-${index}`}
                    style={styles.card}
                    onPress={() =>
                        navigation.navigate(
                            'Añadir tarea',
                            {
                                tarea: tarea,
                                index,
                                onUpdate: updateTarea,
                                primeraEntrada: false
                            })}>
                    <Text style={styles.textCard}>{tarea.nomTarea} - {tarea.nomTercero}</Text>
                </TouchableOpacity>
            ))}

            <View style={styles.addIcono}>
                <TouchableOpacity
                    style={styles.icon}
                    activeOpacity={0.7}
                    onPress={() =>
                        navigation.navigate(
                            'Añadir tarea',
                            {
                                onAdd: addTarea,
                                primeraEntrada: false
                            })}>
                    <Ionicons
                        name="add"
                        size={25}
                        color="#69B878" />
                </TouchableOpacity>


                <Text style={styles.textNvProd}>Introducir nueva tarea</Text>

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
        width: '90%',
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