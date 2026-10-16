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
import { useRegistro } from '../../../src/utils/RegistroContext';
import { toastConfig } from '../../../src/utils/ConfiguracionToast';


export default function PRegistroExplotaciones({ navigation, route }) {

    const { datosRegistro, actualizarRegistro } = useRegistro();

    const [explotaciones, setExplotaciones] = useState([]);

    const addExplotacion = (explo) => {
        setExplotaciones((prev) => [...prev, explo]);

        Toast.show({
            type: 'success',
            text1: 'Expotacion guardada correctamente',
            visibilityTime: 2000,
        });
    };

    const updateExplotacion = (index, explotacionActu) => {
        setExplotaciones((prev) =>
            prev.map((p, i) => (
                i === index ? explotacionActu : p
            ))
        );

        Toast.show({
            type: 'success',
            text1: 'Expotacion guardada correctamente',
            visibilityTime: 2000,
        });
    };

    const guardar = async () => {
        if (explotaciones.length === 0) {
            mostrarError('Debes introducir al menos una explotación');
            return;
        }

        if (!explotaciones.some((explo) => explo.ultimoCierre === true)) {
            mostrarError('Alguna explotacion debe indicar el mes de cierre final');
            return;
        }

        actualizarRegistro({
            explotaciones: explotaciones
        });
    };

    const mostrarError = (mensaje) => {
        Toast.show({
            type: 'error',
            text1: mensaje,
            visibilityTime: 2000,
        });
    }

    useEffect(() => {

        if (
            explotaciones.length === 0 &&
            !route.params?.explotacion
        ) {
            navigation.navigate('Añadir explotacion', {
                onAdd: addExplotacion,
                primeraEntrada: true
            });
        }

    }, [
        explotaciones.length,
        route.params?.gasto,
        navigation
    ]);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            {explotaciones.map((explotacion, index) => (
                <TouchableOpacity
                    key={`${explotacion.nomCampo}-${index}`}
                    style={styles.card}
                    onPress={() =>
                        navigation.navigate(
                            'Añadir explotacion',
                            {
                                explotacion: explotacion,
                                index,
                                onUpdate: updateExplotacion,
                                primeraEntrada: false
                            })}>
                    <Text style={styles.textCard}>{explotacion.nomCampo}</Text>
                </TouchableOpacity>
            ))}

            <View style={styles.addIcono}>
                <TouchableOpacity
                    style={styles.icon}
                    activeOpacity={0.7}
                    onPress={() =>
                        navigation.navigate(
                            'Añadir explotacion',
                            {
                                onAdd: addExplotacion,
                                primeraEntrada: false
                            })}>
                    <Ionicons
                        name="add"
                        size={25}
                        color="#69B878" />
                </TouchableOpacity>


                <Text style={styles.textNvProd}>Introducir nueva explotacion</Text>

            </View>

            <TouchableOpacity
                onPress={guardar}
                style={styles.buttonGuardar}
                activeOpacity={0.8}>
                <Text style={styles.textGuardar}> Siguiente </Text>
            </TouchableOpacity>

            <Toast config={toastConfig} />

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