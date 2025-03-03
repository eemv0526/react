import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 추가
import Header from '../components/Header';
import Footer from '../components/Footer';

const Gongji = () => {
  const [gongjiList, setGongjiList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null); // Track which row's content is active
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [itemsPerPage] = useState(5); // 한 페이지에 표시할 항목 수
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/gongji/gongji");
        if (!response.ok) {
          throw new Error("데이터를 가져오는 중 오류 발생");
        }
        const data = await response.json(); // 전체 응답 데이터
        console.log("받은 전체 데이터:", data); // 디버깅용
        setGongjiList(data.results); // 결과 배열만 설정
        setTotalPages(Math.ceil(data.results.length / itemsPerPage)); // 총 페이지 수 계산
      } catch (error) {
        console.error("공지사항 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    fetchData();
  }, [itemsPerPage]); // itemsPerPage를 의존성 배열에 추가

  const handleAccordionToggle = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close the currently open row
    } else {
      setActiveIndex(index); // Open the clicked row
    }
  };

  // 현재 페이지에 해당하는 공지사항만 필터링
  const currentGongjiList = gongjiList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // 페이지 번호 변경
    }
  };

  return (
    <div>
      <Header />

      <div className="container mt-5">
        <h2 className="text-center mb-5" style={{ color: '#2C3E50', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
          공지사항 게시판
        </h2>

        <div className="table-responsive">
          <table className="table table-striped table-hover shadow-lg rounded-lg" style={{ border: '1px solid #ddd', backgroundColor: '#f5f9f9' }}>
            <thead style={{ backgroundColor: '#4C9C98', color: 'white' }}>
              <tr>
                <th style={{ width: "10%" }}>번호</th>
                <th style={{ width: "60%" }}>제목</th>
                <th style={{ width: "20%" }}>등록일</th>
                <th style={{ width: "10%" }}>관리</th> {/* 수정 버튼을 위한 열 추가 */}
              </tr>
            </thead>
            <tbody>
              {currentGongjiList && currentGongjiList.length > 0 ? (
                currentGongjiList.map((gongji, index) => (
                  <React.Fragment key={gongji.gno}>
                    <tr 
                      onClick={() => handleAccordionToggle(index)} 
                      style={{ cursor: 'pointer', backgroundColor: activeIndex === index ? '#d1f7e7' : '' }}
                      className={`bg-light ${activeIndex === index ? 'table-active' : ''}`}
                    >
                      <td>{gongji.gno}</td>
                      <td className="font-weight-bold text-dark">{gongji.title}</td>
                      <td>{new Date(gongji.insertTime).toLocaleDateString()}</td>
                      {/* 수정 버튼 추가 */}
                      <td>
                      {localStorage.getItem('codeName') === 'ROLE_ADMIN' && (
    <Link
        to={`/gongjiupdate/${gongji.gno}`}
        className="btn btn-warning"
        style={{ borderRadius: '50px' }}
    >
        관리
    </Link>
)}
                      </td>
                    </tr>
                    {activeIndex === index && (
                      <tr>
                        <td colSpan="4">
                          <div className="accordion-body" style={{ backgroundColor: '#FDCB82', padding: '20px', borderRadius: '0 0 10px 10px' }}>
                            <p className="text-dark" style={{ fontSize: '16px', lineHeight: '1.5' }}>{gongji.content}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    공지사항이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지 네비게이션 */}
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-outline-primary mx-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            이전
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn mx-1 ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn btn-outline-primary mx-2"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </div>

        {/* 추가 버튼 */}
        <div className="d-flex justify-content-end mt-4">
        {localStorage.getItem('codeName') === 'ROLE_ADMIN' && (
    <a
        href="/gongjiadd"
        className="btn btn-lg"
        style={{
            backgroundColor: '#FF7F50',
            color: 'white',
            borderRadius: '30px',
            padding: '12px 25px',
        }}
    >
        추가
    </a>
)}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gongji;
