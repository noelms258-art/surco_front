import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useRegistro } from '../../src/utils/RegistroContext';
import { Ionicons } from '@expo/vector-icons';

export default function PRegistroContra({ navigation, route }) {

    const { datosRegistro, actualizarRegistro } = useRegistro();

    const [txtContra, setTxtContra] = useState('');
    const [txtContraConfirm, setTxtContraConfirm] = useState('');

    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [mostrarConfirm, setMostrarConfirm] = useState(false);

    const [errores, setErrores] = useState({});

    const guardar = async () => {
        const nuevosErrores = {};
        let mensajeError = '';

        const agregarError = (campo, mensaje) => {
            nuevosErrores[campo] = true;

            if (!mensajeError) {
                mensajeError = mensaje;
            }
        };

        if(txtContra.length < 8 ){
            agregarError('pass', 'La contraseña debe tener al menos 8 caracteres');
        }
        else if(!/[a-z]/.test(txtContra) || !/[A-Z]/.test(txtContra)){
            agregarError('pass', 'La contraseña debe contener una mayúscula y una minúscula');
        }
        else if(!/\d/.test(txtContra)){
            agregarError('pass', 'La contraseña debe contener al menos un número')
        }
        else if(txtContra !== txtContraConfirm){
            agregarError('pass', 'Las contraseñas no coinciden')
        }

        setErrores(nuevosErrores);

        if (mensajeError) {
            mostrarError(mensajeError);
            return;
        }

        actualizarRegistro({
            contra: txtContra
        });

        navigation.navigate('Protege tu cuenta')
    };

    return (
        <ScrollView style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Contraseña</Text>
                    </View>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder='Introduce tu contraseña'
                            style={styles.textInput}
                            secureTextEntry={!mostrarPassword}
                            value={txtContra}
                            onChangeText={setTxtContra} />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setMostrarPassword(!mostrarPassword)}>
                            <Ionicons
                                name={mostrarPassword ? 'eye-off-outline' : 'eye-outline'}
                                size={24}
                                color="#666" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Confirmar contraseña</Text>
                    </View>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder='Confirma tu contraseña'
                            style={styles.textInput}
                            secureTextEntry={!mostrarConfirm}
                            value={txtContraConfirm}
                            onChangeText={setTxtContraConfirm} />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setMostrarConfirm(!mostrarConfirm)}>
                            <Ionicons
                                name={mostrarConfirm ? 'eye-off-outline' : 'eye-outline'}
                                size={24}
                                color="#666" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.requisitosContainer}>
                    <Text style={styles.requisitosTitulo}>
                        La contraseña debe contener:
                    </Text>

                    <Text style={styles.requisito}>• Al menos 8 caracteres</Text>
                    <Text style={styles.requisito}>• Una letra mayúscula y una minúscula</Text>
                    <Text style={styles.requisito}>• Un número</Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={guardar}
                style={styles.buttonGuardar}>
                <Text style={styles.textGuardar}>Siguiente</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonCancelar}>
                <Text style={styles.textCancelar}>Cancelar</Text>
            </TouchableOpacity>

            <Toast />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#F7F4EB',
        // justifyContent: 'center',
        padding: 16
    },
    content: {
        paddingTop: 17, paddingBottom: 30,
    },
    pickerContainer: {
        width: '100%',
    },
    texto: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
        fontWeight: '500'
    },
    objeto: {
        flex: 1,
        marginBottom: 15,
    },
    fila: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoIcon: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#2F5D3A',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4
    },

    textoInfo: {
        fontSize: 13,
        color: '#444'
    },
    cerrar: {
        fontSize: 16,
        color: '#2F5D3A'
    },
    picker: {
        width: '100%',
        height: 47,

        backgroundColor: '#FFFFFF',

        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,

        paddingHorizontal: 12,
    },
    textInput: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center'
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        paddingHorizontal: 16,
        paddingTop: 17,
        paddingBottom: 16,
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
    dobleFila: {
        flexDirection: 'row',
        gap: 11,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5DFD1',

        marginTop: 15,
        marginBottom: 12,
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
    buttonCancelar: {
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    textGuardar: {
        color: '#37653A',
        fontWeight: '700',
        fontSize: 15,
    },
    textCancelar: {
        fontSize: 15,
        fontWeight: '600',
        color: '#918B7F',
    },
    inputError: {
        borderColor: '#DC3545',
        borderWidth: 2,
        backgroundColor: '#FFF5F5',
    },
    passwordContainer: {
        position: 'relative',
        width: '100%'
    },
    eyeButton: {
        position: 'absolute',
        right: 12,
        top: 0,
        bottom: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    requisitosContainer: {
        marginTop: 6,
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    requisitosTitulo: {
        fontSize: 11,
        color: '#7A827A',
        marginBottom: 5,
    },
    requisito: {
        fontSize: 11,
        color: '#7A827A',
        lineHeight: 17,
    },
})