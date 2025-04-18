import React, { useState, useEffect } from "react";
import '../../assets/css/PostList.css'; // 외부 CSS 파일을 불러옵니다.
import { useNavigate } from 'react-router-dom';

const Test = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest"); // 최신순 기본값
  const navigate = useNavigate();

  const goToWriter = () => {
    navigate('/writer');  // /writer 경로로 이동
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/posts'); // 실제 백엔드 URL
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data); // 초기 상태에서 모든 게시글을 필터링된 목록으로 설정
      } catch (error) {
        console.error('게시글 목록 불러오기 중 오류 발생:', error);
        setError('게시글 목록을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = () => {
    const results = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // 현재 페이지에 해당하는 게시글 슬라이스
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  //선택한 게시글 출력
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBackToList = () => {
    setSelectedPost(null);
  };

  const handlePageInputChange = (e) => {
    const page = Number(e.target.value);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSubmit = (e) => {
    e.preventDefault();
    const page = Number(e.target.elements.pageInput.value);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    //선택한 게시글 출력
    <div className="post-list-container">
      {selectedPost ? (
        <div className="post-detail">
          <h4>{selectedPost.title}</h4>
          <p>{selectedPost.content}</p>
          <p><strong>작성자:</strong> {selectedPost.userId} <strong>작성일:</strong> {selectedPost.date}</p>
          <button onClick={handleBackToList}>목록으로 돌아가기</button>
        </div>
      ) : (
        <>
          <h3>게시글 목록</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <button className="write-btn" onClick={goToWriter}>글쓰기</button>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input 
                type="text" 
                placeholder="검색어를 입력하세요..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
              <button onClick={handleSearch}>검색</button>
            </div>
            <select value={sortOrder} onChange={handleSortChange}>
              <option value="latest">최신순</option>
              <option value="oldest">과거순</option>  
            </select>
          </div>

          <div className="post-grid">
            {currentPosts.map((post) => (
              <div key={post.postId} className="post-item" onClick={() => handlePostClick(post)}>
                <h4>{post.title}</h4>
                <p>{post.content}</p>
                <p><strong>작성자:</strong> {post.userId} <strong>작성일:</strong> {post.date}</p>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button 
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              이전
            </button>
            <span>페이지 {currentPage} / {totalPages}</span>
            <button 
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              다음
            </button>
            <form onSubmit={handlePageSubmit}>
              <input 
                type="number" 
                min="1" 
                max={totalPages} 
                defaultValue={currentPage} 
                name="pageInput"
              />
              <button type="submit">이동</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Test;
