import styles from "./auth.module.css";
import { useState } from "react";
import { SignIn } from "../../components/SignIn/signin";
import { SignUp } from "../../components/SignUp/signup";
import { useAppSelector } from "../../redux/store";
import { Navigate } from "react-router-dom";

export const Auth = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { token } = useAppSelector((state) => state.user);
  if (token) return <Navigate to="/catalog" />;

  const tabs = ["Авторизация", "Регистрация"];

  return (
    <div className={styles.auth}>
      <div>
        <p>Войдите или зарегистрируйтесь в кабинете:</p>
        <ul>
          {tabs.map((tab, index) => {
            const tabClass = activeTab === index ? styles.isActive : "";
            return (
              <li
                className={tabClass}
                key={index}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </li>
            );
          })}
        </ul>
        <div>
          {activeTab == 0 ? <SignIn /> : <SignUp activeTab={setActiveTab} />}
        </div>
      </div>
    </div>
  );
};
