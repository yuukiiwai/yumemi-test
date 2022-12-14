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

interface props {
  populations: population[];
}

/* rechartsの使い方はPackage_Use.mdへ */
export default function ChartView(props: props) {
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
          <YAxis dataKey="value" width={86} unit={"人"} />
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
