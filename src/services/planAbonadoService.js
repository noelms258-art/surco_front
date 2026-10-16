import { API_URL } from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function guardarPlanAbon(codCampo, nomCampo, plan) {
    const token = await AsyncStorage.getItem("token");
    const body = {
        codCampo: codCampo,
        nomCampo: nomCampo,
        meses: plan
    }

    const response = await fetch(`${API_URL}/planAbonado`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("RESPUESTA REAL:", data);
    if (!response.ok) {


        throw new Error("Error al insertar activos");
    }

    return data;
}

export async function getPlanAbon(codCampo) {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${API_URL}/planAbonado?codCampo=${codCampo}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Error al obtener el plan de abonado");
    }

    return await response.json();
}