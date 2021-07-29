import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './Fail.module.css';

import LinkButton from '../../components/LinkButton';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Berdenz redirect</title>
        <meta name="description" content="Página que te redirecciona al Whatsapp de tu sucursal Berdenz mas cercana" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.box}>
          <LinkButton href="https://rebrand.ly/BerdenzsPizzaPlazaMuseo" text="Plaza Museo" />
          <LinkButton href="https://rebrand.ly/BerdenzsPizzaMartiresDeChicago" text="Mártires De Chicago" />
          <LinkButton href="https://rebrand.ly/BerdenzsPizzaRafaelLucio" text="Rafael Lucio" />          
        </div>
      </main>
    </div>
  )
}
