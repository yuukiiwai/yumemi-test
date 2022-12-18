import { region_pref } from "../constant/data";
import { handleResErr } from "../constant/funcs";
import { pref, region } from "../types/data";

/* fetchで返ってくる型に無駄な情報があるので */
export const getPrefsData = (json: any) => {
  return json.result;
};

/* 県名をクリックして選択情報を更新する */
export const updateSelect = (
  flag: boolean, // checkしたor外した
  prefs: pref[], // 現状
  nextPref: pref, // 今から入れたいor消したい
) => {
  /* select要素の更新 */

  if (flag) {
    /* もし追加なら、stateの特性を避けつつ追加 */
    return [...prefs, nextPref];
  } else {
    let nowSelect = [...prefs]; //お手軽ディープコピー
    /* 削除はfilterを使う。同じくstateの特性を避けてset */
    nowSelect = nowSelect.filter((item) => {
      return item.prefCode !== nextPref.prefCode;
    });
    return nowSelect;
  }
};

/* 選択情報を地域選択で更新する */
export const updateSelectbyRegi = (
  flag: boolean, // checkしたor外した
  prefs: pref[], // 現状
  nextPrefs: pref[], // 今から入れたいor消したい
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
    /* 最新状態はnowとnewの連結 */
    return [...nowSelect, ...newPushList];
  } else {
    /* 削除なら */
    nowSelect = nowSelect.filter((item) => {
      // 現在セレクトされている中に
      return nextPrefs.indexOf(item) == -1; // nextPrefsに含まれなければtrue
    });
    return nowSelect;
  }
};

/* 通信 */
export const getPrefs = async (url: string, apikey: string) => {
  const data = await fetch(url, {
    headers: {
      "X-API-KEY": apikey,
    },
  })
    .then(handleResErr)
    .then((res) => res.json());
  return data;
};

/* 県名データを地域ごとに振り分ける */
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

/* 地域自体の選択情報変更 */
export const updateRegion = (
  checked: boolean,
  newkey: number,
  selRegionKey: number[],
) => {
  if (checked) {
    return [...selRegionKey, newkey];
  } else {
    let nowRegionKeys = [...selRegionKey];
    nowRegionKeys = nowRegionKeys.filter((item) => {
      return item !== newkey;
    });
    return nowRegionKeys;
  }
};

/* 県名クリックから新しい地域選択をリターンする */
export const getRegionStatebyPref = (
  checked: boolean,
  selPrefs: pref[],
  selRegionKey: number[],
  regionkey: number,
  tagPref: pref,
  tagRegion: region,
) => {
  if (checked === false && selRegionKey.indexOf(regionkey) !== -1) {
    /* チェックを解除し 
    地域が選択状態だったら
    */
    return [...selRegionKey].filter((item) => {
      return item !== regionkey;
    });
    // その地域を削除したものをリターン
  } else if (checked === true) {
    /* チェックを新たにしたら */
    let newselPref = [...selPrefs, tagPref];

    for (let i = 0; i < tagRegion.prefs.length; i++) {
      /* 地域内すべてが選択状態になっているか確認 */
      if (newselPref.indexOf(tagRegion.prefs[i]) === -1) {
        /* なっていなければその場でリターン */
        return selRegionKey;
      }
    }
    /* 通過すれば地域を足したものをリターン */
    return [...selRegionKey, regionkey];
  }
  return selRegionKey;
};
