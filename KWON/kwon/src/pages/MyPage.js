import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/MyPage.css'; // 이 CSS 파일은 별도로 생성해야 합니다

const MyPage = () => {
  const [userData, setUserData] = useState({ email: '', codeName: '', name: '' });
  const [userBoards, setUserBoards] = useState([]); // 게시글 목록 상태
  const [userAnimes, setUserAnimes] = useState([]); // 애니메이션 목록 상태
  const [activeTab, setActiveTab] = useState('boards'); // 활성 탭 상태

  useEffect(() => {
    // localStorage에서 email과 codeName을 가져옵니다.
    const email = localStorage.getItem('email');
    const codeName = localStorage.getItem('codeName');
    const name = localStorage.getItem('name');
    setUserData({ email, codeName, name });

    // 이메일을 기준으로 게시글 목록을 가져옵니다.
    if (email) {
      axios
        .get(`http://localhost:8000/api/mypage/boards?email=${email}`)
        .then((response) => {
          setUserBoards(response.data); // 서버에서 받은 게시글 목록 상태에 저장
        })
        .catch((error) => {
          console.error('게시글 조회 실패:', error);
        });

      // 이메일을 기준으로 Anime 데이터를 가져옵니다.
      axios
        .get(`http://localhost:8000/api/mypage/animes?email=${email}`)
        .then((response) => {
          setUserAnimes(response.data); // 서버에서 받은 Anime 데이터를 상태에 저장
        })
        .catch((error) => {
          console.error('Anime 조회 실패:', error);
        });
    }
  }, []); // 이메일이 변경되면 자동으로 호출됨

  return (
    <div>
    <Header />
    <div className="mypage-container">
      
      <div className="profile-section">
        <div className="profile-container">
          <div className="profile-avatar">
          
          </div>
          <div className="profile-details">
            <h1 className="profile-name">회원 이름 : {userData.name || '애니메이션 팬'}</h1>
            <p className="profile-email">회원 이메일 : {userData.email}</p>
            <p className="profile-rank">회원 등급 : {userData.codeName === 'ROLE_USER' ? '일반 회원' : '관리자'}</p>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="tabs">
          <button 
            className={`tab-button ${activeTab === 'boards' ? 'active' : ''}`}
            onClick={() => setActiveTab('boards')}
          >
            내 게시글
          </button>
          <button 
            className={`tab-button ${activeTab === 'animes' ? 'active' : ''}`}
            onClick={() => setActiveTab('animes')}
          >
            내 애니메이션 리뷰
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'boards' && (
            <div className="board-section">
              <h2 className="section-title">작성한 게시글</h2>
              {userBoards.length > 0 ? (
                <div className="boards-list">
                  {userBoards.map((board, index) => (
                    <div key={index} className="board-card">
                      <h3 className="board-title">{board.boardTitle}</h3>
                      <p className="board-content">{board.boardContent}</p>
                      <div className="board-meta">
                        <span className="board-date">
                      
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>작성한 게시글이 없습니다</p>
                  <button className="action-button">새 게시글 작성하기</button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'animes' && (
            <div className="anime-section">
              <h2 className="section-title">작성한 애니메이션 리뷰</h2>
              {userAnimes.length > 0 ? (
                <div className="animes-list">
                  {userAnimes.map((anime, index) => (
                    <div key={index} className="anime-card">
                      <div className="anime-rating">
                        <span className="rating-label">평점:</span>
                        <div className="star-rating">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span 
                              key={star} 
                              className={`star ${star <= anime.rating ? 'filled' : ''}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="anime-comment">{anime.animeComment}</p>
                      <div className="anime-meta">
                     
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>작성한 애니메이션 리뷰가 없습니다</p>
                  <button className="action-button">새 리뷰 작성하기</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
   
    </div>
    <Footer />
    </div>
  );
};

export default MyPage;