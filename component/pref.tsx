import { ChangeEvent, useEffect, useState } from "react";
import { pref, region } from "../types/data";

import styles from "../styles/Pref.module.css";
import {
  adjustWithRegion,
  getPrefs,
  getPrefsData,
  updateRegion,
  updateSelect,
  updateSelectbyRegi,
} from "../compfuncs/pref";

interface props {
  selPrefs: pref[];
  setPrefs: (prefs: pref[]) => void;
}

export default function Pref(props: props) {
  /* 都道府県state */
  const [prefs, setPrefs] = useState<pref[]>([]);
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
            <div className={styles.prefview}>
            {region.prefs.map((pref, pkey) => {
              return (
                <div key={pkey} className={styles.iitem}>
                  <input
                    type="checkbox"
                    id={"pref" + pref.prefCode}
                    name={pref.prefName}
                    checked={props.selPrefs.indexOf(pref) != -1} // checkがここで管理しきれなくなるから
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
                      if(checked === false && selRegionKey.indexOf(rkey)!==-1){
                        setSelRegionKey([...selRegionKey].filter((item)=>{
                          return item !== rkey;
                        }))
                      }else if(checked === true){
                        let exi = true;
                        for(let i = 0; i < region.prefs.length ;i++){
                          if([...props.selPrefs,pref].indexOf(region.prefs[i]) === -1){
                            exi = false;
                            break;
                          }
                        }
                        if(exi){
                          setSelRegionKey([...selRegionKey,rkey]);
                        }
                      }
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
      })}
    </section>
  );
}
