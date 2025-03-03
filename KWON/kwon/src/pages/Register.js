import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom'; // useNavigate 가져오기
function Register() {
    const navigate = useNavigate(); // useNavigate 훅 초기화
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.name) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/sign/sign', formData);
      setSuccess(true);
      setError('');
      alert('회원가입 완료! 로그인을 해주세요!'); // 알림창 띄우기
      navigate('/'); // 회원가입 완료 후 '/'로 이동
    } catch (err) {
      setError(err.response?.data?.message || '회원가입에 실패했습니다.');
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
        backgroundColor: '#fff8f0',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          color: '#d32f2f',
          marginBottom: '20px',
        }}
      >
        회원가입
      </h2>
      {error && (
        <p
          style={{
            color: '#d32f2f',
            backgroundColor: '#ffebee',
            padding: '10px',
            borderRadius: '5px',
            textAlign: 'center',
          }}
        >
          {error}
        </p>
      )}
      {success && (
        <p
          style={{
            color: '#388e3c',
            backgroundColor: '#e8f5e9',
            padding: '10px',
            borderRadius: '5px',
            textAlign: 'center',
          }}
        >
          회원가입이 완료되었습니다!
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ color: '#d32f2f', fontWeight: 'bold' }}>
            이메일
          </label>
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
              border: '1px solid #e57373',
              borderRadius: '5px',
              marginTop: '5px',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ color: '#d32f2f', fontWeight: 'bold' }}>
            비밀번호
          </label>
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
              border: '1px solid #e57373',
              borderRadius: '5px',
              marginTop: '5px',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ color: '#d32f2f', fontWeight: 'bold' }}>
            이름
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #e57373',
              borderRadius: '5px',
              marginTop: '5px',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#d32f2f',
            color: '#fff',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          회원가입
        </button>
      </form>
    </div>
    <Footer/>
    </div>
  );
}

export default Register;
