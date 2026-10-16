import { StyleSheet, View, Text, Pressable, Modal, Platform, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { getTerceros } from '../../../src/services/usuariosServices';
import { getTareas } from '../../../src/services/tareasService';
import { getActivosCliente } from '../../../src/services/activosService';
import Toast from 'react-native-toast-message';

export default function PAñadirTarea({ navigation, route }) {
    const tareaEditar = route.params?.tarea;

    const formateFecha = (fecha) => {
        if (!fecha) return '';
        const d = new Date(fecha);
        return d.toLocaleDateString('es-ES');
    };

    const [date, setDate] = useState(
        tareaEditar?.fechaTarea ? new Date(tareaEditar.fechaTarea) : null
    );
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [terceros, setTerceros] = useState([]);
    const [selTercero, setSelTercero] = useState(null);
    const [openTerceros, setOpenTerceros] = useState(false);

    const [tareas, setTareas] = useState([]);
    const [selTarea, setSelTarea] = useState(null);
    const [openTareas, setOpenTareas] = useState(false);

    const [activos, setActivos] = useState([]);
    const [selActivo, setSelActivo] = useState(null);
    const [openActivos, setOpenActivos] = useState(false);

    const [txtHoras, setTxtHoras] = useState(String(tareaEditar?.txtHoras ?? ''));

    const obtenerTerceros = async () => {
        try {
            const data = await getTerceros();
            setTerceros(Array.isArray(data) ? data : [])
        } catch (error) {
            console.log('Error al recoger terceros:', error)
        }
    }

    const obtenerTareas = async () => {
        try {
            const data = await getTareas();
            setTareas(Array.isArray(data) ? data : [])
        } catch (error) {
            console.log('Error al recoger terceros:', error)
        }
    }

    const obtenerActivos = async () => {
        try {
            const data = await getActivosCliente();
            setActivos(Array.isArray(data) ? data : [])
        } catch (error) {
            console.log('Error al recoger terceros:', error)
        }
    }

    const guardarTarea = () => {
        console.log(selTarea?.usaActivo)
        if (!selTercero) {
            mostrarError('Se debe selecionar un Terecero')
            return
        }

        if (!selTarea) {
            mostrarError('Se debe selecionar una Tarea')
            return
        }

        if (selTarea?.usaActivo && !selActivo) {
            mostrarError('Se debe seleccionar un Activo')
            return
        }

        const tarea = {
            codTercero: selTercero?.codTercero,
            nomTercero: selTercero?.nomTercero,
            codTarea: selTarea?.codTarea,
            nomTarea: selTarea?.nomTarea,
            usaActivo: selTarea?.usaActivo,
            codActivo: selActivo?.codActivo,
            nomActivo: selActivo?.nomActivo,
            txtHoras: txtHoras,
            fechaTarea: date ? date.toISOString() : null,
        };

        if (route.params?.index !== undefined) {
            route.params?.onUpdate?.(route.params.index, tarea);
        } else {
            route.params?.onAdd?.(tarea);
        }

        navigation.goBack();
    };

    const onChangeFecha = (event, selectedDate) => {
        setShowDatePicker(false);

        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const mostrarError = (mensaje) => {
        Toast.show({
            type: 'error',
            text1: mensaje,
            visibilityTime: 2000,
        });
    }

    useEffect(() => {
        obtenerTerceros();
    }, []);

    useEffect(() => {
        obtenerTareas();
    }, []);

    useEffect(() => {
        obtenerActivos();
    }, []);

    useEffect(() => {
        if (tareaEditar && terceros.length > 0) {

            const terceroEncontrado = terceros.find(
                tercero =>
                    String(tercero.codTercero) ===
                    String(tareaEditar.codTercero)
            );

            if (terceroEncontrado) {
                setSelTercero(terceroEncontrado);
            }
        }
    }, [tareaEditar, terceros]);


    useEffect(() => {
        if (tareaEditar && tareas.length > 0) {

            const tareaEncontrada = tareas.find(
                tarea =>
                    String(tarea.codTarea) ===
                    String(tareaEditar.codTarea)
            );

            if (tareaEncontrada) {
                setSelTarea(tareaEncontrada);
            }
        }
    }, [tareaEditar, tareas]);


    useEffect(() => {
        if (tareaEditar && activos.length > 0) {

            const activoEncontrado = activos.find(
                activo =>
                    String(activo.codActivo) ===
                    String(tareaEditar.codActivo)
            );

            if (activoEncontrado) {
                setSelActivo(activoEncontrado);
            }
        }
    }, [tareaEditar, activos]);

    const usoActivo = selTarea?.usaActivo;

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">

            <View style={styles.card}>

                <View style={[styles.objeto, { zIndex: 3000 }]}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Tercero</Text>
                    </View>

                    <View style={styles.pickerContainer}>
                        <DropDownPicker
                            open={openTerceros}
                            setOpen={setOpenTerceros}

                            value={
                                selTercero?.codTercero != null
                                    ? String(selTercero.codTercero)
                                    : null
                            }

                            items={terceros.map((tercero) => ({
                                label: tercero.nomTercero,
                                value: String(tercero.codTercero),
                            }))}

                            setValue={(callback) => {
                                const valorActual =
                                    selTercero?.codTercero != null
                                        ? String(selTercero.codTercero)
                                        : null;

                                const codTercero = callback(valorActual);

                                if (!codTercero) {
                                    setSelTercero(null);
                                    return;
                                }

                                const terceroEncontrado = terceros.find(
                                    tercero =>
                                        String(tercero.codTercero) === String(codTercero)
                                );

                                setSelTercero(terceroEncontrado ?? null);
                            }}

                            placeholder="Seleccione un tercero"

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
                        <Text style={styles.texto}>Tarea realizada</Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        <DropDownPicker
                            open={openTareas}
                            setOpen={setOpenTareas}

                            value={
                                selTarea?.codTarea != null
                                    ? String(selTarea.codTarea)
                                    : null
                            }

                            items={tareas.map((tarea) => ({
                                label: tarea.nomTarea,
                                value: String(tarea.codTarea),
                            }))}

                            setValue={(callback) => {
                                const valorActual =
                                    selTarea?.codTarea != null
                                        ? String(selTarea.codTarea)
                                        : null;

                                const codTarea = callback(valorActual);

                                if (!codTarea) {
                                    setSelTarea(null);
                                    return;
                                }

                                const tareaEncontrado = tareas.find(
                                    tarea =>
                                        String(tarea.codTarea) === String(codTarea)
                                );

                                setSelTarea(tareaEncontrado ?? null);
                            }}

                            placeholder="Seleccione un tercero"

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

                <View style={[styles.objeto, { zIndex: 1000 }]}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Activos</Text>
                    </View>


                    <View style={styles.pickerContainer}>
                        <DropDownPicker
                            open={openActivos}
                            setOpen={setOpenActivos}

                            value={
                                selActivo?.codActivo != null
                                    ? String(selActivo.codActivo)
                                    : null
                            }

                            items={activos.map((activo) => ({
                                label: activo.nomActivo,
                                value: String(activo.codActivo),
                            }))}

                            setValue={(callback) => {
                                const valorActual =
                                    selActivo?.codActivo != null
                                        ? String(selActivo.codActivo)
                                        : null;

                                const codActivo = callback(valorActual);

                                if (!codActivo) {
                                    setSelActivo(null);
                                    return;
                                }

                                const activoEncontrado = activos.find(
                                    activo =>
                                        String(activo.codActivo) === String(codActivo)
                                );

                                setSelActivo(activoEncontrado ?? null);
                            }}

                            disabled={!usoActivo}

                            placeholder="Seleccione un activo"

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

                <View style={styles.objeto}>
                    <View style={styles.fila}>
                        <Text style={styles.texto}>Horas dedicadas</Text>
                    </View>
                    <TextInput
                        placeholder='Indique el numero de horas'
                        style={styles.textInput}
                        value={txtHoras}
                        keyboardType="decimal-pad"
                        onChangeText={setTxtHoras} />
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
                onPress={guardarTarea}>
                <Text style={styles.textGuardar}>Guardar tarea</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonCancelar}
                onPress={() => navigation.goBack()}
            >
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