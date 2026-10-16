import { API_URL } from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function getTareas() {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/tareas`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error("Error al obtener tareas");
  }

  return await response.json();
}

export async function insertTareas(tareas) {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/tareas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      tareas: tareas
    })
  });

  if (!response.ok) {
    const data = await response.json();

    console.log("RESPUESTA REAL:", data);
    throw new Error("Error al insertar tareas");
  }

  return await response.json();
}