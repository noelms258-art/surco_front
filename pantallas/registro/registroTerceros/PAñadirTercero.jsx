import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';

export default function PAñadirTercero({ navigation, route }) {

    const terceroEditar = route.params?.tercero;

    const [txtNomTercero, setTxtNomTercero] = useState(terceroEditar?.nomTercero ?? '');
    const [txtApellTercero, setTxtApellTercero] = useState(terceroEditar?.apellTercero ?? '');
    const [txtCorreoTercero, setTxtCorreoTercero] = useState(terceroEditar?.correoTercero ?? '');
    const [txtSalario, setTxtSalario] = useState(terceroEditar?.salario ?? '');
    const [txtHoras, setTxtHoras] = useState(terceroEditar?.salario ?? '');
    const [txtDNI, setTxtDNI] = useState(terceroEditar?.dniTercero ?? '');

    const [errores, setErrores] = useState({});

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

    const guardar = () => {

        const nuevosErrores = {};
        let mensajeError = '';

        const agregarError = (campo, mensaje) => {
            nuevosErrores[campo] = true;

            if (!mensajeError) {
                mensajeError = mensaje;
            }
        };

        if (!txtNomTercero) {
            agregarError('nomTercero', 'El nombre es obligatorio')
        }

        if (!txtCorreoTercero) {
            agregarError('correoTercero', 'El correo electronico es obligatorio')
        }

        if (!txtSalario) {
            agregarError('salario', 'El salario es obligatorio')
        }

        if (!txtHoras) {
            agregarError('horario', 'Las horas mensuales son obligatorias')
        }

        if (!txtDNI.trim()) {
            agregarError('dni', 'Se debe informar el DNI');
        } else if (!validarDNI(txtDNI)) {
            agregarError('dni', 'El DNI introducido no es válido');
        }

        setErrores(nuevosErrores);

        if (mensajeError) {
            mostrarError(mensajeError);
            return;
        }

        const tercero = {
            nomTercero: txtNomTercero,
            apellTercero: txtApellTercero,
            correoTercero: txtCorreoTercero,
            salario: txtSalario,
            horario: txtHoras,
            dniTercero: txtDNI
        };

        if (route.params?.index !== undefined) {
            route.params?.onUpdate?.(route.params.index, tercero)
        } else {
            route.params?.onAdd?.(tercero);
        }
        navigation.goBack()
    }

    const mostrarError = (mensaje) => {
        Toast.show({
            type: 'error',
            text1: mensaje,
            visibilityTime: 2000,
        });
    }

    const cancelar = () => {
        setTxtNomTercero('');
        setTxtApellTercero('');
        setTxtCorreoTercero('');
        setTxtSalario('');
        setTxtHoras('');
        setTxtDNI('');

        navigation.goBack();
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
                        style={[styles.textInput, errores.nomTercero && styles.inputError]}
                        value={txtNomTercero}
                        onChangeText={(text) => {
                            setTxtNomTercero(text);
                            limpiarError('nomTercero')
                        }} />
                </View>

                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Apellidos</Text>
                    </View>

                    <TextInput
                        placeholder='Introduce los apellidos'
                        style={[styles.textInput, errores.apellTercero && styles.inputError]}
                        value={txtApellTercero}
                        onChangeText={(text) => {
                            setTxtApellTercero(text);
                            limpiarError('apellTercero')
                        }} />
                </View>

                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Correo electrónico</Text>
                    </View>

                    <TextInput
                        placeholder='Introduce el correo'
                        style={[styles.textInput, errores.correoTercero && styles.inputError]}
                        value={txtCorreoTercero}
                        onChangeText={(text) => {
                            setTxtCorreoTercero(text);
                            limpiarError('correoTercero')
                        }} />
                </View>

                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Salario bruto anual</Text>
                    </View>

                    <TextInput
                        placeholder='Introduce el salario'
                        style={[styles.textInput, errores.salario && styles.inputError]}
                        keyboardType="decimal-pad"
                        value={txtSalario}
                        onChangeText={(text) => {
                            setTxtSalario(text);
                            limpiarError('salario')
                        }} />
                </View>

                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Horas mensuales</Text>
                    </View>

                    <TextInput
                        placeholder='Introduce el horario'
                        style={[styles.textInput, errores.horario && styles.inputError]}
                        keyboardType="decimal-pad"
                        value={txtHoras}
                        onChangeText={(text) => {
                            setTxtHoras(text);
                            limpiarError('horario')
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
            </View>

            <TouchableOpacity
                onPress={guardar}
                style={styles.buttonGuardar}>
                <Text style={styles.textGuardar}>Siguiente</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={cancelar}
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