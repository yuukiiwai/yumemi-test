export type pref = {
  prefCode: number;
  prefName: string;
};

export type region = {
  regionName: string;
  prefs: pref[];
};

export type population = {
  pref: pref;
  data: { year: number; value: number }[];
};
