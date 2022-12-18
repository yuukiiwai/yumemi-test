import { ChangeEvent, useEffect, useState } from "react";
import { pref, region } from "../types/data";

import {
  adjustWithRegion,
  getPrefs,
  getPrefsData,
  updateRegion,
  updateSelectbyRegi,
} from "../compfuncs/pref";
import Pref from "./pref";

interface props {
  selPrefs: pref[];
  setPrefs: (prefs: pref[]) => void;
}

export default function Region(props: props) {
  /* 都道府県state */
  const [japan, setJap] = useState<region[]>([]);
  const [selRegionKey, setSelRegionKey] = useState<number[]>([]); // チェック中の地域をストック

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
        setJap(adjustWithRegion(prefsdata));
      });
  }, []);

  return (
    <section>
      <h2>都道府県</h2>
      {japan.map((region, rkey) => {
        return (
          <section key={rkey}>
            <input
              type="checkbox"
              id={"region" + region.regionName}
              checked={selRegionKey.indexOf(rkey) != -1}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                let checked = event.target.checked;
                updateSelectbyRegi(
                  checked,
                  props.selPrefs,
                  region.prefs,
                  props.setPrefs,
                );
                updateRegion(checked, rkey, selRegionKey, (keys) => {
                  setSelRegionKey(keys);
                });
              }}
            />
            <label htmlFor={"region" + region.regionName}>
              {region.regionName}
            </label>
            <Pref
              parentReg={region}
              parentRkey={rkey}
              selPrefs={props.selPrefs}
              selRegions={selRegionKey}
              setPrefs={props.setPrefs}
              setRegions={(rkey) => {
                setSelRegionKey(rkey);
              }}
            />
          </section>
        );
      })}
    </section>
  );
}
