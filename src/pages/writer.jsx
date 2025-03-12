import React, { useState } from "react";
import '../assets/css/writer.css'; // 외부 CSS 파일을 불러옵니다.
import { useNavigate } from 'react-router-dom';

const Writer = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동
  const [userInfo, setUserInfo] = useState([
    { udi: 19969, user_id: "siho1229", user_name: "시호", date: "2025-02-02" },
  ]);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    // 제목과 내용이 빈 값인지 체크
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해 주세요.");
      return;
    }

    const postData = {
      title: title,
      content: content,
      user_id: userInfo[0].user_id, // 작성자의 ID 추가
      date: new Date().toISOString(), // 현재 날짜 추가
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
  
      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다.');
      }
  
      const data = await response.json();
      alert('저장되었습니다!');
      // 저장 후 게시글 목록으로 이동
      navigate('/test'); // 게시글 목록 페이지로 이동
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      alert('저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      // 폼 초기화
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="writer-container">
      <div className="post-list">
        <h3>글쓰기</h3>
        <hr className="head-line" />
        
        {/* 작성자 정보 출력 */}
        {userInfo.map((uid) => (
          <div key={uid.udi}>
            <h4>작성자: {uid.user_name}</h4>
            <p>작성일: {uid.date}</p>
            <hr />
          </div>
        ))}
        
        {/* 글쓰기 폼 */}
        <div className="input-container">
          <label htmlFor="title" className="input-label">
            제목
          </label>
          <input
            type="text"
            id="title"
            className="input-field"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          
          <label htmlFor="content" className="input-label">
            본문
          </label>
          <textarea
            id="content"
            className="input-field content-field"
            placeholder="본문을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      <button className="save-btn" onClick={handleSave}>
        저장하기
      </button>
    </div>
  );
};

export default Writer;
