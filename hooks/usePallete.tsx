import { useQuery } from "react-query";

export function usePallete(id: number) {
  return useQuery(["pallete", id], () => {
    return fetch(`/api/palletes/${id}`).then((res) => res.json());
  });
}
