import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default function PMenuPrincipal({ navigation }) {

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>

      <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.navigate("Gastos")}>

        <View style={[styles.iconContainer, styles.iconGastos]}>
          <MaterialIcons
            name="euro-symbol"
            size={23}
            color="#37653A" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textButton}>Ingresos y gastos </Text>
          <Text style={styles.description} numberOfLines={2}>
            Ventas, compras, gastos operativos, gastos...
          </Text>
        </View>

        <View style={styles.arrow}>
          <MaterialIcons
            name="chevron-right"
            size={20}
            color="#9A968C" />
        </View>
      </Pressable>

      <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.navigate("Campos")}>
        <View style={[styles.iconContainer, styles.iconCampos]}>
          <FontAwesome5
            name="tractor"
            size={21}
            color="#AB7F4B" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textButton}>Explotaciones</Text>

          <Text style={styles.description} numberOfLines={2} >
            Cumplimiento de abonado, tratamientos, tareas y plan de abonado
          </Text>
        </View>

        <View style={styles.arrow}>
          <MaterialIcons
            name="chevron-right"
            size={20}
            color="#9A968C" />
        </View>
      </Pressable>

      <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.navigate("Reportes")}>

        <View style={[styles.iconContainer, styles.iconReportes]}>
          <MaterialIcons
            name="bar-chart"
            size={25}
            color="#C99A11" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textButton}>Reportes </Text>

          <Text style={styles.description} numberOfLines={2}>
            Cuaderno de campo y reportes económicos y productivos
          </Text>
        </View>

        <View style={styles.arrow}>
          <MaterialIcons
            name="chevron-right"
            size={20}
            color="#9A968C" />
        </View>
      </Pressable>

      <View style={[styles.button, styles.buttonDisabled]}>
        <View style={[styles.iconContainer, styles.iconDatos]}>
          <Entypo
            name="folder"
            size={21}
            color="#C0BBD0" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textDisabled}> Datos </Text>
        </View>
      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1, backgroundColor: '#F7F4EB',
  },
  content: {
    paddingTop: 17, paddingBottom: 30,
  },
  button: {
    width: '92%', minHeight: 80,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 13, paddingVertical: 10,
    marginBottom: 11,
    borderWidth: 1, borderColor: '#F0ECE2',
    elevation: 2,
    shadowColor: '#000', shadowOffset: {
      width: 0, height: 2,
    }, shadowOpacity: 0.05, shadowRadius: 4,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 48, height: 48,
    borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 13,
  },
  iconGastos: {
    backgroundColor: '#E4EFE0',
  },
  iconCampos: {
    backgroundColor: '#F5EADF',
  },
  iconReportes: {
    backgroundColor: '#FDF3D6',
  },
  iconDatos: {
    backgroundColor: '#F2EFEF',
  },
  textContainer: {
    flex: 1,
  },
  textButton: {
    fontSize: 16, fontWeight: '700', color: '#1F2A24', marginBottom: 1,
  },
  description: {
    fontSize: 12, fontStyle: 'italic', color: '#918B7F', lineHeight: 16,
  },
  arrow: {
    width: 30, height: 30,
    borderRadius: 15,
    borderWidth: 1, borderColor: '#DFDBCF',
    alignItems: 'center', justifyContent: 'center',
    marginLeft: 8,
  },
  buttonDisabled: {
    backgroundColor: '#FAF8F3', elevation: 0,
    shadowOpacity: 0,
    marginBottom: 16,
  },
  textDisabled: {
    fontSize: 16, fontWeight: '700', color: '#A0A39B',
  },
  accountCard: {
    width: '92%', alignSelf: 'center',
    backgroundColor: '#FBFAF5',
    borderWidth: 1, borderColor: '#E5DFD1',
    borderRadius: 17,
    padding: 15,
  },
  accountHeader: {
    flexDirection: 'row', alignItems: 'center',
  },
  userIcon: {
    width: 36, height: 36,
    borderRadius: 10,
    backgroundColor: '#E4EFE0',
    alignItems: 'center', justifyContent: 'center',
    marginRight: 8,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 13, fontWeight: '700', color: '#1F2A24',
  },
  accountDescription: {
    fontSize: 12, color: '#918B7F', marginTop: 2,
  },
  divider: {
    height: 1, backgroundColor: '#E5DFD1',
    marginVertical: 9,
  },
  exerciseText: {
    fontSize: 12, lineHeight: 18, color: '#918B7F',
  },

});