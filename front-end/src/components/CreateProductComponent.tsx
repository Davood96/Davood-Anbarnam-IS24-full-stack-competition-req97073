import React, { useState } from "react";
import DatePicker from "react-date-picker";
import { useNavigate } from "react-router-dom";
import {
  Formik,
  Form,
  Field,
  FieldArray,
  FieldProps,
  FormikErrors,
} from "formik";
import {
  dateoToStr,
  MAX_DEVS_PER_PRODUCT,
  ProductPostDto,
} from "../dto/product";

interface CreateProductComponentProps {
  Developers: string[];
  productName: string;
  productOwnerName: string;
  scrumMasterName: string;
  methodology: "Agile" | "Waterfall";
  startDate: Date;
}

const buildProductDto = (
  data: CreateProductComponentProps
): ProductPostDto => ({
  ...data,
  Developers: data.Developers.map((dev) => dev.trim()),
  startDate: dateoToStr(data.startDate),
  productName: data.productName.trim(),
  productOwnerName: data.productOwnerName.trim(),
  scrumMasterName: data.scrumMasterName.trim(),
});

const DatePickerField: React.FC<FieldProps> = ({ field, form }) => (
  <div>
    <DatePicker
      format="yyyy/MM/dd"
      {...field}
      value={field.value}
      onChange={(val: Date) => form.setFieldValue(field.name, val)}
    />
  </div>
);

const CreateProductFormComponent: React.FC<{
  data: CreateProductComponentProps;
}> = (props) => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (
    values: CreateProductComponentProps
  ): Promise<void> => {
    setError(false);
    const dto = buildProductDto(values);
    try {
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
      });
      if (res.ok) {
        alert("Create Successful!");
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
          Something went wrong when creating the product. Please try again
        </div>
      )}
      <Formik
        initialValues={props.data}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors: FormikErrors<CreateProductComponentProps> = {};
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
        {({ values, errors, touched }) => (
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
              {touched.productName && errors.productName && (
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
              {touched.productOwnerName && errors.productOwnerName && (
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
              {touched.productOwnerName && errors.scrumMasterName && (
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
            <div>
              <label
                htmlFor={`startDate`}
                style={{ marginBottom: "4px", display: "inline-block" }}
              >
                Start Date
              </label>
              <Field name="startDate" component={DatePickerField} />
            </div>
            <label
              htmlFor={`data.Developers`}
              style={{ marginBottom: "4px", display: "inline-block" }}
            >
              Developers
            </label>
            {touched.productOwnerName &&
              errors.Developers &&
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

export const CreateProductComponent: React.FC<Record<string, never>> = () => {
  const defaultData: CreateProductComponentProps = {
    Developers: [],
    productName: "",
    productOwnerName: "",
    scrumMasterName: "",
    methodology: "Agile",
    startDate: new Date(),
  };
  return <CreateProductFormComponent data={defaultData} />;
};
