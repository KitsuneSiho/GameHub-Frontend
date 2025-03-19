import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


 const Login= () =>{
    return(
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: "25rem", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <h2 className="text-center mb-4">로그인</h2>
        <Form>
            {/* 아이디 입력칸 */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>아이디</Form.Label>
                <Form.Control type="text" placeholder="아이디를 입력해주세요."/>
            </Form.Group>

            {/* 비밀번호 입력칸 */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" placeholder="비밀번호를 입력해주세여."/>
            </Form.Group>

            {/* 회원가입 버튼 */}
            <Button variant="regist" as={Link} to="/register" className="w-100">회원가입</Button>

            {/* 로그인버튼 */}
            <Button variant="login" type="submit" className="w-100 mb-2">로그인</Button>
        </Form>
        </Card>
    </Container>
        
    )
 }

export default Login;