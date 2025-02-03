import { useState } from 'react';
import { calcularDigitoVerificador, validarPatente } from './helpers/agip-patente';



const FormularioPatente: React.FC = () => {
  const [patente, setPatente] = useState<string>('');
  const [digitoVerificador, setDigitoVerificador] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarPatente(patente)) {
      setError('La patente debe tener uno de los siguientes formatos: ABC123 o AB123CD.');
      setDigitoVerificador('');
      return;
    }

    setError('');
    //const digito = calcularDigitoVerificador(patente.replace(/[A-Za-z]/g, '0'));
    const digito = calcularDigitoVerificador(patente);
    setDigitoVerificador(digito);
  };

  return (
    <div className='calculator-container'>
      <h2>Calculadora de Dígito Verificador de patentes radicadas en CABA</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Ingrese la patente:
          <input
            type="text"
            value={patente}
            onChange={(e) => setPatente(e.target.value.toUpperCase())}
            minLength={6}
            maxLength={7}
          />
        </label>
        <button type="submit">Calcular</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {digitoVerificador && (
        <p className='result'>Dígito verificador: {digitoVerificador}</p>
      )}
    </div>
  );
};

export default FormularioPatente;
