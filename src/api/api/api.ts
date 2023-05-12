import {
  ValuesSignInType,
  ValuesSignUpType,
  ProductCardType,
} from "../../types/types";

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

export const signInFetch = async (values: ValuesSignInType) => {
  return fetch(`${apiUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
};

export const signUpFetch = async (values: ValuesSignUpType) => {
  return fetch(`${apiUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
};
