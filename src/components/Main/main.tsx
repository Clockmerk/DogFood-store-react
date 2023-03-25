import styles from "./main.module.css";
import { ProductCard } from "../../shared/declarations/declarations";
import { useQuery } from "@tanstack/react-query";
import { accessToken, apiUrl } from "../../shared/constants/api/api";

export const Main = () => {
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
        <div className={styles.h1_copy}>
          <h1>Загрузка товаров...</h1>
        </div>
      </main>
    );

  const { total: totalNumber, products: itemsArray } = data;
  console.log(data);

  return (
    <main>
      <div className={styles.h1_main}>
        <h1>Product List</h1>
        <h2>Всего товаров в каталоге: {totalNumber}</h2>
      </div>
      <div className={styles.products_block}>
        {itemsArray.map((product: ProductCard) => (
          <div key={product._id} className={styles.product_card}>
            <div className={styles.cardimage_div}>
              <img
                className={styles.cardimage}
                src={product.pictures}
                alt={"Фото " + product.name}
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
