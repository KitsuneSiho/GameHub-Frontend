import React, { useEffect, useRef } from "react";
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
    const containerRef = useRef(null);
    
    useEffect(() => {
        // 컴포넌트가 마운트된 후 위젯 초기화 (하드코딩된 값으로 테스트)
        if (containerRef.current) {
            // 테스트용 가상 데이터
            const cityName = "Test City";
            const temperature = 293; // 약 20°C (켈빈)
            const weatherDescription = "clear"; // clear, clouds, rain, snow 등
            
            // 위젯 초기화
            initWeatherWidget(containerRef, cityName, temperature, weatherDescription);
            
            // 버튼에 이벤트 리스너 추가
            const brickBtn = containerRef.current.querySelector('#brick-btn');
            const marioBtn = containerRef.current.querySelector('#mario-btn');
            //querySelector: DOM 특정요소에 접근하기 위한 메서드
            
            let showCelsius = true;
            
            if (brickBtn && marioBtn) {
                const handleClick = () => {
                    marioJump(containerRef.current);
                    showCelsius = convertTemp(containerRef.current, temperature, showCelsius);
                };
                
                brickBtn.addEventListener('click', handleClick);
                marioBtn.addEventListener('click', handleClick);
                
                // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
                return () => {
                    if (brickBtn && marioBtn) {
                        brickBtn.removeEventListener('click', handleClick);
                        marioBtn.removeEventListener('click', handleClick);
                    }
                };
            }
        }
    }, []);


    return (
        <div className="weather-widget-container" ref={containerRef}> {/* 리액트에선 상위 부모요소가 필수적으로 있어야 하므로 하나의 부모 요소로 감싸기 */}
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