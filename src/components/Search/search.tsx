import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setSearch } from "../../redux/slices/filterSilice";
import { useDebounce } from "../../hooks/useDebounce";

export const Search = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("productName") || "";
  const searchTermDebounced = useDebounce(searchTerm);

  useEffect(() => {
    dispatch(setSearch(searchTermDebounced));
  });

  const searchHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const productName = event.target.value;
    if (productName) {
      setSearchParams({ productName });
    } else setSearchParams({});
  };

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={searchHandle}
        placeholder="Поиск продукта"
      ></input>
      <button onClick={() => setSearchParams({})}>X</button>
    </>
  );
};
