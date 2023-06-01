import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

export const Orders = () => {
  const { token } = useAppSelector((state) => state.user);

  if (!token) return <Navigate to="/auth" />;
  return <div>Здесь вы хранится история заказов</div>;
};
