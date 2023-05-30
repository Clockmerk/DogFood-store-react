import { useAppSelector } from "../../redux/store";
import { useQuery } from "@tanstack/react-query";
import { fetchProductCart } from "../../api/products";
import { Navigate, useNavigate } from "react-router-dom";
import { CartCards } from "../../components/CartCards/cartcards";
import styles from "./cart.module.css";

export const Cart = () => {
  const cart = useAppSelector((state) => state.cart);
  const { token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  if (!token) return <Navigate to="/auth" />;

  const { data, isSuccess } = useQuery({
    queryKey: ["cartProducts", cart.length],
    queryFn: () =>
      fetchProductCart(
        cart.map((product) => product._id),
        token
      ),
    enabled: !!cart.length,
  });

  if (isSuccess) {
    return <>{data.length != 0 && <CartCards itemsArray={data}></CartCards>}</>;
  }

  return (
    <div className={styles.cart}>
      Корзина пуста
      <button onClick={() => navigate("/catalog")}>В каталог</button>
    </div>
  );
};
