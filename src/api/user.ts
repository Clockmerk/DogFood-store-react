import {
  ValuesSignInType,
  ValuesSignUpType,
  ValuesUpdateAvatarType,
  ValuesUpdateUserType,
} from "../types/types";
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

export const updateUserFetch = async (
  values: ValuesUpdateUserType,
  group: string,
  token: string
) => {
  return fetch(`${apiUrl}/v2/${group}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
};

export const updateUserAvatarFetch = async (
  values: ValuesUpdateAvatarType,
  group: string,
  token: string
) => {
  return fetch(`${apiUrl}/v2/${group}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
};
