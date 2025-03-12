// eslint-disable-next-line no-unused-vars
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
<<<<<<< HEAD
=======
import { Button } from 'bootstrap';
import WeatherBox from './weatherbox';
>>>>>>> f12743326bde835ed7d8db05ad40968f5491fa77

function Navigation() {
  return (
    <div className='navigation'>
      <Navbar bg="light" data-bs-theme="light" fixed='top'>{/*백그라운드 밝게, 상단 고정*/}
        <Container>
          <Navbar.Brand href="home">Game Hub</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="notice">공지사항</Nav.Link>
            <Nav.Link href="community">자유게시판</Nav.Link>
            <Nav.Link href="test">테스트</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
<<<<<<< HEAD
          <Nav.Link href="weather">날씨위젯 들어갈곳</Nav.Link>
=======
          <WeatherBox />
>>>>>>> f12743326bde835ed7d8db05ad40968f5491fa77
            <Nav.Link href="login">로그인</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;