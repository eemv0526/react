import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Form, Button, Spinner, Alert, Image } from 'react-bootstrap';

const ComicUpdate = () => {
  const { uuid } = useParams(); // URL에서 UUID 가져오기
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageEditMode, setImageEditMode] = useState(false); // 이미지 수정 모드
  const [imageFile, setImageFile] = useState(null); // 업로드할 이미지 파일
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComicDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/comic/comic/get/${uuid}`);
        if (!response.ok) throw new Error('서버 에러');
        const data = await response.json();
        setComic(data); // 만화책 세부 정보
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComicDetail();
  }, [uuid]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 이미지 파일이 있는 경우 FormData로 전송
    const formData = new FormData();
    formData.append('bookTitle', comic.bookTitle);
    formData.append('bookContent', comic.bookContent);
    formData.append('bookPrice', comic.bookPrice);
    formData.append('bookUrl', comic.bookUrl); // 기존 이미지 URL
    if (imageFile) {
      formData.append('image', imageFile); // 새로운 이미지 파일
    }

    try {
      const response = await fetch(`http://localhost:8000/api/comic/comic/update/${uuid}`, {
        method: 'PUT',
        body: formData, // FormData로 전송
      });
      if (!response.ok) throw new Error('서버 에러');
      navigate(`/comic`); // 만화책 목록 페이지로 이동
    } catch (error) {
      setError('수정 실패: ' + error.message);
    }
  };

  const handleImageToggle = () => {
    setImageEditMode(!imageEditMode); // 이미지 수정 모드 토글
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]); // 업로드된 파일을 상태에 저장
    setComic({ ...comic, bookUrl: URL.createObjectURL(event.target.files[0]) }); // 새 이미지 미리보기
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/comic/comic/deletion/${uuid}`, {
        method: 'DELETE', // DELETE 요청으로 만화책 삭제
      });
      if (!response.ok) throw new Error('삭제 실패');
      navigate('/comic'); // 삭제 후 만화책 목록 페이지로 이동
    } catch (error) {
      setError('삭제 실패: ' + error.message);
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="text-center mt-3">{error}</Alert>;

  return (
    <>
      <Header />
      <Container className="mt-4">
        <h1 className="text-center mb-4">만화책 수정</h1>
        {comic && (
          <Form onSubmit={handleSubmit}>
            {/* 만화책 제목 */}
            <Form.Group className="mb-3">
              <Form.Label>만화책 제목</Form.Label>
              <Form.Control
                type="text"
                value={comic.bookTitle}
                onChange={(e) => setComic({ ...comic, bookTitle: e.target.value })}
                required
              />
            </Form.Group>

            {/* 만화책 내용 */}
            <Form.Group className="mb-3">
              <Form.Label>내용</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comic.bookContent}
                onChange={(e) => setComic({ ...comic, bookContent: e.target.value })}
                required
              />
            </Form.Group>

            {/* 만화책 가격 */}
            <Form.Group className="mb-3">
              <Form.Label>가격</Form.Label>
              <Form.Control
                type="number"
                value={comic.bookPrice}
                onChange={(e) => setComic({ ...comic, bookPrice: e.target.value })}
                required
              />
            </Form.Group>

            {/* 만화책 이미지 */}
            <Form.Group className="mb-3">
              <Form.Label>이미지</Form.Label>
              <div className="d-flex justify-content-between align-items-center">
                {imageEditMode ? (
                  <>
                    <Form.Control
                      type="file"
                      onChange={handleImageChange}
                      required
                    />
                    <Button variant="secondary" onClick={handleImageToggle}>이미지 보기</Button>
                  </>
                ) : (
                  <>
                    <Image src={comic.bookUrl} alt={comic.bookTitle} fluid style={{ maxWidth: '200px', height: 'auto' }} />
                    <Button variant="secondary" onClick={handleImageToggle}>이미지 수정</Button>
                  </>
                )}
              </div>
            </Form.Group>

            {/* 수정 및 삭제 버튼 */}
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">수정</Button>
              <Button variant="danger" onClick={handleDelete}>삭제</Button>
            </div>
          </Form>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default ComicUpdate;
