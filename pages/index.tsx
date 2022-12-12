import styles from "../styles/Home.module.css";

import Head from "next/head";
import Pref from "../component/pref";
import { useState } from "react";
import Population from "../component/popu";

export default function Home() {
  const [selCodes, setCodes] = useState<number[]>([]);
  return (
    <div className={styles.container}>
      <Head>
        <title>各都道府県の人口推移</title>
        <meta name="description" content="各都道府県の人口推移" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Pref />
      <Population
        selPrefs={[
          {
            prefCode: 1,
            prefName: "北海道",
          },
          {
            prefCode: 2,
            prefName: "青森県",
          },
        ]}
      />
    </div>
  );
}
