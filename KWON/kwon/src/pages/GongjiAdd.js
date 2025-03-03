import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const GongjiAdd = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const currentDateTime = new Date().toISOString();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/gongji/gongji/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          insertTime: currentDateTime  // 현재 시간 추가
        }),
      });

      if (response.ok) {
        alert("공지사항이 성공적으로 추가되었습니다!");
        navigate("/gongji"); // 목록 페이지로 이동
      } else {
        alert("공지사항 추가 중 오류가 발생했습니다.");
        console.error("응답 오류:", response.statusText);
      }
    } catch (error) {
      console.error("데이터 전송 중 오류 발생:", error);
      alert("서버와 통신하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h2 className="text-center mb-4">공지사항 추가</h2>
        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
          <div className="form-group mb-3">
            <label htmlFor="title" className="form-label">
              제목
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="공지사항 제목을 입력하세요"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="content" className="form-label">
              내용
            </label>
            <textarea
              className="form-control"
              id="content"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="공지사항 내용을 입력하세요"
              required
            ></textarea>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary me-2">
              저장
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/gongji")}
            >
              취소
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default GongjiAdd;
