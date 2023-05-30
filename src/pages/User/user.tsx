import styles from "./user.module.css";
import { useAppSelector } from "../../redux/store";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export const User = () => {
  const user = useAppSelector((state) => state.user);
  if (!user.token) return <Navigate to="/auth" />;
  useEffect(() => {
    document.title = "Страница пользователя DogFooDStore";
  }, []);

  return (
    <div className={styles.user}>
      <p>
        Информация о пользователе с <b>id {user._id}</b>
      </p>
      <img src={user.avatar}></img>
      <p>
        <span>{user.about} </span>
        {user.name}
      </p>
      <p>{user.email}</p>
      <p>{user.group}</p>
    </div>
  );
};
