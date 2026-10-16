import { API_URL } from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getIngresosTotales() {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/ingresosTotales`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Error al obtener los ingresos");
  }

  return await response.json();
}

export async function getGastosTotales() {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/gastossTotales`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Error al obtener los gastos");
  }

  return await response.json();
}

export async function getGraficaCampos() {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/graficaCampos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await response.json();
  console.log("RESPUESTA REAL:", data);

  if (!response.ok) {
    throw new Error("Error al obtener los grafica campos");
  }

  return data;
}

export async function getDesgloseGastos(codCampo) {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/desgloseGastos?codCampo=${codCampo}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await response.json();
  console.log("RESPUESTA REAL:", data);

  if (!response.ok) {

    throw new Error("Error al obtener el desglose de gastos por campo");
  }

  return data;
}