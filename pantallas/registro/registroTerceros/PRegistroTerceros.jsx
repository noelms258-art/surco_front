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



export default function PRegistroTerceros({ navigation, route }) {

    const { datosRegistro, actualizarRegistro } = useRegistro();

    const [terceros, setTerceros] = useState([]);

    const addTerceros = (tercero) => {
        setTerceros((prev) => [...prev, tercero]);

        Toast.show({
            type: 'success',
            text1: 'Tercero guardado correctamente',
            visibilityTime: 2000,
        });
    };

    const updateTerceros = (index, terceroActu) => {
        setExplotaciones((prev) =>
            prev.map((p, i) => (
                i === index ? terceroActu : p
            ))
        );

        Toast.show({
            type: 'success',
            text1: 'Tercero guardado correctamente',
            visibilityTime: 2000,
        });
    };

    const guardar = async () => {
        actualizarRegistro({
            terceros: terceros
        });

        navigation.navigate('Protege tu cuenta')
    };
    
    useEffect(() => {

        if (
            terceros.length === 0 &&
            !route.params?.tercero
        ) {
            navigation.navigate('Añadir tercero', {
                onAdd: addTerceros,
                primeraEntrada: true
            });
        }

    }, [
        terceros.length,
        route.params?.tercero,
        navigation
    ]);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            {terceros.map((tercero, index) => (
                <TouchableOpacity
                    key={`${tercero.nomCampo}-${index}`}
                    style={styles.card}
                    onPress={() =>
                        navigation.navigate(
                            'Añadir tercero',
                            {
                                tercero: tercero,
                                index,
                                onUpdate: updateTerceros,
                                primeraEntrada: false
                            })}>
                    <Text style={styles.textCard}>{tercero.nomTercero}</Text>
                </TouchableOpacity>
            ))}

            <View style={styles.addIcono}>
                <TouchableOpacity
                    style={styles.icon}
                    activeOpacity={0.7}
                    onPress={() =>
                        navigation.navigate(
                            'Añadir tercero',
                            {
                                onAdd: addTerceros,
                                primeraEntrada: false
                            })}>
                    <Ionicons
                        name="add"
                        size={25}
                        color="#69B878" />
                </TouchableOpacity>


                <Text style={styles.textNvProd}>Introducir un nuevo tercero</Text>

            </View>

            <TouchableOpacity
                onPress={guardar}
                style={styles.buttonGuardar}
                activeOpacity={0.8}>
                <Text style={styles.textGuardar}> Siguiente </Text>
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