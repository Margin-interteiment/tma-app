import "./assets/styles/index.css";
import { Root } from "./module/root/index";
import { ClosingConfirmSetup } from "./module/products/components/confirm-setup";

function App() {
  return (
    <div className="App">
      <ClosingConfirmSetup />
      <Root />
    </div>
  );
}

export default App;
