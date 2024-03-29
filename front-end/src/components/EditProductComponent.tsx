import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray, FormikErrors } from "formik";
import { MAX_DEVS_PER_PRODUCT, ProductPatchDto } from "../dto/product";

interface EditProductComponentProps {
  productId: string;
  Developers: string[];
  productName: string;
  productOwnerName: string;
  scrumMasterName: string;
  methodology: "Agile" | "Waterfall";
}

const buildProductDto = (data: EditProductComponentProps): ProductPatchDto => ({
  Developers: data.Developers.map((dev) => dev.trim()),
  productName: data.productName.trim(),
  productOwnerName: data.productOwnerName.trim(),
  scrumMasterName: data.scrumMasterName.trim(),
  methodology: data.methodology,
});

const EditProductFormComponent: React.FC<{
  data: EditProductComponentProps;
}> = (props) => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (
    values: EditProductComponentProps
  ): Promise<void> => {
    setError(false);
    try {
      const res = await fetch(
        `http://localhost:3000/api/products/${values.productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(buildProductDto(values)),
        }
      );
      if (res.ok) {
        alert("Edit Successful!");
        navigate("/");
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  return (
    <div>
      {error && (
        <div style={{ color: "red", marginBottom: "4px" }}>
          Someething went wrong when editing the product. Please try again
        </div>
      )}
      <Formik
        initialValues={props.data}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors: FormikErrors<EditProductComponentProps> = {};
          if (values.Developers.some((dev) => dev.trim() === "")) {
            errors.Developers = ["Developer name must not be empty"];
          }
          // Check for duplicate names
          if (
            new Set(values.Developers.map((dev) => dev.trim())).size <
            values.Developers.length
          ) {
            if (errors.Developers) {
              if (typeof errors.Developers === "string") {
                errors.Developers = [
                  errors.Developers,
                  "Developer names must be unique",
                ];
              } else {
                errors.Developers?.push("Developer names must be unique");
              }
            } else {
              errors.Developers = ["Developer names must be unique"];
            }
          }
          if (values.productName.trim() === "") {
            errors.productName = "Product Name must not be empty";
          }
          if (values.productOwnerName.trim() === "") {
            errors.productOwnerName = "Product Owner must not be empty";
          }
          if (values.scrumMasterName.trim() === "") {
            errors.scrumMasterName = "Scrum Master must not be empty";
          }
          return errors;
        }}
      >
        {({ values, errors }) => (
          <Form>
            <div>
              <label
                htmlFor={`productName`}
                style={{
                  marginBottom: "4px",
                  marginRight: "4px",
                  display: "inline-block",
                }}
              >
                Product Name
              </label>
              <Field name="productName" type="text" />
              {errors.productName && (
                <div style={{ color: "red", marginBottom: "4px" }}>
                  *{errors.productName}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor={`productOwnerName`}
                style={{
                  marginBottom: "4px",
                  marginRight: "4px",
                  display: "inline-block",
                }}
              >
                Product Owner
              </label>
              <Field name="productOwnerName" type="text" />
              {errors.productOwnerName && (
                <div style={{ color: "red", marginBottom: "4px" }}>
                  *{errors.productOwnerName}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor={`scrumMasterName`}
                style={{
                  marginBottom: "4px",
                  marginRight: "4px",
                  display: "inline-block",
                }}
              >
                Scrum Master
              </label>
              <Field name="scrumMasterName" type="text" />
              {errors.scrumMasterName && (
                <div style={{ color: "red", marginBottom: "4px" }}>
                  *{errors.scrumMasterName}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor={`methodology`}
                style={{
                  marginBottom: "4px",
                  marginRight: "4px",
                  display: "inline-block",
                }}
              >
                Methodology
              </label>
              <Field name="methodology" as="select">
                <option value="Agile">Agile</option>
                <option value="Waterfall">Waterfall</option>
              </Field>
            </div>
            <label
              htmlFor={`data.Developers`}
              style={{ marginBottom: "4px", display: "inline-block" }}
            >
              Developers
            </label>
            {errors.Developers &&
              (typeof errors.Developers === "string" ? (
                <div style={{ color: "red", marginBottom: "4px" }}>
                  *{errors.Developers}
                </div>
              ) : (
                errors.Developers.map((error) => (
                  <div style={{ color: "red", marginBottom: "4px" }}>
                    *{error}
                  </div>
                ))
              ))}
            <FieldArray
              name="Developers"
              render={(arrayHelpers) => (
                <div style={{ marginBottom: "8px" }}>
                  {values.Developers &&
                    values.Developers.length > 0 &&
                    values.Developers.map((_dev, index) => (
                      <div key={index}>
                        <Field
                          name={`Developers.${index}`}
                          placeholder="Jane Doe"
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          -
                        </button>
                      </div>
                    ))}
                  {values.Developers.length < MAX_DEVS_PER_PRODUCT && (
                    <button type="button" onClick={() => arrayHelpers.push("")}>
                      {/* show this when less than 5 devs are in the list */}
                      Add a Developer
                    </button>
                  )}
                </div>
              )}
            />
            <div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const EditProductComponent: React.FC<Record<string, never>> = () => {
  const location = useLocation();
  const product: EditProductComponentProps = location.state;
  return <EditProductFormComponent data={product} />;
};
