import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RedirectService from '../services/redirect';
import { useLoadScript, DistanceMatrixService } from '@react-google-maps/api';
import styles from '../styles/Home.module.css';

import Spinner from '../components/Spinner';
import TextBox from '../components/TextBox';

export default function Home() {

  const router = useRouter();

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
      setMsg("Porfavor conceda permisos de ubicación para redirigirlo a su sucursal mas cercana...");
      navigator.geolocation.getCurrentPosition(onSucccess, onError, config);
    } else {
      setMsg("Su navegador no soporta la geolocalización, redirigiendolo a las posibles ubicaciones...");
      setTimeout(() => {
        router.replace('/fail');
      }, 2500);
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
    setMsg("Ocurrió un error al obtener su ubicación, mostrandole las sucursales disponibles...");
    setTimeout(() => {
      router.replace('/fail');
    }, 2500);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Berdenz redirect</title>
        <meta name="description" content="Página que te redirecciona al Whatsapp de tu sucursal Berdenz mas cercana" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section></section>
        <section className={styles.center}>
          <Spinner />
        </section>
        <section className={styles.justify}>
          <TextBox msg={msg}/>
        </section>
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
            callback={ async (res) => {
              await RedirectService.redirect(res.rows, res, coords);
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
