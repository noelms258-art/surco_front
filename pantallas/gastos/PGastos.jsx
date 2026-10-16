import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal, Pressable, ScrollView } from 'react-native';
import { FontAwesome6, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function PGastos({ navigation, route }) {

  const [visible, setVisible] = useState(false);
  const [tostVis, setToastVis] = useState(false);

  useEffect(() => {
    if (route.params?.guardado) {
      setToastVis(true);
      const timer = setTimeout(() => {
        setToastVis(false);
        navigation.setParams({ guardado: false });
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [route.params?.guardado, navigation]);

  return (
    <ScrollView style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>

      <Text style={styles.title}>Gastos</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Gastos Agricolas')}>
        <View style={[styles.iconContainer, styles.iconGastos]}>
          <MaterialCommunityIcons
            name="bottle-tonic-outline"
            size={25}
            color="#37653A"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textButton}>Gastos agrícolas</Text>

          <Text style={styles.description} numberOfLines={2} >
            Compra de productos para su futura aplicación
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

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Gastos Operativos')}>
        <View style={[styles.iconContainer, styles.iconGastos]}>
          <MaterialCommunityIcons
            name="water-outline"
            size={27}
            color="#37653A"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textButton}>Gastos operativos</Text>

          <Text style={styles.description} numberOfLines={2} >
            Gastos derivados de la operativa de gestión agrícola
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

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Gastos Administrativos')}>
        <View style={[styles.iconContainer, styles.iconGastos]}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={25}
            color="#37653A" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textButton}>Gastos administrativos</Text>

          <Text style={styles.description} numberOfLines={2} >
            Gastos derivados de la geatión administrativa
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


      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Compra de activos')}>
        <View style={[styles.iconContainer, styles.iconGastos]}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={25}
            color="#37653A" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textButton}>Compra de activos</Text>

          <Text style={styles.description} numberOfLines={2} >
            Adquisición de bienes utilizados para la explotación ágricola
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


      <Text style={styles.title}>Ingresos</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Ingresos')}>
        <View style={[styles.iconContainer, styles.iconGastos]}>
          <MaterialIcons
            name="euro-symbol"
            size={23}
            color="#37653A" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textButton}>Ingresos</Text>

          <Text style={styles.description} numberOfLines={2} >
            Ingresos por la venta de cultivo y otros conceptos
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
  iconContainer: {
    width: 48, height: 48,
    borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 13,
  },
  title: {
    width: '92%',
    alignSelf: 'center',
    fontSize: 21,
    fontWeight: '700',
    color: '#37653A',
    marginTop: 22,
    marginBottom: 12,
  },
  iconGastos: {
    backgroundColor: '#E4EFE0',
  },
})