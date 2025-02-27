import React from "react";
import '../assets/css/weatherbox.css';
import { 
    initWeatherWidget, 
    marioJump, 
    convertTemp, 
    makeSnow, 
    makeRain, 
    setWeatherBackground 
  } from '../assets/css/weatherbox.js';

const WeatherBox = () => {
    const containRef = useRef(null);

    useEffect(() => {
        // 컴포넌트가 마운트된 후 위젯 초기화 (하드코딩된 값으로 테스트)
        
    })
    return (
        <div className="weather-widget-container"> {/* 리액트에선 상위 부모요소가 필수적으로 있어야 하므로 하나의 부모 요소로 감싸기 */}
            <div className="container box-temperature">
                <div className="displayed-data">
                    <p className="temperature"></p>
                    <p className="cityg"></p>
                </div>
                <canvas id="particle"></canvas>
                <div className="box-btn">
                    <button type="button" id="brick-btn" className="btn"></button>
                </div>
                <button type="button" id="mario-btn" className="btn"></button>
            </div>
            <div className="container box-footer">
                <footer><p>© 2016 ErreC • All Rights Reserved</p></footer>
            </div>
        </div>
    );
};

export default WeatherBox;