// Configuration de base pour l'API
const API_BASE_URL = 'https://kambily.ddns.net';

// Fonction utilitaire pour les requêtes API
const fetchApi = async (endpoint, options = {}) => {
  try {
    // Ajouter le token d'authentification si disponible
    const token = localStorage.getItem('token');
    if (token) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      };
    }

    // Ajouter les headers par défaut
    options.headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      // Gérer les erreurs d'authentification
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      throw new Error(data.message || 'Une erreur est survenue');
    }

    return data;
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};

// Endpoints de l'API
const api = {
  // Auth
  auth: {
    login: (data) => fetchApi('/accounts/login', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    register: (data) => fetchApi('/accounts/register', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    changePassword: (data) => fetchApi('/accounts/change_password', {
      method: 'POST', 
      body: JSON.stringify(data)
    })
  },

  // Profil utilisateur
  profile: {
    get: () => fetchApi('/accounts/profile'),
    update: (data) => fetchApi('/accounts/update_profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    uploadImage: (formData) => fetchApi('/accounts/upload-image', {
      method: 'POST',
      headers: {
        // Ne pas définir Content-Type pour FormData
        'Content-Type': undefined
      },
      body: formData
    })
  },

  // Produits
  products: {
    list: () => fetchApi('/products/index'),
    get: (id) => fetchApi(`/products/show/${id}`),
    create: (data) => fetchApi('/products/create', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => fetchApi(`/products/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => fetchApi(`/products/delete/${id}`, {
      method: 'DELETE'
    })
  },

  // Catégories
  categories: {
    list: () => fetchApi('/products/list_categories'),
    create: (data) => fetchApi('/products/create_category', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => fetchApi(`/products/update_category/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => fetchApi(`/products/delete_category/${id}`, {
      method: 'DELETE'
    })
  },

  // Contact
  contact: {
    send: (data) => fetchApi('/accounts/send_contact_email', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
};

export default api; 