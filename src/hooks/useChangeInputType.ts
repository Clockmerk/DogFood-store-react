import { useState } from "react";

export const useChangeInputType = () => {
  const [inputType, setInputType] = useState("password");
  const changeType = () => {
    return setInputType(inputType === "password" ? "text" : "password");
  };

  return { changeType, inputType };
};
