'use client'
import axios from 'axios';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';

/**
 * Auteur : koulibaly
 * email : [koulibalyamadou10@gmail.com, amadoukoulibaly@kambily.store]
 * Date : 31/10/2025 16h35mn
 * endpoint : /register
 * param : None
 * description : permet d'inscrire un utilisateur !
 * @returns {JSX.Element}
 * @constructor
 */
export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    image: null
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      window.location.href = '/profile';
    }
  }, []); // Execution de la prémière page
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image' && files) {
      setFormData(prev => ({
        ...prev,
        image: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }; // changement d'etat des inputs
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (!formData.email || !formData.password) {
      setError("Email et mot de passe sont requis");
      setLoading(false);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }
    
    if( formData.image === null ) {
      setError("Choisir une image !")
      setLoading(false)
      return;
    }
    
    const formDataToSend = new FormData();
    
    formDataToSend.append("first_name", formData.first_name)
    formDataToSend.append("last_name", formData.last_name)
    formDataToSend.append("phone_number", formData.phone_number)
    formDataToSend.append("email", formData.email)
    formDataToSend.append("password", formData.password)
    formDataToSend.append("image", formData.image)
    
    console.log('Données à envoyer:', Object.fromEntries(formDataToSend) );
    
    // Inscription
    const registerResponse = axios.post('https://api.kambily.store/accounts/register/', formDataToSend, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    registerResponse.then(response => {
      console.log('Register response:', response.status);
      if (response.status === 200 || response.status === 201) {
        // Stockage des tokens
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Utilisation du router pour la navigation
        router.push('/register/confirmation');
      } else {
        console.warn('Réponse inattendue du serveur:', response.status, response.data);
        setError(`Erreur: ${response.status} - ${response.data.message || 'Réponse inattendue'}`);
      }
    })
    registerResponse.catch(reaseon => {
      setError(reaseon.request.responseText);
      setLoading(false)
    })
    registerResponse.finally(()=>{
      setLoading(false)
    })
  }; // gestion de l'evenement
  
  return (
      <div className="flex items-center justify-center ">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/* Logo - caché sur mobile, visible sur tablette et desktop */}
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
              Créez votre compte
            </h2>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A] sm:text-sm"
                    placeholder="exemple@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A] sm:text-sm"
                    placeholder="Veuillez entrer votre prénom "
                />
              </div>
              
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A] sm:text-sm"
                    placeholder="Veuillez entrer votre nom"
                />
              </div>
              
              <div>
                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                  Téléphone
                </label>
                <input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A] sm:text-sm"
                    placeholder="Veuillez entrer votre numéro de téléphone"
                />
              </div>
              
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <div className="mt-1 relative">
                  <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A] sm:text-sm"
                      placeholder="Veuillez entrer votre mot de passe"
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmer le mot de passe
                </label>
                <div className="mt-1 relative">
                  <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A] sm:text-sm"
                      placeholder="Veuillez confirmer votre mot de passe"
                  />
                  <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Photo de profil
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  {formData.image ? (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                            src={URL.createObjectURL(formData.image)}
                            alt="Aperçu"
                            fill
                            className="object-cover"
                        />
                      </div>
                  ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <FaUser className="w-8 h-8 text-gray-400" />
                      </div>
                  )}
                  <label
                      htmlFor="profile_image_input"
                      className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#048B9A]"
                  >
                    Changer
                    <input
                        id="profile_image_input"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                    />
                  </label>
                  {formData.image && (
                      <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                          className="py-2 px-3 border border-gray-300 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        Supprimer
                      </button>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  JPG, PNG ou GIF. Taille maximale 2MB.
                </p>
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
            
            <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#048B9A] hover:bg-[#037483] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#048B9A] disabled:opacity-50"
            >
              {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                  'S\'inscrire'
              )}
            </button>
            
            <div className="text-sm text-center">
              <Link href="/test/login" className="font-medium text-[#048B9A] hover:text-[#037483]">
                Déjà inscrit ? Connectez-vous
              </Link>
            </div>
          </form>
        </div>
      </div>
  );
}