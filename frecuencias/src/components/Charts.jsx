import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function Charts({ intervals }) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const barData = intervals.map((row, i) => ({
    name: `${row.Li.toFixed(1)}-${row.Ls.toFixed(1)}`,
    freq: row.f
  }));

  const pieData = intervals.map((row, i) => ({
    name: `${row.Li.toFixed(1)}-${row.Ls.toFixed(1)}`,
    value: parseFloat(row.pct.toFixed(1))
  }));

  const COLORS = [
    '#8B5CF6', '#6366F1', '#3B82F6', 
    '#06B6D4', '#10B981', '#F59E0B'
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1F1F2B] px-3 py-2 rounded-lg shadow-lg">
          <p className="text-gray-300 font-medium text-sm">
            {payload[0].value}% ({payload[0].name})
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 grid md:grid-cols-2 gap-8">
      <div className="shadow rounded-lg p-6 bg-[#2D2D3B]/50 backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-4 text-purple-400">Histograma (Frecuencia Absoluta)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="name" stroke="#E2E8F0" />
            <YAxis stroke="#E2E8F0" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#2D2D3B', 
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar dataKey="freq" fill="#8B5CF6">
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="shadow rounded-lg p-6 bg-[#2D2D3B]/50 backdrop-blur-sm relative">
        <h3 className="text-xl font-semibold mb-4 text-purple-400">
          Distribución Porcentual
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={0.5}
              animationBegin={0}
              animationDuration={1000}
            >
              {pieData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  opacity={0.9}
                />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip />}
              cursor={false}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          {pieData.map((entry, index) => (
            <div 
              key={`legend-${index}`} 
              className="flex items-center gap-1.5"
            >
              <div 
                className="w-2.5 h-2.5 rounded-sm" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-gray-400 text-sm">
                {entry.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}