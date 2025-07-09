import style from "./style.module.css";
import { Sheet } from "react-modal-sheet";
import { useEffect, useState } from "react";
import { usePersonStore } from "../../../../store/personalDataStore";
import { useBackButton, usePopup, useInitData } from "@tma.js/sdk-react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-mobile-datepicker";

type ProfileProps = {
  isOpenProfile: boolean;
  setOpenProfile: (isOpenProfile: boolean) => void;
};

type UserData = {
  name: string;
  surname: string;
  telephone: string;
  birthDate: Date | null;
};

export const UserProfile = ({
  isOpenProfile,
  setOpenProfile,
}: ProfileProps) => {
  const initData = useInitData();
  const { persona, setPerson } = usePersonStore();
  const backButton = useBackButton();
  const popup = usePopup();

  const [userData, setUserData] = useState<UserData>({
    name: "",
    surname: "",
    telephone: "",
    birthDate: null,
  });

  const [originalUserData, setOriginalUserData] = useState<UserData>({
    name: "",
    surname: "",
    telephone: "",
    birthDate: null,
  });

  const [nameError, setNameError] = useState("");
  const [dateError, setDateError] = useState("");
  const [telError, setTelError] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [showSwitch, setShowSwitch] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasStoredData, setHasStoredData] = useState(false);

  const handleSelect = (selectedTime: Date) => {
    setUserData((prev) => ({ ...prev, birthDate: selectedTime }));
    setIsOpen(false);
    setDateError("");
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const user = initData?.user;
  const idUser = user?.id || "";
  const firstName = user?.firstName || "";
  const username = user?.username || "";
  const photoUrl = user?.photoUrl || "";
  const today = new Date();
  const minAllowedDate = new Date(today.getFullYear() - 100, 0, 1);
  const maxAllowedDate = new Date(
    today.getFullYear() - 15,
    today.getMonth(),
    today.getDate()
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ']*$/u.test(value) || value === "") {
      setUserData((prev) => ({ ...prev, name: value }));
      setNameError("");
    } else {
      setUserData((prev) => ({ ...prev, name: value }));
      setNameError("Допустимі лише літери.");
    }
  };

  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserData((prev) => ({ ...prev, surname: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^(\+)?[0-9]*$/.test(value) || value === "") {
      const maxLength = value.startsWith("+") ? 13 : 10;
      if (value.length <= maxLength) {
        setUserData((prev) => ({ ...prev, telephone: value }));
      }
    }
  };

  const loadProfileData = () => {
    const stored = localStorage.getItem("profileData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setPerson(parsed);

      const loadedData: UserData = {
        name: parsed.name,
        surname: parsed.surname,
        telephone: parsed.telephone.toString(),
        birthDate: parsed.birthDate ? new Date(parsed.birthDate) : null,
      };

      setUserData(loadedData);
      setOriginalUserData(loadedData);
      setIsSaved(true);
      setHasStoredData(true);
      setShowSwitch(false);
    } else {
      const emptyData: UserData = {
        name: "",
        surname: "",
        telephone: "",
        birthDate: null,
      };

      setUserData(emptyData);
      setOriginalUserData(emptyData);
      setIsSaved(false);
      setHasStoredData(false);
      setShowSwitch(true);
    }
    setIsChanged(false);
  };

  useEffect(() => {
    loadProfileData();
  }, [isOpenProfile]);

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
    const changed =
      userData.name !== originalUserData.name ||
      userData.surname !== originalUserData.surname ||
      userData.telephone !== originalUserData.telephone ||
      userData.birthDate?.getTime() !== originalUserData.birthDate?.getTime();

    setIsChanged(changed);

    if (!hasStoredData) {
      setShowSwitch(true);
    } else if (hasStoredData && changed) {
      setShowSwitch(true);
      setIsSaved(false);
    } else if (hasStoredData && !changed) {
      setShowSwitch(false);
    }
  }, [userData, originalUserData, hasStoredData]);

  const handleSaveToggle = () => {
    setDateError("");
    setTelError("");

    if (!userData.birthDate) {
      setDateError("Це поле є обов'язковим");
      return;
    }

    if (userData.birthDate > maxAllowedDate) {
      setDateError("Мінімальний вік 15 років");
      return;
    }

    if (!userData.telephone.trim()) {
      setTelError("Телефон є обов'язковим");
      return;
    }

    const newPerson = {
      id: idUser || Date.now(),
      name: userData.name,
      surname: userData.surname,
      firstName,
      username,
      telephone: Number(userData.telephone),
      birthDate: userData.birthDate.toISOString(),
    };

    setPerson(newPerson);
    localStorage.setItem("profileData", JSON.stringify(newPerson));
    setIsSaved(true);
    setHasStoredData(true);
    setOriginalUserData(userData);

    setTimeout(async () => {
      try {
        if (popup) {
          await popup.open({
            message: "Інформація успішно збережена",
            buttons: [{ id: "ok", type: "default", text: "Закрити" }],
          });
        } else {
          alert("Інформація успішно збережена");
        }
      } catch (error) {
        console.error("Error showing popup:", error);
      }
    }, 600);

    setTimeout(() => {
      setIsOpenModal(true);
      window.location.href = "/";
    }, 1000);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const buttons = document.querySelectorAll(".datepicker-navbar-btn");
        if (buttons.length === 2) {
          (buttons[0] as HTMLElement).innerText = "ОК";
          (buttons[1] as HTMLElement).innerText = "Скасувати";
        }
      }, 50);
    }
  }, [isOpen]);

  return (
    <Sheet isOpen={isOpenProfile} onClose={() => setOpenProfile(false)}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div className={style.profileContent}>
            <p className={style.profileTitle}>Персональні дані</p>

            {photoUrl && (
              <div className={style.userPhotoContainer}>
                <img
                  src={photoUrl}
                  alt="User Avatar"
                  className={style.userPhoto}
                />
              </div>
            )}

            <form className={style.profileForm}>
              <label className={style.formLabel}>
                <p className={style.formLabelName}>Ім'я</p>
                <input
                  className={`${style.inputName} ${
                    nameError ? style.inputError : ""
                  }`}
                  type="text"
                  placeholder="Введіть ваше ім'я"
                  value={userData.name}
                  onChange={handleNameChange}
                />
              </label>

              <label className={style.formLabel}>
                <p className={style.formLabelSurname}>Дата народження</p>

                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className={style.btnToLocalDate}
                >
                  {userData.birthDate ? (
                    userData.birthDate.toLocaleDateString()
                  ) : (
                    <p className={style.changedData}>Оберіть вашу дату</p>
                  )}
                </button>

                <DatePicker
                  isOpen={isOpen}
                  date={userData.birthDate || new Date(2000, 0, 1)}
                  onSelect={handleSelect}
                  onCancel={handleCancel}
                  min={minAllowedDate}
                  max={maxAllowedDate}
                  theme="default"
                  showFormat="YYYY/MM/DD"
                  dateFormat={["YYYY", "MM", "DD"]}
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
                  value={userData.telephone}
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
                  value={username}
                  readOnly
                />
              </label>

              {showSwitch && (
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
