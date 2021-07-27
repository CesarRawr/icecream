import { useEffect, useState } from 'react';
import Head from 'next/head';
import RedirectService from '../services/redirect';
import { useLoadScript, DistanceMatrixService } from '@react-google-maps/api';
import styles from '../styles/Home.module.css';

export default function Home() {
  // Configuración para el modal que pide permiso de ubicación
  const config: any = {
    enableHighAccuracy: true, 
    maximumAge: 30000, 
    timeout: 27000,
  };

  const [msg, setMsg] = useState<string>('Cargando...');
  const [coords, setCoords] = useState<Coords>();
  const [isPermission, setPermission] = useState<boolean>(false);
  
  // Espera a que la api de google haya sido cargada
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAo-HC19aPSYGm0mt826eoCliQkfNAueCo',
  });

  // Hook inicial que revisa si existe el servicio de ubicación en el navegador
  useEffect(() => {
    if ("geolocation" in navigator) {
      setMsg("Porfavor de permisos de ubicación para redirigirlo a su sucursal...");
      navigator.geolocation.getCurrentPosition(onSucccess, onError, config);
    } else {
      setMsg("Su navegador no soporta la geolocalización, redirigiendolo a las posibles ubicaciones...");
    }
  }, []);

  // Función que se ejecuta si existe permiso de ubicación
  const onSucccess: any = (position: any) => {
    setMsg('Redirigiendolo a la sucursal mas cercana...');
    setCoords({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });

    setPermission(true);
  }
  
  // Función de error al pedir ubicación
  const onError: any = (err: any) => {
    console.log(err);
    setMsg("Ocurrió un error al obtener su ubicación, mostrandole las sucursales disponibles");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Berdenz redirect</title>
        <meta name="description" content="Página que te redirecciona al Whatsapp de tu sucursal Berdenz mas cercana" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.loader}>Loading...</div>
        <span>{msg}</span>
      </main>
      {
        isLoaded && isPermission && (
          <DistanceMatrixService 
            options={{
              destinations: [coords],
              origins: [
                { lat: 19.5485043190066, lng: -96.93145158220881 },
                { lat: 19.508979105975133, lng: -96.90683500320357 },
                { lat: 19.55817402214415, lng: -96.91246640498656 }
              ],
              travelMode: "DRIVING",
            }}
            callback={(res) => {
              console.log("RESPONSE", res);
              RedirectService.redirect(res.rows, res.originAddresses);
            }}
          />
        )
      }
    </div>
  )
}

interface Coords {
  lat: number;
  lng: number;
}

/* Key AIzaSyAo-HC19aPSYGm0mt826eoCliQkfNAueCo*/
/*                    19.5485043190066, -96.93145158220881*/
/* Plaza museo coords 19.548700194914215, -96.9315025473798*/
/* Martires de chicago coords 19.508979105975133, -96.90683500320357 */
/* José Ruiz coords           19.55817402214415,  -96.91246640498656 */
