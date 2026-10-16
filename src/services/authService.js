import { API_URL } from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getAuth(txtEmail, txtPass) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: txtEmail.toLowerCase(),
      password: txtPass
    })
  });

  if (!response.ok) {
    const data = await response.json();

    console.log("RESPUESTA REAL:", data);
    throw new Error("Error al autorizarse");
  }

  const final = await response.json();
  await AsyncStorage.setItem('token', final.token);

  return final;
}