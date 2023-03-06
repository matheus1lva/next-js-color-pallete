import { useQuery } from "react-query";

export function usePalletes() {
  return useQuery(["palletes"], async () => {
    return fetch("/api/palletes").then((res) => res.json());
  });
}
