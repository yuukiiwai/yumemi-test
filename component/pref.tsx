import { FC, useEffect, useState } from "react";
import { handleResErr } from "../constant/funcs";
import { pref } from "../types/data";

const Pref: FC = () => {
  const [prefs,setPrefs] = useState<pref[]>([]);
  const getPrefs = (json : any) => {
    return json.result;
  }

  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_API_ORIGIN === undefined ||
      process.env.NEXT_PUBLIC_API_VER_POINT === undefined ||
      process.env.NEXT_PUBLIC_API_KEY === undefined
    ) {
      return;
    }
    const url =
      process.env.NEXT_PUBLIC_API_ORIGIN +
      process.env.NEXT_PUBLIC_API_VER_POINT +
      "prefectures";
    const apikey = process.env.NEXT_PUBLIC_API_KEY;
    fetch(url, {
      headers: {
        "X-API-KEY": apikey,
      },
    })
    .then(handleResErr)
      .then((res) => res.json())
      .then(json=>{
        setPrefs(getPrefs(json));
      })
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <div>
      <p>都道府県</p>
      {prefs.map((pref,key)=>{
        return(
          <span key={key}>
            <input type={"checkbox"} id={pref.prefCode.toString()} name={pref.prefName}  />
            <label htmlFor={pref.prefCode.toString()}>{pref.prefName}</label>
          </span>
        );
      })}
    </div>
  );
};
export default Pref;
