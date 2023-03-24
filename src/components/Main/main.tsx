import styles from "./main.module.css";
//import { useEffect, useState } from "react";
import { ProductCard } from "../../../declarations";
import { useQuery } from "@tanstack/react-query";

export const Main = () => {
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
      return responseData;
    } else {
      //return error;
    }
  };

  const { isLoading, data } = useQuery({
    queryKey: ["productsData"],
    queryFn: fetchData,
  });

  if (isLoading)
    return (
      <main>
        <div className={styles["h1_main"]}>
          <h1>Загрузка товаров...</h1>
        </div>
      </main>
    );

  const { total: totalNumber, products: itemsArray } = data;
  console.log(data);

  return (
    <main>
      <div className={styles["h1_main"]}>
        <h1>Product List</h1>
        <h2>Всего товаров в каталоге: {totalNumber}</h2>
      </div>
      <div className={styles.products_block}>
        {itemsArray.map((product: ProductCard) => (
          <div key={product._id} className={styles["product_card"]}>
            <div className={styles.cardimage_div}>
              <img
                className={styles.cardimage}
                src={product.author.avatar}
                alt={"Фото " + product.author.about}
              />
            </div>
            <div className={styles.cardtext}>
              <p>Название: {product.name}</p>
              <p>
                Доступность товара:
                {product.available ? " Доступен" : " Недоступен"}
              </p>
              <p>Цена: {product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
