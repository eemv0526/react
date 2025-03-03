import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { FaBook, FaFilm, FaCommentDots, FaStar, FaRegStar } from 'react-icons/fa';

const CardDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();


    const userEmail = localStorage.getItem("email");
  const userRole = localStorage.getItem("codeName");

    const handleManageClick = (animeId) => {
        // animeId를 `cardupdate` 경로로 전달하여 관리 페이지로 이동
        navigate(`/cardupdate/${animeId}`);
    };


    const { image, title, text, summary, genre, uuid } = location.state || {};

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [averageRating, setAverageRating] = useState(0); // 평균 별점 상태 추가

    const fetchReviews = useCallback(async () => {
        if (!uuid) {
            console.error("UUID가 없습니다!");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8000/api/anime`, {
                params: { uuid },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setReviews(response.data.results);
        } catch (error) {
            console.error('댓글을 불러오는 데 실패했습니다.', error);
        } finally {
            setLoading(false);
        }
    }, [uuid]);

    const fetchAverageRating = useCallback(async () => {
        if (!uuid) {
            console.error("유효하지 않은 UUID입니다.");
            return;
        }
    
        try {
            const response = await axios.get(`http://localhost:8000/api/anime/rating`, {
                params: { uuid },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    
            setAverageRating(response.data.averageRating);
        } catch (error) {
            console.error('평균 별점을 불러오는 데 실패했습니다.', error);
        }
    }, [uuid]);
    useEffect(() => {
        fetchReviews();
        fetchAverageRating();
    }, [fetchReviews, uuid, fetchAverageRating]); // fetchAverageRating 추가




    const handleCommentWrite = () => {
        navigate(`/cardadd/${uuid}`, { state: { uuid } });
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} style={{ color: '#ffc107' }} />);
            } else {
                stars.push(<FaRegStar key={i} style={{ color: '#ddd' }} />);
            }
        }
        return stars;
    };

    const renderAverageStars = (avgRating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= avgRating) {
                stars.push(<FaStar key={i} style={{ color: '#ffc107' }} />);
            } else if (i - 0.5 <= avgRating) {
                stars.push(<FaStar key={i} style={{ color: '#ffc107' }} />);
            } else {
                stars.push(<FaRegStar key={i} style={{ color: '#ddd' }} />);
            }
        }
        return stars;
    };

    return (
        <div style={{ background: '#f4f4f9', minHeight: '100vh', padding: '0' }}>
            <Header />

            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="d-flex align-items-center justify-content-center flex-column mb-5">
                            <div className="text-center mb-5">
                                <img
                                    src={image ? `data:image/jpeg;base64,${image}` : '/images/placeholder.jpg'}
                                    alt={title}
                                    className="img-fluid rounded shadow-lg"
                                    style={{ animation: 'fadeIn 1s ease-in-out', maxHeight: '500px' }}
                                />
                            </div>

                            <h2
                                className="text-center mb-4 fadeInUp card-title"
                                style={{
                                    animation: 'fadeInUp 1s ease-out',
                                    fontFamily: "'Roboto', sans-serif",
                                    color: '#2c3e50',
                                    fontSize: '3rem',
                                }}
                            >
                                {title} 
                            <br/>
                            <br/>
                                {renderAverageStars(averageRating)}
                                {averageRating ? averageRating.toFixed(1) : '0.0'}
                            </h2>

                            <div
                                className="text-center card-text mb-3"
                                style={{
                                    animation: 'fadeInUp 1s ease-out',
                                    fontFamily: "'Lora', serif",
                                    color: '#34495e',
                                    fontSize: '1.5rem',
                                }}
                            >
                                <p>등급 : {text}</p>
                            </div>

                            <div
                                className="text-center card-text mb-3"
                                style={{
                                    animation: 'fadeInUp 1s ease-out',
                                    fontFamily: "'Georgia', serif",
                                    color: '#555',
                                    fontStyle: 'italic',
                                    fontSize: '2.2rem',
                                }}
                            >
                                <p>
                                    <FaBook style={{ marginRight: '10px', color: '#3498db' }} />
                                    {summary}
                                </p>
                            </div>

                            <div
                                className="text-center card-text mb-5"
                                style={{
                                    animation: 'fadeInUp 1s ease-out',
                                    fontFamily: "'Lora', serif",
                                    color: '#9b59b6',
                                    fontSize: '1.5rem',
                                }}
                            >
                                <p>
                                    <FaFilm style={{ marginRight: '10px', color: '#9b59b6' }} />
                                    {genre}
                                </p>
                            </div>
                           
                         
                      

                        </div>

                        <button
                            onClick={handleCommentWrite}
                            className="btn btn-primary mb-4"
                            style={{ fontSize: '1.2rem', padding: '10px 20px' }}
                        >
                            <FaCommentDots style={{ marginRight: '8px' }} />
                            댓글 작성하기
                        </button>

                
                     

                        <div className="card shadow mb-5">
            <div className="card-body">
                <h3 className="card-title mb-4">댓글 목록</h3>
                {loading ? (
                    <p>로딩 중...</p>
                ) : (
                    reviews.length > 0 ? (
                        <ul className="list-group">
                            {reviews.map((review) => (
                                <li key={review.animeId} className="list-group-item">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <strong>{review.email}</strong>
                                        <span>{renderStars(review.rating)}</span>
                                    </div>
                                    <p>{review.animeComment}</p>
                                    <small>
                                        작성일: {review.createAt ? new Date(review.createAt).toLocaleDateString() : '작성일 없음'}
                                    </small>
                                    {/* 관리 버튼 추가 */}
                                    {(review.email === userEmail || userRole === "ROLE_ADMIN") && (
    <button
        onClick={() => handleManageClick(review.animeId)}
        className="btn btn-warning mt-2 float-end"  // Bootstrap의 float-end 클래스 사용
    >
        관리
    </button>
)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>댓글이 없습니다.</p>
                    )
                )}
            </div>
        </div>

                        {/* ㅇㅇ */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CardDetail;