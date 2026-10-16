import { StyleSheet, View, TouchableOpacity, Text, ScrollView, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import { getGastosClase, getTipGastos } from '../../../src/services/gastosService';
import { getCamposByUser } from '../../../src/services/usuariosServices';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

export default function PAñadirGastoAdmin({ navigation, route }) {

    const gastoEditar = route.params?.gasto;

    const [tipGastos, setTipGastos] = useState([]);
    const [selClasGasto, setSelClasGasto] = useState(gastoEditar?.clasGasto ?? '');

    const [listaGastos, setListaGastos] = useState([]);
    const [selGasto, setSelGasto] = useState(null);

    const [txtImporte, setTxtImporte] = useState(String(gastoEditar?.txtImp ?? ''));

    const [campos, setCampos] = useState([]);
    const [selCampo, setSelCampo] = useState(null);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(
        gastoEditar?.fechaGast ? new Date(gastoEditar.fechaGast) : null
    );

    const [openClasGasto, setOpenClasGasto] = useState(false);
    const [openGasto, setOpenGasto] = useState(false);
    const [openCampo, setOpenCampo] = useState(false);

    const obtenerGastosOperativos = async () => {
        try {
            const data = await getTipGastos('ADMINISTRATIVOS');
            setTipGastos(Array.isArray(data) ? data : [])
        } catch (error) {
            console.log('Error en la llamada para obtener los gastos operativos:', error)
        }
    }

    const obtenerGastos = async () => {
        try {
            const data = await getGastosClase(selClasGasto);
            setListaGastos(Array.isArray(data) ? data : [])
        } catch (error) {
            console.log('Error en la llamada para obtener los gatos operativos por clase:', error)
        }
    }

    const obtenerCampos = async () => {
        try {
            const data = await getCamposByUser('juan.lopez@mail.com');
            setCampos(Array.isArray(data) ? data : [])
        } catch (error) {
            console.log('Error en la llamada campos:', error)
        }
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

    const guardarGasto = () => {
        if (!selGasto?.codTipGasto) {
            mostrarError('Debe seleccionar un gasto');
            return;
        }

        if (!txtImporte) {
            mostrarError('Debe indicar el importe por unidad');
            return;
        }

        const gasto = {
            clasGasto: selClasGasto,
            nomGasto: selGasto?.nomGasto,
            codTipGasto: selGasto.codTipGasto,
            txtUnd: '',
            txtImp: txtImporte,
            codCampo: selCampo?.codCampo,
            nomCampo: selCampo?.nomCampo,
            fechaGast: date ? date.toISOString() : null,
        };

        if (route.params?.index !== undefined) {
            route.params?.onUpdate?.(route.params.index, gasto)
        } else {
            route.params?.onAdd?.(gasto);
        }
        navigation.goBack()
    }

    const cancelarGasto = () => {

        setSelClasGasto('');
        setSelGasto(null);
        setTextUnidades('');
        setTxtImporte('');
        setSelCampo(null);
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

    useEffect(() => {
        obtenerGastosOperativos();
    }, []);

    useEffect(() => {
        if (selClasGasto) {
            obtenerGastos();
        }
    }, [selClasGasto]);

    useEffect(() => {
        obtenerCampos();
    }, []);

    useEffect(() => {
        if (gastoEditar && listaGastos.length > 0) {
            const gasto = listaGastos.find(
                (gasto) => gasto.codTipGasto === gastoEditar.codTipGasto
            );

            if (gasto) {
                setSelGasto(gasto);
            }
        }
    }, [gastoEditar, listaGastos]);

    useEffect(() => {
        if (gastoEditar && campos.length > 0) {
            const campo = campos.find(
                (campo) => campo.codCampo === gastoEditar.codCampo
            );

            if (campo) {
                setSelCampo(campo);
            }
        }
    }, [gastoEditar, campos]);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={styles.card}>
                <View style={[styles.objeto, { zIndex: 3000 }]}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Clase de gasto</Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        <DropDownPicker
                            open={openClasGasto}
                            setOpen={setOpenClasGasto}
                            value={selClasGasto || null}
                            items={tipGastos.map((prod) => ({
                                label: prod.classGasto,
                                value: prod.classGasto,
                            }))}
                            setValue={setSelClasGasto}
                            placeholder="Seleccione una clase"
                            placeholderStyle={{ color: '#AFA99D', }}
                            style={styles.picker}
                            dropDownContainerStyle={{ borderColor: '#ccc', }}
                            listMode="SCROLLVIEW" />
                    </View>
                </View>

                <View style={[styles.objeto, { zIndex: 2000 }]}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Detalle</Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        <DropDownPicker
                            open={openGasto}
                            setOpen={setOpenGasto}
                            value={
                                selGasto?.codTipGasto != null
                                    ? String(selGasto.codTipGasto) : null
                            }
                            items={listaGastos.map((gasto) => ({
                                label: String(gasto.nomGasto),
                                value: String(gasto.codTipGasto),
                            }))}
                            setValue={(callback) => {

                                const valorActual =
                                    selGasto?.codTipGasto != null
                                        ? String(selGasto.codTipGasto) : null;

                                const codTipGasto = callback(valorActual);
                                if (!codTipGasto) {
                                    setSelGasto(null);
                                    return;
                                }
                                const gastoEncontrado = listaGastos.find(
                                    gasto => String(gasto.codTipGasto) === String(codTipGasto)
                                );

                                setSelGasto(gastoEncontrado ?? null);
                            }}

                            disabled={!selClasGasto}
                            placeholder="Seleccione un gasto"
                            placeholderStyle={{
                                color: '#AFA99D',
                            }}
                            style={styles.picker}

                            dropDownContainerStyle={{
                                borderColor: '#ccc',
                            }}
                            listMode="SCROLLVIEW"
                        />
                    </View>
                </View>

                <View style={[styles.objeto, { zIndex: 1000 }]}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Importe</Text>
                    </View>
                    <TextInput
                        placeholder='€ / ud'
                        style={styles.textInput}
                        value={txtImporte}
                        keyboardType="decimal-pad"
                        onChangeText={setTxtImporte} />
                </View>

                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Campos</Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        <DropDownPicker
                            open={openCampo}
                            setOpen={setOpenCampo}
                            value={
                                selCampo?.codCampo != null
                                    ? String(selCampo.codCampo) : null
                            }
                            items={campos.map((campo) => ({
                                label: String(campo.nomCampo),
                                value: String(campo.codCampo),
                            }))}
                            setValue={(callback) => {

                                const valorActual =
                                    selCampo?.codCampo != null
                                        ? String(selCampo.codCampo) : null;

                                const codCampo = callback(valorActual);

                                if (!codCampo) {
                                    setSelCampo(null);
                                    return;
                                }

                                const campoEncontrado = campos.find(
                                    campo => String(campo.codCampo) === String(codCampo)
                                );
                                setSelCampo(campoEncontrado ?? null);
                            }}
                            placeholder="Seleccione un campo"
                            placeholderStyle={{
                                color: '#AFA99D',
                            }}
                            style={styles.picker}
                            listMode="SCROLLVIEW"
                        />
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
                style={styles.buttonGuardar}
                onPress={guardarGasto}>
                <Text style={styles.textGuardar}>Guardar producto</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonCancelar}
                onPress={cancelarGasto}>
                <Text style={styles.textCancelar}>Cancelar</Text>
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
    objeto: {
        flex: 1,
        marginBottom: 15
    },
    fila: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    texto: {
        fontSize: 15,
        color: '#37653A',
        fontWeight: '700',
    },
    pickerContainer: {
        width: '100%',
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
    dobleFila: {
        flexDirection: 'row',
        gap: 11,
    },
    textInput: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center'
    },

    //BOTONES
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
});