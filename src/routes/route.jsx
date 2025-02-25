import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Board from '../pages/board';
import Login from '../pages/login';
import { posts } from '../pages/sampleData';
import Community from '../pages/community';
import Register from '../pages/register';
import Testpg2 from '../pages/MyEditor';
import MyEditor from '../pages/MyEditor';


function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* 기본 경로 */}
        <Route path="/home" element={<Home />} />
        <Route path="/board" element={<Board posts={posts} />} />
        <Route path="/MyEditor" element={<MyEditor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/community" element={<Community />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound404 />} /> {/* 없는 페이지 처리 */}
      </Routes>
    </BrowserRouter>
  );
}

function NotFound404() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>404 - 페이지를 찾을 수 없습니다</h2>
      <p>잘못된 주소입니다. 메인 페이지로 돌아가세요.</p>
      <a href="/">
        <button>메인으로 이동</button>
      </a>
    </div>
  );
}

export default Main;
