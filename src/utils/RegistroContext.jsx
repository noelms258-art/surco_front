import { createContext, useContext, useState } from 'react';

const RegistroContext = createContext(null);

export function RegistroProvider({ children }) {
    const [datosRegistro, setDatosRegistro] = useState({});

    const actualizarRegistro = (nuevosDatos) => {
        setDatosRegistro(prev => ({
            ...prev,
            ...nuevosDatos
        }));
    };

    const limpiarRegistro = () => {
        setDatosRegistro({});
    };

    return (
        <RegistroContext.Provider value={{
            datosRegistro,
            actualizarRegistro,
            limpiarRegistro
        }}>
            {children}
        </RegistroContext.Provider>
    );
}

export const useRegistro = () => useContext(RegistroContext);