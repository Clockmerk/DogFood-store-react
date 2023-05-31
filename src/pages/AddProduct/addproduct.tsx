import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppSelector } from "../../redux/store";
import { useMutation } from "@tanstack/react-query";
import { fetchAddProduct } from "../../api/products";
import { AddProductType } from "../../types/types";

const addProductSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  wight: Yup.string().required("Required"),
  discount: Yup.number().required("Required"),
  stock: Yup.number().required("Required"),
  description: Yup.string().required("Required"),
  pictures: Yup.string().required("Required"),
});

export const AddProduct = () => {
  const { token } = useAppSelector((state) => state.user);

  const initialValues: AddProductType = {
    name: "",
    price: 0,
    wight: "",
    discount: 0,
    stock: 1,
    description: "",
    pictures: "",
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (values: AddProductType) => {
      const res = await fetchAddProduct(token, values);
      const responce = await res.json();
      if (res.ok) {
        return responce;
      }
      return console.log(responce.message);
    },
  });

  const onSubmit = async (values: AddProductType, { resetForm }: any) => {
    console.log(values);
    await mutateAsync(values);
    resetForm();
  };

  return (
    <div>
      <h2>Добавление своего товара</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={addProductSchema}
      >
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "200px",
          }}
        >
          <Field name="name" placeholder="Название товара" type="text" />
          <Field name="price" placeholder="Цена" type="number" />
          <Field name="wight" placeholder="Вес" type="text" />
          <Field name="discount" placeholder="Цена" type="number" />
          <Field name="stock" placeholder="Цена" type="number" />
          <Field name="description" placeholder="Описание" type="text" />
          <Field name="pictures" placeholder="Фото товара" type="text" />
          <div style={{ marginTop: "10px" }}>
            <button type="submit">Подтвердить</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
