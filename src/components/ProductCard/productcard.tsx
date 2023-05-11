import styles from "./productcard.module.css";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../../api/api/api";
import { useAppSelector } from "../../redux/store";

export const CurrentCard = () => {
  const { token } = useAppSelector((state) => state.user);
  const { productId } = useParams();

  if (!token) return <Navigate to="/auth" />;

  if (!productId) return null;

  const { isSuccess, data } = useQuery({
    queryKey: ["productData"],
    queryFn: () => fetchProduct(productId, token),
  });

  if (isSuccess && !data.name) {
    return (
      <div className={styles.product_card}>
        <p>
          Такого продукта не существует. Либо на сервере произошла ошибка,
          повторите запрос позже
        </p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className={styles.product_card}>
        <img src={data.pictures}></img>
        <div>
          <p>
            <b>{data.name}</b>
          </p>
          <p>Описание: {data.description}</p>
          <p>Скидка: {data.discount}</p>
          <p>Количество в наличии: {data.stock}</p>
          <p>Продукт обновлен: {data.updated_at}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.product_card}>
      <p>Загрузка...</p>
    </div>
  );
};
