# リファクタリング
* コメント
# デザイン
これはブランチを分ける
## 気になるところ
1. チェックボックスの並び
1. グラフの大きさ
1. グラフ色
1. グラフの数字が大きくなると画面外に出る->Y軸のwidthを調整すると出てくる
## 良くない設計
* 更新する関数も引数として渡していてpureじゃない->pure化する