import {
  buyFromCart,
  changeSelect,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import { ProductCardType, ProductsArrayType } from "../../types/types";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/store";
import styles from "./cartcards.module.css";
import { Link } from "react-router-dom";

export const CartCards = ({ itemsArray }: ProductsArrayType) => {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (!itemsArray) return null;

  let count = 0;
  if (cart) {
    for (const k in cart) {
      count += cart[k].count;
    }
  }

  let price = 0;
  if (itemsArray) {
    for (const k in itemsArray) {
      const priceItem = itemsArray[k].price;
      const priceDiscount = (priceItem * itemsArray[k].discount) / 100;
      const id = itemsArray[k]._id;
      const item = cart.find((k) => k._id == id);
      if (item) {
        if (itemsArray[k].discount !== 0) {
          price += (priceItem - priceDiscount) * item.count;
        } else if (itemsArray[k].discount == 0) {
          price += priceItem * item.count;
        }
      }
    }
  }

  return (
    <div className={styles.cart}>
      <div className={styles.cart_container}>
        {itemsArray.map((product: ProductCardType) => (
          <div key={product._id} className={styles.cart_items}>
            <Link to={`/product/${product._id}`}>{product.name}</Link>
            <Link to={`/product/${product._id}`}>
              <img src={product.pictures} />
            </Link>
            <p>
              Цена:
              {product.discount == 0 && <span> {product.price}</span>}
              {product.discount !== 0 && (
                <span style={{ textDecoration: "line-through" }}>
                  {product.price}
                </span>
              )}
              {product.discount !== 0 && (
                <span>
                  {product.price - (product.price * product.discount) / 100}
                </span>
              )}
            </p>
            <div>
              {cart.map((cartProduct) => {
                if (cartProduct._id === product._id && cartProduct.isSelected) {
                  return (
                    <div key={cartProduct._id}>
                      <input
                        onClick={() => dispatch(changeSelect(product._id))}
                        type="checkbox"
                        defaultChecked
                      ></input>
                      <span>Выбрать</span>
                    </div>
                  );
                } else if (
                  cartProduct._id === product._id &&
                  !cartProduct.isSelected
                ) {
                  return (
                    <div key={cartProduct._id}>
                      <input
                        onClick={() => dispatch(changeSelect(product._id))}
                        type="checkbox"
                      ></input>
                      <span>Выбрать</span>
                    </div>
                  );
                }
              })}
              {cart.map((cartProduct) => {
                return cartProduct._id === product._id && cartProduct.count;
              })}
              <button onClick={() => dispatch(incrementQuantity(product._id))}>
                +
              </button>
              <button onClick={() => dispatch(decrementQuantity(product._id))}>
                -
              </button>
              <button onClick={() => dispatch(removeFromCart(product._id))}>
                X
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.cart_buy}>
        Продуктов в корзине {itemsArray.length} <b>Всего: {count}</b>
        <b>Цена за все: {price}</b>
        <button onClick={() => dispatch(buyFromCart(null))}>Заказать</button>
        <button onClick={() => dispatch(clearCart(null))}>
          Очистить корзину
        </button>
      </div>
    </div>
  );
};
