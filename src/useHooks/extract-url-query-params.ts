import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

//axios instace interceptor for access token integration and refresh tokens
export default function useExtractUrlParams<T>(initialData: T) {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<T>(initialData);

  const extractParams = useCallback(async () => {
    const state = { ...initialData };
    searchParams.forEach((value, key) => {
      state[key as keyof T] = value?.split("+").join(" ") as T[keyof T];
    });
    setData(state);
  }, [searchParams]);

  useEffect(() => {
    extractParams();
  }, [searchParams]);

  return [data];
}
