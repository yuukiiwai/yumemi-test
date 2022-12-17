import { useLayoutEffect, useState } from "react";

export const handleResErr = (res: Response) => {
  /* fetchの4xxや5xxエラーを判定する */
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res;
};

export const useWindowSize = (): number[] => {
  /* windowのサイズを取得 */
  /* グラフのY軸の大きさがCSSで変えられなかったから */
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = (): void => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};
