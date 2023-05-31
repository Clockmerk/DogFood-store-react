import styles from "./catalog.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchDataSearch } from "../../api/products";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

import { CatalogCard } from "../../components/CatalogCard/catalogcard";
import { Search } from "../../components/Search/search";
import { useEffect } from "react";
import { SortBy } from "../../components/SortBy/sortby";

export const Catalog = () => {
  const { token } = useAppSelector((state) => state.user);
  const { search } = useAppSelector((state) => state.filter);

  if (!token) return <Navigate to="/auth" />;

  useEffect(() => {
    document.title = "Каталог DogFooDStore";
  }, []);

  const { isLoading, isSuccess, isError, data } = useQuery({
    queryKey: ["productsData", search],
    queryFn: () => fetchDataSearch(token, search),
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
    return (
      <>
        <div className={styles.h1_main}>
          <h1>Каталог продуктов</h1>
          {search ? (
            <h2>Найдено товаров по запросу: {data.length}</h2>
          ) : (
            <h2>Всего товаров в каталоге: {data.length}</h2>
          )}
          <div className={styles.search}>
            <Search />
            <SortBy />
          </div>
        </div>
        <div className={styles.products_block}>
          <CatalogCard itemsArray={data} />
        </div>
      </>
    );
  }
  return null;
};
