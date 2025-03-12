import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout'
import Home from '../pages/Home';
import Board from '../pages/Board';
import Login from '../pages/Login';
import { posts } from '../pages/SampleData';
import Community from '../pages/Community';
import Register from '../pages/Register';
import Test from '../pages/BoardTest';
import Writer from '../pages/Writer';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/board" element={<Board posts={posts} />} />
          <Route path="/test" element={<Test />} />
          <Route path="/login" element={<Login />} />
          <Route path="/community" element={<Community />} />
          <Route path="/register" element={<Register />} />
          <Route path="/writer" element={<Writer />} />
          <Route path="*" element={<NotFound404 />} />
        </Route>
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

export default AppRoutes;
