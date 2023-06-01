import styles from "./user.module.css";
import { useAppSelector } from "../../redux/store";
import { Link, Navigate } from "react-router-dom";
import { useEffect } from "react";

export const User = () => {
  const user = useAppSelector((state) => state.user);
  const favorites = useAppSelector((state) => state.favorites);

  if (!user.token) return <Navigate to="/auth" />;

  useEffect(() => {
    document.title = "Страница пользователя DogFooDStore";
  }, []);

  return (
    <div className={styles.user_container}>
      <div>
        <div className={styles.user}>
          <p>
            Информация о пользователе с <b>id {user._id}</b>
          </p>
          <img src={user.avatar}></img>
          <p>Имя: {user.name}</p>
          <p>О вас: {user.about}</p>
          <p>email: {user.email}</p>
          <p>Группа: {user.group}</p>
        </div>
      </div>
      <div className={styles.user_tabs}>
        <Link to={"/favorites"}>
          Избранное {favorites.length == 0 ? null : favorites.length}
        </Link>

        <Link to={"/settings"}>Настройки</Link>
        <Link to={"/orders"}>Ваши заказы</Link>
        <Link to={"/addProduct"}>Добавить свой товар</Link>
      </div>
    </div>
  );
};
