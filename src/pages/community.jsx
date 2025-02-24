import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';  // useNavigate 훅 추가
import '../assets/css/community.css';

const Commuinity = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: "첫번째 게시글", content: "sdfdsfsfsf." },
    { id: 2, title: "두번째 게시글", content: "dfsgagdfsggsdg." },
    { id: 3, title: "세번째 게시글", content: "fagdgfdfdgdfgfddggfg" },
  ]);
  
  const navigate = useNavigate();  // useNavigate 훅 사용
  
  const goToWriter = () => {
    navigate('/writer');  // /writer 경로로 이동
  };

  return (
    <div className="community-container">
      <div className="post-list">
        <h3>게시글 리스트</h3>
        <hr className="head-line" />
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <hr />
            </li>
          ))}
        </ul>
      </div>

      <button className="write-btn" onClick={goToWriter}>글쓰기</button> {/* 글쓰기 버튼 클릭 시 /writer로 이동 */}
    </div>
  );
};

export default Commuinity;
