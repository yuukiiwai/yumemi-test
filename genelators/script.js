var rgb = require("hsv-rgb");

/* think.mdにロジック記載 */
function genColorHSV() {
  const originH = [
    0, 30, 120, 150, 180, 210, 240, 270, 300, 330,
  ];
  const originS = [100, 75, 50];
  const originV = [100, 75, 40];
  let hsvlist = [];
  for (let v = 0; v < originV.length; v++) {
    for (let s = 0; s < originS.length; s++) {
      for (let h = 0; h < originH.length; h++) {
        hsvlist.push([originH[h], originS[s], originV[v]]);
      }
    }
  }
  return hsvlist;
}

function getRGBs(hsvlist) {
  let list = [];
  for (let i = 0; i < hsvlist.length; i++) {
    list.push(rgb(hsvlist[i][0], hsvlist[i][1], hsvlist[i][2]));
  }
  return list;
}

/* rgb(R,G,B)の文字列リストを出力 */
function toStringColor(list) {
  let strlist = [];
  for (let i = 0; i < list.length; i++) {
    strlist.push("rgb(" + list[i] + ")");
  }
  return strlist;
}

const colorAllhsv = genColorHSV();
const colorAllrgb = getRGBs(colorAllhsv);
const colorStr = toStringColor(colorAllrgb);

/* 出力 */
var fs = require("fs");
fs.writeFile(
  "./constant/color.json",
  JSON.stringify(colorStr),
  (err, data) => {
    if (err) console.log(err);
    else console.log("write end");
  },
);

/* 終了時のメッセージ */
console.log(colorAllhsv.length);
