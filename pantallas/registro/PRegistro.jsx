import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useRegistro } from '../../src/utils/RegistroContext';

export default function PRegistro({ navigation, route }) {

    const [txtNombre, setTxtNombre] = useState('');
    const [txtApellidos, setTxtApellidos] = useState('');
    const [txtDNI, setTxtDNI] = useState('');
    const [txtCorreo, setTxtCorreo] = useState('');
    const [txtTelefono, setTxtTelf] = useState('');

    const [errores, setErrores] = useState({});

    const { actualizarRegistro } = useRegistro();

    const validarDNI = (dni) => {
        const dniLimpio = dni.trim().toUpperCase();

        if (!/^\d{8}[A-Z]$/.test(dniLimpio)) {
            return false;
        }

        const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
        const numero = parseInt(dniLimpio.substring(0, 8), 10);
        const letra = dniLimpio.charAt(8);

        return letras[numero % 23] === letra;
    };

    const validarTelefono = (telefono) => {
        const telefonoLimpio = telefono.replace(/\s/g, '');

        return /^[6789]\d{8}$/.test(telefonoLimpio);
    };


    const guardar = () => {
        const nuevosErrores = {};
        let mensajeError = '';

        const agregarError = (campo, mensaje) => {
            nuevosErrores[campo] = true;

            if (!mensajeError) {
                mensajeError = mensaje;
            }
        };

        if (!txtNombre.trim()) {
            agregarError('nombre', 'Se debe informar el nombre');
        }

        if (!txtApellidos.trim()) {
            agregarError('apellidos', 'Se deben informar los apellidos');
        }

        if (!txtDNI.trim()) {
            agregarError('dni', 'Se debe informar el DNI');
        } else if (!validarDNI(txtDNI)) {
            agregarError('dni', 'El DNI introducido no es válido');
        }

        if (!txtCorreo.trim()) {
            agregarError('correo', 'Se debe informar el correo electrónico');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(txtCorreo.trim())) {
            agregarError('correo', 'El correo electrónico no es válido');
        }

        if (txtTelefono.trim() && !validarTelefono(txtTelefono)) {
            agregarError('telefono', 'El teléfono introducido no es válido');
        }

        setErrores(nuevosErrores);

        if (mensajeError) {
            mostrarError(mensajeError);
            return;
        }

        actualizarRegistro({
            nombre: txtNombre,
            apellidos: txtApellidos,
            dni: txtDNI,
            correo: txtCorreo,
            telefono: txtTelefono
        })

        navigation.navigate('Registro explotaciones')
    };

    const limpiarError = (campo) => {
        setErrores(prev => ({
            ...prev,
            [campo]: false
        }));
    };


    const mostrarError = (mensaje) => {
        Toast.show({
            type: 'error',
            text1: mensaje,
            visibilityTime: 2000,
        });
    }

    return (
        <ScrollView style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Nombre</Text>
                    </View>

                    <TextInput
                        placeholder='Introduce el nombre'
                        style={[styles.textInput, errores.nombre && styles.inputError]}
                        value={txtNombre}
                        onChangeText={(text) => {
                            setTxtNombre(text);
                            limpiarError('nombre')
                        }} />
                </View>


                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Apellidos</Text>
                    </View>

                    <TextInput
                        placeholder='Introduce los apellidos'
                        style={[styles.textInput, errores.apellidos && styles.inputError]}
                        value={txtApellidos}
                        onChangeText={(text) => {
                            setTxtApellidos(text);
                            limpiarError('apellidos')
                        }} />
                </View>


                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>DNI</Text>
                    </View>
                    <TextInput
                        placeholder='Introduce el DNI'
                        style={[styles.textInput, errores.dni && styles.inputError]}
                        value={txtDNI}
                        maxLength={9}
                        autoCapitalize='characters'
                        onChangeText={(text) => {
                            setTxtDNI(text.toUpperCase());
                            limpiarError('dni')
                        }} />
                </View>


                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Correo electrónico</Text>
                    </View>

                    <TextInput
                        placeholder='Introduce el correo'
                        style={[styles.textInput, errores.correo && styles.inputError]}
                        value={txtCorreo}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => {
                            setTxtCorreo(text);
                            limpiarError('correo')
                        }} />
                </View>


                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Telefono (opcional)</Text>
                    </View>

                    <TextInput
                        placeholder='Introduce el telefono'
                        style={[styles.textInput, errores.telefono && styles.inputError]}
                        value={txtTelefono}
                        keyboardType='phone-pad'
                        maxLength={9}
                        onChangeText={(text) => {
                            setTxtTelf(text);
                            limpiarError('telefono')
                        }} />
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
})