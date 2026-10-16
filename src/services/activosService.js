import { API_URL } from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getActivos() {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/activos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Error al obtener los activos");
  }

  return await response.json();
}

export async function insertActivos(activos) {
  const token = await AsyncStorage.getItem("token");
  console.log(activos)
  const response = await fetch(`${API_URL}/activos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      activos: activos
    })
  });

  if (!response.ok) {
    const data = await response.json();

    console.log("RESPUESTA REAL:", data);
    throw new Error("Error al insertar activos");
  }

  return await response.json();
}

export async function getActivosCliente() {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/activosCliente`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Error al obtener los activos");
  }

  return await response.json();
}