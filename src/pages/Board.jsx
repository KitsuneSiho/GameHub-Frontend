import React from "react";

const Board = ({posts}) => {
    return(
        <div className="boardContainer">
            <h1 className="title">게시판</h1>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>날자</th>
                    <th>조회수</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post)=>(
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td className="titleCell">{post.title}</td>
                        <td>{post.user}</td>
                        <td>{post.date}</td>
                        <td>{post.views}</td>
                    </tr>

                ))}
            </tbody>
        </div>

    );
};
export default Board;