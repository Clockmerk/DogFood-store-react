import { AddProductType, ProductCardType } from "../types/types";

export const apiUrl = "https://api.react-learning.ru";

export const fetchData = async (token: string) => {
  const responce = await fetch(`${apiUrl}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (responce.ok) {
    const responseData = await responce.json();
    return responseData;
  } else {
    //return error;
  }
};

export const fetchDataSearch = async (token: string, search: string) => {
  const responce = await fetch(`${apiUrl}/products/search?query=${search}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (responce.ok) {
    const responseData = await responce.json();
    return responseData;
  } else {
    //return error;
  }
};

export const fetchProduct = async (
  id: string,
  token: string
): Promise<ProductCardType> => {
  const responce = await fetch(`${apiUrl}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseData = await responce.json();
  return responseData;
};

export const fetchProductCart = async (ids: Array<string>, token: string) => {
  const cartArray: ProductCardType[] = [];
  await Promise.allSettled(
    ids.map((id) =>
      fetch(`${apiUrl}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok === true) {
            return res.json();
          }
        })
        .then((data) => {
          return cartArray.push(data);
        })
    )
  );
  return cartArray;
};

export const fetchAddProduct = async (
  token: string,
  values: AddProductType
) => {
  return fetch(`${apiUrl}/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });
};

export const fetchProductLike = async (
  productId: string,
  token: string,
  method: string
) => {
  return fetch(`${apiUrl}/products/likes/${productId}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
