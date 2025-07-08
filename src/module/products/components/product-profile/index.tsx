import style from "./style.module.css";
import { Sheet } from "react-modal-sheet";
import { useEffect, useState } from "react";
import { usePersonStore } from "../../../../store/personalDataStore";
import { useBackButton, usePopup } from "@tma.js/sdk-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
type ProfileProps = {
  isOpenProfile: boolean;
  setOpenProfile: (isOpenProfile: boolean) => void;
};

export const ProductProfile = ({
  isOpenProfile,
  setOpenProfile,
}: ProfileProps) => {
  const tg = (window as any).Telegram?.WebApp;
  const [isSaved, setIsSaved] = useState(false);
  const { item, setPerson } = usePersonStore();
  const backButton = useBackButton();
  const popup = usePopup();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [telephone, setTelephone] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [nameError, setNameError] = useState("");
  const [dateError, setDateError] = useState("");
  const [telError, setTelError] = useState("");
  const [showSwitch, setShowSwitch] = useState(true);

  const [username, setUsername] = useState(
    tg?.initDataUnsafe?.user?.username || ""
  );
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ']*$/u.test(value) || value === "") {
      setName(value);
      setNameError("");
    } else {
      setName(value);
      setNameError("Допустимі лише літери.");
    }
  };

  const today = new Date();
  const minAllowedDate = new Date(today.getFullYear() - 100, 0, 1);
  const maxAllowedDate = new Date(
    today.getFullYear() - 15,
    today.getMonth(),
    today.getDate() - 1
  );

  const handleDateChange = (date: Date | null) => {
    if (!date) {
      setStartDate(null);
      return;
    }

    setStartDate(date);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^(\+)?[0-9]*$/.test(value) && value !== "") {
      setTelephone(value);
    }
  };

  const [initialData, setInitialData] = useState({
    name: "",
    surname: "",
    telephone: "",
  });

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (item) {
      const phone = item.telephone.toString();
      setName(item.name);
      setSurname(item.surname);
      setTelephone(phone);
      setInitialData({
        name: item.name,
        surname: item.surname,
        telephone: phone,
      });
      setUsername(item.username);
      setIsSaved(true);
    } else {
      setName("");
      setSurname("");
      setTelephone("");
      setUsername("");
      setInitialData({ name: "", surname: "", telephone: "" });
      setIsSaved(false);
    }
    setIsChanged(false);
  }, [item, isOpenProfile]);

  useEffect(() => {
    if (isOpenProfile) {
      backButton.show();

      const handleBackClick = () => {
        setOpenProfile(false);
      };

      backButton.on("click", handleBackClick);

      return () => {
        backButton.hide();
        backButton.off("click", handleBackClick);
      };
    }
  }, [isOpenProfile]);

  useEffect(() => {
    if (!tg) return;

    const changed =
      name !== initialData.name ||
      surname !== initialData.surname ||
      telephone !== initialData.telephone;

    setIsChanged(changed);

    if (changed) {
      setIsSaved(false);
    }
  }, [name, surname, telephone, initialData]);

  const handleSaveToggle = async () => {
    setDateError("");
    setTelError("");

    if (!startDate) {
      setDateError("Це поле є обов'язковим");
      return;
    }

    if (!telephone.trim()) {
      setTelError("Телефон є обов'язковим");
      return;
    }
    const newPerson = {
      id: item?.id || Date.now(),
      name,
      surname,
      username,
      telephone: Number(telephone),
    };

    setPerson(newPerson);
    setIsSaved(true);
    setShowSwitch(true);

    setTimeout(async () => {
      try {
        if (popup) {
          await popup.open({
            message: "Інформація успішно збережена",
            buttons: [
              {
                id: "ok",
                type: "default",
                text: "ОК",
              },
            ],
          });
        } else {
          if (tg?.showAlert) {
            tg.showAlert("Інформація успішно збережена");
          } else {
            alert("Інформація успішно збережена");
          }
        }
      } catch (error) {
        console.error("Error showing popup:", error);
      }
    }, 600);

    setTimeout(() => {
      setShowSwitch(false);
      setIsOpenModal(true);
      window.location.href = "/";
    }, 1000);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setOpenProfile(false);
  };

  const shouldShowSwitch = !item || isChanged || showSwitch;

  return (
    <Sheet isOpen={isOpenProfile} onClose={() => setOpenProfile(false)}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div className={style.profileContent}>
            <p className={style.profileTitle}>Персональні дані</p>
            <form className={style.profileForm}>
              <label className={style.formLabel}>
                <p className={style.formLabelName}>Ім'я</p>
                <input
                  className={`${style.inputName} ${
                    nameError ? style.inputError : ""
                  }`}
                  type="text"
                  placeholder="Введіть ваше ім'я"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </label>
              <label className={style.formLabel}>
                <p className={style.formLabelSurname}>Дата народження</p>
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  className={`${style.datePick} ${
                    dateError ? style.datePickError : ""
                  }`}
                  dateFormat="dd.MM.yyyy"
                  placeholderText="Оберіть вашу дату"
                  maxDate={maxAllowedDate}
                  minDate={minAllowedDate}
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                />
                {dateError && (
                  <span className={style.dataErrorText}>{dateError}</span>
                )}
              </label>
              <label className={style.formLabel}>
                <p className={style.formLabelNumber}>Номер</p>
                <input
                  className={`${style.inputNum} ${
                    telError ? style.telError : ""
                  }`}
                  type="tel"
                  placeholder="Введіть ваш номер"
                  value={telephone}
                  onChange={handlePhoneChange}
                  required
                />
                {telError && (
                  <span className={style.telErrorText}>{telError}</span>
                )}
              </label>

              <label htmlFor="username" className={style.usernameLabel}>
                Нікнейм
                <input
                  id="username"
                  type="text"
                  placeholder="Ваш нік"
                  className={style.usernameInput}
                  value={tg.initDataUnsafe?.user?.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>

              {shouldShowSwitch && (
                <div className={style.formSaveInfoContent}>
                  <p className={style.formSaveInfo}>Зберегти інформацію</p>
                  <label className={style.switch}>
                    <input
                      type="checkbox"
                      checked={isSaved}
                      onChange={handleSaveToggle}
                    />
                    <span className={style.slider}></span>
                  </label>
                </div>
              )}

              {nameError && (
                <span className={style.errorText}>{nameError}</span>
              )}
            </form>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};
