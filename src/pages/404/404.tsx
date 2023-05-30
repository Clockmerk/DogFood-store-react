import styles from "./404.module.css";

export const Error = () => {
  return (
    <div className={styles.error_div}>
      <h1>
        Извините, такой страницы не существует. Перейдите на другую страницу
      </h1>
    </div>
  );
};
