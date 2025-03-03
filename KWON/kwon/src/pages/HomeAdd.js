import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HomeAdd = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { image, title, text } = location.state || {};

  // 상태 관리
  const [selectedImage, setSelectedImage] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [homeSummary, setHomeSummary] = useState(''); // 줄거리 상태 추가
  const [selectedGenres, setSelectedGenres] = useState([]); // 선택된 장르 상태 추가
  const [isGenreListVisible, setIsGenreListVisible] = useState(false); // 장르 목록 토글 상태

  // 장르 목록
  const genres = ['액션','전쟁', '멜로', '일상', '학원', 'SF', '메카', '공포', '미스테리', '모험', '판타지', '스포츠'];

  // 이미지 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // 장르 선택 핸들러
  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenres((prevGenres) => {
      if (prevGenres.includes(genre)) {
        return prevGenres.filter((item) => item !== genre); // 이미 선택된 장르 제거
      } else {
        return [...prevGenres, genre]; // 새 장르 추가
      }
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("homeTitle:", newTitle);
    console.log("homeText:", newText);
    console.log("homeSummary:", homeSummary); // 디버깅용
    console.log("Image:", selectedImage);
    console.log("Selected Genres:", selectedGenres); // 선택된 장르 출력

    const imageFile = e.target.image.files[0];
    if (!imageFile) {
      alert("이미지를 선택해주세요.");
      return;
    }

    const homeGenre = new FormData();
    homeGenre.append('image', imageFile);
    homeGenre.append('homeTitle', newTitle);
    homeGenre.append('homeText', newText);
    homeGenre.append('homeSummary', homeSummary);
    homeGenre.append('homeGenre', selectedGenres.join(',')); // 장르들을 콤마로 구분하여 'homeGenre'에 추가

    try {
      const response = await fetch('http://localhost:8000/api/home/home/add', {
        method: 'POST',
        body: homeGenre, // homeGenre로 변경
      });

      if (response.ok) {
        const result = await response.json();
        console.log('서버 응답:', result);
        alert('데이터가 성공적으로 추가되었습니다.');
        navigate('/');
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
      {image && <img src={image} alt={title} style={{ width: '100%' }} />}
      <h4>{title}</h4>
      <p>{text}</p>
      <hr />

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
            name="homeTitle"
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="제목 입력"
            required
            style={{ width: '100%', padding: '10px', marginTop: '10px' }}
          />
        </div>

        {/* 텍스트 입력 필드 */}
        <div>
          <label>등급</label>
          <textarea
            value={newText}
            name="homeText"
            onChange={(e) => setNewText(e.target.value)}
            placeholder="등급 입력"
            required
            style={{ width: '100%', padding: '10px', marginTop: '10px' }}
          />
        </div>

        {/* 줄거리 입력 필드 */}
        <div>
          <label>줄거리</label>
          <textarea
            value={homeSummary}
            name="homeSummary"
            onChange={(e) => setHomeSummary(e.target.value)}
            placeholder="줄거리 입력"
            required
            style={{ width: '100%', padding: '10px', marginTop: '10px' }}
          />
        </div>

        {/* 장르 선택 토글 */}
        <div>
          <button
            type="button"
            onClick={() => setIsGenreListVisible(!isGenreListVisible)}
            style={{ marginTop: '10px', padding: '10px 20px' }}
          >
            장르 선택
          </button>

          {isGenreListVisible && (
            <div style={{ marginTop: '10px' }}>
              {genres.map((genre) => (
                <div key={genre}>
                  <input
                    type="checkbox"
                    id={genre}
                    value={genre}
                    onChange={handleGenreChange}
                    checked={selectedGenres.includes(genre)}
                  />
                  <label htmlFor={genre} style={{ marginLeft: '5px' }}>
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 제출 버튼 */}
        <button type="submit" style={{ marginTop: '20px', padding: '10px 20px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default HomeAdd;
