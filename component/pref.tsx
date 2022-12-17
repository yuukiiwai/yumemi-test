import { ChangeEvent, useEffect, useState } from "react";
import { pref } from "../types/data";

import styles from "../styles/Pref.module.css";
import {
  getPrefs,
  getPrefsData,
  updateSelect,
} from "../compfuncs/pref";

interface props {
  selPrefs: pref[];
  setPrefs: (prefs: pref[]) => void;
}

export default function Pref(props: props) {
  /* 都道府県state */
  const [prefs, setPrefs] = useState<pref[]>([]);

  /* 都道府県を取得する */
  useEffect(() => {
    if (
      // 余計な?やasを発生させないため
      process.env.NEXT_PUBLIC_API_ORIGIN === undefined ||
      process.env.NEXT_PUBLIC_API_VER_POINT === undefined ||
      process.env.NEXT_PUBLIC_API_KEY === undefined
    ) {
      // ダメな訳ないがダメだったら動かせないので。
      return;
    }

    const url =
      process.env.NEXT_PUBLIC_API_ORIGIN +
      process.env.NEXT_PUBLIC_API_VER_POINT +
      "prefectures";
    const apikey = process.env.NEXT_PUBLIC_API_KEY;

    getPrefs(url, apikey)
      .then((data) => getPrefsData(data))
      .then((prefsdata) => setPrefs(prefsdata));
  }, []);

  return (
    <section>
      <h2>都道府県</h2>
      <div className={styles.prefview}>
        {prefs.map((pref, key) => {
          return (
            <div key={key} className={styles.iitem}>
              <input
                type={"checkbox"}
                id={"pref" + pref.prefCode} // idを被らせないように
                name={pref.prefName}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  /* onchangeでselectした都道府県を更新 */
                  let checked = event.target.checked;
                  updateSelect(
                    checked,
                    props.selPrefs,
                    pref,
                    props.setPrefs,
                  );
                }}
              />
              <label htmlFor={"pref" + pref.prefCode}>
                {pref.prefName}
              </label>
            </div>
          );
        })}
      </div>
    </section>
  );
}
