import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
const CardAdd = () => {
    const { uuid } = useParams();  // URL에서 uuid 가져오기
    const navigate = useNavigate();

    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const email = localStorage.getItem('userEmail');
    const token = localStorage.getItem('jwt');  // 로컬 스토리지에서 JWT 토큰 가져오기
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:8000/api/anime/${uuid}/add`, {
                email: email,
                rating,
                animeComment: comment,
                createAt: new Date().toISOString(),
                uuid: uuid
            }, {
                headers: {
                    Authorization: `Bearer ${token}`  // JWT 토큰을 헤더에 포함
                }
            });

            alert('댓글이 등록되었습니다.');
            navigate(-1); // 이전 페이지로 이동
        } catch (error) {
            console.error('댓글 등록 실패:', error);
            alert('댓글 등록 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
        <Header />
        <div className="container my-5">
            <h2 className="text-center mb-4">댓글 작성</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
                <div className="mb-3">
                    <label className="form-label">평점 (1~5)</label>
                    <input
                        type="number"
                        className="form-control"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">댓글 내용</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success w-100">
                    댓글 등록
                </button>
            </form>
        </div>
        <Footer/>
        </div>
    );
};

export default CardAdd;