'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";

export default function ConfirmAccount() {
    const [confirmation, setConfirmation] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleConfirm = () => {
        setLoading(true);
        setMessage('');

        const token = localStorage.getItem('access_token'); // Récupération du token stocké

        const response = axios.post(
            'https://api.kambily.store/accounts/confirm/',
            { confirmation : parseInt(confirmation, 10) }, // Données envoyées
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Ajout du Bearer Token
                },
            }
        );

        response.then((response) => {
            if( response.data.status === 200 || response.data.status === 201 ) {
                setMessage('Compte confirmé avec succès ! Redirection...');
                setTimeout(() => router.push('/login'), 2000);
            }else {
                console.warn('Réponse inattendue du serveur:', response.status, response.data);
                setMessage(`Erreur: ${response.status} - ${response.data.message || 'Réponse inattendue'}`);
            }
        })
        response.catch((error) => {
            setMessage(error)
        })
        response.finally(() => setLoading(false));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Confirmez votre compte</h2>
                <p className="text-gray-600 text-sm mb-4 text-center">Saisissez le code que vous avez reçu par email.</p>
                <input
                    type="text"
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Code de confirmation"
                />
                <button
                    onClick={handleConfirm}
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    disabled={loading}
                >
                    {loading ? 'Vérification...' : 'Confirmer'}
                </button>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
}
