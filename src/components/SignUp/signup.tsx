import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { signUpFetch } from "../../api/user";
import { useMutation } from "@tanstack/react-query";
import { SignUpProps, ValuesSignUpType } from "../../types/types";
import { useChangeInputType } from "../../hooks/useChangeInputType";
import styles from "./signup.module.css";

const signInSchema = Yup.object().shape({
  email: Yup.string().email("Некорректный email").required("Введите почту"),
  name: Yup.string().required("Заполните имя"),
  password: Yup.string().required("Введите пароль"),
  group: Yup.string().required("Введите группу"),
});

export const SignUp = ({ activeTab }: SignUpProps) => {
  const { inputType, changeType } = useChangeInputType();
  const initialValues: ValuesSignUpType = {
    email: "",
    password: "",
    group: "group-11",
    name: "",
    about: "Не указано",
    avatar: "https://lipa.ac.uk/assets/img/avatar.webp",
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

    return activeTab(0);
  };

  return (
    <div>
      <h1>Зарегистрируйтесь в кабинете</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={signInSchema}
      >
        <Form className={styles.form}>
          <Field name="name" placeholder="Ваше имя" type="text" />
          <ErrorMessage className={styles.error} component="span" name="name" />
          <Field name="email" placeholder="Example@mail.ru" type="email" />
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
              style={{ marginRight: "-10px" }}
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
          <Field name="group" as="select">
            <option value="group-9">gr-9</option>
            <option value="group-10">group-10</option>
            <option value="group-11">group-11</option>
          </Field>
          <div style={{ marginTop: "10px" }}>
            <button type="submit">Подтвердить</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
