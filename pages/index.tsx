import Head from "next/head";
import styles from "../styles/Home.module.css";
import Pref from "../component/pref";
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>各都道府県の人口推移</title>
        <meta name="description" content="各都道府県の人口推移" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Pref />
    </div>
  );
}
