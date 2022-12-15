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
import { useEffect, useLayoutEffect, useState } from "react";

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
    <div className={styles.graph}>
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
          {/* 86で東京の桁数に間に合う */}
          <Tooltip />
          <Legend />
          {props.populations.map((popu) => (
            <Line
              dataKey="value"
              data={popu.data}
              name={popu.pref.prefName}
              key={popu.pref.prefCode}
              stroke={prefColors[popu.pref.prefCode]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const useWindowSize = (): number[] => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = (): void => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};
