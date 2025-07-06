import style from "./style.module.css";
import { Sheet } from "react-modal-sheet";
import { useEffect, useState } from "react";
import { usePersonStore } from "../../../../store/personalDataStore";

type ProfileProps = {
  isOpenProfile: boolean;
  setOpenProfile: (isOpenProfile: boolean) => void;
};

export const ProductProfile = ({
  isOpenProfile,
  setOpenProfile,
}: ProfileProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const { item, setPerson } = usePersonStore();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [telephone, setTelephone] = useState("");

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
      setIsSaved(true);
    } else {
      setName("");
      setSurname("");
      setTelephone("");
      setInitialData({ name: "", surname: "", telephone: "" });
      setIsSaved(false);
    }
    setIsChanged(false);
  }, [item, isOpenProfile]);

  useEffect(() => {
    const changed =
      name !== initialData.name ||
      surname !== initialData.surname ||
      telephone !== initialData.telephone;

    setIsChanged(changed);

    if (changed) {
      setIsSaved(false);
    }
  }, [name, surname, telephone, initialData]);

  const handleSaveToggle = () => {
    const newPerson = {
      id: item?.id || Date.now(),
      name,
      surname,
      telephone: Number(telephone),
    };

    setPerson(newPerson);
    setIsSaved(true);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setOpenProfile(false);
  };

  const shouldShowSwitch = !item || isChanged;

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
                  className={style.inputName}
                  type="text"
                  placeholder="Введіть ваше ім'я"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label className={style.formLabel}>
                <p className={style.formLabelSurname}>Прізвище</p>
                <input
                  className={style.inputSurname}
                  type="text"
                  placeholder="Введіть ваше прізвище"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                />
              </label>
              <label className={style.formLabel}>
                <p className={style.formLabelNumber}>Номер</p>
                <input
                  className={style.inputNum}
                  type="tel"
                  placeholder="Введіть ваш номер"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  required
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
            </form>
          </div>

          {isOpenModal && (
            <>
              <div className={style.modalBackdrop}></div>
              <div className={style.modalNotification}>
                <p className={style.modalNotificationText}>
                  Інформація успішно збережена
                </p>
                <button
                  className={style.modalNotificationBtn}
                  onClick={closeModal}
                >
                  Закрити
                </button>
              </div>
            </>
          )}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};
