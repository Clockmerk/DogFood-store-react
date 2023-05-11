import styles from "./header.module.css";
import logo from "../../assets/images/logo/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanUser } from "../../redux/slices/userSlice";
import { RootState } from "../../redux/store";

export const Header = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleExit = () => {
    dispatch(cleanUser());
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
            {token ? (
              <Link to={"/user"}>Личный кабинет</Link>
            ) : (
              <Link to={"/auth"}>Авторизация</Link>
            )}
          </li>
          <li>
            {token ? <a onClick={() => handleExit()}>Выход</a> : <div></div>}
          </li>
        </ul>
      </nav>
    </header>
  );
};
