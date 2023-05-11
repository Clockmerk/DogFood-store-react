import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUpUser } from "../../redux/slices/userSlice";
import { ValuesSignInType } from "../../types/types";
import { signInFetch } from "../../api/api/api";

const signInSchema = Yup.object().shape({
  email: Yup.string().email("Некорректный email").required("Required"),
  password: Yup.string().required("Required"),
});

export const SignIn = () => {
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
    // Типизировать any
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
        <Form>
          <Field name="email" placeholder="example@mail.ru" type="email" />
          <Field name="password" placeholder="Пароль" type="password" />
          <button type="submit">Войти</button>
          <p>Если вы не зарегистрированы, зарегистрируйтесь.</p>
        </Form>
      </Formik>
    </div>
  );
};
