'use client'
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import Link from 'next/link';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const EarningsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const earnings = {
    total: 2900000,
    thisMonth: 580000,
    thisWeek: 150000,
    history: [
      {
        id: 1,
        date: '2024-03-15',
        deliveries: 5,
        amount: 100000,
        bonus: 10000
      },
      {
        id: 2,
        date: '2024-03-14',
        deliveries: 4,
        amount: 80000,
        bonus: 8000
      },
      // ... autres jours
    ],
    performance: {
      monthly: [
        { month: 'Jan', earnings: 640000 },
        { month: 'Fév', earnings: 560000 },
        { month: 'Mar', earnings: 700000 },
      ]
    }
  };

  // Données pour le graphique
  const chartData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Gains journaliers',
        data: [45000, 62000, 58000, 75000, 68000, 82000, 71000],
        borderColor: '#00878B',
        backgroundColor: 'rgba(0, 135, 139, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Bonus',
        data: [5000, 8000, 6000, 10000, 7000, 12000, 9000],
        borderColor: '#C4DE85',
        backgroundColor: 'rgba(196, 222, 133, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toLocaleString() + ' GNF';
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value.toLocaleString() + ' GNF';
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Mes Gains</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <FaMoneyBillWave className="text-[#048B9A]" />
            <span>Gains totaux</span>
          </div>
          <div className="text-2xl font-semibold">{earnings.total.toLocaleString()} GNF</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <FaCalendarAlt className="text-[#048B9A]" />
            <span>Ce mois</span>
          </div>
          <div className="text-2xl font-semibold">{earnings.thisMonth.toLocaleString()} GNF</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <FaCalendarAlt className="text-[#048B9A]" />
            <span>Cette semaine</span>
          </div>
          <div className="text-2xl font-semibold">{earnings.thisWeek.toLocaleString()} GNF</div>
        </div>
      </div>

      {/* Graphique des gains amélioré */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Évolution des gains</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-3 py-1 rounded-lg text-sm ${
                selectedPeriod === 'week'
                  ? 'bg-[#00878B] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Semaine
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-3 py-1 rounded-lg text-sm ${
                selectedPeriod === 'month'
                  ? 'bg-[#00878B] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Mois
            </button>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Moyenne journalière</div>
            <div className="text-lg font-medium">65,857 GNF</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Meilleur jour</div>
            <div className="text-lg font-medium">82,000 GNF</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Total bonus</div>
            <div className="text-lg font-medium">57,000 GNF</div>
          </div>
        </div>

        {/* Graphique */}
        <div className="h-[300px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Historique détaillé */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Historique détaillé</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Livraisons</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gains</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bonus</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {earnings.history.map((day) => (
              <tr key={day.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  {new Date(day.date).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-4 py-4">{day.deliveries}</td>
                <td className="px-4 py-4">{day.amount.toLocaleString()} GNF</td>
                <td className="px-4 py-4 text-green-600">+{day.bonus.toLocaleString()} GNF</td>
                <td className="px-4 py-4 font-medium">
                  {(day.amount + day.bonus).toLocaleString()} GNF
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link 
        href="/driver/earnings/withdraw"
        className="px-4 py-2 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483]"
      >
        Retirer mes gains
      </Link>
    </div>
  );
};

export default EarningsPage; 