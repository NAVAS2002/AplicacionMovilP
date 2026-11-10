import { createContext, useState } from 'react';

export const IdiomaContext = createContext({
  idioma: 'es',
  setIdioma: (nuevoIdioma) => {},
});

export function IdiomaProvider({ children }) {
  const [idioma, setIdioma] = useState('es');

  return (
    <IdiomaContext.Provider value={{ idioma, setIdioma }}>
      {children}
    </IdiomaContext.Provider>
  );
}