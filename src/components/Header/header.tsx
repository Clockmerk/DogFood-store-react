import styles from "./header.module.css";
import logo from "../../assets/icons/iconMain.png";

export const Header = () => {
  return (
    <header>
      <nav className={styles.header_nav}>
        <img src={logo} alt="Главная иконка" />
        <a>
          <h2>Главная</h2>
        </a>
        <a>
          <h2>Каталог</h2>
        </a>
        <a>
          <h2>Личный кабинет</h2>
        </a>
      </nav>
    </header>
  );
};
