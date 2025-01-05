'use client'
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaBank, FaHistory, FaMobile, FaMoneyBillWave } from 'react-icons/fa';

const WithdrawPage = () => {
  const [withdrawMethod, setWithdrawMethod] = useState('mobile_money');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const balance = {
    total: 580000,
    available: 450000,
    pending: 130000
  };

  const withdrawMethods = [
    {
      id: 'mobile_money',
      name: 'Mobile Money',
      icon: FaMobile,
      info: '+224 621 00 00 00'
    },
    {
      id: 'bank',
      name: 'Virement bancaire',
      icon: FaBank,
      info: 'BICIGUI **** 1234'
    }
  ];

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (Number(amount) > balance.available) {
        throw new Error('Solde insuffisant');
      }

      toast.success('Retrait initié avec succès');
      setAmount('');
    } catch (error) {
      toast.error(error.message || 'Erreur lors du retrait');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/driver/earnings"
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <FaArrowLeft className="text-gray-500" />
        </Link>
        <h1 className="text-xl font-bold">Retrait des gains</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Solde */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-medium">Solde disponible</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total</span>
              <span className="font-medium">{balance.total.toLocaleString()} GNF</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">En attente</span>
              <span className="text-yellow-600">{balance.pending.toLocaleString()} GNF</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Disponible</span>
                <span className="text-xl font-bold text-[#048B9A]">
                  {balance.available.toLocaleString()} GNF
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire de retrait */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm">
          <form onSubmit={handleWithdraw} className="p-6 space-y-6">
            {/* Méthodes de retrait */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Méthode de retrait
              </label>
              <div className="grid grid-cols-2 gap-4">
                {withdrawMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setWithdrawMethod(method.id)}
                    className={`flex items-center p-4 border rounded-lg ${
                      withdrawMethod === method.id
                        ? 'border-[#048B9A] bg-[#048B9A]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* <method.icon className={`w-5 h-5 ${
                      withdrawMethod === method.id ? 'text-[#048B9A]' : 'text-gray-400'
                    }`} /> */}
                    <div className="ml-3 text-left">
                      <div className={`font-medium ${
                        withdrawMethod === method.id ? 'text-[#048B9A]' : 'text-gray-900'
                      }`}>
                        {method.name}
                      </div>
                      <div className="text-sm text-gray-500">{method.info}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Montant */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Montant à retirer
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMoneyBillWave className="text-gray-400" />
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="50000"
                  max={balance.available}
                  required
                  className="pl-10 pr-12 py-2 w-full border rounded-lg focus:ring-2 focus:ring-[#048B9A] focus:border-transparent"
                  placeholder="Montant minimum: 50,000 GNF"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">GNF</span>
                </div>
              </div>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={loading || !amount || Number(amount) > balance.available}
              className="w-full py-2 px-4 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Traitement...' : 'Retirer les fonds'}
            </button>
          </form>
        </div>
      </div>

      {/* Historique des retraits */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">Derniers retraits</h2>
          <FaHistory className="text-gray-400" />
        </div>
        <div className="divide-y divide-gray-200">
          {[
            {
              id: 1,
              date: '2024-03-15',
              amount: 200000,
              method: 'Mobile Money',
              status: 'completed'
            },
            {
              id: 2,
              date: '2024-03-10',
              amount: 150000,
              method: 'Virement bancaire',
              status: 'completed'
            }
          ].map((withdrawal) => (
            <div key={withdrawal.id} className="p-4 flex justify-between items-center">
              <div>
                <div className="font-medium">{withdrawal.method}</div>
                <div className="text-sm text-gray-500">
                  {new Date(withdrawal.date).toLocaleDateString('fr-FR')}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{withdrawal.amount.toLocaleString()} GNF</div>
                <div className="text-sm text-green-600">Effectué</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage; 