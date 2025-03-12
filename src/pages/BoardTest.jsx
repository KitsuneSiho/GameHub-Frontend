import React, { useState } from "react";

const categories = ["전체글", "사진", "공략", "자유게시판"];

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체글");

  const posts = [
    { id: 1, category: "전체글", title: "전체글 카테고리 글입니다다" },
    { id: 2, category: "사진", title: "이 사진좀보셈" },
    { id: 3, category: "공략", title: "게임 공략" },
    { id: 4, category: "자유게시판", title: "자유글" },
  ];

  const filteredPosts = posts.filter(
    (post) => selectedCategory === "전체글" || post.category === selectedCategory
  );

  return (
    <div style={styles.layout}>
      <aside style={styles.sidebar}>
        {categories.map((category) => (
          <div
            key={category}
            style={{
              ...styles.category,
              backgroundColor:
                selectedCategory === category ? "#ddd" : "#f4f4f4",
            }}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </div>
        ))}
      </aside>
      <main style={styles.mainContent}>
        {filteredPosts.map((post) => (
          <div key={post.id} style={styles.post}>
            {post.title}
          </div>
        ))}
      </main>
      <button style={styles.writeButton}>글쓰기</button>
    </div>
  );
};

const styles = {
  layout: {
    display: "flex",
    position: "relative",
  },
  sidebar: {
    position: "fixed",
    width: "200px",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    padding: "10px",
    boxShadow: "2px 0px 5px rgba(0,0,0,0.1)",
  },
  category: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #ddd",
  },
  mainContent: {
    marginLeft: "220px",
    padding: "20px",
    flexGrow: 1,
  },
  post: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    marginBottom: "10px",
  },
  writeButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    fontSize: "16px",
    borderWidth: 0,
    cursor: "pointer",
  },
};

export default App;
