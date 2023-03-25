import { Footer } from "./components/Footer/footer";
import { Header } from "./components/Header/header";
import { Main } from "./components/Main/main";

export const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};
