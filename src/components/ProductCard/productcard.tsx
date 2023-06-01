import styles from "./productcard.module.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  fetchDeleteProduct,
  fetchProduct,
  fetchProductLike,
} from "../../api/products";
import { useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/slices/cartSlice";
import { changeFavoriteStatus } from "../../redux/slices/favoritesSlices";
import { Comments } from "../Comments/comments";

export const CurrentCard = () => {
  const { token, _id } = useAppSelector((state) => state.user);
  const { productId } = useParams();
  const favorites = useAppSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!token) return <Navigate to="/auth" />;

  if (!productId) return null;

  const { isSuccess, data, refetch } = useQuery({
    queryKey: ["productData"],
    queryFn: () => fetchProduct(productId, token),
  });

  if (isSuccess && !data.name) {
    return (
      <div className={styles.current_card}>
        <p>Такого продукта не существует. Либо он был удален.</p>
      </div>
    );
  }

  //TODO: переместить в компонент и дописать useMutation

  const likes = data?.likes;
  const isLiked = likes?.find((likeToken) => likeToken === _id);
  const submitLike = async (id: string) => {
    if (isLiked === undefined) {
      await fetchProductLike(id, token, "PUT");
      refetch();
    } else {
      await fetchProductLike(id, token, "DELETE");
      refetch();
    }
  };
  const submitDelete = async (id: string) => {
    const res = await fetchDeleteProduct(id, token);
    const responce = await res.json();
    if (res.ok) {
      alert("Продукт удален");
      navigate("/catalog");
      return;
    }
    alert(responce.message);
  };
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
            {data.discount !== 0 && (
              <p>
                Цена со скидкой {data.discount}% ={" "}
                <b>{data.price - (data.price * data.discount) / 100}</b>
              </p>
            )}
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
          <button onClick={() => dispatch(changeFavoriteStatus(data._id))}>
            {favorites.find((id) => id == data._id) ? (
              <span>❤️</span>
            ) : (
              <span>♡</span>
            )}
          </button>
          <button onClick={() => submitLike(data._id)}>
            {isLiked === undefined ? <span>🖒</span> : <span>👍</span>}
          </button>
          {data.author._id === _id ? (
            <button onClick={() => submitDelete(data._id)}>
              Удалить ваш товар
            </button>
          ) : null}
        </div>
        <Comments {...data} />
      </div>
    );
  }
  return (
    <div className={styles.current_card}>
      <p>Загрузка...</p>
    </div>
  );
};
