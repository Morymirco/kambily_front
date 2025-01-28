import { useEffect, useState } from 'react';

export const useGoogleMapsScript = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.google) {
      setIsLoaded(true);
      return;
    }

    const existingScript = document.querySelector(`script[src*="maps.googleapis.com/maps/api"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => setIsLoaded(true));
      return;
    }

    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=VOTRE_CLE_API_GOOGLE_MAPS&libraries=places`;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    googleMapScript.addEventListener('load', () => setIsLoaded(true));
    document.body.appendChild(googleMapScript);

    return () => {
      googleMapScript.removeEventListener('load', () => setIsLoaded(true));
    };
  }, []);

  return isLoaded;
}; 