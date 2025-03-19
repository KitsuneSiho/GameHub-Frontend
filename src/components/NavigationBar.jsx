import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavigationBar.css';
import gamehub from '../assets/images/logo/gamehub-logo.jpg';

const NavigationBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" id="nav-bar-bg">
      <Container fluid className="nav-bar-container">
        <Navbar.Brand as={NavLink} to="/">
          <img src={gamehub} alt="Game Hub" width="auto" height="50" style={{ borderRadius: "15px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/notice" className="custom-nav-link">공지사항</Nav.Link>
            <Nav.Link as={NavLink} to="/community" className="custom-nav-link">자유게시판</Nav.Link>
            <Nav.Link as={NavLink} to="/test" className="custom-nav-link">테스트</Nav.Link>
            <Nav.Link as={NavLink} to="/board" className="custom-nav-link">게시판</Nav.Link>
          </Nav>
          </Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/login" className="custom-nav-link">로그인</Nav.Link>
          </Nav>
        
      </Container>
    </Navbar>
  );
};

export default NavigationBar;