import styles from "../styles/graph.module.css";
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

export default function ChartView(props: props) {
  return (
    <div className={styles.graph}>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <LineChart width={500} height={500}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            type="category"
            allowDuplicatedCategory={false}
          />
          <YAxis dataKey="value" />
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
