import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useAppSelector } from "../../redux/store";
import { updateUserAvatarFetch, updateUserFetch } from "../../api/user";
import {
  ValuesUpdateAvatarType,
  ValuesUpdateUserType,
} from "../../types/types";
import styles from "./settings.module.css";
import { useDispatch } from "react-redux";
import { setUpUser } from "../../redux/slices/userSlice";
import { Navigate } from "react-router-dom";

const changeUserSchema = Yup.object().shape({
  name: Yup.string().required("Поле обязательно"),
  about: Yup.string().required("Поле обязательно"),
});

const changeAvatarSchema = Yup.object().shape({
  avatar: Yup.string().required("Поле обязательно"),
});

export const Settings = () => {
  const user = useAppSelector((state) => state.user);
  const { token, group } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  if (!token) return <Navigate to="/auth" />;

  const initialValues = {
    name: "",
    about: "",
  };

  const initialValuesAvatar = {
    avatar: "",
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (values: ValuesUpdateUserType) => {
      const res = await updateUserFetch(values, group, token);
      const responce = await res.json();
      if (res.ok) {
        dispatch(
          setUpUser({ ...user, name: responce.name, about: responce.about })
        );
        alert("Данные изменены");
        return responce;
      }
      return alert(responce.message);
    },
  });

  const { mutateAsync: mutateAvatarAsync } = useMutation({
    mutationFn: async (values: ValuesUpdateAvatarType) => {
      const res = await updateUserAvatarFetch(values, group, token);
      const responce = await res.json();
      if (res.ok) {
        dispatch(setUpUser({ ...user, avatar: responce.avatar }));
        alert("Аватар изменен");
        return responce;
      }
      return alert(responce.message);
    },
  });

  const onSubmit = async (
    values: ValuesUpdateUserType,
    { resetForm }: FormikHelpers<ValuesUpdateUserType>
  ) => {
    await mutateAsync(values);
    resetForm();
  };

  const onSubmitAvatar = async (
    values: ValuesUpdateAvatarType,
    { resetForm }: FormikHelpers<ValuesUpdateAvatarType>
  ) => {
    await mutateAvatarAsync(values);
    resetForm();
  };

  return (
    <div className={styles.user_settings}>
      <h2>Изменение данных пользователя</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={changeUserSchema}
      >
        <Form className={styles.form_user}>
          <label htmlFor="name">Изменить имя:</label>
          <Field name="name" id="name" type="text" />
          <ErrorMessage className={styles.error} component="span" name="name" />
          <label htmlFor="about">Изменить описание:</label>
          <Field name="about" id="about" type="text" />
          <ErrorMessage
            className={styles.error}
            component="span"
            name="about"
          />
          <div style={{ marginTop: "10px" }}>
            <button type="submit">Подтвердить</button>
          </div>
        </Form>
      </Formik>
      <Formik
        initialValues={initialValuesAvatar}
        onSubmit={onSubmitAvatar}
        validationSchema={changeAvatarSchema}
      >
        <Form className={styles.form_user}>
          <label htmlFor="avatar">Изменить фото:</label>
          <Field name="avatar" id="avatar" type="text" />
          <ErrorMessage
            className={styles.error}
            component="span"
            name="avatar"
          />
          <div>
            <button type="submit">Подтвердить</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
