import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Pagination, Carousel } from 'react-bootstrap';

const Home = () => {
    const [filteredCards, setFilteredCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const cardsPerPage = 6;  // 6개씩
    const navigate = useNavigate();

    const handleCardClick = (uuid, image, title, text, summary, genre) => {
        navigate(`/carddetail/${uuid}`, { state: { uuid, image, title, text, summary, genre } });
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/home/home');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log('Fetched cards data:', data);

                if (data.results && Array.isArray(data.results)) {
                    setFilteredCards(data.results);  // filteredCards만 설정
                } else {
                    console.error('Invalid data format');
                    setFilteredCards([]);  // 빈 배열로 초기화
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setFilteredCards([]);  // 에러시 빈 배열로 초기화
                setIsLoading(false);
            }
        };

        fetchCards();
    }, []);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredCards.length / cardsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <Header />
            <div className="container">
                <Carousel 
                    interval={1300}          // 1초 간격으로 자동 슬라이드
                    ride="carousel"         // 캐러셀을 자동으로 넘기기 위해 이 속성 추가
                    className="mt-4" 
                    style={{ maxHeight: '400px', overflow: 'hidden' }}
                >
                    {filteredCards.slice(6).map((card, index) => (
                        <Carousel.Item key={index}>
                            <Card 
                                onClick={() => handleCardClick(card.uuid, card.homeData, card.homeTitle, card.homeText, card.homeSummary, card.homeGenre)} 
                                style={{
                                    cursor: 'pointer', 
                                    border: 'none', 
                                    borderRadius: '15px', 
                                    overflow: 'hidden', 
                                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.08)', 
                                    maxWidth: '150%',    // 카드가 부모 영역을 벗어나지 않도록 설정
                                    height: 'auto',      // 카드 높이를 자동으로 조정
                                }}
                            >
                                <Card.Img 
                                    variant="top" 
                                    src={`data:image/jpeg;base64,${card.homeData}`} 
                                    onError={(e) => { e.target.onerror = null; e.target.src = '/images/placeholder.jpg'; }} 
                                    style={{
                                        width: '100%',           // 가로폭을 100%로 설정하여 부모 컨테이너에 맞게 크기 조정
                                        height: '400px',         // 이미지 높이 고정
                                    }} 
                                />
                            </Card>
                        </Carousel.Item>
                    ))}
                </Carousel>
                <br />

                {/* 카드 섹션 */}
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <Row className="d-flex justify-content-center g-4">
                            {currentCards.slice(0, 6).map((card) => (
                                <Col xs={12} sm={6} md={4} key={card.uuid}>
                                    <Card onClick={() => handleCardClick(card.uuid, card.homeData, card.homeTitle, card.homeText, card.homeSummary, card.homeGenre)} style={{ cursor: 'pointer', border: 'none', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.08)', transition: 'transform 0.3s ease' }}>
                                        <Card.Img 
                                            variant="top" 
                                            src={`data:image/jpeg;base64,${card.homeData}`} 
                                            onError={(e) => { e.target.onerror = null; e.target.src = '/images/placeholder.jpg'; }} 
                                            style={{ 
                                                objectFit: 'cover', 
                                                height: '200px', 
                                                width: '100%' 
                                            }} 
                                        />
                                        <Card.Body style={{ padding: '1.25rem' }}>
                                            <Card.Text style={{ textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '1rem', color: '#4a4a4a' }}>
                                                {card.homeTitle}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                )}
            </div>

            <div className="container mt-4 d-flex justify-content-center">
                <Pagination>
                    <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                    {pageNumbers.map((number) => (
                        <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                            {number}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length} />
                </Pagination>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
