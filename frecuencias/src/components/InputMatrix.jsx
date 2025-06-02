import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InputMatrix({ onSubmit }) {
  const [N, setN] = useState('');
  const [inputString, setInputString] = useState('');
  const [showDataInput, setShowDataInput] = useState(false);
  const [inputType, setInputType] = useState('spaces'); // 'spaces' o 'commas'

  const handleNChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) {
      setN(value);
    }
  };

  const handleNSubmit = () => {
    if (N > 0) {
      setShowDataInput(true);
    } else {
      alert('Por favor, ingrese un número válido mayor a 0');
    }
  };

  const handleInputChange = (e) => {
    setInputString(e.target.value);
  };

  const handleSubmit = () => {
    const separator = inputType === 'spaces' ? /\s+/ : ',';
    const values = inputString
      .trim()
      .split(separator)
      .map(val => val.trim())
      .filter(val => val !== '')
      .map(Number)
      .filter(num => !isNaN(num));

    if (values.length === parseInt(N)) {
      onSubmit(values);
    } else {
      alert(`Por favor, ingrese exactamente ${N} números válidos`);
    }
  };

  const handleGoBack = () => {
    setShowDataInput(false);
    setInputString('');
  };

  return (
    <div className="p-4">
      <AnimatePresence mode="wait">
        {!showDataInput ? (
          <motion.div
            key="input-n"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-2">
                  Ingrese el número de datos (N):
                </label>
                <input
                  type="number"
                  value={N}
                  onChange={handleNChange}
                  className="w-full bg-[#2D2D3B] border border-purple-500 rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
                  min="1"
                />
                {/* Botón Continuar */}
                <button
                  onClick={handleNSubmit}
                  className="btn-primary mt-4"
                >
                  Continuar
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="input-data"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                {/* Botón Regresar */}
                <button
                  onClick={handleGoBack}
                  className="btn-back"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Regresar
                </button>
                <span className="text-gray-400">N = {N}</span>
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Seleccione el tipo de entrada:
                </label>
                <div className="flex gap-4">
                  {/* Botones de tipo de entrada */}
                  <button
                    onClick={() => setInputType('spaces')}
                    className={`${
                      inputType === 'spaces' ? 'btn-primary' : 'btn-ghost'
                    }`}
                  >
                    Separado por espacios
                  </button>
                  <button
                    onClick={() => setInputType('commas')}
                    className={`${
                      inputType === 'commas' ? 'btn-primary' : 'btn-ghost'
                    }`}
                  >
                    Separado por comas
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Ingrese {N} números{' '}
                  {inputType === 'spaces'
                    ? 'separados por espacios:'
                    : 'separados por comas:'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputString}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                    placeholder={
                      inputType === 'spaces'
                        ? 'Ejemplo: 12 23 45 67 89'
                        : 'Ejemplo: 12, 23, 45, 67, 89'
                    }
                  />
                  {/* Botón Calcular */}
                  <button
                    onClick={handleSubmit}
                    className="btn-tertiary"
                  >
                    Calcular
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}