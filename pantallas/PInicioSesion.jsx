import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { getAuth } from '../src/services/authService';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function PInicioSesion({ navigation }) {

  const [textUsu, setTextUsu] = useState('');
  const [textCon, setTextCon] = useState('');

  const [mostrarPassword, setMostrarPassword] = useState(false);

  const acceder = async () => {
    try {
      const data = await getAuth(textUsu, textCon);
      navigation.navigate("Menu Principal");
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Usuario o contraseña incorrectos',
        visibilityTime: 2000,
      });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.text}>Usuario</Text>
      <TextInput
        placeholder='Introduce tu usuario'
        style={styles.textInput}
        value={textUsu}
        onChangeText={setTextUsu} />

      <Text style={styles.text}>Contraseña</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder='Introduce tu contraseña'
          style={styles.textInput}
          secureTextEntry={!mostrarPassword}
          value={textCon}
          onChangeText={setTextCon} />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setMostrarPassword(!mostrarPassword)}>
          <Ionicons
            name={mostrarPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={acceder}
      >
        <Text style={styles.textButton}>Acceder</Text>
      </TouchableOpacity>


      <View style={styles.opcionesContainer}>
        <TouchableOpacity
          style={styles.opcion}
          onPress={() => navigation.navigate('Recuperar Contraseña')}>
          <Text style={styles.textOpcion}>¿Ha olvidado tu contraseña?</Text>
        </TouchableOpacity>

        <View style={styles.separador} />

        <TouchableOpacity
          style={styles.opcion}
          onPress={() => navigation.navigate('Registro usuario')}>
          <Text style={styles.textOpcion}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>


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
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: '500'
  },
  textInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center'
  },
  button: {
    width: '70%',
    backgroundColor: '#C19A6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  textButton: {
    color: '#fff',
    fontWeight: 'blod'
  },
  passwordContainer: {
    position: 'relative',
    width: '100%'
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },

  opcionesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    paddingHorizontal: 10,
  },
  opcion: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  textOpcion: {
    fontSize: 14,
    color: '#000',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  separador: {
    width: 2,
    height: 42,
    backgroundColor: '#35633E',
    marginHorizontal: 12,
  },

})