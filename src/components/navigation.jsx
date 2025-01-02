// eslint-disable-next-line no-unused-vars
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'bootstrap';

function Navigation() {
  return (
    <div className='navigation'>
      <Navbar bg="light" data-bs-theme="light" fixed='top'>{/*백그라운드 밝게, 상단 고정*/}
        <Container>
          <Navbar.Brand href="home">ModHub</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="game-mod">게임모드</Nav.Link>
            <Nav.Link href="community">커뮤니티</Nav.Link>
            <Nav.Link href="test">테스트</Nav.Link>
            <Nav.Link href="editor">글쓰기 에디터</Nav.Link>
            <Nav.Link href="board">게시판</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="login">로그인</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;