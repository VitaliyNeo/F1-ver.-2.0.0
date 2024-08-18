import * as React from "react";
import "../styles/Widget.css";



function Today(props) {
    const date = new Date();
    const days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    return (
        <div className="current">
            <div className="weather-left">
                <h2 className="date"> {date.toLocaleDateString()}, {days[date.getDay()]} </h2>
                    <img src={`https://openweathermap.org/img/wn/${props.icon}.png`} alt="" width="100" />
                <div className="desc-main">{props.description}</div>
                <div className="feel-like">Feels like as: {Math.round(props.feel_like)}°</div>
            </div>

            <div className="weather-right">
                <div className="temp-main"> {Math.round(props.temp)}&deg;</div>
                <div className="wind">Wind now: {props.wind_speed}m/s</div>
            </div>
        </div>
    );
};

export default Today;

