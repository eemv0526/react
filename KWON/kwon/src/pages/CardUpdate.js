import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CardUpdate = () => {

    const { animeId } = useParams(); // URL에서 animeId를 받아옵니다.
    const navigate = useNavigate(); // Used for navigating after update or delete
    const [review, setReview] = useState(null);
    const [updatedReview, setUpdatedReview] = useState({
        rating: 0,
        animeComment: ''

    });

  
 

    // 리뷰 상세 정보를 가져오는 함수
    useEffect(() => {
        const fetchReviewDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/anime/get/${animeId}`);
                setReview(response.data);
                setUpdatedReview({
                    rating: response.data.rating,
                    animeComment: response.data.animeComment
                });
            } catch (error) {
                console.error('리뷰 상세 조회 실패:', error);
            }
        };
        fetchReviewDetails();
    }, [animeId]);

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');  // 토큰 가져오기
            const updatedData = {
                animeId: animeId,  // animeId 추가
                animeComment: updatedReview.animeComment,  // 수정된 댓글 내용
                rating: updatedReview.rating  // 수정된 별점
            };
            
    
            const response = await axios.put(
                `http://localhost:8000/api/anime/update/${animeId}`, // API URL
                updatedData,  // 수정할 데이터 (animeComment, rating)
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // 토큰 확인
                        'Content-Type': 'application/json',  // JSON 형식으로 전송
                    }
                }
            );
    
            console.log('리뷰가 성공적으로 수정되었습니다:', response.data);
            navigate(`/anime`); // 수정 후 목록 페이지로 이동
        } catch (error) {
            console.error('수정 실패:', error);
        }
    };


    // 리뷰 삭제 핸들러
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/anime/deletion/${animeId}`);
            console.log('리뷰가 성공적으로 삭제되었습니다:', response.data);
            navigate(`/anime`); // 삭제 후 목록 페이지로 이동
        } catch (error) {
            console.error('리뷰 삭제 실패:', error);
        }
    };

    // 폼 값 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedReview({
            ...updatedReview,
            [name]: value
        });
    };

    if (!review) {
        return <p>리뷰 정보를 불러오는 중...</p>;
    }

    return (
        <div className="container">
            <h2>리뷰 상세 수정</h2>
        

            <h3>리뷰 수정</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="rating">별점:</label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        min="1"
                        max="5"
                        value={updatedReview.rating}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="animeComment">댓글:</label>
                    <textarea
                        id="animeComment"
                        name="animeComment"
                        value={updatedReview.animeComment}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                    리뷰 수정
                </button>
                <button type="button" className="btn btn-danger ml-2" onClick={handleDelete}>
                    리뷰 삭제
                </button>
            </form>
        </div>
    );
};

export default CardUpdate;
