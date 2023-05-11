import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { signUpFetch } from "../../api/api/api";
import { useMutation } from "@tanstack/react-query";
import { SignUpProps, ValuesSignUpType } from "../../types/types";

const signInSchema = Yup.object().shape({
  email: Yup.string().email("Некорректный email").required("Required"),
  password: Yup.string().required("Required"),
  group: Yup.string().required("Required"),
});

export const SignUp = ({ activeTab }: SignUpProps) => {
  const initialValues: ValuesSignUpType = {
    email: "",
    password: "",
    group: "group-11",
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (values: ValuesSignUpType) => {
      const res = await signUpFetch(values);
      const responce = await res.json();
      if (res.ok) {
        return responce;
      }
      return alert(responce.message);
    },
  });

  const onSubmit = async (values: ValuesSignUpType) => {
    const responce = await mutateAsync(values);
    if (responce == undefined) return;
    alert("Вы успешно зарегистрированы, войдите в кабинет");
    return activeTab("tab1");
  };

  return (
    <div>
      <h1>Зарегистрируйтесь в кабинете</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={signInSchema}
      >
        <Form>
          <Field name="email" placeholder="example@mail.ru" type="email" />
          <Field name="password" placeholder="Пароль" type="password" />
          <Field name="group" as="select">
            <option value="group-9">gr-9</option>
            <option value="group-10">group-10</option>
            <option value="group-11">group-11</option>
          </Field>
          <button type="submit">Подтвердить</button>
        </Form>
      </Formik>
    </div>
  );
};
