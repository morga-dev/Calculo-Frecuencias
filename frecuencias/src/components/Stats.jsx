import React from 'react';
import { motion } from 'framer-motion';

export default function Stats({ stats, data, intervals }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const { media, mediana, moda, varianza, sd } = stats;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  const amplitude = (intervals[0].Ls - intervals[0].Li);
  const N = data.length;

  return (
    <motion.div
      className="p-6 grid grid-cols-2 gap-6 bg-[#2D2D3B] rounded-lg shadow-xl"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="space-y-3">
        <motion.p variants={item} className="text-purple-400">
          <strong>Media:</strong> <span className="text-gray-200">{media.toFixed(2)}</span>
        </motion.p>
        <motion.p variants={item} className="text-purple-400">
          <strong>Mediana:</strong> <span className="text-gray-200">{mediana.toFixed(2)}</span>
        </motion.p>
        <motion.p variants={item} className="text-purple-400">
          <strong>Moda:</strong> <span className="text-gray-200">{moda}</span>
        </motion.p>
        <motion.p variants={item} className="text-purple-400">
          <strong>Varianza:</strong> <span className="text-gray-200">{varianza.toFixed(2)}</span>
        </motion.p>
        <motion.p variants={item} className="text-purple-400">
          <strong>Desviación Std.:</strong> <span className="text-gray-200">{sd.toFixed(2)}</span>
        </motion.p>
      </div>
      <div className="space-y-3">
        <motion.p variants={item} className="text-purple-400">
          <strong>Cantidad de datos (N):</strong> <span className="text-gray-200">{N}</span>
        </motion.p>
        <motion.p variants={item} className="text-purple-400">
          <strong>Rango:</strong> <span className="text-gray-200">{range.toFixed(2)}</span>
        </motion.p>
        <motion.p variants={item} className="text-purple-400">
          <strong>Límite inferior:</strong> <span className="text-gray-200">{min.toFixed(2)}</span>
        </motion.p>
        <motion.p variants={item} className="text-purple-400">
          <strong>Límite superior:</strong> <span className="text-gray-200">{max.toFixed(2)}</span>
        </motion.p>
        <motion.p variants={item} className="text-purple-400">
          <strong>Amplitud:</strong> <span className="text-gray-200">{amplitude.toFixed(2)}</span>
        </motion.p>
      </div>
    </motion.div>
  );
}