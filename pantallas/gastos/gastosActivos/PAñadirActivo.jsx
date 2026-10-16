import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getActivos } from '../../../src/services/activosService';
import DropDownPicker from 'react-native-dropdown-picker';


export default function PAñadirActivo({ navigation, route }) {

    const activoEditar = route.params?.activo;

    const [tipActivo, setTipActivo] = useState([]);
    const [selTipActivo, setSelActivo] = useState('');

    const [txtNomActivo, setTxtNomActivo] = useState(activoEditar?.nomActivo ?? '');
    const [txtImporte, setTxtImporte] = useState(activoEditar?.txtImp ?? '');
    const [txtVidaUtil, setTxtVidaUtil] = useState(activoEditar?.txtVidaUtil ?? '');

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(
        activoEditar?.fechaActivo ? new Date(activoEditar.fechaActivo) : null
    );
    const [openTipActivo, setOpenTipActivo] = useState(false);

    const obtenerTipoActivo = async () => {
        try {
            const data = await getActivos();
            setTipActivo(Array.isArray(data) ? data : [])
        } catch (error) {
            console.log('Error en la llamada tipo de activos:', error)
        }
    }

    const guardarActivo = () => {

        if (!selTipActivo?.codTipActivo) {
            mostrarError('Debe seleccionar un activo');
            return;
        }

        const activo = {
            codTipActivo: selTipActivo?.codTipActivo,
            nomActivo: txtNomActivo,
            txtImp: txtImporte,
            txtVidaUtil: txtVidaUtil,
            fechaActivo: date ? date.toISOString() : null,
        };

        if (route.params?.index !== undefined) {
            route.params?.onUpdate?.(route.params.index, activo)
        } else {
            route.params?.onAdd?.(activo);
        }
        navigation.goBack()
    }

    const cancelarActivo = () => {

        setSelActivo('');
        setTxtNomActivo('');
        setTxtImporte('');
        setTxtVidaUtil('');
        setDate(null);
        navigation.goBack()
    };

    const mostrarError = (mensaje) => {
        Toast.show({
            type: 'error',
            text1: mensaje,
            visibilityTime: 2000,
        });
    }

    const onChangeFecha = (event, selectedDate) => {
        setShowDatePicker(false);

        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const formateFecha = (fecha) => {
        if (!fecha) return '';
        const d = new Date(fecha);
        return d.toLocaleDateString('es-ES');
    };

    useEffect(() => {
        obtenerTipoActivo();
    }, []);

    useEffect(() => {
        if (activoEditar && tipActivo.length > 0) {
            const tipoEncontrado = tipActivo.find(
                activo =>
                    String(activo.codTipActivo) ===
                    String(activoEditar.codTipActivo)
            );

            if (tipoEncontrado) {
                setSelActivo(tipoEncontrado);
            }
        }
    }, [activoEditar, tipActivo]);

    return (
        <ScrollView style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
                <View style={[styles.objeto, { zIndex: 3000 }]}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Tipo activo</Text>
                    </View>

                    <View style={styles.pickerContainer}>
                        <DropDownPicker
                            open={openTipActivo}
                            setOpen={setOpenTipActivo}

                            value={
                                selTipActivo?.codTipActivo != null
                                    ? String(selTipActivo.codTipActivo) : null
                            }

                            items={tipActivo.map((activo) => ({
                                label: activo.nomActivo,
                                value: String(activo.codTipActivo),
                            }))}

                            setValue={(callback) => {
                                const valorActual =
                                    selTipActivo?.codTipActivo != null
                                        ? String(selTipActivo.codTipActivo) : null;

                                const codTipActivo = callback(valorActual);

                                if (!codTipActivo) {
                                    setSelActivo(null);
                                    return;
                                }

                                const activoEncontrado = tipActivo.find(
                                    activo =>
                                        String(activo.codTipActivo) === String(codTipActivo)
                                );

                                setSelActivo(activoEncontrado ?? null);
                            }}

                            placeholder="Seleccione un tipo de activo"

                            placeholderStyle={{
                                color: '#AFA99D',
                            }}

                            style={styles.picker}
                            dropDownContainerStyle={{
                                backgroundColor: '#FFFFFF',
                                borderColor: '#ddd',
                                borderWidth: 1,
                                borderRadius: 8,
                            }}

                            listMode="SCROLLVIEW"/>
                    </View>
                </View>

                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Nombre activo</Text>
                    </View>
                    <TextInput
                        placeholder='Indroduce el nombre del activo'
                        style={styles.textInput}
                        value={txtNomActivo}
                        onChangeText={setTxtNomActivo} />
                </View>

                <View style={styles.dobleFila}>
                    <View style={styles.objeto}>
                        <View style={styles.fila}>
                            <Text style={styles.texto}>Precio compra activo</Text>
                        </View>
                        <TextInput
                            placeholder='0,00€'
                            style={styles.textInput}
                            value={txtImporte}
                            keyboardType="decimal-pad"
                            onChangeText={setTxtImporte} />
                    </View>

                    <View style={styles.objeto}>
                        <View style={styles.fila}>
                            <Text style={styles.texto}>Años vida útil</Text>
                        </View>
                        <TextInput
                            placeholder='0'
                            style={styles.textInput}
                            value={txtVidaUtil}
                            keyboardType="decimal-pad"
                            onChangeText={setTxtVidaUtil} />
                    </View>
                </View>

                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Fecha</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.textInput}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={date ? styles.fechaTexto : styles.fechaPlaceholder}>
                            {date ? formateFecha(date) : 'Selecciona una fecha'}
                        </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={date || new Date()}
                            mode="date"
                            display="default"
                            onChange={onChangeFecha}
                        />
                    )}
                </View>

            </View>

            <TouchableOpacity
                onPress={guardarActivo}
                style={styles.buttonGuardar}>
                <Text style={styles.textGuardar}>Guardar producto</Text>
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
    totalContainer: {
        flexDirection: 'row',

        justifyContent: 'flex-end',
        alignItems: 'center',

        gap: 10,
    },
    totalLabel: {
        fontSize: 12,
        color: '#918B7F',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#37653A',
    },
})