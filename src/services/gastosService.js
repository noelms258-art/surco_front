import { API_URL } from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function insertGastosAgricolas(productos) {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/insert/gastosProd`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      gastosAgricolas: productos
    })
  });

  if (!response.ok) {
    const data = await response.json();

    console.log("RESPUESTA REAL:", data);
    throw new Error("Error al insertar gastos");
  }

  return await response.json();
}


export async function getTipGastos(clase) {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/${clase}/claseGasto`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Error al obtener los gastos opeativos");
  }

  return await response.json();
}

export async function getGastosClase(clase) {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}/${clase}/gastos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Error al obtener los gastos opeativos");
  }

  return await response.json();
}

export async function insertGastos(gastos) {
  const token = await AsyncStorage.getItem("token");
  console.log(gastos)
  const response = await fetch(`${API_URL}/insert/gastos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      gastos: gastos
    })
  });

  if (!response.ok) {
    const data = await response.json();

    console.log("RESPUESTA REAL:", data);
    throw new Error("Error al insertar gastos");
  }

  return await response.json();
}