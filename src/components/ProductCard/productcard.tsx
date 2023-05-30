/* eslint-disable prettier/prettier */
import styles from "./productcard.module.css";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../../api/products";
import { useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/slices/cartSlice";
import { useEffect } from "react";

export const CurrentCard = () => {
  const { token } = useAppSelector((state) => state.user);
  const { productId } = useParams();
  const dispatch = useDispatch();

  if (!token) return <Navigate to="/auth" />;

  if (!productId) return null;

  const { isSuccess, data } = useQuery({
    queryKey: ["productData"],
    queryFn: () => fetchProduct(productId, token),
  });

  const addtoCart = (value: string) => {
    dispatch(setCart(value));
  };

  if (isSuccess && !data.name) {
    return (
      <div className={styles.current_card}>
        <p>
          Такого продукта не существует. Либо на сервере произошла ошибка,
          повторите запрос позже
        </p>
      </div>
    );
  }

  useEffect(() => {
    document.title = `${data?.name} DogFooDStore`;
  }, []);

  if (isSuccess) {
    return (
      <div className={styles.current_card_container}>
        <div className={styles.current_card}>
          <img src={data.pictures}></img>
          <div>
            <p>
              <b>{data.name}</b>
            </p>
            <p>Описание: {data.description}</p>
            <p>Цена: {data.price}</p>
            <p>Цена со скидкой {data.discount}% = {data.price - (data.price * data.discount)/100 }</p>
            <p>Количество в наличии: {data.stock}</p>
            <p>Продукт обновлен: {data.updated_at}</p>
          </div>
          {data.available ? (
            <button onClick={() => addtoCart(data._id)}>Добавить в корзину</button>
          ) : (
            <button disabled>Товар недоступен</button>
          )}
          <button >Добавить в избранное</button>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.current_card}>
      <p>Загрузка...</p>
    </div>
  );
};
