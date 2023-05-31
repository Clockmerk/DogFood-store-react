import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setSort } from "../../redux/slices/filterSilice";
import styles from "./sortby.module.css";

export const SortBy = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  const sortByHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = event.target.value;

    if (sortBy) {
      setSearchParams({ ...searchParams, sortBy });
    } else setSearchParams({});
  };

  useEffect(() => {
    dispatch(setSort(sortBy));
  });

  return (
    <div className={styles.sort}>
      <span>Отсортировать:</span>
      <select value={sortBy} onChange={sortByHandle}>
        <option value="POPULAR_LIKES">Популярные</option>
        <option value="LOW_PRICE">Дешевые</option>
        <option value="HIGH_PRICE">Дорогие</option>
        <option value="HIGH_DISCOUNT">По скидке</option>
      </select>
    </div>
  );
};
