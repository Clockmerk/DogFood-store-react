import styles from "./catalog.module.css";
import { ProductCardType } from "../../types/types";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../api/api/api";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { useDebounce } from "../../hooks/useDebounce";

export const Catalog = () => {
  const { token } = useAppSelector((state) => state.user);
  if (!token) return <Navigate to="/auth" />;

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("productName") || "";
  const searchTermDebounced = useDebounce(searchTerm, 500);
  const searchHandle = (event) => {
    const productName = event.target.value;
    if (productName) {
      setSearchParams({ productName });
    } else setSearchParams({});
  };

  const { isLoading, isSuccess, isError, data } = useQuery({
    queryKey: ["productsData"],
    queryFn: () => fetchData(token),
  });

  if (isLoading)
    return (
      <div className={styles.h1_copy}>
        <h1>Загрузка товаров...</h1>
      </div>
    );

  if (isError)
    return (
      <div className={styles.h1_copy}>
        <h1>Произошла ошибка, то попробуйте позже.</h1>
      </div>
    );

  if (isSuccess) {
    const { total: totalNumber, products: itemsArray } = data;
    return (
      <>
        <div className={styles.h1_main}>
          <h1>Каталог продуктов</h1>
          <h2>Всего товаров в каталоге: {totalNumber}</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={searchHandle}
            placeholder="Поиск"
          ></input>
        </div>
        <div className={styles.products_block}>
          {itemsArray
            .filter((productFilter) =>
              productFilter.name
                .toLowerCase()
                .includes(searchTermDebounced.toLowerCase())
            )
            .map((product: ProductCardType) => (
              <div key={product._id} className={styles.product_card}>
                <div className={styles.cardimage_div}>
                  <img
                    className={styles.cardimage}
                    src={product.pictures}
                    alt={"Фото " + product.name}
                  />
                </div>
                <div className={styles.cardtext}>
                  <Link to={`/product/${product._id}`}>
                    Название: {product.name}
                  </Link>
                  <p>
                    Доступность товара:
                    {product.available ? " Доступен" : " Недоступен"}
                  </p>
                  <p>Цена: {product.price}</p>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  }
  return null;
};
