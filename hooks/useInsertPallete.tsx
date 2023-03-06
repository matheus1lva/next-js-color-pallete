import { useMutation } from "react-query";
import { Pallete } from "../types/pallete";

export function useInsertPallete() {
  return useMutation((pallete: Pallete) => {
    return fetch("/api/palletes", {
      method: "POST",
      body: JSON.stringify(pallete),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
}
