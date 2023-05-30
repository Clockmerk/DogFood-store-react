import styles from "./catalogcard.module.css";
import { Link } from "react-router-dom";
import { ProductCardType, ProductsArrayType } from "../../types/types";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/slices/cartSlice";

export const CatalogCard = ({ itemsArray }: ProductsArrayType) => {
  const dispatch = useDispatch();
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
            <Link to={`/product/${product._id}`}>{product.name}</Link>
            <p>Цена: {product.price}</p>
            {product.available ? (
              <button onClick={() => dispatch(setCart(product._id))}>
                Добавить
              </button>
            ) : (
              <button disabled>Товар недоступен</button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
