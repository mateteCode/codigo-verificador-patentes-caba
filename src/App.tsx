import { useState } from 'react';
import { calcularDigitoVerificador, validarPatente } from './helpers/agip-patente';
import { FaRegCopy } from "react-icons/fa";

const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copiado al portapapeles: " + text);
  };

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
    const digito = calcularDigitoVerificador(patente);
    setDigitoVerificador(digito);
  };

  return (
    <div className='calculator-container'>
      <h1>Calculadora de Dígito Verificador</h1>
      <h2> de patentes radicadas en CABA</h2>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <input
          type="text"
          value={patente}
          onChange={(e) => setPatente(e.target.value.toUpperCase())}
          minLength={6}
          maxLength={7}
          placeholder="Ingrese la patente"
          />
          {digitoVerificador && <FaRegCopy className="copy-icon" onClick={() => handleCopy(patente)} />}
        </div>
        <button type="submit">Calcular</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {digitoVerificador && (
        <div className='result-container'>
          <p className='result'>Dígito verificador: {digitoVerificador}</p>
          <FaRegCopy className="copy-icon" onClick={() => handleCopy(digitoVerificador)} />
        </div>

      )}
    </div>
  );
};

export default FormularioPatente;
