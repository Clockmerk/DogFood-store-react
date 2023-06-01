import { ProductCardType, ReviewsCommentType } from "../../types/types";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import styles from "./comments.module.css";
import { fetchAddComment, fetchDeleteComment } from "../../api/products";
import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "../../redux/store";

const commentSchema = Yup.object().shape({
  text: Yup.string().required("Поле обязательно"),
  rating: Yup.number().required("Укажите рейтинг"),
});

export const Comments = (data: ProductCardType) => {
  const { token, _id: userId } = useAppSelector((state) => state.user);
  const { _id, reviews } = data;

  const initialValues = {
    text: "",
    rating: 1,
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (values: ReviewsCommentType) => {
      const res = await fetchAddComment(_id, token, values);
      const responce = await res.json();
      if (res.ok) {
        alert("Комментарий добавлен");
        return responce;
      }
      return alert(responce.message);
    },
  });

  const onSubmit = async (
    values: ReviewsCommentType,
    { resetForm }: FormikHelpers<ReviewsCommentType>
  ) => {
    await mutateAsync(values);
    resetForm();
  };
  return (
    <div className={styles.reviews}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={commentSchema}
      >
        <Form className={styles.form_comment}>
          <label htmlFor="text">Добавить комментарий:</label>
          <Field name="text" id="text" as="textarea" />
          <ErrorMessage className={styles.error} component="span" name="text" />
          <label htmlFor="rating">Рейтинг</label>
          <Field name="rating" id="rating" as="select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Field>
          <ErrorMessage
            className={styles.error}
            component="span"
            name="rating"
          />
          <div>
            <button type="submit">Подтвердить</button>
          </div>
        </Form>
      </Formik>
      <p className={styles.comments}>
        <b>Комментарии к продукту: </b>
      </p>
      {reviews?.map((review) => (
        <div key={review._id} className={styles.reviews_card}>
          <div>
            <span>
              <b>{review.author.name}</b>
            </span>
            <span>Оценка товара: {review.rating}</span>
            <p>Комментарий: {review.text}</p>
            {userId === review.author._id && (
              <button
                onClick={() => fetchDeleteComment(_id, token, review._id)}
              >
                Удалить комментарий
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
