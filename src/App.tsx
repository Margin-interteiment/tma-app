import "./App.css";
import { ProductsList } from "./module/products/components/product-list/products-list";
import { Root } from "./module/root/index";

function App() {
  return (
    <div className="App">
      <header className="App-header">Main Page</header>
      <Root />
      <ProductsList />
    </div>
  );
}

export default App;
