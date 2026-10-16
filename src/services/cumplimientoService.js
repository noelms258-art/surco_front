import { API_URL } from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getCumplimientoResumen(codCampo) {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/cumplimiento/resumen?codCampo=${codCampo}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("RESPUESTA REAL:", data);
    throw new Error("Error al obtener los productos faltantes de cumplimiento: ");
  }


  return data;
}

export async function getCumplimientoTotal(codCampo) {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/cumplimiento/total?codCampo=${codCampo}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  },
  );

  const data = await response.json();

  if (!response.ok) {
    console.log("RESPUESTA REAL:", data);
    throw new Error("Error al obtener los productos faltantes de cumplimiento: ");
  }


  return data;
}

export async function getCumplimientoMacros(codCampo) {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/cumplimiento/macros?codCampo=${codCampo}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("RESPUESTA REAL:", data);
    throw new Error("Error al obtener las macros faltantes de cumplimiento: ");
  }

  console.log("RESPUESTA REAL:", data);


  return data;
}

export async function getCumplimientoProductos(codCampo) {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/cumplimiento/productos?codCampo=${codCampo}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("RESPUESTA REAL:", data);
    throw new Error("Error al obtener los macros faltantes de cumplimiento: ");
  }

  console.log("RESPUESTA REAL:", data);


  return data;
}