import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Modal,
    Platform,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getProductosUser } from '../../../src/services/productosService';
import DropDownPicker from 'react-native-dropdown-picker';

export default function PAñadirTratamientos({ navigation, route }) {
    const tratEditar = route.params?.trat;

    const formateFecha = (fecha) => {
        if (!fecha) return '';
        const d = new Date(fecha);
        return d.toLocaleDateString('es-ES');
    };

    const [visible, setVisible] = useState(false);
    const [selProd, setSelProd] = useState(null);
    const [valorProd, setValorProd] = useState([]);
    const [txCant, setTxtCant] = useState(tratEditar?.cantTrat ?? '');
    const [date, setDate] = useState(
        tratEditar?.fechaTrat ? new Date(tratEditar.fechaTrat) : null
    );
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [openProd, setOpenProd] = useState(false);

    const obtenerProductos = async () => {
        try {
            const data = await getProductosUser();
            setValorProd(Array.isArray(data) ? data : []);
        } catch (error) {
            console.log('Error en la llamada productos:', error);
        }
    };

    const guardarTratamiento = () => {
        if (!selProd) {
            mostrarError('Debes seleccionar un producto');
            return;
        }

        const trat = {
            codProd: selProd.codProd,
            nomProd: selProd.nomProd,
            codGasto: selProd.codGasto,
            cantTrat: txCant,
            fechaTrat: date ? date.toISOString() : null,
        };
        console.log(trat)

        if (route.params?.index !== undefined) {
            route.params?.onUpdate?.(route.params.index, trat);
        } else {
            route.params?.onAdd?.(trat);
        }

        navigation.goBack();
    };

    const onChangeFecha = (event, selectedDate) => {
        setShowDatePicker(false);

        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    useEffect(() => {
        if (tratEditar && valorProd.length > 0) {
            const producto = valorProd.find(
                (prod) => prod.codProd === tratEditar.codProd
            );

            if (producto) {
                setSelProd(producto);
            }
        }
    }, [tratEditar, valorProd]);

    const mostrarError = (mensaje) => {
            Toast.show({
                type: 'error',
                text1: mensaje,
                visibilityTime: 2000,
            });
        }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">

            <View style={styles.card}>
                <View style={[styles.objeto, { zIndex: 3000 }]}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Clase de producto</Text>
                        <Pressable style={styles.infoIcon} onPress={() => setVisible(true)}>
                            <Text style={styles.infoText}>i</Text>
                        </Pressable>
                    </View>

                    <View style={styles.pickerContainer}>
                        <DropDownPicker
                            open={openProd}
                            setOpen={setOpenProd}

                            value={
                                selProd?.codProd != null
                                    ? String(selProd.codProd)
                                    : null
                            }

                            items={valorProd.map((trat) => ({
                                label: String(trat.nomProd),
                                value: String(trat.codProd),
                            }))}

                            setValue={(callback) => {

                                const valorActual =
                                    selProd?.codProd != null
                                        ? String(selProd.codProd)
                                        : null;

                                const codProd = callback(valorActual);

                                if (!codProd) {
                                    setSelProd(null);
                                    return;
                                }

                                const trataFind = valorProd.find(
                                    trat =>
                                        String(trat.codProd) === String(codProd)
                                );

                                setSelProd(trataFind ?? null);
                            }}

                            placeholder="Seleccione un producto"

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

                            listMode="SCROLLVIEW"
                        />
                    </View>

                    <Modal
                        transparent
                        animationType="fade"
                        visible={visible}
                        onRequestClose={() => setVisible(false)}>
                        <View style={styles.modalInfo}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalCabecera}>
                                    <Text>Información:</Text>
                                    <Pressable onPress={() => setVisible(false)}>
                                        <Text style={styles.cerrar}>X</Text>
                                    </Pressable>
                                </View>
                                <Text style={styles.textoInfo}>
                                    Se debe seleccionar una opción del listado. En caso de no visualizar
                                    una que corresponda, se podrá introducir una nueva opción más adelante.
                                </Text>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Unidades</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Cantidad utilizada"
                            style={styles.inputCantidad}
                            value={txCant}
                            onChangeText={setTxtCant}
                            keyboardType="numeric"
                        />
                        <Text style={styles.unidad}>ml</Text>
                    </View>
                </View>

                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Fecha</Text>
                    </View>

                    {Platform.OS === 'web' ? (
                        <input
                            type="date"
                            value={date ? new Date(date).toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                                if (e.target.value) setDate(new Date(e.target.value));
                            }}
                        />
                    ) : (
                        <>
                            <TouchableOpacity style={styles.textInput} onPress={() => setShowDatePicker(true)}>
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
                        </>
                    )}
                </View>
            </View>

            <TouchableOpacity style={styles.buttonGuardar} onPress={guardarTratamiento}>
                <Text style={styles.textGuardar}>Guardar tratamiento</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCancelar} onPress={() => navigation.goBack()}>
                <Text style={styles.textCancelar}>Cancelar</Text>
            </TouchableOpacity>
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
    inputContainer: {
        height: 47,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 12,
    },
    inputCantidad: {
        flex: 1,
        height: 47,
    },
    unidad: {
        color: '#918B7F',
        fontWeight: '500',
        marginLeft: 8,
    },
    fechaTexto: {
        color: '#1F2A24',
        fontSize: 15,
    },
    fechaPlaceholder: {
        color: '#918B7F',
        fontSize: 15,
    },
    infoIcon: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#37653A',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
    },
    infoText: {
        color: '#37653A',
        fontWeight: '700',
    },
    modalInfo: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#F7F3EE',
        borderRadius: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: '#37653A',
    },
    modalCabecera: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    textoInfo: {
        fontSize: 13,
        color: '#444',
    },
    cerrar: {
        fontSize: 16,
        color: '#37653A',
    },
});