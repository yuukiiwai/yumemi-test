import { useEffect, useState } from "react";
import { handleResErr } from "../constant/funcs";
import { population, pref } from "../types/data";

interface props {
  selPrefs: pref[];
}

export default function Population(props: props) {
  const [populations, setPopus] = useState<population[]>([]);

  const assemblePopu = async (root_url: string, apikey: string) => {
    let newpopus: population[] = [];

    for (let i = 0; i < props.selPrefs.length; i++) {
      const res = await fetch(root_url + props.selPrefs[i].prefCode, {
        headers: {
          "X-API-KEY": apikey,
        },
      });
      const json = await res.json();
      let _popu: population = {
        prefName: props.selPrefs[i].prefName,
        data: json.result.data[0].data,
      };
      newpopus.push(_popu);
    }
    return newpopus;
  };

  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_API_ORIGIN === undefined ||
      process.env.NEXT_PUBLIC_API_VER_POINT === undefined ||
      process.env.NEXT_PUBLIC_API_KEY === undefined
    ) {
      return;
    }
    const root_url =
      process.env.NEXT_PUBLIC_API_ORIGIN +
      process.env.NEXT_PUBLIC_API_VER_POINT +
      "population/composition/perYear?prefCode=";
    const apikey = process.env.NEXT_PUBLIC_API_KEY;
    assemblePopu(root_url, apikey).then((res) => setPopus(res));
  }, []);

  return (
    <div>
      <p>{JSON.stringify(populations)}</p>
    </div>
  );
}
