import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Button, Form, Pagination } from 'react-bootstrap';

const Home = () => {
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const cardsPerPage = 8;
    const navigate = useNavigate();

    const handleCardClick = (uuid, image, title, text,summary, genre) => {
        setSelectedCard({ uuid, image, title, text,summary,genre });
        navigate(`/carddetail/${uuid}`, { state: { uuid, image, title, text, summary,genre} });
    };

    const handleHomeAdd = (uuid, image, title, text) => {
        setSelectedCard({ uuid, image, title, text });
        navigate(`/homeadd`, { state: { uuid, image, title, text } });
        
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = () => {
        const filtered = cards.filter(
            (card) =>
                card.homeTitle.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCards(filtered);
        setCurrentPage(1);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        const filteredByCategory = cards.filter((card) => {
            if (category === 'all') return true;
            
            // null 체크를 먼저 수행
            if (!card.homeGenre) return false;
            
            // 장르가 문자열로 저장되어 있다고 가정하고 includes 사용
            return card.homeGenre.includes(category);
        });
        setFilteredCards(filteredByCategory);
        setCurrentPage(1);
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
                    setCards(data.results);
                    setFilteredCards(data.results);
                } else {
                    console.error('Invalid data format');
                    setCards([]);
                    setFilteredCards([]);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setCards([]);
                setFilteredCards([]);
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

     

            <div 
    className="container mb-4 py-4" 
    style={{ 
        backgroundColor: '#f8f9fa',  // 매우 연한 회색
        borderRadius: '15px',
        padding: '25px',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.05)' // 미묘한 그림자 추가
    }}
>
    <div 
        className="d-flex flex-wrap justify-content-center" 
        style={{ gap: '12px' }}
    >
        <Button 
            variant={selectedCategory === 'all' ? 'dark' : 'outline-dark'} 
            onClick={() => handleCategoryChange('all')}
            style={{
                minWidth: '100px',
                transition: 'all 0.3s ease',
                borderRadius: '25px',
                fontWeight: '500',
                padding: '8px 20px',
                borderWidth: '2px',
                margin: '4px',
                backgroundColor: selectedCategory === 'all' ? '#FF6B6B' : 'transparent',
                borderColor: 'white',
                color: selectedCategory === 'all' ? 'white' : '#FF6B6B'
            }}
        >
            All
        </Button>
        {[
            '액션', '전쟁', '멜로', '일상', '학원', 
            'SF', '메카', '공포', '미스테리', '모험', 
            '판타지', '스포츠'
        ].map((category) => (
            <Button
                key={category}
                variant={selectedCategory === category ? 'dark' : 'outline-dark'}
                onClick={() => handleCategoryChange(category)}
                style={{
                    minWidth: '100px',
                    transition: 'all 0.3s ease',
                    borderRadius: '25px',
                    fontWeight: '500',
                    padding: '8px 20px',
                    borderWidth: '2px',
                    margin: '4px',
                    backgroundColor: selectedCategory === category ? '#FF6B6B' : 'transparent',
                    borderColor: '#FF6B6B',
                    color: selectedCategory === category ? 'white' : '#2c3e50'
                }}
            >
                {category}
            </Button>
        ))}
    </div>
</div>
           
     {/* 검색 폼 스타일링 */}
<div className="container mb-4">
    <Form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ position: 'relative' }}>
            <Form.Control
                type="text"
                placeholder="애니메이션 검색..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                    borderRadius: '50px',
                    padding: '12px 25px',
                    border: '2px solid #FF6B6B',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    fontSize: '16px'
                }}
            />
            <Button 
                variant="primary" 
                onClick={handleSearchSubmit}
                style={{
                    position: 'absolute',
                    right: '5px',
                    top: '5px',
                    borderRadius: '50px',
                    padding: '8px 25px',
                    backgroundColor: '#FF6B6B',
                    border: 'none',
                    boxShadow: '0 2px 4px rgba(255, 107, 107, 0.2)',
                }}
            >
                검색
            </Button>
        </div>
    </Form>
</div>

{/* 카드 섹션 스타일링 */}
<div className="container">
    {isLoading ? (
        <div>Loading...</div>
    ) : (
        <Row className="d-flex justify-content-center g-4">
            {currentCards.length > 0 ? (
                currentCards.map((card) => (
                    <Col md={3} key={card.uuid}>
                        <Card
                            className="h-100"
                            onClick={() =>
                                handleCardClick(card.uuid, card.homeData, card.homeTitle, card.homeText, card.homeSummary, card.homeGenre)
                            }
                            style={{ 
                                cursor: 'pointer',
                                border: 'none',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.08)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                ':hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.12)'
                                }
                            }}
                        >
                            <Card.Img
                                variant="top"
                                src={`data:image/jpeg;base64,${card.homeData}`}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/images/placeholder.jpg';
                                }}
                                style={{ 
                                    objectFit: 'cover', 
                                    height: '250px',
                                    borderBottom: '3px solid #FF6B6B'
                                }}
                            />
                      <Card.Body style={{ padding: '1.5rem' }}>
    <Card.Text
         style={{
            textAlign: 'center', // 텍스트 중앙 정렬
            whiteSpace: 'nowrap', // 텍스트가 한 줄로 표시되도록 설정
            overflow: 'hidden',   // 넘치는 부분 숨기기
            textOverflow: 'ellipsis', // 넘치면 '...'으로 표시
            fontSize: '1.1rem',     // 폰트 크기
            color: '#4a4a4a',     // 텍스트 색
            marginBottom: '15px', // 아래 여백
            fontFamily: "'Georgia', serif",
            lineHeight: '1.6',    // 줄 간격
            letterSpacing: '0.5px', // 자간
            maxWidth: '250px',    // 10자 정도로 제한된 너비 설정
        }}
    >
        {card.homeTitle}
    </Card.Text>
    {localStorage.getItem('codeName') === 'ROLE_ADMIN' && (
    <Button
        variant="outline-primary"
        onClick={(e) => {
            e.stopPropagation();
            window.location.href = `/homeupdate?uuid=${card.uuid}`;
        }}
        style={{
            borderRadius: '50px',
            padding: '8px 20px',
            fontSize: '0.9rem',
            borderColor: '#FF6B6B',
            color: '#FF6B6B',
            backgroundColor: 'transparent',
            transition: 'all 0.3s ease',
            ':hover': {
                backgroundColor: '#FF6B6B',
                color: 'white'
            }
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
                <div>작품이 없습니다.</div>
            )}
        </Row>
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

            {localStorage.getItem('codeName') === 'ROLE_ADMIN' && (
    <Button
        variant="primary"
        style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
        }}
        onClick={() =>
            handleHomeAdd(selectedCard?.uuid, selectedCard?.image, selectedCard?.title, selectedCard?.text)
        }
    >
        홈 카드 추가
    </Button>
)}
            <Footer />
        </div>
    );
};

export default Home;
