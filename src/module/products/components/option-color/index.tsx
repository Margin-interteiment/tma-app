import { Color } from "../../typing/enums";
import style from "./style.module.css";

const colorMap: Record<string, string> = {
  Чорний: "#1A1A1A",
  Сірий: "#D2D4D8",
  Білий: "#FFFFFF",
  Синій: "#4479CC",
  Золотий: "#D7A55B",
};

type OptionColorProps = {
  selectedColors: string[];
  onColorChange: (colors: string[]) => void;
};

export const OptionColor = ({
  selectedColors,
  onColorChange,
}: OptionColorProps) => {
  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      onColorChange(selectedColors.filter((c) => c !== color));
    } else {
      onColorChange([...selectedColors, color]);
    }
  };

  return (
    <div className={style.optionColor}>
      <p className={style.optionColorTitle}>Колір</p>
      <ul className={style.optionColorList}>
        {Object.values(Color).map((color) => (
          <li key={color} className={style.optionColorItem}>
            <button
              type="button"
              className={`${style.optionColorBtn} ${
                selectedColors.includes(color) ? style.active : ""
              }`}
              onClick={() => toggleColor(color)}
            >
              <p className={style.optionColorText}>{color}</p>
              <span
                className={style.optionColorBox}
                style={{ backgroundColor: colorMap[color] }}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
