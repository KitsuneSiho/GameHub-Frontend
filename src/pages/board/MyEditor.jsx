import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const SimpleEditor = () => {
  const [title, setTitle] = useState('');
  const [editorValue, setEditorValue] = useState('');
  const quillRef = useRef(null);

  const handleChange = (value) => {
    setEditorValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    try {
      // API 호출하여 데이터 전송
      const response = await axios.post('http://localhost:8080/api/posts', {
        title,
        content: editorValue,
      });
      console.log('글이 업로드되었습니다:', response.data);
      // 성공적인 업로드 후 상태 초기화
      setTitle('');
      setEditorValue('');
    } catch (error) {
      console.error('업로드 실패:', error);
    }
  };

  // ReactQuill 모듈 설정
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['link', 'image'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline',
    'list', 'bullet', 'link', 'image', 'color', 'background'
  ];

  return (
    <div>
      <h1>텍스트 편집기</h1>
      <form onSubmit={handleSubmit}>
        {/* 제목 입력 */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
          required
        />
        <ReactQuill
          ref={quillRef}
          value={editorValue}
          onChange={handleChange}
          modules={modules}
          formats={formats}
        />
        <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>
          글쓰기 업로드
        </button>
      </form>
      <div>
        <h2>미리보기</h2>
        <h3>{title}</h3> {/* 제목 미리보기 */}
        <div dangerouslySetInnerHTML={{ __html: editorValue }} />
      </div>
    </div>
  );
};

export default SimpleEditor;
