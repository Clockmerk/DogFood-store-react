import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { signUpFetch } from "../../api/user";
import { useMutation } from "@tanstack/react-query";
import { SignUpProps, ValuesSignUpType } from "../../types/types";
import { useChangeInputType } from "../../hooks/useChangeInputType";

const signInSchema = Yup.object().shape({
  email: Yup.string().email("Некорректный email").required("Required"),
  name: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  group: Yup.string().required("Required"),
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
        <Form>
          <Field name="name" placeholder="Ваше имя" type="text" />
          <Field name="email" placeholder="example@mail.ru" type="email" />
          <Field name="password" placeholder="Пароль" type={inputType} />
          <button type="button" onClick={changeType}>
            👁
          </button>
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
