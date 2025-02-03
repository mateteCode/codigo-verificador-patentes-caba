const tablaLetras: { [key: string]: string } = {
  A: '14', B: '01', C: '00', D: '16', E: '05', F: '20',
  G: '19', H: '09', I: '24', J: '07', K: '21', L: '08',
  M: '04', N: '13', O: '25', P: '22', Q: '18', R: '10',
  S: '02', T: '06', U: '12', V: '23', W: '11', X: '03',
  Y: '15', Z: '17'
};

export function validarPatente(patente: string): boolean {
  const formato1 = /^[A-Za-z]{3}\d{3}$/;
  const formato2 = /^[A-Za-z]{2}\d{3}[A-Za-z]{2}$/;
  
  return formato1.test(patente) || formato2.test(patente);
}


export function calcularDigitoVerificador(patente: string): string {
  const patenteNumerica = patente.toUpperCase().split('').reduce((total, caracter) => {
    if (/[A-Z]/.test(caracter)) {
      return total + tablaLetras[caracter];
    }
    return total + caracter;
  }, "");

  let sumaPar = 0;
  let sumaImpar = 0;

  const arrayPatenteNumerica = Array.from(patenteNumerica)

  arrayPatenteNumerica.reverse().forEach((valor, index) => {
    if (index % 2 === 0) {
      sumaImpar += parseInt(valor);
    } else {
      sumaPar += parseInt(valor);
    }
  });

  sumaPar = reducirADigito(sumaPar);
  sumaImpar = reducirADigito(sumaImpar);

  return `${sumaImpar}${sumaPar}`;
}

function reducirADigito(numero: number): number {
  while (numero >= 10) {
    numero = numero.toString().split('').reduce((sum, digito) => sum + parseInt(digito), 0);
  }
  return numero;
}