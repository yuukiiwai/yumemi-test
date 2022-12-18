function genColor(){
  let list = [];
  for(let i = 255; i > 60 ; i-= Math.round(255/4)-1){
    list.push([i,0,0]);
    list.push([0,i,0]);
    list.push([0,0,i]);
    list.push([i,i,0]);
    list.push([i,0,i]);
    list.push([0,i,i]);
    for(let j = 140; j > 60 ; j-= Math.round(255/4)-1){
      list.push([i,j,j]);
      list.push([j,i,j]);
      list.push([j,j,i]);
      for(let k = 60; k > 60 ; k-= Math.round(255/4)-1){
        list.push([i,j,k]);
        list.push([j,i,k]);
        list.push([j,k,i]);
      }
    }
  }
  return list;
};

function toStringColor(list){
  let strlist = [];
  for(let i = 0; i < list.length; i++){
    strlist.push("rgb("+list[i]+")");
  }
  return strlist;
}

const colorAll = genColor();
const colorStr = toStringColor(colorAll);

var fs = require("fs");
fs.writeFile('./constant/color.json',JSON.stringify(colorStr),(err,data)=>{
  if(err) console.log(err);
  else console.log("write end");
});

console.log(colorAll.length);