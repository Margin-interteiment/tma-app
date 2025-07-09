import "./assets/styles/index.css";
import { Root } from "./module/root/index";
import { ClosingConfirmSetup } from "./module/products/components/confirm-setup";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;

    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, []);

  return (
    <div className="App">
      <ClosingConfirmSetup />
      <Root />
    </div>
  );
}

export default App;
