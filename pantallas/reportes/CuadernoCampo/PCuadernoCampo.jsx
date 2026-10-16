import { View, Text, StyleSheet, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default function PCuadernoCampo({ navigation }) {

  return (
    <ScrollView style={styles.container}
      contentContainerStyle={styles.contenido}
      showsVerticalScrollIndicator={false}>
      <View style={styles.cards}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>ANOTACIONES</Text>
          <Text style={styles.cardValue}>{}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>PARCELAS</Text>
          <Text style={styles.cardValue}>{}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EB'
  },
  contenido: {
    padding: 12,
    paddingBottom: 40,
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    padding: 10,
  },
  card: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e2da",
  },
  cardTitle: {
    color: "#99998f",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  cardValue: {
    fontSize: 34,
    fontWeight: "800",
    marginVertical: 8,
    color: "#25262b",
  },
})