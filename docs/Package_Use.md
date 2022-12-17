# Recharter
## ResponsiveContainer
widthとheightを100%にすると、これを囲んだdivのサイズに可動してくれる
## LineChart
Responsiveしたらサイズはあんまり気にしない
### 使用データ
```
{
    name:アイテム名
    data:[{x:値,y:値},{x:値,y:値}]
}
```
上記のようにするとアイテム名になる部分と時系列データをプロットできる。
今使ってる型
```
{
  pref:pref;
  data:{
    year:number;
    value:number;
  }[];
}[]
```
型例
```
[
  {
    "pref":{"prefCode":1,"prefName":"北海道"},
    "data":[
      {"year":1960,"value":10000},
      {"year":1965,"value":20000}
    ]
  },
  {
    "pref":{"prefCode":2,"prefName":"青森県"},
    "data":[
      {"year":1960,"value":10000},
      {"year":1965,"value":20000}
    ]
  }
]
```
## XAxis
|項目名|現在値|備考|
|:-:|:-:|:-:|
|dataKey|year|上のデータでx軸に使いたい値の文字列|
|type|category|こうしておくと時系列の折れ線グラフを作れる|

## YAxis
|項目名|現在値|備考|
|:-:|:-:|:-:|
|dataKey|year|上のデータでy軸に使いたい値の文字列|

## Tooltip
これがあるとマウスを近づけたときにどの値を指したか表示できる

## Legend
凡例を表示できる