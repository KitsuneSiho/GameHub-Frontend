import React from "react";
import '../assets/css/weatherbox.css';

const WeatherBox = () => {
    return (
        <div className="box-temperature">
            <div className="displayed-data">
                <div className="cityg">용인</div>
                <div className="temperature">-2°C</div>
                <div>맑음</div>
            </div>
            
            {/* 애니메이션 요소들 추가 */}
            <div className="sun-inner">
                <img src="https://res.cloudinary.com/dt4qeehms/image/upload/v1476716213/weather%20machine/sun.png" alt="sun" />
            </div>
            
            {/* 필요한 기타 요소들 (구름, 별 등)을 추가할 수 있습니다 */}
        </div>
    );
};

export default WeatherBox;