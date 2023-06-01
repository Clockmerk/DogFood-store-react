import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useAppSelector } from "../../redux/store";
import { useMutation } from "@tanstack/react-query";
import { fetchAddProduct } from "../../api/products";
import { AddProductType } from "../../types/types";
import styles from "./addproduct.module.css";
import { Navigate } from "react-router-dom";

const addProductSchema = Yup.object().shape({
  name: Yup.string().required("Название обязательно"),
  price: Yup.number()
    .positive("Число должно быть положительным")
    .integer()
    .required("Укажите цену"),
  wight: Yup.string().required("Укажите вес"),
  discount: Yup.number()
    .positive("Число должно быть положительным")
    .integer()
    .required("Укажите скидку"),
  stock: Yup.number()
    .positive("Число должно быть положительным")
    .integer()
    .required("Укажите количество"),
  description: Yup.string().required("Описание обязательно"),
  pictures: Yup.string().required("Добавьте фото-ссылку на товар"),
});

export const AddProduct = () => {
  const { token } = useAppSelector((state) => state.user);

  if (!token) return <Navigate to="/auth" />;

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
        alert("Продукт добавлен");
        return responce;
      }
      return alert(responce.message);
    },
  });

  const onSubmit = async (
    values: AddProductType,
    { resetForm }: FormikHelpers<AddProductType>
  ) => {
    await mutateAsync(values);
    resetForm();
  };

  return (
    <div className={styles.addProduct}>
      <h2>Добавление своего товара</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={addProductSchema}
      >
        <Form className={styles.form}>
          <label htmlFor="name">Название товара:</label>
          <Field name="name" id="name" type="text" />
          <ErrorMessage className={styles.error} component="span" name="name" />
          <label htmlFor="price">Цена:</label>
          <Field name="price" id="price" type="number" />
          <ErrorMessage
            className={styles.error}
            component="span"
            name="price"
          />
          <label htmlFor="wight">Вес:</label>
          <Field name="wight" id="wight" type="text" />
          <ErrorMessage
            className={styles.error}
            component="span"
            name="wight"
          />
          <label htmlFor="discount">Скидка:</label>
          <Field name="discount" id="discount" type="number" />
          <ErrorMessage
            className={styles.error}
            component="span"
            name="discount"
          />
          <label htmlFor="stock">Количество:</label>
          <Field name="stock" id="stock" type="number" />
          <ErrorMessage
            className={styles.error}
            component="span"
            name="stock"
          />
          <label htmlFor="description">Описание:</label>
          <Field name="description" id="description" type="text" />
          <ErrorMessage
            className={styles.error}
            component="span"
            name="description"
          />
          <label htmlFor="pictures">Фото товара:</label>
          <Field name="pictures" id="pictures" type="text" />
          <ErrorMessage
            className={styles.error}
            component="span"
            name="pictures"
          />
          <div style={{ marginTop: "10px" }}>
            <button type="submit">Подтвердить</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
