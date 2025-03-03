// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p style={textStyle}>© 2025 권도균 개인 포트폴리오 리액트+스프링부트+오라클</p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: 'white', // 어두운 색상으로 고급스러운 느낌
  color: 'black',
  textAlign: 'center',
  padding: '20px',
  width: '100%',

};

const textStyle = {
  fontFamily: `'Poppins', sans-serif`, // 우아한 글씨체
  fontSize: '1rem',
  fontWeight: '500',
  margin: '0',
  letterSpacing: '0.5px',
  color: 'black',

};

export default Footer;
