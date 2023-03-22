import styles from "./main.module.css";
import { useEffect, useState } from "react";
import { ProductCard, ProductsType } from "../../../declarations";

export const Main = () => {
  const [items, setItems] = useState<ProductsType>({ total: 0, products: [] });
  const [error, setError] = useState("");
  useEffect(() => {
    const apiUrl = "https://api.react-learning.ru/products";
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOWFhMzk3MTIxODM4ZjI5MTAiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ5LCJleHAiOjE3MTAzMzg0NDl9.UtDw-jSZheqRg6USs7KMQZe3YOkxmWkwGAYPU-h5J2w";
    const fetchData = async () => {
      const responce = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (responce.ok) {
        const responseData = await responce.json();
        return setItems(responseData);
      } else {
        setError(responce.statusText);
      }
    };
    fetchData();
  }, []);

  if (error)
    return (
      <div>
        <h1>{error === "Unauthorized" ? "Вы не авторизованы" : error}</h1>
      </div>
    );

  //Деструктуризация объекта, получение массива из ключа
  const { products: itemsArray } = items;

  return (
    <main>
      <div className={styles["h1_main"]}>
        <h1>Product List</h1>
      </div>
      <div className={styles["products_block"]}>
        {itemsArray.map((product: ProductCard) => (
          <div key={product._id} className={styles["product_card"]}>
            <p>Название: {product.name}</p>
            <p>
              Доступность товара:
              {product.available ? " Доступен" : " Недоступен"}
            </p>
            <p>Price: {product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
};
