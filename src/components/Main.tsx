import * as React from "react";
import "../styles/Main.css";
import Current from "./Current_weather";
import Five_days from "./5_days_weather";
import  {useState, useEffect} from "react";
import axios from "axios";
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';

export default function Basic() {
    let [isLoadsucces, setLoad] = useState(true);
    let [town, setTown] = useState('Moscow');
    let [lat, setLatid] = useState(55.7522);
    let [lon, setLongit] = useState(37.6156);
    let [widget, setWidget] = useState('current_widget');
    let [forecast, setForecast] = useState([]);
    let [feel_like, setFeel_like] = useState([]);
    let [temp, setTemp] = useState([]);
    let [wind_speed, setWind_speed] = useState([]);
    let [descriptions, setDescriptions] = useState([]);
    let [five_days, setFivedays] = useState([]);
    let [icon, setIcon] = useState('03n');
    let [bgClr1, setBgClr1] = useState('rgba(0, 250, 255, 0.3)');
    let [bgClr2, setBgClr2] = useState('rgba(0, 255, 0, 0.5)');
    let [bgClr3, setBgClr3] = useState('rgba(0, 250, 255, 0.3)');
    let [bgClr4, setBgClr4] = useState('rgba(0, 255, 0, 0.5)');


    let townlist = ['Moscow', 'Saint Petersburg', 'Voronezh', 'Volgograd', 'Yekaterinburg', 'Zheleznovodsk', 'Kazan', 'Krasnodar',
        'Krasnoyarsk', 'Magadan', 'Novosibirsk', 'Nizhny Novgorod', 'Omsk', 'Perm', 'Pskov', 'Rostov-on-Don', 'Samara', 'Sochi', 'Taganrog', 'Ufa', 'Chelyabinsk', 'Chita', 'Yakutsk',];


    let choice = townlist.map((text, index) => {
        return <option key={index}>{text}</option>;
    });

    let map_coord = [lat, lon];

    let ButtonHandler1 = () => {
        if (bgClr1 !=='rgba(0, 255, 0, 0.5)') {
            return (setBgClr1('rgba(0, 255, 0, 0.5)'), setBgClr2('rgba(0, 250, 255, 0.3)'))
        }
    };

    let ButtonHandler2 = () => {
        if (bgClr2 !=='rgba(0, 255, 0, 0.5)') {
            return (setBgClr2('rgba(0, 255, 0, 0.5)'), setBgClr1('rgba(0, 250, 255, 0.3)'))
        }
    };

    let ButtonHandler3 = () => {
        if (bgClr3 !=='rgba(0, 255, 0, 0.5)') {
            return (setBgClr3('rgba(0, 255, 0, 0.5)'), setBgClr4('rgba(0, 250, 255, 0.3)'))
        }
    };

    let ButtonHandler4 = () => {
        if (bgClr4 !=='rgba(0, 255, 0, 0.5)') {
            return (setBgClr4('rgba(0, 255, 0, 0.5)'), setBgClr3('rgba(0, 250, 255, 0.3)'))
        }
    };


        function getMyPositionIP() {
            navigator.geolocation.watchPosition(onSuccess, onError, options);
        };

        function onSuccess(geolocationData) {
            setLoad(true);
            setLatid(geolocationData.coords.latitude);
            setLongit(geolocationData.coords.longitude);
            axios.get(`https://api.ipgeolocation.io/timezone?apiKey=2276cdea63e34c4b934b8ff777748b3a&lat=${lat}&lng=${lon}`).then(res => {
                setTown(res.data.geo.city);
                setLoad(false);
            });
        };

        function onError(error) {
            return <h1>Your location is not available.Check the permission to access your location data.</h1>;
        };
        const options = {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000,
        };

        useEffect(() => {
            axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${town}','RUS'&limit=1&appid=****************`).then(res => {
                setLatid(res.data[0].lat);
                setLongit(res.data[0].lon);
            });

            axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=******************&units=metric`).then(res => {
                setForecast(res.data.current);
                setDescriptions(res.data.current.weather[0].description);
                setFeel_like(res.data.current.feels_like);
                setTemp(res.data.current.temp);
                setWind_speed(res.data.current.wind_speed);
                setFivedays(res.data.daily);
                setIcon(res.data.current.weather[0].icon);
                setLoad(false);
                console.log('control data ', res.data.current)
            });

        }, [town,]);

        if (isLoadsucces) {
            return <h1>Wait...</h1>;
        }

        return (
            <main>
                <div className="cover">
                        <div className='button'>
                            <button  onClick={(event) => {
                                        getMyPositionIP();
                                        ButtonHandler1();
                                    }}
                                     style={{ background: bgClr1 }}
                            >Search for my location</button>
                            <select  value={town}
                                    onChange={(event) => {
                                        setTown(event.target.value);
                                        ButtonHandler2();
                                    }}
                                style={{ background: bgClr2 }}>
                                <option disabled>Choose a city</option>
                                {choice}
                            </select>
                            <button  onClick={(event) => {
                                        setWidget("current_widget");
                                        ButtonHandler3();
                                    }}
                                    style={{ background: bgClr3 }}
                            >Today</button>
                            <button  onClick={(event) => {
                                        setWidget("5days");
                                        ButtonHandler4();
                                    }}
                                    style={{ background: bgClr4 }}
                            >Next 5 days </button>
                    </div>

                    {(widget === "current_widget") &&
                        <div>
                            <div className="town">{town}</div>
                            <div className="widget">
                                <Current lat={lat} lon={lon} city={town} icon={icon}
                                         description={descriptions} feel_like={feel_like} temp={temp}
                                         wind_speed={wind_speed}/>
                            </div>
                            <div className="maps">
                                <YMaps>
                                    <Map
                                        state={{
                                            center: (map_coord),
                                            zoom: 7,
                                            controls: ["zoomControl", "fullscreenControl"],
                                        }}
                                        modules={["control.ZoomControl", "control.FullscreenControl"]}>
                                        <Placemark defaultGeometry={map_coord}/>
                                    </Map>
                                </YMaps>
                            </div>
                        </div>
                    }

                    {widget === "5days" &&
                        <div>
                            <div className="town">{town}</div>
                            <div className="widgets">
                                {five_days.slice(0, 5).map((value, index) =>
                                    <Five_days day={index} temp={value.temp.day} icon={value.weather[0].icon}
                                               key={value.dt}/>,
                                    )}
                            </div>
                            <div className="maps">
                                <YMaps>
                                    <Map
                                        state={{
                                            center: (map_coord),
                                            zoom: 7,
                                            controls: ["zoomControl", "fullscreenControl"],
                                        }}
                                        modules={["control.ZoomControl", "control.FullscreenControl"]}>
                                        <Placemark defaultGeometry={map_coord}/>
                                    </Map>
                                </YMaps>
                            </div>
                        </div>
                    }
                </div>
            </main>
        );
};
