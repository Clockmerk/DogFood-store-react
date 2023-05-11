import { Outlet } from "react-router-dom";
import { Footer } from "./layout/Footer/footer";
import { Header } from "./layout/Header/header";

export const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
