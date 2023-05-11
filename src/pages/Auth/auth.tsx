import styles from "./auth.module.css";
import { useState } from "react";
import { SignIn } from "../../components/SignIn/signin";
import { SignUp } from "../../components/SignUp/signup";
import { useAppSelector } from "../../redux/store";
import { Navigate } from "react-router-dom";

export const Auth = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const { token } = useAppSelector((state) => state.user);
  if (token) return <Navigate to="/catalog" />;

  return (
    <>
      <div className={styles.auth}>
        <div>
          <p>Войдите или зарегистрируйтесь в кабинете:</p>
          <ul>
            <li
              className={activeTab == "tab1" ? styles.isActive : ""}
              onClick={() => setActiveTab("tab1")}
            >
              Авторизация
            </li>
            <li
              className={activeTab == "tab2" ? styles.isActive : ""}
              onClick={() => setActiveTab("tab2")}
            >
              Регистрация
            </li>
          </ul>
          <div>
            {activeTab == "tab1" ? (
              <SignIn />
            ) : (
              <SignUp activeTab={setActiveTab} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
