import styles from "./header.module.css";
import logo from "../../assets/images/logo/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanUser } from "../../redux/slices/userSlice";
import { RootState } from "../../redux/store";
import { clearCart } from "../../redux/slices/cartSlice";

export const Header = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let count = 0;
  if (cart) {
    for (const k in cart) {
      count += cart[k].count;
    }
  }

  const handleExit = () => {
    dispatch(cleanUser());
    dispatch(clearCart(null));
    return navigate("/");
  };

  return (
    <header>
      <nav className={styles.header_nav}>
        <ul>
          <li>
            <Link to={"/"}>
              <img src={logo} alt="Главная иконка" />
            </Link>
          </li>
          <li>
            <Link to={"/"}>DogFooDStore</Link>
          </li>
          <li>
            <Link to={"/catalog"}>Каталог</Link>
          </li>
          <li>
            {token && (
              <Link to={"/cart"}>
                Корзина
                {cart.length != 0 && (
                  <span style={{ color: "orange" }}>
                    : {cart.length}
                    <span style={{ color: "pink" }}> (Всего: {count})</span>
                  </span>
                )}
              </Link>
            )}
          </li>
          <li>
            {token ? (
              <Link to={"/user"}>Личный кабинет</Link>
            ) : (
              <Link to={"/auth"}>Авторизация</Link>
            )}
          </li>
          <li>{token && <a onClick={() => handleExit()}>Выход</a>}</li>
        </ul>
      </nav>
    </header>
  );
};
