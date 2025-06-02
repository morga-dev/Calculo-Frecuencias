import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import InputMatrix from './components/InputMatrix';
import FrequencyTable from './components/FrequencyTable';
import Stats from './components/Stats';
import Charts from './components/Charts';
import Footer from './components/Footer';
import { calcSturges, buildIntervals, enrichIntervals, summaryStats } from './components/functions';

function App() {
  const [data, setData] = useState(null);
  const [intervals, setIntervals] = useState([]);
  const [stats, setStats] = useState(null);

  const handleDataSubmit = values => {
    const N = values.length;
    const K = calcSturges(N);
    const rawIntervals = buildIntervals(values, K);
    const enriched = enrichIntervals(rawIntervals, values);
    setData(values);
    setIntervals(enriched);
    setStats(summaryStats(values));
  };

  return (
    <div className="min-h-screen bg-[#1F1F2B]">
      <div className="py-8 px-4">
        <Header />
        <motion.main 
          className="max-w-6xl mx-auto space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.section 
            className="bg-[#2D2D3B] rounded-lg shadow-xl"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring" }}
          >
            <h2 className="text-2xl font-semibold text-[#1C64F1] p-4 border-b border-gray-700">
              Ingreso de Datos
            </h2>
            <InputMatrix onSubmit={handleDataSubmit} />
          </motion.section>

          {data && (
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.section 
                className="bg-[#2D2D3B] rounded-lg shadow-xl"
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ type: "spring" }}
              >
                <h2 className="text-2xl font-semibold text-[#1C64F1] p-4 border-b border-gray-700">
                  Tabla de Frecuencias
                </h2>
                <FrequencyTable data={data} intervals={intervals} />
              </motion.section>

              <motion.section 
                className="bg-[#2D2D3B] rounded-lg shadow-xl"
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold text-[#1C64F1] p-4 border-b border-gray-700">
                  Medidas Estadísticas
                </h2>
                <Stats stats={stats} data={data} intervals={intervals} />
              </motion.section>

              <motion.section 
                className="bg-[#2D2D3B] rounded-lg shadow-xl"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", delay: 0.4 }}
              >
                <h2 className="text-2xl font-semibold text-[#1C64F1] p-4 border-b border-gray-700">
                  Visualización de Datos
                </h2>
                <Charts intervals={intervals} />
              </motion.section>
            </motion.div>
          )}
        </motion.main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
