import { ChangeEvent, useEffect, useState } from "react";
import { handleResErr } from "../constant/funcs";
import { pref } from "../types/data";

interface props {
  selPrefs : pref[]
  setPrefs : (prefs:pref[])=>void
}

export default function Pref(props:props){
  /* 都道府県state */
  const [prefs, setPrefs] = useState<pref[]>([]);
  const getPrefs = (json: any) => { // fetchで返ってくる型に無駄な情報があるので
    return json.result;
  };

  const updateSelect = (flag:boolean,nextPref:pref) => {
    /* select要素の更新 */
    let nowSelect = [...props.selPrefs]; //お手軽ディープコピー
    if(flag){
      /* もし追加なら、stateの特性を避けつつ追加 */
      nowSelect.push(nextPref);
      props.setPrefs(nowSelect);
    }else{
      /* 削除はfilterを使う。同じくstateの特性を避けてset */
      nowSelect = nowSelect.filter((item)=>{
        return item.prefCode !== nextPref.prefCode
      });
      props.setPrefs(nowSelect);
    }
  }

  /* 都道府県を取得する */
  useEffect(() => {
    if ( // 余計な?やasを発生させないため
      process.env.NEXT_PUBLIC_API_ORIGIN === undefined ||
      process.env.NEXT_PUBLIC_API_VER_POINT === undefined ||
      process.env.NEXT_PUBLIC_API_KEY === undefined
    ) { // ダメな訳ないがダメだったら動かせないので。
      return;
    }

    const url =
      process.env.NEXT_PUBLIC_API_ORIGIN +
      process.env.NEXT_PUBLIC_API_VER_POINT +
      "prefectures";
    const apikey = process.env.NEXT_PUBLIC_API_KEY;

    /* 通信 */
    fetch(url, {
      headers: {
        "X-API-KEY": apikey,
      },
    })
      .then(handleResErr)
      .then((res) => res.json())
      .then((json) => {
        setPrefs(getPrefs(json));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <p>都道府県</p>
      {prefs.map((pref, key) => {
        return (
          <span key={key}>
            <input
              type={"checkbox"}
              id={"pref"+pref.prefCode}// idを被らせないように
              name={pref.prefName}
              onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                /* onchangeでselectした都道府県を更新 */
                let checked = event.target.checked;
                updateSelect(checked,pref);
              }}
            />
            <label htmlFor={"pref"+pref.prefCode}>
              {pref.prefName}
            </label>
          </span>
        );
      })}
    </div>
  );
};
