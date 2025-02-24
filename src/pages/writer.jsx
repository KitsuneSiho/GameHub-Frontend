import React, { useState } from "react";
import '../assets/css/writer.css'; // 외부 CSS 파일을 불러옵니다.

const Writer = () => {
  const [userInfo, setUserInfo] = useState([
    { udi: 19969, user_id: "siho1229", user_name: "시호", date: "2025-02-02" },
  ]);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    // 저장하는 로직 구현할 위치
    alert("저장되었습니다!");
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
