/* eslint-disable prettier/prettier */
import styles from "./productcard.module.css";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../../api/products";
import { useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/slices/cartSlice";
import { changeFavoriteStatus } from "../../redux/slices/favoritesSlices";

export const CurrentCard = () => {
  const { token } = useAppSelector((state) => state.user);
  const { productId } = useParams();
  const favorites = useAppSelector((state) => state.favorites);
  const dispatch = useDispatch();

  if (!token) return <Navigate to="/auth" />;

  if (!productId) return null;

  const { isSuccess, data } = useQuery({
    queryKey: ["productData"],
    queryFn: () => fetchProduct(productId, token),
  });

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

  if (isSuccess) {
    document.title = `${data.name} DogFooDStore`;
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
            <p>
              Цена со скидкой {data.discount}% ={" "}
              <b>{data.price - (data.price * data.discount) / 100}</b>
            </p>
            <p>Количество в наличии: {data.stock}</p>
            <p>Продукт обновлен: {data.updated_at}</p>
          </div>
          {data.available ? (
            <button onClick={() => dispatch(setCart(data._id))}>
              Добавить в корзину 🧺
            </button>
          ) : (
            <button disabled>Товар недоступен</button>
          )}
          <button onClick={()=> dispatch(changeFavoriteStatus(data._id))}>{favorites.find(id => id == data._id) ? <span>❤️</span> : <span>♡</span> }</button>
          <button>👍🖒</button>
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
