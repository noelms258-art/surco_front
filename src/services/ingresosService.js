import { API_URL } from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getTipIngresos() {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${API_URL}/ingresos`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
    }});

    const data = await response.json();

    if (!response.ok) {
        console.log("ERROR:", data);
        throw new Error("Error al obtener los tipos de ingresos");
    }

    console.log(data);

    return data;
}

export async function insertIngresos(ingresos) {
  const token = await AsyncStorage.getItem("token");
  console.log(ingresos)
  const response = await fetch(`${API_URL}/ingresos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      ingresos: ingresos
    })
  });

  if (!response.ok) {
    const data = await response.json();

    console.log("RESPUESTA REAL:", data);
    throw new Error("Error al insertar ingresos");
  }

  return await response.json();
}
