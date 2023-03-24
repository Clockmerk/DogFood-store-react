import styles from "./header.module.css";

export const Header = () => {
  return (
    <header>
      <nav className={styles.header_nav}>
        <h2>Главная</h2>
        <h2>Каталог</h2>
        <h2>Личный кабинет</h2>
      </nav>
    </header>
  );
};
