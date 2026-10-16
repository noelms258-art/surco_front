import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import { getProductos } from '../../../src/services/productosService';
import { getPlanAbon } from '../../../src/services/planAbonadoService';
import DropDownPicker from 'react-native-dropdown-picker';
import { guardarPlanAbon } from '../../../src/services/planAbonadoService';

export default function PEditarPlanAbonado({ navigation, route }) {

  const [tabActiva, setTabActiva] = useState('productos');
  const [digProduct, setDigProduct] = useState(false);

  const [mesSeleccionado, setMesSeleccionado] = useState(null);
  const [selProd, setSelProd] = useState('');
  const [valorProd, setValorProd] = useState([]);
  const [cantidad, setCantidad] = useState('');
  const [mesAbierto, setMesAbierto] = useState(null);
  const [meses, setMeses] = useState([]);

  const [openProd, setOpenProd] = useState(false);

  const crearPlanInicial = (listaMeses) => {
    const base = {};

    listaMeses.forEach((mes) => {
      base[mes] = {
        productos: [],
        nutrientes: {
          nitrogeno: '',
          fosforo: '',
          potasio: '',
          calcio: '',
          hierro: '',
          zinc: '',
          manganeso: '',
          cobre: ''
        },
      };
    });

    return base;
  };

  const [plan, setPlan] = useState({});

  const obtenerProductos = async () => {
    try {
      const data = await getProductos('ABONO');
      setValorProd(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log('Error en la llamada productos:', error);
    }
  };

  const obtenerPlanAbonado = async () => {
    try {
      const data = await getPlanAbon(route.params?.codCampo);
      const mesesOrdenados = Object.keys(data);

      const planNormalizado = crearPlanInicial(mesesOrdenados);

      mesesOrdenados.forEach((mes) => {
        const mesData = data?.[mes];

        if (!mesData) return;

        planNormalizado[mes] = {
          productos: Array.isArray(mesData.productos) ? mesData.productos : [],
          nutrientes: {
            nitrogeno: mesData.nutrientes?.nitrogeno != null ? String(mesData.nutrientes.nitrogeno) : '',
            fosforo: mesData.nutrientes?.fosforo != null ? String(mesData.nutrientes.fosforo) : '',
            potasio: mesData.nutrientes?.potasio != null ? String(mesData.nutrientes.potasio) : '',
            calcio: mesData.nutrientes?.calcio != null ? String(mesData.nutrientes.calcio) : '',
            hierro: mesData.nutrientes?.hierro != null ? String(mesData.nutrientes.hierro) : '',
            zinc: mesData.nutrientes?.zinc != null ? String(mesData.nutrientes.zinc) : '',
            manganeso: mesData.nutrientes?.manganeso != null ? String(mesData.nutrientes.manganeso) : '',
            cobre: mesData.nutrientes?.cobre != null ? String(mesData.nutrientes.cobre) : '',
          },
        };
      });

      setPlan(planNormalizado);
      setMeses(mesesOrdenados);
    } catch (error) {
      console.log('Error en la llamada productos:', error);
    }
  };

   const guardarPlan = async () => {
      try {
        const data = await guardarPlanAbon(route.params?.codCampo, route.params?.nomCampo, plan);
        Toast.show({
          type: 'success',
          text1: 'Plan guardado',
          text2: 'Se ha guardado correctamente',
          visibilityTime: 2000,
        });

      } catch (error) {
        console.log('No se podido insertar en plan de abonados:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No se pudo guardar el plan',
          visibilityTime: 3000,
        });
      }
      navigation.goBack()
    }

  useEffect(() => {
    obtenerProductos();
  }, []);

  useEffect(() => {
    obtenerPlanAbonado();
  }, []);

  const openDialogProduct = (mes) => {
    setMesSeleccionado(mes);
    setSelProd('');
    setCantidad('');
    setDigProduct(true);
  };

  const closeDialogProduct = () => {
    setDigProduct(false);
  };

  const toggleMes = (mes) => {
    setMesAbierto((prev) => (prev === mes ? null : mes));
  };

  const guardarMes = () => {
    if (!mesSeleccionado || !selProd || !cantidad) return;

    const productoSeleccionado = valorProd.find(
      (prod) => String(prod.codProd) === String(selProd)
    );

    if (!productoSeleccionado) return;

    const nuevoProd = {
      codProd: productoSeleccionado.codProd,
      nomProd: productoSeleccionado.nomProd,
      cant: cantidad,
    };

    setPlan((prev) => ({
      ...prev,
      [mesSeleccionado]: {
        ...prev[mesSeleccionado],
        productos: [...prev[mesSeleccionado].productos, nuevoProd],
      },
    }));

    setDigProduct(false);
    setMesSeleccionado(null);
    setSelProd('');
    setCantidad('');
  };

  const actualizaNutr = (mes, campo, valor) => {
    setPlan((prev) => ({
      ...prev,
      [mes]: {
        ...prev[mes],
        nutrientes: {
          ...prev[mes].nutrientes,
          [campo]: valor
        }
      }
    }))
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, tabActiva === 'productos' && styles.tabActiva]}
          onPress={() => setTabActiva('productos')}
        >
          <Text style={[styles.textoTab, tabActiva === 'productos' && styles.textoTabActivo]}>
            Productos
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, tabActiva === 'nutrientes' && styles.tabActiva]}
          onPress={() => setTabActiva('nutrientes')}
        >
          <Text style={[styles.textoTab, tabActiva === 'nutrientes' && styles.textoTabActivo]}>
            Nutrientes
          </Text>
        </Pressable>
      </View>

      <View style={styles.contenido}>
        {meses.map((mes, index) => (
          <View key={index} style={styles.accordion}>
            <Pressable style={styles.accordionHeader} onPress={() => toggleMes(mes)}>
              <Text style={styles.tituloMes}>{mes}</Text>
              <Text style={styles.iconoAccordion}>
                {mesAbierto === mes ? '−' : '+'}
              </Text>
            </Pressable>

            {mesAbierto === mes && (
              <View style={styles.accordionBody}>
                {tabActiva === 'productos' && (
                  <View>
                    {(plan[mes]?.productos || []).map(
                      (item, i) => (
                      <TouchableOpacity key={i} style={styles.card}>
                        <Text style={styles.texto}>
                          {item.nomProd} - {item.cant}
                        </Text>
                      </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => openDialogProduct(mes)}
                    >
                      <Text style={styles.addButtonText}>+ Añadir producto</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {tabActiva === 'nutrientes' && (
                  <View>
                    <View style={styles.fila}>
                      <Text>Macronutrientres</Text>
                      <Text>Mg / Hg</Text>
                    </View>
                    <View style={styles.fila}>
                      <Text> Fósforo (P)</Text>
                      <TextInput
                        style={styles.inputPequeno}
                        value={plan[mes]?.nutrientes?.fosforo ?? ''}
                        onChangeText={(value) => actualizaNutr(mes, 'fosforo', value)}
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={styles.fila}>
                      <Text> Nitrógeno (N)</Text>
                      <TextInput
                        style={styles.inputPequeno}
                        value={plan[mes]?.nutrientes?.nitrogeno ?? ''}
                        onChangeText={(value) => actualizaNutr(mes, 'nitrogeno', value)}
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={styles.fila}>
                      <Text> Potasio (K)</Text>
                      <TextInput
                        style={styles.inputPequeno}
                        value={plan[mes]?.nutrientes?.potasio ?? ''}
                        onChangeText={(value) => actualizaNutr(mes, 'potasio', value)}
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={styles.fila}>
                      <Text> Calcio (Ca)</Text>
                      <TextInput
                        style={styles.inputPequeno}
                        value={plan[mes]?.nutrientes?.calcio ?? ''}
                        onChangeText={(value) => actualizaNutr(mes, 'calcio', value)}
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={styles.fila}>
                      <Text>Micronutrientres</Text>
                      <Text>Mg / Hg</Text>
                    </View>
                    <View style={styles.fila}>
                      <Text> Hierro (Fe)</Text>
                      <TextInput
                        style={styles.inputPequeno}
                        value={plan[mes]?.nutrientes?.hierro ?? ''}
                        onChangeText={(value) => actualizaNutr(mes, 'hierro', value)}
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={styles.fila}>
                      <Text> Zinc (Zn)</Text>
                      <TextInput
                        style={styles.inputPequeno}
                        value={plan[mes]?.nutrientes?.zinc ?? ''}
                        onChangeText={(value) => actualizaNutr(mes, 'zinc', value)}
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={styles.fila}>
                      <Text> Manganeso (Mn)</Text>
                      <TextInput
                        style={styles.inputPequeno}
                        value={plan[mes]?.nutrientes?.manganeso ?? ''}
                        onChangeText={(value) => actualizaNutr(mes, 'manganeso', value)}
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={styles.fila}>
                      <Text> Cobre (Cu)</Text>
                      <TextInput
                        style={styles.inputPequeno}
                        value={plan[mes]?.nutrientes?.cobre ?? ''}
                        onChangeText={(value) => actualizaNutr(mes, 'cobre', value)}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        ))}
      </View>

      <Modal
        visible={digProduct}
        transparent
        animationType="slide"
        onRequestClose={closeDialogProduct}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Agregar producto</Text>

            <Text style={styles.label}>Clase de producto</Text>
            <View style={[styles.pickerContainer, { zIndex: 3000 }]}>
              <DropDownPicker
                open={openProd}
                setOpen={setOpenProd}

                value={selProd || null}

                items={valorProd.map((prod) => ({
                  label: String(prod.nomProd),
                  value: String(prod.codProd),
                }))}

                setValue={setSelProd}

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
                dropDownDirection="AUTO"
                listMode="SCROLLVIEW"
              />
            </View>

            <View style={{ zIndex: 1 }}>
              <Text style={styles.label}>Cantidad utilizada</Text>
              <TextInput
                style={styles.input}
                value={cantidad}
                onChangeText={setCantidad}
                placeholder="Ingrese cantidad"
                keyboardType="numeric"
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.cancelButton} onPress={closeDialogProduct}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton} onPress={guardarMes}>
                  <Text style={styles.saveButtonText}>Guardar producto</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.button}
        onPress={guardarPlan}>
        <Text style={styles.textButton}>Guardar plan</Text>
      </TouchableOpacity>
      <Toast />
    </ScrollView >
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
  tabs: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d8d8d8',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tab: {
    width: 105,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  tabActiva: {
    backgroundColor: '#78B77B',
  },
  textoTab: {
    color: '#999',
    fontSize: 12,
  },
  textoTabActivo: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  contenido: {
    marginTop: 0,
  },
  accordion: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D5D5D5',
    marginBottom: 6,
    overflow: 'hidden',
    elevation: 1,
  },
  accordionHeader: {
    minHeight: 43,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  accordionBody: {
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  tituloMes: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#276A37',
  },
  iconoAccordion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4E9A58',
    minWidth: 23,
    height: 23,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
  },
  texto: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '600',
    marginBottom: 0,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 7,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 2,
  },
  addButton: {
    backgroundColor: '#4E7D4E',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    backgroundColor: '#DDF0DF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  textButton: {
    color: '#17652B',
    fontSize: 13,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#C19A6B',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputPequeno: {
    width: 55,
    height: 30,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 14,
    backgroundColor: '#fff',
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    textAlignVertical: 'center',
    paddingVertical: 0,
  },
});