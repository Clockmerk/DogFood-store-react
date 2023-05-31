import styles from "./catalogcard.module.css";
import { Link } from "react-router-dom";
import { ProductCardType, ProductsArrayType } from "../../types/types";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/slices/cartSlice";
import { changeFavoriteStatus } from "../../redux/slices/favoritesSlices";
import { useAppSelector } from "../../redux/store";

export const CatalogCard = ({ itemsArray }: ProductsArrayType) => {
  const favorites = useAppSelector((state) => state.favorites);
  const { sort } = useAppSelector((state) => state.filter);
  const dispatch = useDispatch();

  let sorting;

  switch (sort) {
    case "POPULAR_LIKES":
      sorting = (a: ProductCardType, b: ProductCardType) => {
        return b.likes.length - a.likes.length;
      };
      break;
    case "LOW_PRICE":
      sorting = (a: ProductCardType, b: ProductCardType) => {
        return a.price - b.price;
      };
      break;
    case "HIGH_PRICE":
      sorting = (a: ProductCardType, b: ProductCardType) => {
        return b.price - a.price;
      };
      break;
    case "HIGH_DISCOUNT":
      sorting = (a: ProductCardType, b: ProductCardType) => {
        return b.discount - a.discount;
      };
      break;
    case "":
      sorting = (a: ProductCardType, b: ProductCardType) => {
        const aTime = new Date(a.created_at);
        const bTime = new Date(b.created_at);
        return aTime.getTime() - bTime.getTime();
      };
      break;
  }

  return (
    <>
      {itemsArray.sort(sorting).map((product: ProductCardType) => (
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
            <p>
              Цена:
              {product.discount == 0 && <span> {product.price}</span>}
              {product.discount !== 0 && (
                <span style={{ textDecoration: "line-through" }}>
                  {" "}
                  {product.price}
                </span>
              )}
              {product.discount !== 0 && (
                <span>
                  {" "}
                  {product.price - (product.price * product.discount) / 100}
                </span>
              )}
            </p>
            <div className={styles.cardbuttons}>
              {product.available ? (
                <button onClick={() => dispatch(setCart(product._id))}>
                  Добавить 🧺
                </button>
              ) : (
                <button disabled>Товар недоступен</button>
              )}
              <button
                onClick={() => dispatch(changeFavoriteStatus(product._id))}
              >
                {favorites.find((id) => id == product._id) ? (
                  <span>❤️</span>
                ) : (
                  <span>♡</span>
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
