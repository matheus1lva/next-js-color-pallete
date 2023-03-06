import { useFormik } from "formik";
import { useMutation } from "react-query";
import { Header } from "../../components/Header/Header";
import { Pallete } from "../../types/pallete";

export default function Edit(props) {
  const updateMutation = useMutation((newValue: Pallete) => {
    return fetch(`/api/palletes/${props.pallete.id}`, {
      method: "PUT",
      body: JSON.stringify(newValue),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
  const formik = useFormik({
    initialValues: {
      colors: Array.isArray(props.pallete.colors?.split(","))
        ? props.pallete.colors?.split(",")
        : [props.pallete.colors],
    },
    validate: (values) => {
      const errors: Record<string, string | string[]> = {};
      if (values.colors.length === 0) {
        errors.colors = "You must add at least one color";
      } else {
        errors.colors = [];
        values.colors.forEach((c, idx) => {
          if (!c.startsWith("#")) {
            (errors.colors as string[])[idx] = "Color must start with #";
          }
        });
      }
      return errors;
    },
    onSubmit: (values) => {
      updateMutation.mutate({
        colors: values.colors,
      });
    },
  });

  return (
    <div>
      <Header />
      {formik.errors && (
        <div style={{ color: "black", background: "red" }}>
          {Object.values(formik.errors).map((error) => {
            return <div>{error as any}</div>;
          })}
        </div>
      )}
      <h1>Update pallete</h1>
      <div>
        {formik.values.colors?.map((item, index) => {
          return (
            <div key={index}>
              <input
                type="text"
                value={item}
                onChange={(evt) => {
                  const colors = [...formik.values.colors];
                  colors[index] = evt.target.value;
                  formik.setFieldValue("colors", colors);
                }}
              />
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => {
            formik.submitForm();
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = await fetch(
    `http://localhost:3000/api/palletes/${context.params.id}`
  );
  const json = await data.json();
  return {
    props: {
      pallete: json,
    },
  };
}
