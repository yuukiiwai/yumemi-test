# 考えをまとめるファイル
## 地方名で分けて表示
### 現状メモ
```
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
```
### 現状の問題点
1. 表示に望ましい形は何か
1. selPrefsの管理に望ましい形は何か
1. 上を満たして動かせるか
### 検証1-表示に望ましい形
```
japan:{
  region:string,
  prefs:pref[]
}[]
```
上記の形ならまずregionでループ、その中でprefsでループさせれば地域ごとの塊を作れる
### 検証2-selPrefs-
selPrefsは
```
{pref:pref}[]
```
で現在運営しているし、そのほうがいい。
### 検証3-どちらも満たせるか
前提
* 検証1の通り、regionで分けられた表示になっている  
* グラフや人口は今までと同じ形になっている

selPrefsの選択フロー
1. 表示されているprefsがsetPrefsを呼ぶ
1. selPrefsが更新される
1. 人口データの取得が走る

selPrefsの選択解除フローは選択フローとほぼ同じなので上ができれば問題ない

### 作り中の詳細設計
1. 地域名のクリックで内部のチェックはすべて上書きする
1. 地域チェックが入った状態で県名チェックを外したら地域チェックは外したい
1. 地域内のすべての県名チェックをしたら、地域チェックが入るようにするのは、微妙。
## グラフ色を自動生成
### 手作業の手順
HSVで
* Hを黄色を除いて回す
* Sを少しずつ減らす
* Vを少しずつ減らす
を繰り返す。