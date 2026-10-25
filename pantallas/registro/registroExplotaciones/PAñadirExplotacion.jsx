import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { getCultivos, getVariedades } from '../../../src/services/cultivosService';
import DropDownPicker from 'react-native-dropdown-picker';


export default function PAñadirExplotacion({ navigation, route }) {

    const exploEditar = route.params?.explotacion;

    const [txtNomCampo, setTxtNomCampo] = useState(exploEditar?.nomCampo ?? '');
    const [cultivos, setCultivos] = useState([]);
    const [selCultivo, setSelCultivo] = useState('');
    const [variedades, setVariedades] = useState([]);
    const [selVaried, setSelVaried] = useState('');
    const [txtNumArboles, setTxtNumArboles] = useState(exploEditar?.numArboles ?? '');
    const [txtMesCierre, setTxtMesCierre] = useState(exploEditar?.mesCierre ?? '');
    const [alquilado, setAlquilado] = useState(null);
    const [txtImpAlq, setTxtImpAlq] = useState(exploEditar?.impAlq ?? '');
    const [ultimoCierre, setUltimoCierre] = useState(false);

    const [openCultivos, setOpenCultivos] = useState(false);
    const [openVariedades, setOpenVariedades] = useState(false);

    const [errores, setErrores] = useState({});

    const obtenerCultivos = async () => {
        try {
            const data = await getCultivos();
            setCultivos(Array.isArray(data) ? data : [])
        } catch (error) {
            console.log('Error al recoger cultivos:', error)
        }
    }

    const obtenerVariedades = async () => {
        try {
            const data = await getVariedades(selCultivo);
            setVariedades(Array.isArray(data) ? data : [])
        } catch (error) {
            console.log('Error al recoger varieadades:', error)
        }
    }

    const guardarExplotacion = () => {
        const nuevosErrores = {};
        let mensajeError = '';

        const agregarError = (campo, mensaje) => {
            nuevosErrores[campo] = true;

            if (!mensajeError) {
                mensajeError = mensaje;
            }
        };

        if (!txtNomCampo) {
            agregarError('nomCampo', 'El nombre del campo es obligatorio')
        }

        if (!selCultivo) {
            agregarError('nomFruta', 'Se debe seleccionar un cultivo');
        }

        if (!selVaried) {
            agregarError('variedad', 'Se debe seleccionar una variedad')
        }

        if (!txtNumArboles) {
            agregarError('numArboles', 'la cantidad de abroles es obligatoria');
        }

        if (alquilado && !txtImpAlq) {
            agregarError('impAlq', 'Si el campo es alquilado se debe rellenar su coste')
        }

        if (!txtMesCierre) {
            agregarError('mesCierre', 'El mes de cierre es obligatorio')
        }

        setErrores(nuevosErrores);

        if (mensajeError) {
            mostrarError(mensajeError);
            return;
        }

        const explotacion = {
            nomCampo: txtNomCampo,
            nomFruta: selCultivo,
            nomVar: selVaried?.nomVar,
            codFruta: selVaried.codFruta,
            numArboles: txtNumArboles,
            alquilado: alquilado,
            impAlq: txtImpAlq,
            mesCierre: txtMesCierre,
            ultimoCierre: ultimoCierre
        };

        if (route.params?.index !== undefined) {
            route.params?.onUpdate?.(route.params.index, explotacion)
        } else {
            route.params?.onAdd?.(explotacion);
        }

        navigation.goBack()
    }

    const cancelarActivo = () => {
        setTxtNomCampo('');
        setSelCultivo(null);
        setSelVaried(null);
        setTxtNumArboles('');
        setAlquilado(null);
        setTxtImpAlq('');
        setTxtMesCierre('');
        setUltimoCierre(null);
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

    useEffect(() => {
        obtenerCultivos();
    }, []);

    useEffect(() => {
        if (selCultivo) {
            obtenerVariedades();
        }
    }, [selCultivo]);

    useEffect(() => {
        if (exploEditar && cultivos.length > 0) {
            const explo = cultivos.find(
                (fruta) => fruta.nomFruta === exploEditar.nomFruta
            );

            if (explo) {
                setSelCultivo(explo.nomFruta);
            }
        }
    }, [exploEditar, cultivos]);

    useEffect(() => {
        if (exploEditar && variedades.length > 0) {
            const varFind = variedades.find(
                variedad =>
                    String(variedad.codFruta) ===
                    String(exploEditar.codFruta)
            );

            if (varFind) {
                setSelVaried(varFind);
            }
        }
    }, [exploEditar, variedades]);

    return (
        <ScrollView style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Nombre campo</Text>
                    </View>

                    <TextInput
                        placeholder='Introduce el nombre'
                        style={[styles.textInput, errores.nomCampo && styles.inputError]}
                        value={txtNomCampo}
                        onChangeText={(text) => {
                            setTxtNomCampo(text);
                            limpiarError('nomCampo')
                        }} />
                </View>

                <View style={[styles.objeto, { zIndex: 3000 }]}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Cultivo</Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        <DropDownPicker
                            open={openCultivos}
                            setOpen={setOpenCultivos}

                            value={selCultivo || null}

                            items={cultivos.map((fruta) => ({
                                label: String(fruta.nomFruta),
                                value: String(fruta.nomFruta),
                            }))}

                            setValue={setSelCultivo}

                            placeholder="Seleccione un cultivo"

                            searchable={true}
                            searchPlaceholder="Buscar cultivo..."
                            searchTextInputStyle={{
                                borderColor: '#ddd',
                                borderRadius: 8,
                                color: '#333',
                            }}

                            placeholderStyle={{
                                color: '#AFA99D',
                            }}

                            style={[styles.picker, errores.nomFruta && styles.inputError]}

                            dropDownContainerStyle={{
                                backgroundColor: '#FFFFFF',
                                borderColor: '#ddd',
                                borderWidth: 1,
                                borderRadius: 8,
                            }}

                            listMode="SCROLLVIEW"
                            modalTitle='Seleccionar cultivo' />
                    </View>
                </View>

                <View style={[styles.objeto, { zIndex: 2000 }]}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Variedad</Text>
                    </View>

                    <View style={styles.pickerContainer}>
                        <DropDownPicker
                            open={openVariedades}
                            setOpen={setOpenVariedades}

                            value={
                                selVaried?.codFruta != null
                                    ? String(selVaried.codFruta) : null
                            }

                            items={variedades.map((variedad) => ({
                                label: variedad.nomVar,
                                value: String(variedad.codFruta),
                            }))}

                            setValue={(callback) => {
                                const valorActual =
                                    selVaried?.codFruta != null
                                        ? String(selVaried.codFruta) : null;

                                const codFruta = callback(valorActual);

                                if (!codFruta) {
                                    setSelVaried(null);
                                    return;
                                }

                                const varEncontrada = variedades.find(
                                    variedad =>
                                        String(variedad.codFruta) === String(codFruta)
                                );

                                setSelVaried(varEncontrada ?? null);
                            }}

                            placeholder="Seleccione una variedad"

                            searchable={true}
                            searchPlaceholder="Buscar variedad..."
                            searchTextInputStyle={{
                                borderColor: '#ddd',
                                borderRadius: 8,
                                color: '#333',
                            }}

                            placeholderStyle={{
                                color: '#AFA99D',
                            }}

                            style={[styles.picker, errores.variedad && styles.inputError]}
                            
                            dropDownContainerStyle={{
                                backgroundColor: '#FFFFFF',
                                borderColor: '#ddd',
                                borderWidth: 1,
                                borderRadius: 8,
                            }}

                            listMode="SCROLLVIEW" />
                    </View>
                </View>

                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Nº arboles</Text>
                    </View>

                    <TextInput
                        placeholder='Introduce el cantidad'
                        style={[styles.textInput, errores.numArboles && styles.inputError]}
                        value={txtNumArboles}
                        keyboardType="number-pad"
                        onChangeText={(text) => {
                            setTxtNumArboles(text);
                            limpiarError('numArboles')
                        }} />
                </View>

                <View style={styles.dobleFila}>
                    <View style={styles.objeto}>
                        <View style={styles.fila}>
                            <Text style={styles.texto}>Alquilado</Text>
                        </View>

                        <TouchableOpacity style={[styles.fila, { marginBottom: 3 }]}
                            onPress={() => setAlquilado(alquilado === true ? null : true)}>
                            <Text style={{ marginRight: 10 }}>Si</Text>
                            <View style={styles.checkbox}>
                                {alquilado === true && (
                                    <Text>✓</Text>
                                )}
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.fila}
                            onPress={() => setAlquilado(alquilado === false ? null : false)}>
                            <Text style={{ marginRight: 10 }}>No</Text>
                            <View style={styles.checkbox}>
                                {alquilado === false && (
                                    <Text>✓</Text>
                                )}
                            </View>

                        </TouchableOpacity>
                    </View>

                    <View style={styles.objeto}>
                        <View style={styles.fila}>
                            <Text style={styles.texto}> Precio alquiler</Text>
                        </View>

                        <TextInput
                            placeholder='Introduce el cantidad'
                            style={[styles.textInput, errores.impAql && styles.inputError]}
                            value={txtImpAlq}
                            keyboardType="number-pad"
                            onChangeText={(text) => {
                                setTxtImpAlq(text);
                                limpiarError('impAlq')
                            }} />
                    </View>
                </View>

                <View style={styles.dobleFila}>
                    <View style={styles.objeto}>
                        <View style={styles.fila}>
                            <Text style={styles.texto}>Mes cierre</Text>
                        </View>

                        <TextInput
                            placeholder='Introduce el mes'
                            style={[styles.textInput, errores.mesCierre && styles.inputError]}
                            value={txtMesCierre}
                            keyboardType="number-pad"
                            onChangeText={(text) => {
                                setTxtMesCierre(text);
                                limpiarError('mesCierre')
                            }} />
                    </View>
                    <View style={styles.objeto}>
                        <View style={styles.fila}>
                            <Text style={styles.texto}>Ultimo cierre del año</Text>
                        </View>

                        <TouchableOpacity style={[styles.fila, { marginBottom: 3 }]}
                            onPress={() => setUltimoCierre(ultimoCierre === true ? null : true)}>
                            <Text style={{ marginRight: 10 }}>Si</Text>
                            <View style={styles.checkbox}>
                                {ultimoCierre === true && (
                                    <Text>✓</Text>
                                )}
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.fila}
                            onPress={() => setUltimoCierre(ultimoCierre === false ? null : false)}>
                            <Text style={{ marginRight: 10 }}>No</Text>
                            <View style={styles.checkbox}>
                                {ultimoCierre === false && (
                                    <Text>✓</Text>
                                )}
                            </View>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={guardarExplotacion}
                style={styles.buttonGuardar}>
                <Text style={styles.textGuardar}>Guardar explotacion</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={cancelarActivo}
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
    modalInfo: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        padding: 20
    },
    modalContent: {
        backgroundColor: '#F7F3EE',
        borderRadius: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: '#2F5D3A'
    },
    modalCabecera: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
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
    inputError: {
        borderColor: '#DC3545',
        borderWidth: 2,
        backgroundColor: '#FFF5F5',
    },
    dobleFila: {
        flexDirection: 'row',
        gap: 11,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
})