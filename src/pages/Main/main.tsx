import { useEffect } from "react";
import styles from "./main.module.css";

export const Main = () => {
  useEffect(() => {
    document.title = "DogFooDStore";
  }, []);

  return (
    <div className={styles.main_div}>
      <h1>Магазин корма для собак...</h1>
    </div>
  );
};
