import { ValuesSignInType, ValuesSignUpType } from "../types/types";
import { apiUrl } from "./products";

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
