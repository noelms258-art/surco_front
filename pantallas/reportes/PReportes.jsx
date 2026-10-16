import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function PReportes({ navigation }) {

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed
        ]}
        onPress={() => navigation.navigate("Reportes ecónomicos")}
      >

        <View style={[styles.iconContainer, styles.iconReportes]}>
          <MaterialIcons
            name="bar-chart"
            size={25}
            color="#C99A11"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textButton}>
            Reportes ecónomicos
          </Text>
        </View>

        <View style={styles.arrow}>
          <MaterialIcons
            name="chevron-right"
            size={20}
            color="#9A968C"
          />
        </View>

      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed
        ]}
        onPress={() => navigation.navigate("Cuaderno de campo")}
      >

        <View style={[styles.iconContainer, styles.iconReportes]}>
          <MaterialIcons
            name="bar-chart"
            size={25}
            color="#C99A11"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textButton}>
            Cuaderno de campo
          </Text>
        </View>

        <View style={styles.arrow}>
          <MaterialIcons
            name="chevron-right"
            size={20}
            color="#9A968C"
          />
        </View>

      </Pressable>

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

  buttonPressed: {
    opacity: 0.7,
  },

  iconContainer: {
    width: 48,
    height: 48,

    borderRadius: 14,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 13,
  },

  iconReportes: {
    backgroundColor: '#FDF3D6',
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

});