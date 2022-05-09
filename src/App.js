import Cart from "./components/Cart/Cart";
import Header from "./components/HeaderCartButton.css/Header";
import Meals from "./components/Meals/Meals";

function App() {
  return (
    <>
      <Cart/>
      <Header />
      <main>
        <Meals/>
      </main>
    </>
  );
}

export default App;
