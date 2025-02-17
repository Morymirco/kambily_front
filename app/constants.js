// Fichier de configuration avec les variables globales


export const HOST_IP = 'api.kambily.store';
export const PORT = '';
export const PROTOCOL_HTTP = 'https';
// export const HOST_IP = '192.168.137.1'; 
// export const PORT = ':8001';
// export const PROTOCOL_HTTP = 'http';
export const PROTOCOL_WS = 'ws';


export const generateSlug = (name) => {
	return name
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '') // Enlever les caractères spéciaux
		.replace(/\s+/g, '-') // Remplacer les espaces par des tirets
		.replace(/-+/g, '-'); // Éviter les tirets multiples
};

export const formatNumber = (number) => {
	// Vérifier si le nombre est un nombre valide
	if (isNaN(number)) return number;
	
	// Formater le nombre avec un séparateur de milliers et un point comme séparateur décimal
	const formattedNumber = number.toLocaleString('en-US', {
		minimumFractionDigits: 2,  // Pour garantir au moins 2 décimales (par exemple: 123,000.00)
		maximumFractionDigits: 3,  // Pour ne pas avoir plus de 3 décimales
	});
	
	// Ajouter l'unité monétaire (GNF) à la fin
	return `${formattedNumber} GNF`;
}

export const isTokenValid = async () => {
	const token = localStorage.getItem('refresh'); // Récupère le token depuis le localStorage
	
	if (!token) {
		return false;
	}
	
	try {
		// Envoie une requête vers l'endpoint de validation du token
		const response = await fetch(`${PROTOCOL_HTTP}://${HOST_IP}${PORT}/api/token/refresh/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
			},
			body: JSON.stringify({ refresh: token }),
		});
		
		const data = await response.json();
		console.log('data', data);
		return !!data;
	} catch (error) {
		console.error('Erreur lors de la vérification du token:', error);
		return false; // En cas d'erreur, retourner false (token invalide ou erreur serveur)
	}
}

export const IsAuthenticated = async () => {
	return isTokenValid()
}

export const generateSKU = (product) =>{
	const { name } = product;
	
	// Extraire les premières lettres des mots du nom et de la catégorie
	const namePart = name.split(" ")[0].substring(0, 3)
	
	const date = new Date()
	const date_ajout = `${date.getDay() + 1}-${date.getMonth() + 1}-${date.getFullYear()}`
	
	// Combiner les parties pour former le SKU
	return `${namePart}-${date_ajout}`.toUpperCase();
}

export const STOCK_STATUS = ['En Stock', 'Rupture de stock', 'Sur commande']

export const PRODUCT_TYPE = ['simple', 'variable']

/**
 * Vérifie si un numéro de téléphone guinéen est valide
 * Formats acceptés : 
 * - +224 6X XX XX XX
 * - 00224 6X XX XX XX
 * - 224 6X XX XX XX
 * - 6X XX XX XX
 * - 6XXXXXXXX (sans espace)
 * Opérateurs : 61, 62, 63, 64, 65, 66, 67, 68, 69
 * @param {string} phoneNumber - Le numéro à vérifier
 * @returns {boolean} - true si le numéro est valide, false sinon
 */
export const isGuineanPhoneNumber = (phoneNumber) => {
	// Supprimer tous les espaces, tirets et autres caractères spéciaux
	const cleanNumber = phoneNumber.toString().replace(/[\s-\.()]/g, '');

	// Expression régulière pour les numéros guinéens
	// Accepte les formats avec ou sans espaces
	const guineaPhoneRegex = /^(?:(?:\+|00)?224)?6[1-9]\d{7}$/;

	// Vérifier si le numéro correspond au format
	if (!guineaPhoneRegex.test(cleanNumber)) {
		return false;
	}

	// Extraire les 2 chiffres après le 6 pour vérifier l'opérateur
	const indexOfSix = cleanNumber.indexOf('6');
	const operatorCode = cleanNumber.slice(indexOfSix, indexOfSix + 2);
	
	// Liste des codes opérateurs valides
	const validOperatorCodes = ['61', '62', '63', '64', '65', '66', '67', '68', '69'];

	// Vérifier si le code opérateur est valide
	return validOperatorCodes.includes(operatorCode);
};

export const generateInitialsAvatar = (firstName = '', lastName = '') => {
	// Récupérer les initiales
	const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
	const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
	const initials = `${firstInitial}${lastInitial}`;

	// Générer une couleur de fond unique basée sur les initiales
	const stringToColor = (str) => {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		const hue = Math.abs(hash % 360);
		return `hsl(${hue}, 70%, 85%)`; // Utiliser HSL pour des couleurs pastel
	};

	const backgroundColor = stringToColor(initials);
	const textColor = '#1a1a1a'; // Couleur du texte foncée pour le contraste

	return {
		initials,
		backgroundColor,
		textColor
	};
};