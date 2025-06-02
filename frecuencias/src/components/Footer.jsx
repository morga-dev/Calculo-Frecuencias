import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <motion.footer 
      className="w-full bg-[#2D2D3B] mt-12 py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
        <div className="text-center">
          <p className="text-gray-400">
            Desarrollado por
          </p>
          <p className="text-purple-400 font-medium">
            Luis Diego Díaz Morga
          </p>
          <p className='max-w-6xl mx-auto flex flex-col items-center gap-4 text-gray-400'>
            6°A
          </p>
          <p className="text-purple-400 font-medium">
            Ingeniería de Software
          </p>
        </div>
        
        <div className="flex gap-4 mt-2">
          <a 
            href="https://github.com/morga-dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors"
          >
            <FaGithub size={24} />
            </a>
            <a 
            href="https://instagram.com/im_morga"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors">
            <FaInstagram size={24} />
            </a>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          © {new Date().getFullYear()} FrequencysLab. Todos los derechos reservados.
        </p>
      </div>
    </motion.footer>
  );
}