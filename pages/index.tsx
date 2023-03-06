import { useFormik } from "formik";
import { Header } from "../components/Header/Header";
import { useInsertPallete } from "../hooks/useInsertPallete";

const Home = () => {
  const palleteAction = useInsertPallete();
  const formik = useFormik({
    initialValues: {
      colors: [],
      color: "",
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.color.startsWith("#") && values.colors.length === 0) {
        errors.color = "Color must start with #";
      }
      if (values.colors.length === 0) {
        errors.colors = "You must add at least one color";
      }
      return errors;
    },
    validateOnBlur: true,
    onSubmit: (values) => {
      formik.resetForm();
      palleteAction.mutate({
        colors: values.colors,
      });
    },
  });
  return (
    <div>
      <Header />
      <div
        style={{
          width: "300px",
          gap: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {formik.errors && (
          <div style={{ color: "black", background: "red" }}>
            {Object.values(formik.errors).map((error) => {
              return <div>{error as any}</div>;
            })}
          </div>
        )}
        <div>
          Colors added to your pattern: {formik.values.colors.join(", ")}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <div>Type a color hex</div>
          <input
            type="text"
            value={formik.values.color}
            onChange={(e) => formik.setFieldValue("color", e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              formik.setFieldValue("colors", [
                ...formik.values.colors,
                formik.values.color,
              ]);
              formik.setFieldValue("color", "");
              formik.setErrors({});
            }}
          >
            Add to color pallete
          </button>
          <button
            type="button"
            onClick={() => {
              formik.submitForm();
            }}
          >
            Save color pallete
          </button>
        </div>
        <div
          style={{
            color: formik.values.color,
          }}
        >
          Your current color is {formik.values.color}
        </div>
      </div>
    </div>
  );
};

export default Home;
