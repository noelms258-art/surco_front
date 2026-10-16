import { API_URL } from "./api";

export async function getCultivos() {
  const response = await fetch(`${API_URL}/cultivo`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("RESPUESTA REAL:", data);
    throw new Error("Error al recoger los cultivos");
  }

  return data;
}

export async function getVariedades(nomFruta) {
  const response = await fetch(`${API_URL}/${nomFruta}/variedades`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("RESPUESTA REAL:", data);
    throw new Error("Error al recoger las variedades");
  }

  return data;
}