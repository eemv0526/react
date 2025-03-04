import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const email = localStorage.getItem('email');
        if (!email) {
          alert('로그인 후 이용해주세요!');
          navigate('/login');
          return;
        }
  
        // 이메일을 쿼리 파라미터로 보내서 장바구니 데이터 조회
        const response = await fetch(`http://localhost:8000/api/cart/all?email=${email}`);
        if (!response.ok) throw new Error('장바구니 데이터를 불러오는 데 실패했습니다.');
  
        const data = await response.json();
        setCartItems(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCart();
  }, [navigate]);
  


  useEffect(() => {
    const total = selectedItems.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotalPrice(total);
  }, [selectedItems]);

  const handleRemoveFromCart = async (cartId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/cart/cart/deletion/${cartId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('장바구니 항목 삭제 실패');

      setCartItems(cartItems.filter(item => item.cartId !== cartId));
      setSelectedItems(selectedItems.filter(item => item.cartId !== cartId));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSelectItem = (cartId) => {
    const selectedItem = cartItems.find(item => item.cartId === cartId);
    if (selectedItems.some(item => item.cartId === cartId)) {
      setSelectedItems(selectedItems.filter(item => item.cartId !== cartId));
    } else {
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="text-center mt-3">오류 발생: {error}</Alert>;

  const cartItemCount = cartItems.length;  // 장바구니에 담긴 아이템 수

  return (
    <div>
      <Header cartItemCount={cartItemCount} />
    
      <Container className="mt-4">
        <h1 className="text-center mb-4">장바구니</h1>

        {cartItems.length === 0 ? (
          <Alert variant="info" className="text-center">장바구니가 비어 있습니다.</Alert>
        ) : (
          <Row>
            {cartItems.map((item) => (
              <Col key={item.cartId} md={4} className="mb-3">
                <Card className="shadow-sm">
                  <Card.Img
                    variant="top"
                    src={item.bookUrl}
                    alt={item.bookTitle}
                    style={{ height: '200px', objectFit: 'contain' }}
                  />
                  <Card.Body>
                    <Card.Title>{item.bookTitle}</Card.Title>
                    <Card.Text>{item.bookContent}</Card.Text>
                    <Card.Text className="fw-bold">가격: {item.bookPrice.toLocaleString()}원</Card.Text>
                    <Card.Text className="fw-bold">수량: {item.quantity}</Card.Text>
                    <Card.Text className="fw-bold">총 가격: {item.totalPrice.toLocaleString()}원</Card.Text>

                    <div className="d-flex justify-content-between align-items-center">
                      <Button variant="danger" onClick={() => handleRemoveFromCart(item.cartId)}>삭제</Button>
                      <input
                        type="checkbox"
                        checked={selectedItems.some(selected => selected.cartId === item.cartId)}
                        onChange={() => handleSelectItem(item.cartId)}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        
        <div className="text-center mt-4">
          <h3>결제 총 가격: {totalPrice.toLocaleString()}원</h3>
          <Button variant="primary">결제하기</Button>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default Cart;
