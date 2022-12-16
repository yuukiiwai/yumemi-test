import { handleResErr } from "../constant/funcs";
import { pref } from "../types/data";

export const getPrefsData = (json: any) => {
  // fetchで返ってくる型に無駄な情報があるので
  return json.result;
};

export const updateSelect = (
  flag: boolean,
  prefs: pref[],
  nextPref: pref,
  setPrefs: (prefs: pref[]) => void,
) => {
  /* select要素の更新 */
  let nowSelect = [...prefs]; //お手軽ディープコピー
  if (flag) {
    /* もし追加なら、stateの特性を避けつつ追加 */
    nowSelect.push(nextPref);
    setPrefs(nowSelect);
  } else {
    /* 削除はfilterを使う。同じくstateの特性を避けてset */
    nowSelect = nowSelect.filter((item) => {
      return item.prefCode !== nextPref.prefCode;
    });
    setPrefs(nowSelect);
  }
};

export const getPrefs = async (url: string, apikey: string) => {
  /* 通信 */
  const data = await fetch(url, {
    headers: {
      "X-API-KEY": apikey,
    },
  })
    .then(handleResErr)
    .then((res) => res.json());
  return data;
};
