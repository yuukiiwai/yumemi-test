import { useEffect, useState } from "react";
import { population, pref } from "../types/data";
import ChartView from "./chartview";
import { assemblePopu } from "../compfuncs/popu";

interface props {
  selPrefs: pref[];
}

export default function Population(props: props) {
  /* 取得したデータを使ってグラフを呼び出す */
  const [populations, setPopus] = useState<population[]>([]);

  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_API_ORIGIN === undefined ||
      process.env.NEXT_PUBLIC_API_VER_POINT === undefined ||
      process.env.NEXT_PUBLIC_API_KEY === undefined
    ) {
      return;
    }
    /* 定義値 */
    const root_url =
      process.env.NEXT_PUBLIC_API_ORIGIN +
      process.env.NEXT_PUBLIC_API_VER_POINT +
      "population/composition/perYear?prefCode=";
    const apikey = process.env.NEXT_PUBLIC_API_KEY;

    /* 情報取得 */
    assemblePopu(root_url, apikey, props.selPrefs).then((res) =>
      setPopus(res),
    );
  }, [props.selPrefs]);

  return (
    <ChartView populations={populations} />
  );
}
