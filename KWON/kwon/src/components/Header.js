import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaRegBell, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaBook } from 'react-icons/fa'; // 아이콘 추가
import { Link } from 'react-router-dom';
import { GiShoppingCart } from 'react-icons/gi';

const Header = ({ cartItemCount }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [email, setEmail] = useState(''); // 이메일 상태 관리

  // 컴포넌트 마운트 시 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const savedEmail = localStorage.getItem('email'); // 로컬스토리지에서 이메일 가져오기
    
    setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
    if (savedEmail) {
      setEmail(savedEmail); // 이메일 상태 설정
    }
  }, []);






  
  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem('jwt'); // JWT 제거
    localStorage.removeItem('email'); // 이메일 제거
    localStorage.removeItem('codeName')
    localStorage.removeItem('name')
    setIsLoggedIn(false); // 로그인 상태 변경
    setEmail(''); // 이메일 초기화
    alert('로그아웃되었습니다.');
    navigate('/'); // 홈으로 리디렉션
  };

  // 스타일 정의
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    color: 'black',
    padding: '15px 30px',
    position: 'relative',
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  };

  const titleStyle = {
    fontFamily: `'Poppins', sans-serif`,
    fontSize: '1.8rem',
    fontWeight: '700',
    margin: '0',
    cursor: 'pointer',
  };

  const navContainerStyle = {
    display: 'flex',
    flex: '1',
    justifyContent: 'flex-end',
    alignItems: 'center',
  };

  const navStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    margin: '0',
    padding: '0',
  };

  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
    fontSize: '1rem',
    fontFamily: `'Roboto', sans-serif`,
    fontWeight: '500',
    transition: 'color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
  };

  const handleTitleClick = () => {
    navigate('/');
  };


  

  return (
    <header style={headerStyle}>
      <div style={logoContainerStyle}>
      <h1 style={titleStyle} onClick={handleTitleClick}>
        
</h1>
      </div>
      <nav style={navContainerStyle}>
        <ul style={navStyle}>
          <li>
            <a href="/" style={linkStyle}>
              <FaHome style={{ marginRight: '8px' }} /> 홈
            </a>
          </li>
          <li>
            <a href="/anime" style={linkStyle}>
             추천 만화책
            </a>
          </li>
          <li>
            <a href="/comic" style={linkStyle}>
             만화책 상품
            </a>
          </li>
          <li>
            <a href="/gongji" style={linkStyle}>
              <FaRegBell style={{ marginRight: '8px' }} /> 공지사항
            </a>
          </li>
          <li>
            <a href="/board" style={linkStyle}>
              <FaBook style={{ marginRight: '8px' }} /> 애니게시판
            </a>
          </li>
          <li className="me-4">
  <Link to="/cart" style={{ color: 'black' }} className="position-relative">
    <GiShoppingCart size={24} /> 장바구니
    {/* 장바구니 아이콘 옆에 아이템 수 표시 */}
    {cartItemCount > 0 && (
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {cartItemCount}
      </span>
    )}
  </Link>
</li>
          {!isLoggedIn ? (
            <>
              <li>
                <a href="/login" style={linkStyle}>
                  <FaSignInAlt style={{ marginRight: '8px' }} /> 로그인
                </a>
              </li>
              <li>
                <a href="/register" style={linkStyle}>
                  <FaUserPlus style={{ marginRight: '8px' }} /> 회원가입
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <span 
                  style={{ 
                    marginRight: '10px', 
                    color: '#007BFF',  // 강조 색상
                    fontFamily: 'Poppins, sans-serif',  // 글씨체 변경
                    fontWeight: '600'  // 글씨 두께 추가
                  }}
                >
                  {email}님
                </span> 
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  style={{
                    ...linkStyle,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <FaSignOutAlt style={{ marginRight: '8px' }} /> 로그아웃
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
