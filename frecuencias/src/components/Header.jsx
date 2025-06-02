import React from 'react';
import { motion } from 'framer-motion';
import { BiTable } from 'react-icons/bi';
import { IoStatsChartSharp } from 'react-icons/io5';
import { BsGraphUp } from 'react-icons/bs';
import logoImg from '../assets/logo.png';

export default function Header() {
  const featureItems = [
    {
      icon: BiTable,
      text: "Tablas de Frecuencia",
      color: "text-purple-400"
    },
    {
      icon: BsGraphUp,
      text: "Visualización de Datos",
      color: "text-blue-400"
    },
    {
      icon: IoStatsChartSharp,
      text: "Medidas Estadísticas",
      color: "text-indigo-400"
    }
  ];

  const iconVariants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    hover: { 
      scale: 1.2,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 2
        }
      }
    }
  };

  const logoVariants = {
    initial: { 
      scale: 0,
      rotate: -180,
    },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1.5
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.header 
      className="max-w-6xl mx-auto mb-12 p-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12">
        <motion.div
          variants={logoVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="relative group"
        >
          {/* Efecto de brillo exterior */}
          <motion.div 
            className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full opacity-30 group-hover:opacity-50 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Contenedor principal del logo */}
          <div className="relative w-44 h-44">
            {/* Borde giratorio */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Contenedor del logo con gradiente */}
            <div className="absolute inset-[3px] bg-gradient-to-br from-purple-600 to-blue-500 rounded-full p-[2px]">
              {/* Logo con fondo y backdrop blur */}
              <div className="w-full h-full bg-[#1F1F2B] rounded-full relative overflow-hidden">
                <motion.img 
                  src={logoImg} 
                  alt="FrequencysLab Logo" 
                  className="w-full h-full object-contain p-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
            </div>

            {/* Destellos decorativos animados */}
            <motion.div 
              className="absolute -top-2 -right-2 w-4 h-4 bg-purple-500 rounded-full blur-sm"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5] 
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full blur-sm"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5] 
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            <motion.div 
              className="absolute top-1/2 -right-2 w-3 h-3 bg-indigo-500 rounded-full blur-sm"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5] 
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
        </motion.div>

        <div className="text-center md:text-left">
          <motion.h1 
            className="text-5xl font-bold text-[#7152EC] mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            FrequencysLab
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-4"
          >
            <p className="text-gray-400 font-bold">
              Desarrollado por <span className="text-purple-400 font-medium">Luis Diego Díaz Morga</span>
            </p>
            <p className="text-gray-400 font-bold">
              Grupo <span className="text-purple-400 font-medium">6°A</span>
            </p>
            <p className="text-purple-400 font-medium">
              Ingeniería de Software
            </p>
            <p className="text-gray-400 font-bold">
              Universidad Politécnica de Tapachula
            </p>
          </motion.div>

          <motion.p 
            className="text-lg text-gray-400 mb-6 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Una herramienta avanzada para el análisis estadístico descriptivo, 
            especializada en el cálculo y visualización de tablas de frecuencias, 
            medidas de tendencia central y gráficos estadísticos.
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-4 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {featureItems.map((item, index) => (
              <motion.div
                key={index}
                className={`px-6 py-3 bg-purple-900/30 rounded-lg border border-purple-500/30 
                  flex items-center gap-3 hover:bg-purple-900/40 transition-colors`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover="hover"
              >
                <motion.div
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                >
                  <item.icon className={`text-2xl ${item.color}`} />
                </motion.div>
                <span className={item.color}>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}