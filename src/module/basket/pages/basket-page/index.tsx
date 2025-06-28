import style from "./style.module.css";

import { Sheet } from "react-modal-sheet";

interface BasketPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BasketPage = ({ isOpen, onClose }: BasketPageProps) => {
  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <p>Корзина</p>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};
