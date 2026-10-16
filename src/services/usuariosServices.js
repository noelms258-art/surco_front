import { API_URL } from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function getCamposByUser() {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/usuarios/campos`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error("Error al obtener los campos por usuario");
  }

  return await response.json();
}

export async function getTerceros() {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/terceros`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error("Error al obtener terceros");
  }

  return await response.json();
}