import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login() {
    
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwt"); // 저장된 JWT 가져오기
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // 헤더에 추가
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);






  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.email || !formData.password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8000/api/sign/login', formData);
  
      // 응답 데이터 확인
      console.log(response.data);
  
      // JWT 토큰과 이메일 추출
      const token = response.data.accessToken; // accessToken 사용
      const email = response.data.email; // 이메일 추출 (응답에 이메일 포함되어 있다고 가정)
      const codeName = response.data.codeName;
      const name = response.data.name;
  
      if (!token || !email) {
        throw new Error('토큰 또는 이메일을 받아오지 못했습니다.');
      }
  
      // 로컬 스토리지에 저장
      localStorage.setItem('jwt', token);
      localStorage.setItem('email', email); // 이메일도 로컬스토리지에 저장
      localStorage.setItem('codeName', codeName);
      localStorage.setItem('name', name);
      setError('');
      alert('로그인 성공!');
  
      // 홈 페이지로 리디렉션
      navigate('/');
    } catch (err) {
      console.error(err); // 에러 로그 출력
      setError(err.response?.data?.message || '로그인에 실패했습니다.');
    }
  };
  return (
    <div>
   <Header/>

    
    <div
      style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #e57373',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#e57373' }}>로그인</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" style={{ color: '#e57373' }}>이메일</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '5px',
              border: '1px solid #e57373',
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" style={{ color: '#e57373' }}>비밀번호</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '5px',
              border: '1px solid #e57373',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#e57373',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          로그인
        </button>
      </form>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <p>회원이 아니신가요? <a href="/register" style={{ color: '#e57373' }}>회원가입</a></p>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default Login;
