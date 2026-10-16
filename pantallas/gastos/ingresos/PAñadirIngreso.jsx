import { StyleSheet, View, TouchableOpacity, Text, ScrollView, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import { getTipIngresos } from '../../../src/services/ingresosService';
import { getCamposByUser } from '../../../src/services/usuariosServices';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

export default function PAñadirIngreso({ navigation, route }) {

    const ingresoEditar = route.params?.ingreso;

    const [tipIngreso, setTipIngreso] = useState([]);
    const [selTipIngreso, setSelTipIngreso] = useState(null);

    const [campos, setCampos] = useState([]);
    const [selCampo, setSelCampo] = useState(null);

    const [txtHoras, setTxtHoras] = useState(String(ingresoEditar?.txtHoras ?? ''));
    const [txtImpHoras, setTxtImpHoras] = useState(String(ingresoEditar?.txtImpHoras ?? ''));
    const [txtImporte, setTxtImporte] = useState(String(ingresoEditar?.txtImporte ?? ''));
    const [txtKgs, setTxtKgs] = useState(String(ingresoEditar?.txtKgs ?? ''));
    const [txtImpKgs, setImpKgs] = useState(String(ingresoEditar?.txtImpKgs ?? ''));

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(
        ingresoEditar?.fecIngreso ? new Date(ingresoEditar.fecIngreso) : null
    );

    const [openTipIngreso, setOpenTipIngreso] = useState(false);
    const [openCampo, setOpenCampo] = useState(false);

    const obtenerIngresos = async () => {
        try {
            const data = await getTipIngresos();
            setTipIngreso(Array.isArray(data) ? data : [])
        } catch (error) {
            console.log('Error en la llamada para obtener los gastos operativos:', error)
        }
    }

    const obtenerCampos = async () => {
        try {
            const data = await getCamposByUser();
            setCampos(Array.isArray(data) ? data : [])
        } catch (error) {
            console.log('Error en la llamada campos:', error)
        }
    }

    const activoPagoIngreso = () => {
        const formaIngreso = selTipIngreso?.fromIngreso;
        console.log(formaIngreso);
        if (formaIngreso?.includes("H")) {
            return (
                <View style={styles.dobleFila}>
                    <View style={styles.objeto}>
                        <View style={styles.fila}>
                            <Text style={styles.texto}>Horas</Text>
                        </View>

                        <TextInput
                            placeholder='0'
                            style={styles.textInput}
                            value={txtHoras}
                            keyboardType="decimal-pad"
                            onChangeText={setTxtHoras}
                        />
                    </View>

                    <View style={styles.objeto}>
                        <View style={styles.fila}>
                            <Text style={styles.texto}>Precio/Hora</Text>
                        </View>

                        <TextInput
                            placeholder='0€'
                            style={styles.textInput}
                            value={txtImpHoras}
                            keyboardType="decimal-pad"
                            onChangeText={setTxtImpHoras}
                        />
                    </View>
                </View>
            );
        }

        if (formaIngreso?.includes("I")) {
            return (
                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Importe</Text>
                    </View>

                    <TextInput
                        placeholder='€'
                        style={styles.textInput}
                        value={txtImporte}
                        keyboardType="decimal-pad"
                        onChangeText={setTxtImporte}
                    />
                </View>
            );
        }

        if (formaIngreso?.includes("K")) {
            return (
                <View style={styles.dobleFila}>
                    <View style={styles.objeto}>
                        <View style={styles.fila}>
                            <Text style={styles.texto}>Kgs</Text>
                        </View>

                        <TextInput
                            placeholder='0'
                            style={styles.textInput}
                            value={txtKgs}
                            keyboardType="decimal-pad"
                            onChangeText={setTxtKgs}
                        />
                    </View>

                    <View style={styles.objeto}>
                        <View style={styles.fila}>
                            <Text style={styles.texto}>Precio/kgs</Text>
                        </View>

                        <TextInput
                            placeholder='0€'
                            style={styles.textInput}
                            value={txtImpKgs}
                            keyboardType="decimal-pad"
                            onChangeText={setImpKgs}
                        />
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.objeto}>
                <View style={styles.fila}>
                    <Text style={styles.texto}>Importe</Text>
                </View>

                <TextInput
                    placeholder='€'
                    style={styles.textInput}
                    value={txtImporte}
                    keyboardType="decimal-pad"
                    onChangeText={setTxtImporte}
                />
            </View>
        );

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

    const guardarIngreso = () => {
        console.log(selTipIngreso?.iva)
        const ingreso = {
            codTipIngreso: selTipIngreso?.codTipIngreso,
            nomIngreso: selTipIngreso?.nomIngreso,
            tipCobro: selTipIngreso?.fromIngreso,
            usoActivo: selTipIngreso?.usoActivo,
            campoEsp: selTipIngreso?.campoEsp,
            codCampo: selCampo?.codCampo,
            nomCampo: selCampo?.nomCampo,
            txtHoras: txtHoras,
            txtImpHoras: txtImpHoras,
            txtImporte: txtImporte,
            txtKgs: txtKgs,
            txtImpKgs: txtImpKgs,
            fecIngreso: date ? date.toISOString() : null,
            iva: selTipIngreso?.iva
        };

        if (route.params?.index !== undefined) {
            route.params?.onUpdate?.(route.params.index, ingreso)
        } else {
            route.params?.onAdd?.(ingreso);
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

    const campoHabilitado = selTipIngreso?.fromIngreso?.includes("C") ?? false;

    useEffect(() => {
        obtenerIngresos();
    }, []);

    useEffect(() => {
        obtenerCampos();
    }, []);

    useEffect(() => {
        if (ingresoEditar && tipIngreso.length > 0) {
            const ingreso = tipIngreso.find(
                (ingreso) => ingreso.codTipIngreso === ingresoEditar.codTipIngreso
            );

            if (ingreso) {
                setSelTipIngreso(ingreso);
            }
        }
    }, [ingresoEditar, tipIngreso]);

    useEffect(() => {
        if (ingresoEditar && campos.length > 0) {
            const campo = campos.find(
                (campo) => campo.codCampo === ingresoEditar.codCampo
            );

            if (campo) {
                setSelCampo(campo);
            }
        }
    }, [ingresoEditar, campos]);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={styles.card}>
                <View style={[styles.objeto, { zIndex: 3000 }]}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Detalle</Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        <DropDownPicker
                            open={openTipIngreso}
                            setOpen={setOpenTipIngreso}

                            value={
                                selTipIngreso?.codTipIngreso != null
                                    ? String(selTipIngreso.codTipIngreso) : null
                            }

                            items={tipIngreso.map((ingreso) => ({
                                label: String(ingreso.nomIngreso),
                                value: String(ingreso.codTipIngreso),
                            }))}

                            setValue={(callback) => {

                                const valorActual =
                                    selTipIngreso?.codTipIngreso != null
                                        ? String(selTipIngreso.codTipIngreso) : null;

                                const codTipIngreso = callback(valorActual);

                                if (!codTipIngreso) {
                                    setSelTipIngreso(null);
                                    return;
                                }

                                const ingresoFind = tipIngreso.find(
                                    ingreso => String(ingreso.codTipIngreso) === String(codTipIngreso)
                                );

                                setSelTipIngreso(ingresoFind ?? null);
                            }}

                            placeholder="Seleccione un ingreso"

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
                            listMode="SCROLLVIEW" />
                    </View>
                </View>

                <View style={[styles.objeto, { zIndex: 2000 }]}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Campos</Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        <DropDownPicker
                            open={openCampo}
                            setOpen={setOpenCampo}

                            value={
                                selCampo?.codCampo != null
                                    ? String(selCampo.codCampo)
                                    : null
                            }

                            items={campos.map((campo) => ({
                                label: String(campo.nomCampo),
                                value: String(campo.codCampo),
                            }))}

                            setValue={(callback) => {

                                const valorActual =
                                    selCampo?.codCampo != null
                                        ? String(selCampo.codCampo)
                                        : null;

                                const codCampo = callback(valorActual);

                                if (!codCampo) {
                                    setSelCampo(null);
                                    return;
                                }

                                const campoEncontrado = campos.find(
                                    campo =>
                                        String(campo.codCampo) === String(codCampo)
                                );

                                setSelCampo(campoEncontrado ?? null);
                            }}

                            disabled={!campoHabilitado}

                            placeholder="Seleccione un campo"

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

                            listMode="SCROLLVIEW" />
                    </View>
                </View>

                {activoPagoIngreso()}

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
                onPress={guardarIngreso}>
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