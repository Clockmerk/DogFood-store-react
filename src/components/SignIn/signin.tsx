import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUpUser } from "../../redux/slices/userSlice";
import { ValuesSignInType } from "../../types/types";
import { signInFetch } from "../../api/user";
import { useChangeInputType } from "../../hooks/useChangeInputType";
import styles from "./signin.module.css";

const signInSchema = Yup.object().shape({
  email: Yup.string().email("Некорректный email").required("Email обязателен"),
  password: Yup.string().required("Введите пароль"),
});

export const SignIn = () => {
  const { inputType, changeType } = useChangeInputType();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues: ValuesSignInType = {
    email: "",
    password: "",
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (values: ValuesSignInType) => {
      const res = await signInFetch(values);
      const responce = await res.json();
      if (res.ok) {
        return responce;
      }
      return alert(responce.message);
    },
  });

  const onSubmit = async (values: ValuesSignInType) => {
    const responce = await mutateAsync(values);
    dispatch(setUpUser({ ...responce.data, token: responce.token }));
    return navigate("/catalog");
  };

  return (
    <div>
      <h1>Войдите в кабинет</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={signInSchema}
      >
        <Form className={styles.form}>
          <Field name="email" placeholder="example@mail.ru" type="email" />
          <ErrorMessage
            className={styles.error}
            component="span"
            name="email"
          />
          <div>
            <Field
              name="password"
              placeholder="Пароль"
              type={inputType}
              style={{ marginRight: "-10px", marginLeft: "28px" }}
            />
            <button type="button" onClick={changeType}>
              👁
            </button>
          </div>

          <ErrorMessage
            className={styles.error}
            component="span"
            name="password"
          />

          <button style={{ marginTop: "10px" }} type="submit">
            Войти
          </button>
          <p>Если вы не зарегистрированы, зарегистрируйтесь.</p>
        </Form>
      </Formik>
    </div>
  );
};
