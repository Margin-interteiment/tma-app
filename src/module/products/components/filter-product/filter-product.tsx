import { Sheet } from "react-modal-sheet";

type FilterProductProps = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

export const FilterProduct = ({ isOpen, setOpen }: FilterProductProps) => {
  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(!isOpen)}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content></Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};
