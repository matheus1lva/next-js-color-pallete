import Link from "next/link";
import { useMutation } from "react-query";
import { Header } from "../components/Header/Header";
import { usePalletes } from "../hooks/usePalletes";

export default function General() {
  const { data, isLoading, refetch } = usePalletes();
  const mutate = useMutation((id) => {
    return fetch(`/api/palletes/${id}`, {
      method: "DELETE",
    });
  });

  return (
    <>
      <Header />
      {isLoading || (mutate.isLoading && <div>Loading...</div>)}
      {!data || data.length === 0 ? (
        <div>No palletes found, add one</div>
      ) : null}
      <div>
        {data?.map((pallete) => {
          return (
            <div
              key={pallete.id}
              style={{
                border: "1px solid #ccc",
                padding: "5px",
                marginBottom: "10px",
                width: "300px",
              }}
            >
              <div>
                colors:{" "}
                {pallete.colors.split(",").map((color) => {
                  return (
                    <span style={{ color, marginRight: "5px" }}>{color}</span>
                  );
                })}
              </div>
              <div>
                <button
                  type="button"
                  style={{ color: "red" }}
                  onClick={() => {
                    mutate.mutate(pallete.id, {
                      onSuccess: () => {
                        refetch();
                      },
                    });
                  }}
                >
                  Delete
                </button>
                <Link href={`/palletes/${pallete.id}`}>
                  <button type="button">Edit</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
