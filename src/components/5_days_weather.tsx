import * as React from "react";
import "../styles/Widget.css";


function Five_days(props) {
    const date = new Date();
    const days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    return (
        <div className="widget">
            <div className="panel">
                <div className="date2">
                    {props.day === 0 && "Today"}
                    {(date.getDay()+props.day) < 7 && props.day > 0 && `${date.getDate()+props.day}.${date.getMonth()}.${date.getFullYear()}, ${days[date.getDay()+props.day]}`}
                    {(date.getDay()+props.day) > 6 && props.day > 0 && `${date.getDate()+props.day}.${date.getMonth()}.${date.getFullYear()}, ${days[date.getDay()+props.day-7]}`}
                </div>
                <div className="temp">
                    <img src={`https://openweathermap.org/img/wn/${props.icon}.png`} alt="" width="80"/>
                      {Math.round(props.temp)}&deg;
                </div>
            </div>
        </div>
    );
};

export default Five_days;
