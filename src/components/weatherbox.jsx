import React, { useEffect, useRef, useState } from "react";
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
    const [weatherData, setWeatherData] = useState(null);

    //************************날씨 데이터를 가져오는 부분************************
    const getCurrentLocation=()=>{
        navigator.geolocation.getCurrentPosition(
          (position)=>{
          let lat = position.coords.latitude
          let lon = position.coords.longitude
          getWeatherByCurrentLocation(lat, lon)
        },
        (error) => {
            console.error("Error getting location:", error);
            // 에러 처리: 기본 위치 사용 또는 사용자에게 알림
            }    
        )  
    }
      //api 가져오기
      const getWeatherByCurrentLocation = async (lat, lon) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=167c23e11cbd208df21931f491945cc5&units=metric`;
        try {
          let response = await fetch(url);
          let data = await response.json();
          setWeatherData(data);  // 여기서 상태를 업데이트합니다.
          console.log(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };

      useEffect(()=>{
        getCurrentLocation();
      },[]);

      //**********************************************************************
    
    /*  useEffect(() => {
        if (weatherData && containerRef.current) {
            const cityName = weatherData.name;
            const temperature = weatherData.main.temp + 273.15; // 섭씨를 켈빈으로 변환
            const weatherDescription = weatherData.weather[0].main.toLowerCase();


            initWeatherWidget(containerRef, cityName, temperature, weatherDescription);
            
            // 버튼에 이벤트 리스너 추가
            //"querySelector": DOM 특정요소에 접근하기 위한 메서드
            const brickBtn = containerRef.current.querySelector('#brick-btn');
            const marioBtn = containerRef.current.querySelector('#mario-btn');
            
            
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
    }, [weatherData]);
    */

    useEffect(() => {
        if (weatherData && containerRef.current) {
          const container = containerRef.current;
          const brickBtn = container.querySelector('.brick-btn'); // ID → 클래스 선택자 변경
          const marioBtn = container.querySelector('.mario-btn');
          const [isCelsius, setIsCelsius] = useState(true); // 로컬 변수 → 상태 관리 변경
      
          const handleClick = useCallback(() => {
            // 1. CSS 클래스 방식 애니메이션 적용
            marioBtn?.classList.add('jump-animation');
            
            // 2. 상태 업데이트 방식 변경
            setIsCelsius(prev => {
              const newTemp = prev 
                ? weatherData.main.temp // 섭씨 값 유지
                : (weatherData.main.temp * 9/5) + 32; // 화씨 변환
              
              // 3. DOM 직접 조작 대신 React 리렌더링 방식
              container.querySelector('.temp-display').textContent = 
                `${Math.round(newTemp)}°${prev ? 'C' : 'F'}`;
              
              return !prev;
            });
      
            // 4. 애니메이션 클래스 자동 제거
            setTimeout(() => {
              marioBtn?.classList.remove('jump-animation');
            }, 350);
      
          }, [weatherData.main.temp]);
      
          // 5. 이벤트 리스너 정리 로직 강화
          brickBtn?.addEventListener('click', handleClick);
          marioBtn?.addEventListener('click', handleClick);
      
          return () => {
            brickBtn?.removeEventListener('click', handleClick);
            marioBtn?.removeEventListener('click', handleClick);
            marioBtn?.classList.remove('jump-animation'); // 애니메이션 상태 초기화
          };
        }
      }, [weatherData]); // weatherData 변경 시에만 재구성
      


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