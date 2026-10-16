import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { getCumplimientoResumen } from '../../src/services/cumplimientoService';

export default function PCampo({ navigation, route }) {
  const [pctAnual, setPctAnual] = useState(0);
  const [pctMensual, setPctMensual] = useState(0);

  const obtenerCumplimiento = async () => {
    try {
      const data = await getCumplimientoResumen(route.params?.codCampo);
      setPctAnual(data.pct_anual ?? 0)
      setPctMensual(data.pct_mensual ?? 0)
    } catch (error) {
      console.log('Error en la llamada obtener Plan Abonado:', error);
    }
  };

  useEffect(() => {
    obtenerCumplimiento();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.boton}
        onPress={() => navigation.navigate('Cumplimiento abonado', {
          codCampo: route.params?.codCampo, nomCampo: route.params?.nomCampo, pctAnual: pctAnual, pctMensual: pctMensual, tienePlan: route.params?.tienePlan,
          mesCierre: route.params?.mesCierre
        })}>
        <View style={styles.izquierda}>
          <Text style={styles.textCumplimiento}>Cumplimiento{"\n"}abonado</Text>
        </View>
        <View style={styles.separador} />
        <View style={styles.derecha}>
          <View style={styles.fila}>
            <Text style={styles.texto}>Mes</Text>
            <Text style={styles.valor}>{pctMensual}%</Text>
          </View>
          <View style={styles.fila}>
            <Text style={styles.texto}>Año</Text>
            <Text style={styles.valor}>{pctAnual}%</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Tratamientos', {
          codCampo: route.params?.codCampo, nomCampo: route.params?.nomCampo, tienePlan: route.params?.tienePlan,
          mesCierre: route.params?.mesCierre
        })}
        style={styles.card}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="bottle-tonic-outline" size={25} color="#B7834A" />
        </View>
        <Text style={styles.textCard}>Tratamientos</Text>
        <View style={styles.arrow}>
          <Ionicons name="chevron-forward" size={17} color="#9A968C" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Tareas', {
          codCampo: route.params?.codCampo, nomCampo: route.params?.nomCampo, tienePlan: route.params?.tienePlan, mesCierre: route.params?.mesCierre
        })}
        style={styles.card}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="chart-timeline-variant" size={25} color="#B7834A" />
        </View>
        <Text style={styles.textCard}>Tareas</Text>
        <View style={styles.arrow}>
          <Ionicons name="chevron-forward" size={17} color="#9A968C" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Plan abonado', {
          codCampo: route.params?.codCampo, nomCampo: route.params?.nomCampo, tienePlan: route.params?.tienePlan, mesCierre: route.params?.mesCierre
        })}
        style={styles.card}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="table-large" size={25} color="#B7834A" />
        </View>
        <Text style={styles.textCard}>Plan de abonado</Text>
        <View style={styles.arrow}>
          <Ionicons name="chevron-forward" size={17} color="#9A968C" />
        </View>
      </TouchableOpacity>

      <View style={styles.infoCard}>
  <View style={styles.infoFila}>
    <Text style={styles.infoLabel}>Cultivo</Text>
    <Text style={styles.infoValor}>{route.params?.cultivo ?? '-'}</Text>
  </View>

  <View style={styles.infoFila}>
    <Text style={styles.infoLabel}>Superficie</Text>
    <Text style={styles.infoValor}>{route.params?.superficie ?? '-'}</Text>
  </View>

  <View style={styles.infoFila}>
    <Text style={styles.infoLabel}>Árboles</Text>
    <Text style={styles.infoValor}>{route.params?.arboles ?? '-'}</Text>
  </View>

  <View style={styles.infoFila}>
    <Text style={styles.infoLabel}>Referencia catastral</Text>
    <Text style={styles.infoValor}>{route.params?.referenciaCatastral ?? '-'}</Text>
  </View>

  <View style={styles.infoFila}>
    <Text style={styles.infoLabel}>Recinto SIGPAC</Text>
    <Text style={styles.infoValor}>{route.params?.sigpac ?? '-'}</Text>
  </View>

  <View style={[styles.infoFila, styles.infoFilaFinal]}>
    <Text style={styles.infoLabel}>Régimen</Text>
    <Text style={styles.infoValor}>{route.params?.regimen ?? '-'}</Text>
  </View>
</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EB',
  },
  content: {
    paddingTop: 17,
    paddingBottom: 30,
  },
  izquierda: {
    flex: 1
  },
  derecha: {
    width: 65
  },
  boton: {
    width: '92%',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    marginBottom: 11,
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
  separador: {
    width: 1,
    height: 43,
    backgroundColor: '#E5DFD1',
    marginHorizontal: 12
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2
  },
  texto: {
    fontSize: 12,
    color: '#918B7F',
  },
  valor: {
    fontSize: 12,
    fontWeight: '700',
    color: '#37653A',
  },
  textCumplimiento: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2A24',
  },
  card: {
    width: '92%',
    minHeight: 77,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 10,
    alignSelf: 'center',
    marginBottom: 11,
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
  textCard: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2A24',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F5EADF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  arrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#DFDBCF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCard: {
  width: '92%',
  alignSelf: 'center',
  backgroundColor: '#FBFAF5',
  borderRadius: 17,
  borderWidth: 1,
  borderColor: '#E5DFD1',
  paddingHorizontal: 15,
  paddingVertical: 10,
  marginTop: 3,
},

infoFila: {
  minHeight: 37,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottomWidth: 1,
  borderBottomColor: '#EEE8DC',
},

infoFilaFinal: {
  borderBottomWidth: 0,
},

infoLabel: {
  fontSize: 13,
  color: '#1F2A24',
},

infoValor: {
  flex: 1,
  fontSize: 13,
  color: '#1F2A24',
  textAlign: 'right',
  marginLeft: 15,
},
})