import React, { useState, useEffect } from "react";
import axios from "axios";
import './pricesAndInfo.css';
import Button from "../button/button";

function PricesAndInfo() {
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Отправляем GET-запрос к маршруту нашего сервера для получения данных о ценах
    axios.get(`http://localhost:3001/prices`)
      .then(response => {
        // Если запрос успешен, устанавливаем полученные данные в состояние компонента
        setPrices(response.data);
        setLoading(false);
      })
      .catch(error => {
        // Обработка ошибок
        console.error('Ошибка получения данных о ценах:', error);
        setError('Ошибка загрузки данных.');
        setLoading(false);
      });
  }, []); // [] означает, что useEffect будет запущен только один раз при монтировании компонента

  // Если идет загрузка данных, показываем сообщение
  if (loading) {
    return <div>Загрузка...</div>;
  }

  // Если произошла ошибка, показываем сообщение об ошибке
  if (error) {
    return <div>Ошибка получения данных о ценах</div>;
  }

  // Если данные загружены и корректны, отображаем их
  if (prices) {
    return (
      <div className="prices-and-info" id="price">
        <div className="prices">
          <h2 className="price-header">Цены :</h2>
          <div className="price-item">
            <h3>Эндуро :</h3>
            <p>{prices.enduro.hourly["1_hour"]} руб. за 1 час</p>
            <p>{prices.enduro.hourly["2_hours"]} руб. за 2 часа (следующие часы по {prices.enduro.hourly.additional_hour} руб.)</p>
            <p>{prices.enduro.hourly.full_day} руб. - весь день (с 10:00 до 20:00)</p>
          </div>
          <div className="price-item">
            <h3>Питбайки :</h3>
            <p>{prices.pitbikes.hourly["1_hour"]} руб. за 1 час</p>
            <p>{prices.pitbikes.hourly["2_hours"]} руб. за 2 часа (следующие часы по {prices.pitbikes.hourly.additional_hour} руб.)</p>
            <p>{prices.pitbikes.hourly.full_day} руб. - весь день (с 10:00 до 20:00)</p>
          </div>
        </div>
        <div className="safety-info">
          <h2>Мы заботимся о вашей безопасности:</h2>
          <p>Полный комплект защитной экипировки и инструктаж по технике безопасности гарантируют вашу защиту!</p>
          <Button />
        </div>
      </div>
    );
  }

  // Если данных нет, показываем сообщение
  return <div>Нет данных для отображения</div>;
}

export default PricesAndInfo;



