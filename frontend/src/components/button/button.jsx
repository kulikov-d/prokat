import React, { useState, useEffect } from "react";
import axios from "axios";
import validator from "validator";
import './button.css';

function Button() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const body = document.querySelector('body');
    if (isOpen || isFormSubmitted) {
      body.style.overflow = 'hidden';
      window.scrollTo(0, 0); // Прокручиваем страницу вверх
    } else {
      body.style.overflow = 'auto';
    }
    return () => {
      body.style.overflow = 'auto';
    };
  }, [isOpen, isFormSubmitted]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setIsFormSubmitted(false); // Сброс состояния при закрытии попапа
    setErrorMessage(""); // Сброс ошибки при закрытии попапа
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const validateAndNormalizePhone = (phone) => {
    // Удаляем все пробелы, дефисы, скобки и прочие символы
    const cleaned = phone.replace(/\D/g, '');
    // Преобразование номера в международный формат
    if (cleaned.startsWith('8')) {
      return `+7${cleaned.slice(1)}`;
    } else if (!cleaned.startsWith('+7') && cleaned.startsWith('7')) {
      return `+${cleaned}`;
    }
    return phone;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const namePattern = /^[а-яА-ЯёЁ]+$/;

    if (!namePattern.test(formData.firstName) || !namePattern.test(formData.lastName)) {
      setErrorMessage('Имя и фамилия должны содержать только русские буквы.');
      return;
    }

    const normalizedPhone = validateAndNormalizePhone(formData.phone);

    if (!validator.isMobilePhone(normalizedPhone, 'ru-RU')) {
      setErrorMessage('Некорректный номер телефона.');
      return;
    }

    axios.post('http://192.168.0.101:3001/submit', { ...formData, phone: normalizedPhone })
      .then(response => {
        console.log('Form submitted successfully');
        setIsFormSubmitted(true);
      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
        setErrorMessage(error.response?.data || 'Ошибка отправки формы');
      });
  };

  return (
    <>
      <button className="button-response" onClick={togglePopup}>Записаться</button>
      {(isOpen || isFormSubmitted) && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={togglePopup}>×</span>
            <h2>{isFormSubmitted ? "Спасибо, мы перезвоним вам" : "Форма записи"}</h2>
            {!isFormSubmitted && (
              <>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                  <input type="text" name="firstName" placeholder="Имя" value={formData.firstName} onChange={handleChange} required />
                  <input type="text" name="lastName" placeholder="Фамилия" value={formData.lastName} onChange={handleChange} required />
                  <input type="tel" name="phone" placeholder="Номер телефона" value={formData.phone} onChange={handleChange} required />
                  <button type="submit">Отправить</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Button;

