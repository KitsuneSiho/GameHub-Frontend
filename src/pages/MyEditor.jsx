import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const PostEditor = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [editorValue, setEditorValue] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const quillRef = useRef(null);

  // 태그 추가
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  // 태그 제거
  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  // 이미지 업로드 처리
  const handleImageUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('/upload-image', formData)
      .then((response) => {
        const imageUrl = response.data.url; // 서버에서 반환된 이미지 URL
        const range = quillRef.current.getEditor().getSelection(); // 커서 위치
        quillRef.current.getEditor().insertEmbed(range.index, 'image', imageUrl);
      })
      .catch((error) => {
        console.error('이미지 업로드 오류:', error);
        alert('이미지 업로드에 실패했습니다.');
      });
  };

  // 파일 업로드 처리
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('/upload-file', formData)
      .then((response) => {
        const uploadedFile = {
          name: file.name,
          url: response.data.url,
        };
        setUploadedFiles((prev) => [...prev, uploadedFile]);
      })
      .catch((error) => {
        console.error('파일 업로드 오류:', error);
        alert('파일 업로드에 실패했습니다.');
      });
  };

  // ReactQuill 모듈 설정
  const modules = {
    toolbar: {
      container: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['bold', 'italic', 'underline'],
        ['link'],
        ['image'],
        [{ color: [] }, { background: [] }],
        ['blockquote'],
        ['code-block'],
        ['clean'],
      ],
      handlers: {
        image: () => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) handleImageUpload(file);
          });
          input.click();
        },
      },
    },
  };

  const formats = [
    'header',
    'font',
    'list',
    'align',
    'bold',
    'italic',
    'underline',
    'link',
    'image',
    'blockquote',
    'code-block',
    'color',
    'background',
  ];

  return (
    <div>
      <h1>게시글 작성</h1>
      <form>
        {/* 제목 입력 */}
        <div>
          <label>
            제목:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
            />
          </label>
        </div>

        {/* 태그 입력
         태그를 지정폼에서 선택택
        */}
        <div>
          <label>
            태그:
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="태그를 입력 후 Enter를 누르세요"
            />
          </label>
          <div>
            {tags.map((tag, index) => (
              <span key={index} style={{ margin: '0 5px' }}>
                {tag}
                <button type="button" onClick={() => removeTag(tag)}>
                  x
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* 에디터 */}
        <ReactQuill
          ref={quillRef}
          value={editorValue}
          onChange={setEditorValue}
          modules={modules}
          formats={formats}
        />

        {/* 파일 업로드 */}
        <div>
          <label>
            파일 업로드:
            <input type="file" onChange={handleFileUpload} />
          </label>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">게시글 작성</button>
      </form>
    </div>
  );
};

export default PostEditor;
