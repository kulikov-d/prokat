import React from "react";
import logo from '../../img/logo.png'
import Button from "../button/button";
import telegramIcon from '../../icons/telegram.png'
import wappIcon from '../../icons/whatsApp.png'
import phoneIcon from '../../icons/phone.png'
import './header.css'

function scrollToElement(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
}

function Header(){
    return(
        <header className="header">
            <div>
                <a href="#" className="header-logo">
                    <img src={logo} alt="logo" />

                </a>
            </div>
            <div className="header-contact">
                <a href="#">
                    <img src={telegramIcon} alt="telegram" className="contact-icon" />
                </a>
                <a href="https://wa.me/70000000000">
                    <img src={wappIcon} alt="whatsapp" className="contact-icon" />
                </a>
                <a href="tel:+70000000000">
                    <img src={phoneIcon} alt="telegram" className="contact-icon" />
                </a>
            </div>
            <div>
                <ul className="header-link-list">
                    <li><a href="#route" onClick={() => scrollToElement("route")}>Маршруты</a></li>
                    <li><a href="#price" onClick={() => scrollToElement("price")}>Стоимость</a></li>
                    <li><Button /></li>
                </ul>
            </div>
        </header>
    )
}

export default  Header;