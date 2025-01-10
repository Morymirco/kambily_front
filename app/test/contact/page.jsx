'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';

export default function TestContact() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://35.85.136.46:8001/accounts/send_contact_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      setSuccess(true);
      setFormData({
        email: '',
        subject: '',
        message: ''
      });

      // Réinitialiser le succès après 3 secondes
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#048B9A]/10 flex items-center justify-center">
            <FaEnvelope className="w-8 h-8 text-[#048B9A]" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Contactez-nous
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Nous sommes là pour vous aider
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A]"
                />
              </div>
            </div>

            {/* Sujet */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sujet
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A]"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <div className="mt-1">
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A]"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-500 p-3 rounded-md text-sm"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 text-green-500 p-3 rounded-md text-sm"
              >
                Message envoyé avec succès !
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#048B9A] hover:bg-[#037483] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#048B9A] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <div className="flex items-center gap-2">
                  <FaPaperPlane />
                  Envoyer
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 