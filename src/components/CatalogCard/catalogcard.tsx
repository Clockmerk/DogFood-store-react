import styles from "./catalogcard.module.css";
import { Link } from "react-router-dom";
import { ProductCardType, ProductsArrayType } from "../../types/types";

export const CatalogCard = ({ itemsArray }: ProductsArrayType) => {
  return (
    <>
      {itemsArray.map((product: ProductCardType) => (
        <div key={product._id} className={styles.product_card}>
          <div className={styles.cardimage_div}>
            <img
              className={styles.cardimage}
              src={product.pictures}
              alt={"Фото " + product.name}
            />
          </div>
          <div className={styles.cardtext}>
            <Link to={`/product/${product._id}`}>Название: {product.name}</Link>
            <p>
              Доступность товара:
              {product.available ? " Доступен" : " Недоступен"}
            </p>
            <p>Цена: {product.price}</p>
          </div>
        </div>
      ))}
      ;
    </>
  );
};
