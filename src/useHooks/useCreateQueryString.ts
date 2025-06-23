import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export default function useCreateQueryString() {
  const [searchParams] = useSearchParams();
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      let queries: { [key: string]: string } = {};
      searchParams.forEach((value, key) => {
        queries[key] = value;
      });
      const params = new URLSearchParams(queries);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return createQueryString;
}
