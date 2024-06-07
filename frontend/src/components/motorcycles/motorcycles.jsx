import React, { useState, useEffect } from "react";
import axios from "axios";
import './motorcycles.css';

function Motorcycles() {
  const [motorcycles, setMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    axios.get("http://192.168.0.101:3001/motorcycles")
      .then(response => {
        setMotorcycles(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка получения данных о мотоциклах:', error);
        setError('Ошибка загрузки данных.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if(error){
    return <div>Ошибка получения данных о мотоциклах</div>;
  }
  const nextRoute = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % motorcycles.length);
  };
  
  const prevRoute = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + motorcycles.length) % motorcycles.length);
  };
  
  const displayedMotorcycles = [
    motorcycles[currentIndex],
    motorcycles[(currentIndex + 1) % motorcycles.length],
    motorcycles[(currentIndex + 2) % motorcycles.length] // Добавляем третий мотоцикл
  ];
  
  // Проверяем, если массив motorcycles пустой, возвращаем пустой массив
  if (motorcycles.length === 0) {
    return <div>Нет доступных мотоциклов</div>;
  }

  return (
    
    <div className="motorcycles">
      <h3 className="motorcycles-header">Наша техника</h3>
      <div className="motorcycles-container">
      <button onClick={prevRoute} className="arrow-button">❮</button>
        {displayedMotorcycles.map(motorcycle => (
          <div key={motorcycle.id} className="motorcycle-card">
            <img src={motorcycle.image} alt={motorcycle.title} className="motorcycle-image" />
            <h3 className="motorcycle-title">{motorcycle.title}</h3>
            <p className="motorcycle-description">{motorcycle.description}</p>
          </div>
        ))}
        <button onClick={nextRoute} className="arrow-button">❯</button>
      </div>
    </div>
  );
}

export default Motorcycles;


