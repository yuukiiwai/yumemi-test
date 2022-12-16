import styles from "../styles/Home.module.css";

import Head from "next/head";
import Pref from "../component/pref";
import { useState } from "react";
import Population from "../component/popu";
import { pref } from "../types/data";

export default function Home() {
  const [selPrefs, setPrefs] = useState<pref[]>([]); // 選択されている県データ
  return (
    <div className={styles.container}>
      <Head>
        <title>各都道府県の人口推移</title>
        <meta name="description" content="各都道府県の人口推移" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className={styles.header}>各都道府県の人口推移</h1>
      <Pref
        selPrefs={selPrefs}
        setPrefs={(prefs) => {
          setPrefs(prefs);
        }}
      />
      <Population selPrefs={selPrefs} />
      </main>
    </div>
  );
}
