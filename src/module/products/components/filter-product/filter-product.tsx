import { Sheet } from "react-modal-sheet";
import { OptionColor } from "../option-color";
import { OptionSelect } from "../option-select";

type FilterProductProps = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

export const FilterProduct = ({ isOpen, setOpen }: FilterProductProps) => {
  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(!isOpen)}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <OptionColor />
          <OptionSelect />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};
