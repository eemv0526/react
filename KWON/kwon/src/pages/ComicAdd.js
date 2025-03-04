import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const ComicAdd = () => {

  const navigate = useNavigate();
 

  // 상태 관리
  const [selectedImage, setSelectedImage] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [bookPrice, setHomeSummary] = useState(''); // 줄거리 상태 추가

  // 이미지 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };



  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("bookTitle:", newTitle);
    console.log("bookContent:", newText);
    console.log("bookPrice:", bookPrice); // 디버깅용
    console.log("Image:", selectedImage);


    const imageFile = e.target.image.files[0];
    if (!imageFile) {
      alert("이미지를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append('bookTitle', newTitle); // 책 제목
    formData.append('bookContent', newText); // 책 내용
    formData.append('bookPrice', bookPrice); // 책 가격
    formData.append('image', imageFile); // 이미지 파일
  

    try {
      const response = await fetch('http://localhost:8000/api/comic/comic/add', {
        method: 'POST',
        body: formData
      });




      
      if (response.ok) {
        const result = await response.json();
        console.log('서버 응답:', result);
        alert('데이터가 성공적으로 추가되었습니다.');
        navigate('/comic');
      } else {
        console.error('서버 에러:', response.statusText);
        alert('서버에서 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
      alert('네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <div>
  

      <form onSubmit={handleSubmit}>
        {/* 이미지 업로드 필드 */}
        <div>
          <label>Upload Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{ width: '100px', marginTop: '10px' }}
            />
          )}
        </div>

        {/* 타이틀 입력 필드 */}
        <div>
          <label>제목</label>
          <input
            type="text"
            value={newTitle}
            name="bookTitle"
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="제목 입력"
            required
            style={{ width: '100%', padding: '10px', marginTop: '10px' }}
          />
        </div>

        {/* 텍스트 입력 필드 */}
        <div>
          <label>내용</label>
          <textarea
            value={newText}
            name="bookContent"
            onChange={(e) => setNewText(e.target.value)}
            placeholder="등급 입력"
            required
            style={{ width: '100%', padding: '10px', marginTop: '10px' }}
          />
        </div>

        <div>
  <label>가격</label>
  <input
    type="number"
    value={bookPrice}
    name="bookPrice"
    onChange={(e) => setHomeSummary(e.target.value)}
    placeholder="가격 입력"
    required
    style={{ width: '100%', padding: '10px', marginTop: '10px' }}
  />
</div>

  

        {/* 제출 버튼 */}
        <button type="submit" style={{ marginTop: '20px', padding: '10px 20px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ComicAdd;
