import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState({ color: "", text: "" });

  // 비밀번호 강도 평가 함수
  const evaluatePasswordStrength = (userPassword) => {
    if (userPassword.length <= 4) {
      setPasswordStrength({ color: "red", text: "위험" });
    } else if (userPassword.length <= 8) {
      setPasswordStrength({ color: "orange", text: "보통" });
    } else if (userPassword.length < 13) {
      setPasswordStrength({ color: "green", text: "안전" });
    } else {
      setPasswordStrength({ color: "skyblue", text: "매우안전" });
    }
  };

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      evaluatePasswordStrength(value);
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("회원가입 성공!");
      } else {
        const errorMessage = await response.text();
        alert(`회원가입 실패: ${errorMessage}`);
      }
    } catch (error) {
      console.error("회원가입 요청 중 오류 발생:", error);
      alert("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: "30rem", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <h2 className="text-center mb-4">회원가입 페이지</h2>
        <Form onSubmit={handleSubmit}>
          {/* 아이디 입력 */}
          <Form.Group className="mb-3">
            <Form.Label>아이디</Form.Label>
            <Form.Control
              type="text"
              name="userId"
              placeholder="아이디를 입력하세요"
              value={formData.userId}
              onChange={handleChange}
            />
          </Form.Group>

          {/* 닉네임 입력 */}
          <Form.Group className="mb-3">
            <Form.Label>닉네임</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              placeholder="닉네임을 입력하세요"
              value={formData.userName}
              onChange={handleChange}
            />
          </Form.Group>

          {/* 이메일 입력 */}
          <Form.Group className="mb-3">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="email"
              name="userEmail"
              placeholder="이메일을 입력하세요."
              value={formData.userEmail}
              onChange={handleChange}
            />
          </Form.Group>

          {/* 비밀번호 입력 */}
          <Form.Group className="mb-3">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              name="userPassword"
              placeholder="비밀번호를 입력하세요"
              value={formData.userPassword}
              onChange={handleChange}
            />
            {/* 비밀번호 강도 표시 */}
            <div style={{ height: "5px", marginTop: "5px", backgroundColor: passwordStrength.color }}></div>
            <small style={{ color: passwordStrength.color }}>{passwordStrength.text}</small>
          </Form.Group>

          {/* 회원가입 버튼 */}
          <Button variant="primary" type="submit" className="w-100 mt-3">
            회원가입
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
