import { API_URL } from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function insertTratamiento(tratamientos, codCampo) {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/tratamientos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      tratamientos: tratamientos,
      campo: codCampo
    })
  });

  if (!response.ok) {
    const data = await response.json();

    console.log("RESPUESTA REAL:", data);
    throw new Error("Error al insertar activos");
  }

  return await response.json();
}