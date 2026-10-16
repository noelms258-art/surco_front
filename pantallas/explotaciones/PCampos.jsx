import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { getCamposByUser } from '../../src/services/usuariosServices';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function PCampos({ navigation }) {

  const [campos, setCampos] = useState([]);

  const obtenerCampos = async () => {
    try {
      const data = await getCamposByUser();
      setCampos(Array.isArray(data) ? data : [])
    } catch (error) {
      console.log('Error en la llamada campos:', error)
    }
  }

  useEffect(() => {
    obtenerCampos();
  }, []);

  return (
    <ScrollView style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>{
        campos.map((campo, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => navigation.navigate("Campo", {
              nomCampo: campo.nomCampo, codCampo: campo.codCampo, tienePlan: campo.tienePlan, mesCierre: campo.mesCierre
            })}>
            <View style={styles.textContainer}>
              <Text style={styles.textButton}>{campo.nomCampo}</Text>

              <Text style={styles.description} numberOfLines={2} >
                {campo.nomFruta} - {campo.tamaño} - {campo.numArboles} arboles
              </Text>
            </View>

            <View style={styles.arrow}>
              <MaterialIcons
                name="chevron-right"
                size={20}
                color="#9A968C"
              />
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EB'
  },
  content: {
    paddingTop: 17,
    paddingBottom: 30,
  },

  button: {
    width: '92%',
    minHeight: 80,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 10,
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
  textContainer: {
    flex: 1,
  },
  textButton: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2A24',
  },
  arrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#DFDBCF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  description: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#918B7F',
    lineHeight: 16,
  },
})