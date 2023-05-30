import { useEffect } from "react";
import styles from "./main.module.css";

export const Main = () => {
  useEffect(() => {
    document.title = "DogFooDStore";
  }, []);

  return (
    <div className={styles.main_div}>
      <h1>Магазин корма для собак...</h1>
      <div className={styles.main_block}>
        <div className={styles.main_block_divs}>
          <div className={styles.main_item}>
            <img src="https://media.vprok.ru/products/x700/4r/tf/2crygkljb2mvbnjw6jp4du7zndz5tf4r.jpeg"></img>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              felis ipsum, tempus sagittis lorem at, gravida tristique felis.
              Aliquam rutrum ligula ac dictum blandit. Fusce dictum massa
              turpis, ac rhoncus massa semper eu. Vivamus ultrices lorem vitae
              fermentum venenatis. Praesent interdum euismod tortor, non
              pellentesque orci porta et. Nulla lobortis felis nisi, et
              condimentum nisi molestie eu. Nullam ante dolor, vestibulum id
              lectus in, blandit facilisis ligula.
            </p>
          </div>
        </div>
        <div className={styles.main_block_divs}>
          <div className={styles.main_item}>
            <p>
              Praesent interdum euismod tortor, non pellentesque orci porta et.
              Nulla lobortis felis nisi, et condimentum nisi molestie eu. Nullam
              ante dolor, vestibulum id lectus in, blandit facilisis ligula.
            </p>
            <img src="https://delo-korm.ru/upload/iblock/c9c/4607004705274_1.png"></img>
          </div>
        </div>
        <div className={styles.main_block_divs}>
          <div className={styles.main_item}>
            <img src="https://shop.purina.ru/media/catalog/product/cache/6a5fe83f6d9a00ef1c7118f1fd81241c/8/f/8f2f1d74-93bc-11eb-b82c-f21c0c431f4d_y5ctyktvxjhv0uh0.jpg"></img>
            <p>
              Nunc felis ipsum, tempus sagittis lorem at, gravida tristique
              felis. Aliquam rutrum ligula ac dictum blandit. Fusce dictum massa
              turpis, ac rhoncus massa semper eu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
