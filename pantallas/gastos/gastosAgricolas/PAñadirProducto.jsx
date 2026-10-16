import { StyleSheet, View, Text, Pressable, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { getProductos, getProductosClases } from '../../../src/services/productosService';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';


export default function PAñadirProducto({ navigation, route }) {

    const gastoEditar = route.params?.gasto;

    const [visible, setVisible] = useState(false);
    const [visibleProd, setVisibleProd] = useState(false);
    const [selClase, setSelClase] = useState(gastoEditar?.clasProd ?? '');
    const [valorClase, setValorClase] = useState([]);
    const [valorProd, setValorProd] = useState([]);
    const [selProd, setSelProd] = useState(null);
    const [txtUnidades, setTextUnidades] = useState(String(gastoEditar?.txtUnd ?? ''));
    const [txtImporte, setTxtImporte] = useState(String(gastoEditar?.txtImp ?? ''));
    const [date, setDate] = useState(
        gastoEditar?.fechaGast ? new Date(gastoEditar.fechaGast) : null
    );
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [openClase, setOpenClase] = useState(false);
    const [openProd, setOpenProd] = useState(false);

    const obtenerProductos = async () => {
        try {
            const data = await getProductos(selClase);
            setValorProd(Array.isArray(data) ? data : [])
        } catch (error) {
            console.log('Error en la llamada campos:', error)
        }
    }

    const obtenerClases = async () => {
        try {
            const data = await getProductosClases();
            setValorClase(Array.isArray(data) ? data : [])
        } catch (error) {
            console.log('Error en la llamada campos:', error)
        }
    }

    const guardarGasto = () => {

        if (!selProd?.codProd) {
            mostrarError('Debe seleccionar un producto');
            return;
        }

        if (!txtUnidades) {
            mostrarError('Debe indicar las unidades');
            return;
        }

        if (!txtImporte) {
            mostrarError('Debe indicar el importe por unidad');
            return;
        }

        const gasto = {
            clasProd: selClase,
            nomProd: selProd?.nomProd,
            codProd: selProd.codProd,
            txtUnd: txtUnidades,
            txtImp: txtImporte,
            fechaGast: date ? date.toISOString() : null,
        }

        if (route.params?.index !== undefined) {
            route.params?.onUpdate?.(route.params.index, gasto)
        } else {
            route.params?.onAdd?.(gasto);
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

    const formateFecha = (fecha) => {
        if (!fecha) return '';
        const d = new Date(fecha);
        return d.toLocaleDateString('es-ES');
    };

    const onChangeFecha = (event, selectedDate) => {
        setShowDatePicker(false);

        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const unidades = parseFloat(
        String(txtUnidades).replace(',', '.')
    ) || 0;

    const importe = parseFloat(
        String(txtImporte).replace(',', '.')
    ) || 0;

    const total = unidades * importe;

    const cancelarProducto = () => {

        setSelClase('');
        setSelProd(null);
        setValorProd([]);

        setTextUnidades('');
        setTxtImporte('');
        navigation.goBack()

    };

    useEffect(() => {
        obtenerClases();
    }, []);

    useEffect(() => {
        if (selClase) {
            obtenerProductos();
        }
    }, [selClase]);

    useEffect(() => {
        if (gastoEditar && valorProd.length > 0) {
            const producto = valorProd.find(
                (prod) => prod.nomProd === gastoEditar.nomProd
            )
            if (producto) {
                setSelProd(producto);
            }
        }
    }, [gastoEditar, valorProd]);

    return (
        <ScrollView style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
                <View style={[styles.objeto, { zIndex: 3000 }]}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Clase de producto</Text>
                        <Pressable style={styles.infoIcon}
                            onPress={() =>
                                setVisible(true)}>
                            <Text style={styles.infoText}>i</Text>
                        </Pressable>
                    </View>
                    <View style={styles.pickerContainer}>
                        <DropDownPicker
                            open={openClase}
                            setOpen={setOpenClase}

                            value={selClase || null}

                            items={valorClase.map((prod) => ({
                                label: String(prod.clasProd),
                                value: String(prod.clasProd),
                            }))}

                            setValue={setSelClase}

                            placeholder="Seleccione una clase"

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

                    <Modal
                        transparent
                        animationType='fade'
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

                                <Text style={styles.textoInfo}>Se debe seleccionar una opción del listado en caso de no visualizar
                                    una que corresponda, se podrá intoducir una nueva opción intoduciendo el nombre y pulsando
                                    'Añadir clase de producto'
                                </Text>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={[styles.objeto, { zIndex: 2000 }]}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Producto</Text>
                        <Pressable style={styles.infoIcon}
                            onPress={() =>
                                setVisibleProd(true)}>
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

                            items={valorProd.map((prod) => ({
                                label: String(prod.nomProd),
                                value: String(prod.codProd),
                            }))}

                            setValue={(callback) => {

                                const valorActual =
                                    selProd?.codProd != null
                                        ? String(selProd.codProd) : null;

                                const codProd = callback(valorActual);

                                if (!codProd) {
                                    setSelProd(null);
                                    return;
                                }

                                const productoEncontrado = valorProd.find(
                                    prod => String(prod.codProd) === String(codProd)
                                );

                                setSelProd(productoEncontrado ?? null);
                            }}

                            disabled={!selClase}
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

                            listMode="SCROLLVIEW"/>
                    </View>

                    <Modal
                        transparent
                        animationType='fade'
                        visible={visibleProd}
                        onRequestClose={() => setVisibleProd(false)}>
                        <View style={styles.modalInfo}>
                            <View style={styles.modalContent}>

                                <View style={styles.modalCabecera}>
                                    <Text>Información:</Text>
                                    <Pressable onPress={() => setVisibleProd(false)}>
                                        <Text style={styles.cerrar}>X</Text>
                                    </Pressable>
                                </View>

                                <Text style={styles.textoInfo}>Se debe seleccionar una opción del listado en caso de no visualizar
                                    una que corresponda, se podrá intoducir una nueva opción intoduciendo el nombre y pulsando
                                    'Añadir clase de producto'
                                </Text>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.dobleFila}>
                    <View style={styles.objeto}>
                        <View style={styles.fila}>
                            <Text style={styles.texto}>Unidades</Text>
                        </View>
                        <TextInput
                            placeholder='0'
                            style={styles.textInput}
                            value={txtUnidades}
                            keyboardType="decimal-pad"
                            onChangeText={setTextUnidades} />
                    </View>

                    <View style={styles.objeto}>
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

            <View style={styles.divider} />

            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                    {
                        total.toLocaleString(
                            'es-ES',
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        )
                    }€

                </Text>

            </View>

            <TouchableOpacity
                style={styles.buttonGuardar}
                onPress={guardarGasto}>
                <Text style={styles.textGuardar}>Guardar producto</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonCancelar}
                onPress={cancelarProducto}>
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
    picker: {
        width: '100%',
        height: 47,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    texto: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
        fontWeight: '500'
    },
    objeto: {
        flex: 1
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