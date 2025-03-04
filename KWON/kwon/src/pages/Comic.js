import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';

const Comic = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/comic/comic');
        if (!response.ok) throw new Error('서버 에러');
        const data = await response.json();
        setComics(data.results || []);
      
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComics();
  }, []);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="text-center mt-3">오류 발생: {error}</Alert>;

  return (
    <>
      <Header />
      <Container className="mt-4">
        <h1 className="text-center mb-4">만화책 상품</h1>
        <Row className="g-4">
          {comics.length > 0 ? (
            comics.map((comic) => (
              <Col key={comic.uuid} md={6} lg={4} xl={3}>
                <Card 
                  className="shadow-sm border-0" 
                  style={{ height: '100%', cursor: 'pointer' }} 
                  onClick={() => navigate(`/comicdetail/${comic.uuid}`)}
                >
                  <Card.Img 
                    variant="top" 
                    src={comic.bookUrl} 
                    alt={comic.bookTitle} 
                    style={{ height: '300px', objectFit: 'cover' }} 
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{comic.bookTitle}</Card.Title>
                    <Card.Text className="text-muted flex-grow-1">{comic.bookContent}</Card.Text>
                    <Card.Text className="fw-bold">가격: {comic.bookPrice ? comic.bookPrice.toLocaleString() : '가격 정보 없음'}원</Card.Text>
                    {localStorage.getItem('codeName') === 'ROLE_ADMIN' && (
  <Button
    variant="secondary"
    onClick={(e) => {
      e.stopPropagation(); // Prevent the card's onClick from firing
      navigate(`/comicupdate/${comic.uuid}`);
    }}
  >
    관리
  </Button>
)}


                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center w-100">만화가 없습니다.</p>
          )}
        </Row>
       <div className="text-center mt-4">
  {localStorage.getItem('codeName') === 'ROLE_ADMIN' && (
    <Button variant="primary" onClick={() => navigate('/comicadd')}>상품 추가</Button>
  )}
</div>
      </Container>
      <Footer />
    </>
  );
};

export default Comic;
