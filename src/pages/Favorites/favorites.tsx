import { Link, Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductCart } from "../../api/products";
import styles from "./favorites.module.css";
import { useDispatch } from "react-redux";
import {
  changeFavoriteStatus,
  clearFavorites,
} from "../../redux/slices/favoritesSlices";

export const Favorites = () => {
  const { token } = useAppSelector((state) => state.user);
  const favorites = useAppSelector((state) => state.favorites);
  const dispatch = useDispatch();

  if (!token) return <Navigate to="/auth" />;

  useEffect(() => {
    document.title = "Страница избранного DogFooDStore";
  }, []);

  const { data, isSuccess } = useQuery({
    queryKey: ["cartProducts", favorites.length],
    queryFn: () =>
      fetchProductCart(
        favorites.map((product) => product),
        token
      ),
    enabled: !!favorites.length,
  });

  if (isSuccess) {
    return (
      <div className={styles.favorites}>
        <div className={styles.head}>
          <p>
            <b>Избранные товары</b>
          </p>
          <button onClick={() => dispatch(clearFavorites())}>
            Очистить список
          </button>
        </div>
        <div className={styles.list}>
          {data.map((product) => (
            <div key={product._id} className={styles.list_card}>
              <Link to={`/product/${product._id}`}>{product.name}</Link>
              <p>
                {product.available
                  ? "Можно заказать"
                  : "Товар недоступен для покупки"}
              </p>
              <button
                onClick={() => dispatch(changeFavoriteStatus(product._id))}
              >
                ♡
              </button>
              <img src={product.pictures} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <div className={styles.head}>В избранном ничего нет</div>;
};
