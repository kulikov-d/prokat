import React from "react";
import './contactsAndMaps.css';
import telegramIcon from '../../icons/telegram.png'
function ContactsAndMaps() {
  return (
    <div className="contacts-and-maps">
      <div className="footer">
        <h2>Контакты :</h2>
        <a href="tel:70000000000" >Телефон: +7 000 000-00-00</a>
        <a href="tel:70000000000" >Телефон: +7 000 000-00-00</a>
        <a href="tel:70000000000" >Телефон: +7 000 000-00-00</a>
        <a href="#">
                    <img src={telegramIcon} alt="telegram" className="contact-icon" />
                </a>
      </div>
      <div className="map-container">
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <a href="https://yandex.ru/maps/org/kham/83353900795/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}>Хам</a>
          <a href="https://yandex.ru/maps/54/yekaterinburg/category/rental/184108219/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px' }}>Пункт проката в Екатеринбурге</a>
          <a href="https://yandex.ru/maps/54/yekaterinburg/category/organization_of_events/184108329/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '28px' }}>Организация мероприятий в Екатеринбурге</a>
          <iframe src="https://yandex.ru/map-widget/v1/org/kham/83353900795/?ll=60.583156%2C56.905725&z=13" width="560" height="400" frameborder="1" allowfullscreen="true" style={{ position: 'relative' }}></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactsAndMaps;
