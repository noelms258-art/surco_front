import { API_URL } from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getProductos(clase) {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/${clase}/productos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
  });

  if (!response.ok) {
    const data = await response.json();

    console.log("RESPUESTA REAL:", data);
    throw new Error("Error al obtener productos");
  }

  return await response.json();
}

export async function getProductosUser() {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/productosUser`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
  });
  const data = await response.json();
  console.log("RESPUESTA REAL:", data);
  
  if (!response.ok) {
    throw new Error("Error al insertar activos");
  }

  return data;
}

export async function getProductosClases() {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/clases`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los campos");
  }

  return await response.json();
}