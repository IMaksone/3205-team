import { useEffect } from "react";

export const useAsyncEffect = (callback: () => void, dependencies?: any[]) => {
  useEffect(() => {
    callback();
  }, dependencies);
};

export default useAsyncEffect;
