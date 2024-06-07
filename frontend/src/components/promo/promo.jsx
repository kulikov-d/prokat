import React from "react";
import './promo.css'
import Button from '../button/button'
function Promo (){
    return(
         <div className="promo">
            <div className="promo-text">
                <h1>Прокат эндуро мотоциклов и
                ПитБайков в Екатеринбурге</h1>
                <p>Свободное катание<br />
                Мото туры <br />
                Групповые катания с инструктором</p>
                
                <div >
                <Button />
                </div>
            </div>
         </div>   
    )
}

export default Promo