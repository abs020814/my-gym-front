import React from 'react';

function DiasSemana({ iniciales }) {
  const dias = {
    L: 'lunes',
    M: 'martes',
    X: 'miércoles',
    J: 'jueves',
    V: 'viernes',
    S: 'sábado',
    D: 'domingo',
  };

  // Dividimos las iniciales en un array
  const inicialesArray = iniciales.split('');

  // Mapeamos el array de iniciales a un array de nombres de días
  const nombresDias = inicialesArray.map(inicial => dias[inicial]);

  // Unimos los nombres de días con comas y la última conjunción
  const cadenaFinal = nombresDias.join(', ').replace(/, ([^,]*)$/, ' y $1');

  return <div>{cadenaFinal}</div>;
}
export default DiasSemana