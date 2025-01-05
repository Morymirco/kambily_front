'use client'
import {
    ArcElement,
    BarElement,
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
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { FaChartLine, FaMoneyBillWave, FaMotorcycle, FaStar } from 'react-icons/fa';

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsPage = () => {
  // Données pour les graphiques
  const deliveryData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [{
      label: 'Livraisons',
      data: [5, 8, 6, 9, 7, 11, 4],
      borderColor: '#00878B',
      backgroundColor: 'rgba(0, 135, 139, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  const earningsData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [{
      label: 'Gains (GNF)',
      data: [580000, 620000, 750000, 690000, 840000, 920000],
      backgroundColor: '#C4DE85',
      borderColor: '#00878B',
      borderWidth: 1
    }]
  };

  const ratingDistribution = {
    labels: ['5 étoiles', '4 étoiles', '3 étoiles', '2 étoiles', '1 étoile'],
    datasets: [{
      data: [85, 12, 2, 1, 0],
      backgroundColor: [
        '#00878B',
        '#C4DE85',
        '#FFFDFE',
        '#010206',
        'rgba(1, 2, 6, 0.5)'
      ],
      borderWidth: 0
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    cutout: '70%'
  };

  // KPIs
  const kpis = {
    totalDeliveries: 145,
    averageRating: 4.8,
    totalEarnings: 2900000,
    completionRate: 98
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Tableau de bord analytique</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <FaMotorcycle className="text-[#00878B]" />
            <span>Total livraisons</span>
          </div>
          <div className="text-2xl font-semibold">{kpis.totalDeliveries}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <FaStar className="text-[#C4DE85]" />
            <span>Note moyenne</span>
          </div>
          <div className="text-2xl font-semibold">{kpis.averageRating}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <FaMoneyBillWave className="text-[#00878B]" />
            <span>Gains totaux</span>
          </div>
          <div className="text-2xl font-semibold">{kpis.totalEarnings.toLocaleString()} GNF</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <FaChartLine className="text-[#C4DE85]" />
            <span>Taux de réussite</span>
          </div>
          <div className="text-2xl font-semibold">{kpis.completionRate}%</div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Livraisons par jour */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">Livraisons par jour</h2>
          <Line data={deliveryData} options={options} />
        </div>

        {/* Gains mensuels */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">Gains mensuels</h2>
          <Bar data={earningsData} options={options} />
        </div>
      </div>

      {/* Distribution des évaluations */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4">Distribution des évaluations</h2>
        <div className="max-w-md mx-auto">
          <Doughnut data={ratingDistribution} options={doughnutOptions} />
        </div>
      </div>

      {/* Statistiques détaillées */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">Performance hebdomadaire</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Temps moyen de livraison</span>
              <span className="font-medium">28 min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Distance parcourue</span>
              <span className="font-medium">142 km</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Taux d'acceptation</span>
              <span className="font-medium">95%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">Zones les plus actives</h2>
          <div className="space-y-4">
            {[
              { zone: 'Ratoma', deliveries: 45 },
              { zone: 'Matam', deliveries: 32 },
              { zone: 'Dixinn', deliveries: 28 }
            ].map((zone, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-1">
                  <div className="text-sm font-medium">{zone.zone}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#00878B] h-2 rounded-full"
                      style={{ width: `${(zone.deliveries/45)*100}%` }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium">{zone.deliveries}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage; 