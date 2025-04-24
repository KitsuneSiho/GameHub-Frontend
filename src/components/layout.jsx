import React from "react";
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import './Layout.css';
import WeatherBox from './WeatherBox';

const Layout = () => {
    return (
        <>
            <NavigationBar />
            <Container fluid className="main-content-container">
                <Row className="justify-content-center">
                    <Col lg={9} md={8} className="pe-0">
                        <Container className="body-container">
                            <Outlet />
                        </Container>
                    </Col>
                    <Col lg={3} md={4} className="ps-0" >
                        <div className="weather-widget">
                                <WeatherBox />
                            </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default Layout;