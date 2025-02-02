'use client';

import axios from "axios";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ConfirmAccount() {
    const [confirmation, setConfirmation] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    // Vérification au chargement de la page
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            setMessage('Accès non autorisé. Redirection vers la page d\'inscription...');
            setTimeout(() => router.push('/register'), 1000);
        }
    }, [router]);

    const handleConfirm = async () => {
        setLoading(true);
        setMessage('');

        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post(
                'https://api.kambily.store/accounts/confirm/',
                { confirmation: parseInt(confirmation, 10) },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );

            console.log(response);

            if (response.status === 200 || response.status === 201) {
                // Stockage des informations d'authentification
                if (response.data.access) {
                    localStorage.setItem('access_token', response.data.access);
                }
                if (response.data.user) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }
                
                setMessage('Compte confirmé avec succès ! Redirection...');
                
                // Utiliser window.location.href pour une redirection plus forcée
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                setMessage(`Erreur: ${response.data.message || 'Une erreur est survenue'}`);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.message || 'Erreur lors de la confirmation');
            } else {
                setMessage('Une erreur inattendue est survenue');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <div className="hidden md:block">
                        <Image
                            src="/logot.png"
                            alt="Logo"
                            width={300}
                            height={300}
                            className="mx-auto"
                        />
                    </div>

                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Confirmez votre compte
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Saisissez le code que vous avez reçu par email.
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="confirmation" className="block text-sm font-medium text-gray-700">
                                Code de confirmation
                            </label>
                            <input
                                id="confirmation"
                                type="text"
                                value={confirmation}
                                onChange={(e) => setConfirmation(e.target.value)}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A] sm:text-sm"
                                placeholder="Entrez votre code"
                            />
                        </div>
                    </div>

                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`bg-${message.includes('succès') ? 'green' : 'red'}-50 text-${message.includes('succès') ? 'green' : 'red'}-500 p-3 rounded-md text-sm`}
                        >
                            {message}
                        </motion.div>
                    )}

                    <button
                        onClick={handleConfirm}
                        disabled={loading}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#048B9A] hover:bg-[#037483] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#048B9A] disabled:opacity-50"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            'Confirmer'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
