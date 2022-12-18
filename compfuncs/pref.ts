import { region_pref } from "../constant/data";
import { handleResErr } from "../constant/funcs";
import { pref, region } from "../types/data";

export const getPrefsData = (json: any) => {
  // fetchで返ってくる型に無駄な情報があるので
  return json.result;
};

export const updateSelect = (
  flag: boolean, // checkしたor外した
  prefs: pref[], // 現状
  nextPref: pref, // 今から入れたいor消したい
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

export const updateSelectbyRegi = (
  flag: boolean, // checkしたor外した
  prefs: pref[], // 現状
  nextPrefs: pref[], // 今から入れたいor消したい
  setPrefs: (prefs: pref[]) => void,
) => {
  /* regionの選択で全部上書きする */

  let nowSelect = [...prefs]; // お手軽ディープコピー

  if (flag) {
    /* 追加なら */
    /* 新しく追加する県をリスト化 */
    let newPushList: pref[] = nextPrefs.filter((item) => {
      // 追加する分は地方の中の
      return nowSelect.indexOf(item) == -1; // 現在セレクトされていないitemである
    });
    /* 最新状態に遷移 */
    nowSelect.push(...newPushList);
    setPrefs(nowSelect);
  } else {
    /* 削除なら */
    nowSelect = nowSelect.filter((item) => {
      // 現在セレクトされている中に
      return nextPrefs.indexOf(item) == -1; // nextPrefsに含まれなければtrue
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

export const adjustWithRegion = (originPrefs: pref[]) => {
  let japan: region[] = []; // 最終的なデータ

  for (let i = 0; i < region_pref.length; i++) {
    /* 地域データを作成 */
    let _regionName = region_pref[i].region;
    let _prefs: pref[] = [];

    for (let j = 0; j < originPrefs.length; j++) {
      /* 地域に都道府県を属させる */
      if (
        region_pref[i].prefs.indexOf(originPrefs[j].prefName) != -1
      ) {
        /* 属していれば、追加 */
        _prefs.push(originPrefs[j]);
      }
    }

    const _region: region = {
      regionName: _regionName,
      prefs: _prefs,
    };

    japan.push(_region);
  }

  return japan;
};

export const updateRegion = (
  checked: boolean,
  newkey: number,
  selRegionKey: number[],
  setSelRegionKey: (keys: number[]) => void,
) => {
  let nowRegionKeys = [...selRegionKey];
  if (checked) {
    nowRegionKeys.push(newkey);
    setSelRegionKey(nowRegionKeys);
  } else {
    nowRegionKeys = nowRegionKeys.filter((item) => {
      return item !== newkey;
    });
    setSelRegionKey(nowRegionKeys);
  }
};