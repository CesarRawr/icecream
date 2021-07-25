import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

/* Key key=AIzaSyAxrCURezqs3zORD2Xcjmg5YKKUcAFl70A*/
/* Plaza museo coords 19.548700194914215, -96.9315025473798*/
/* Martires de chicago coords 19.508979105975133, -96.90683500320357 */
/* José Ruiz coords 19.55817402214415, -96.91246640498656 */
/* https://maps.googleapis.com/maps/api/distancematrix/json?origins=enc:aaivBp|rnQ~vF}xCosHhb@:&destinations=19.509692062756834, -96.90727354434168&key=AIzaSyAxrCURezqs3zORD2Xcjmg5YKKUcAFl70A */

export default function Home() {
  const [msg, setMsg] = useState<string>('Cargando...');

  // Configuración para el modal que pide permiso de ubicación
  const config: any = {
    enableHighAccuracy: true, 
    maximumAge: 30000, 
    timeout: 27000,
  };

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
    console.log(position.coords.latitude, position.coords.longitude);
    const url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=enc:aaivBp|rnQ~vF}xCosHhb@:&destinations=19.509692062756834, -96.90727354434168&key=AIzaSyAxrCURezqs3zORD2Xcjmg5YKKUcAFl70A';
    
    fetch(url)
    .then((res: any) => res.json())
    .then((json: any) => console.log(json))
    .catch((err: any) => console.log(err));
  }
  
  // Función de error al pedir ubicación
  const onError: any = (err: any) => {
    console.log(err);
    setMsg("Se denegaron los permisos de ubicación, redirigiendolo a las posibles ubicaciones...");
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
    </div>
  )
}
