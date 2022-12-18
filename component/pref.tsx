import { ChangeEvent, useEffect, useState } from "react";
import { pref, region } from "../types/data";

import styles from "../styles/Pref.module.css";
import {
  adjustWithRegion,
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
  const [japan, setJap] = useState<region[]>([]);

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
      .then((prefsdata) => {
        setPrefs(prefsdata);
        setJap(adjustWithRegion(prefsdata));
      });
  }, []);

  return (
    <section>
      <h2>都道府県</h2>
      {japan.map((region, rkey) => {
        return (
          <div key={rkey}>
            <p>{region.regionName}</p>
            {region.prefs.map((pref, pkey) => {
              return (
                <div key={pkey}>
                  <input
                    type="checkbox"
                    id={"pref" + pref.prefCode}
                    name={pref.prefName}
                    onChange={(
                      event: ChangeEvent<HTMLInputElement>,
                    ) => {
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
        );
      })}
    </section>
  );
}
