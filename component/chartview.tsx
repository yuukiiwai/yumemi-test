import styles from "../styles/Graph.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { population } from "../types/data";
import { prefColors } from "../constant/data";
import { useEffect, useState } from "react";
import { useWindowSize } from "../constant/funcs";

interface props {
  populations: population[];
}

/* rechartsの使い方はPackage_Use.mdへ */
export default function ChartView(props: props) {
  const [width, height] = useWindowSize();
  const [yW, setYW] = useState<number>(0);

  useEffect(() => {
    // 実験結果の閾値を使う
    if (width < 720) {
      setYW(73);
    } else if (width < 940) {
      setYW(75);
    } else {
      setYW(86);
    }
  }, [width]);

  /* グラフだけを管理する */
  return (
    <section className={styles.graph}>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <LineChart width={500} height={500}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            type="category"
            allowDuplicatedCategory={false}
            unit={"年"}
          />
          <YAxis dataKey="value" width={yW} unit={"人"} />
          {/* widthを書かないと数字が外に行って隠れる */}
          <Tooltip />
          <Legend />
          {props.populations.map((popu) => (
            <Line
              dataKey="value"
              data={popu.data}
              name={popu.pref.prefName}
              key={popu.pref.prefCode}
              stroke={prefColors[popu.pref.prefCode - 1]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
