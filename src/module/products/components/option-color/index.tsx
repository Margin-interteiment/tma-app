import { Color } from "../../typing/enums";
import style from "./style.module.css";
import { useState } from "react";

const colorMap: Record<string, string> = {
  Чорний: "#1A1A1A",
  Сірий: "#D2D4D8",
  Білий: "#FFFFFF",
  Синій: "#4479CC",
  Золотий: "#D7A55B",
};

export const OptionColor = () => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const toggleColor = (color: string) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };

  const isColorSelected = (color: string) => selectedColors.includes(color);

  return (
    <div className={style.optionColor}>
      <p className={style.optionColorTitle}>Колір</p>
      <ul className={style.optionColorList}>
        {Object.values(Color).map((color) => (
          <li key={color} className={style.optionColorItem}>
            <button
              className={`${style.optionColorBtn} ${
                isColorSelected(color) ? style.active : ""
              }`}
              onClick={() => toggleColor(color)}
            >
              <p className={style.optionColorText}>{color}</p>

              <span
                className={style.optionColorBox}
                style={{ backgroundColor: colorMap[color] }}
              ></span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
