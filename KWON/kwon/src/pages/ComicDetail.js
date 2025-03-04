import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Card, Button, Spinner, Alert, Form } from 'react-bootstrap';

const ComicDetail = () => {
  const { uuid } = useParams();
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // 수량 상태
  const [totalPrice, setTotalPrice] = useState(0); // 총가격 상태
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComicDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/comic/comic/get/${uuid}`);
        if (!response.ok) throw new Error('서버 에러');
        const data = await response.json();
        setComic(data);
        setTotalPrice(data.bookPrice); // 초기 총가격은 1개 가격
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComicDetail();
  }, [uuid]);

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    setQuantity(newQuantity);
    if (comic) {
      setTotalPrice(comic.bookPrice * newQuantity); // 총가격 계산
    }
  };

  const handleAddToCart = async () => {
    const email = localStorage.getItem('email'); // 이메일 가져오기
    if (!email) {
      alert('로그인 후 이용해주세요!');
      return;
    }

    const cartData = {
      email,
      uuid: comic.uuid,
      bookTitle: comic.bookTitle,
      bookPrice: comic.bookPrice,
      quantity,
      totalPrice,
      bookUrl: comic.bookUrl
    };

    try {
      const response = await fetch('http://localhost:8000/api/cart/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartData)
      });

      if (!response.ok) throw new Error('장바구니에 추가 실패');
      alert('장바구니에 추가되었습니다!');
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="text-center mt-3">오류 발생: {error}</Alert>;

  return (
    <>
      <Header />
      <Container className="mt-4">
        {comic ? (
          <Card className="shadow-sm border-0">
            <Card.Img 
              variant="top" 
              src={comic.bookUrl} 
              alt={comic.bookTitle} 
              style={{ height: '400px', objectFit: 'contain' }} 
            />
            <Card.Body>
              <Card.Title>{comic.bookTitle}</Card.Title>
              <Card.Text className="text-muted">{comic.bookContent}</Card.Text>
              <Card.Text className="fw-bold">가격: {comic.bookPrice ? comic.bookPrice.toLocaleString() : '가격 정보 없음'}원</Card.Text>

              {/* 수량 선택 및 총 가격 계산 */}
              <Form.Group className="mb-3">
                <Form.Label>수량</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={handleQuantityChange}
                  required
                />
                <Card.Text className="fw-bold mt-2">총 가격: {totalPrice.toLocaleString()}원</Card.Text>
              </Form.Group>

              {/* 장바구니 담기 버튼 */}
              <Button variant="primary" onClick={handleAddToCart}>장바구니 담기</Button>
              <Button variant="secondary" onClick={() => navigate(-1)}>뒤로 가기</Button>
            </Card.Body>
          </Card>
        ) : (
          <p className="text-center">해당 만화의 정보를 찾을 수 없습니다.</p>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default ComicDetail;
