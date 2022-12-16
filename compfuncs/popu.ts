import { population, pref } from "../types/data";

export const assemblePopu = async (
  root_url: string,
  apikey: string,
  prefs: pref[],
) => {
  /* 人口を通信でgetする - ループもさせる - */
  let newpopus: population[] = [];

  for (let i = 0; i < prefs.length; i++) {

    const res = await fetch(root_url + prefs[i].prefCode, {
      headers: {
        "X-API-KEY": apikey,
      },
    });
    const json = await res.json();
    
    let _popu: population = {
      pref: prefs[i],
      data: json.result.data[0].data,
    };
    newpopus.push(_popu);
  }
  return newpopus;
};
