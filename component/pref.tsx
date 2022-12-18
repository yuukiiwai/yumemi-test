import { pref, region } from "../types/data";

import styles from "../styles/Pref.module.css";
import { ChangeEvent } from "react";
import {
  getRegionStatebyPref,
  updateSelect,
} from "../compfuncs/pref";

interface props {
  parentReg: region;
  parentRkey: number;
  selPrefs: pref[];
  setPrefs: (prefs: pref[]) => void;
  selRegions: number[];
  setRegions: (rkey: number[]) => void;
}

export default function Pref(props: props) {
  return (
    <div className={styles.prefview}>
      {props.parentReg.prefs.map((pref, pkey) => {
        return (
          <div key={pkey} className={styles.iitem}>
            <input
              type="checkbox"
              id={"pref" + pref.prefCode}
              name={pref.prefName}
              checked={props.selPrefs.indexOf(pref) != -1} // checkがここで管理しきれなくなるから
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                let checked = event.target.checked;
                /* 選択県状態を更新 */
                updateSelect(
                  checked,
                  props.selPrefs,
                  pref,
                  props.setPrefs,
                );

                /* 新しい選択地域状態を取得 */
                let newSelReg = getRegionStatebyPref(
                  checked,
                  props.selPrefs,
                  props.selRegions,
                  props.parentRkey,
                  pref,
                  props.parentReg,
                );
                props.setRegions(newSelReg); //更新
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
}
