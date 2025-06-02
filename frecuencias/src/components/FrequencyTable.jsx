import React from 'react';
import * as XLSX from 'xlsx';
import { FaFileExcel } from 'react-icons/fa';

export default function FrequencyTable({ data, intervals }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const K = intervals.length;
  const range = max - min;
  const amplitude = range / K;

  // Calcular totales
  const totals = intervals.reduce((acc, row) => ({
    f: acc.f + row.f,
    rel: acc.rel + row.rel,
    pct: acc.pct + row.pct,
    xf: acc.xf + row.xf,
    fDev2: acc.fDev2 + row.fDev2
  }), { f: 0, rel: 0, pct: 0, xf: 0, fDev2: 0 });

  const exportToExcel = () => {
    // Preparar los datos para Excel
    const excelData = intervals.map(row => ({
      'Límite Inferior': row.Li.toFixed(2),
      'Límite Superior': row.Ls.toFixed(2),
      'Marca de Clase (X)': row.X.toFixed(2),
      'Frecuencia (f)': row.f,
      'Frec. Acumulada': row.cumFreq,
      'Frec. Relativa': row.rel.toFixed(3),
      'Frec. Rel. Acum.': row.cumRel.toFixed(3),
      'Porcentaje (%)': row.pct.toFixed(1),
      'Porcentaje Acum.': row.cumPct.toFixed(1),
      'X·f': row.xf.toFixed(2),
      '(X-μ)²': row.dev2.toFixed(2),
      'f·(X-μ)²': row.fDev2.toFixed(2),
    }));

    // Agregar fila de totales
    excelData.push({
      'Límite Inferior': 'TOTALES',
      'Límite Superior': '',
      'Marca de Clase (X)': '',
      'Frecuencia (f)': totals.f,
      'Frec. Acumulada': '-',
      'Frec. Relativa': totals.rel.toFixed(3),
      'Frec. Rel. Acum.': '-',
      'Porcentaje (%)': totals.pct.toFixed(1),
      'Porcentaje Acum.': '-',
      'X·f': totals.xf.toFixed(2),
      '(X-μ)²': '-',
      'f·(X-μ)²': totals.fDev2.toFixed(2),
    });

    // Crear workbook y worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Agregar la worksheet al workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Tabla de Frecuencias');

    // Guardar el archivo
    XLSX.writeFile(wb, 'tabla_frecuencias.xlsx');
  };

  return (
    <div className="overflow-auto p-4 bg-[#2D2D3B] rounded-lg shadow-xl">
      <div className="flex justify-end mb-4">
        <button
          onClick={exportToExcel}
          className="btn-excel"
        >
          <FaFileExcel className="text-xl" />
          Exportar a Excel
        </button>
      </div>

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="bg-purple-700 text-white px-3 py-2 border border-purple-600">Li</th>
            <th className="bg-purple-700 text-white px-3 py-2 border border-purple-600">Ls</th>
            <th className="bg-purple-700 text-white px-3 py-2 border border-purple-600">X</th>
            <th className="bg-purple-700 text-white px-3 py-2 border border-purple-600">f</th>
            <th className="bg-purple-700 text-white px-3 py-2 border border-purple-600">FAc</th>
            <th className="bg-purple-700 text-white px-3 py-2 border border-purple-600">fr</th>
            <th className="bg-purple-700 text-white px-3 py-2 border border-purple-600">frAc</th>
            <th className="bg-purple-700 text-white px-3 py-2 border border-purple-600">%r</th>
            <th className="bg-purple-700 text-white px-3 py-2 border border-purple-600">%rAc</th>
            <th className="bg-purple-700 text-white px-3 py-2 border border-purple-600">X·f</th>
            <th className="bg-purple-700 text-white px-3 py-2 border border-purple-600">(X-μ)²</th>
            <th className="bg-purple-700 text-white px-3 py-2 border border-purple-600">f·(X-μ)²</th>
          </tr>
        </thead>
        <tbody>
          {intervals.map((row, i) => (
            <tr key={i} className="text-center hover:bg-purple-900/30 transition-colors">
              <td className="border px-1 py-0.5">{row.Li.toFixed(2)}</td>
              <td className="border px-1 py-0.5">{row.Ls.toFixed(2)}</td>
              <td className="border px-1 py-0.5">{row.X.toFixed(2)}</td>
              <td className="border px-1 py-0.5">{row.f}</td>
              <td className="border px-1 py-0.5">{row.cumFreq}</td>
              <td className="border px-1 py-0.5">{row.rel.toFixed(3)}</td>
              <td className="border px-1 py-0.5">{row.cumRel.toFixed(3)}</td>
              <td className="border px-1 py-0.5">{row.pct.toFixed(1)}%</td>
              <td className="border px-1 py-0.5">{row.cumPct.toFixed(1)}%</td>
              <td className="border px-1 py-0.5">{row.xf.toFixed(2)}</td>
              <td className="border px-1 py-0.5">{row.dev2.toFixed(2)}</td>
              <td className="border px-1 py-0.5">{row.fDev2.toFixed(2)}</td>
            </tr>
          ))}
          {/* Fila de totales */}
          <tr className="text-center font-bold bg-purple-900/20">
            <td className="border px-1 py-0.5" colSpan="3">Totales</td>
            <td className="border px-1 py-0.5">{totals.f}</td>
            <td className="border px-1 py-0.5">-</td>
            <td className="border px-1 py-0.5">{totals.rel.toFixed(3)}</td>
            <td className="border px-1 py-0.5">-</td>
            <td className="border px-1 py-0.5">{totals.pct.toFixed(1)}%</td>
            <td className="border px-1 py-0.5">-</td>
            <td className="border px-1 py-0.5">{totals.xf.toFixed(2)}</td>
            <td className="border px-1 py-0.5">-</td>
            <td className="border px-1 py-0.5">{totals.fDev2.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
