import React, { useState, useEffect } from "react";
import axios from "axios";
import './route.css';
import Button from '../button/button';

function Route() {
  const [routes, setRoutes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);  // Добавляем состояние для загрузки
  const [error, setError] = useState(null);  // Добавляем состояние для ошибки

  useEffect(() => {
    axios.get("http://192.168.0.101:3001/routes")
      .then(response => {
        setRoutes(response.data);
        setLoading(false);  // Устанавливаем загрузку в false после получения данных
      })
      .catch(error => {
        setError('Ошибка получения данных о маршрутах');
        setLoading(false);  // Устанавливаем загрузку в false при ошибке
      });
  }, []);


  const nextRoute = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % routes.length);
  };

  const prevRoute = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + routes.length) % routes.length);
  };

  if (routes.length === 0) {
    return <div>Ошибка получения данных о маршрутах</div>;  // Сообщение, если маршруты не загружены
  }

  const displayedRoutes = [
    routes[currentIndex],
    routes[(currentIndex + 1) % routes.length]
  ];
  console.log(routes)
  return (
    <div className="route-container-wrapper" id="route">
      <h2 className="route-header">Наши Маршруты</h2>
      <div className="routes-container">
        <button onClick={prevRoute} className="arrow-button">❮</button>
        {displayedRoutes.map((route) => (
          <div key={route.id} className="route-card">
            <img src={route.image} alt={route.title} className="route-image" />
            <h3 className="route-title">{route.title}</h3>
            <p className="route-description">{route.description}</p>
            <p className="route-complexity">Сложность маршрута: {route.complexity}</p>
            <Button />
          </div>
        ))}
        <button onClick={nextRoute} className="arrow-button">❯</button>
      </div>
    </div>
  );
}

export default Route;
