import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BoardAdd = () => {
  const navigate = useNavigate();

  // formData 초기 상태
  const [formData, setFormData] = useState({
    boardTitle: "",
    boardContent: "",
    boardData: null,
    rating: "",
    boardWriter: "", // boardWriter 추가
  });

  useEffect(() => {
    // 로컬 스토리지에서 email 가져오기
    const email = localStorage.getItem("email");
    if (email) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        boardWriter: email, // boardWriter 상태 업데이트
      }));
    }
  }, []);

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 파일 변경 핸들러
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      boardData: e.target.files[0], // 이미지 파일 선택
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = new FormData(); // FormData로 데이터 전송 준비
    postData.append("boardTitle", formData.boardTitle);
    postData.append("boardContent", formData.boardContent);
    postData.append("image", formData.boardData);
    postData.append("rating", formData.rating);
    postData.append("boardWriter", formData.boardWriter); // boardWriter 추가

    axios
      .post("http://localhost:8000/api/board/add", postData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Data added successfully:", response.data);
        alert("게시글이 성공적으로 추가되었습니다!");
        navigate("/board");
        // 데이터 전송 후 초기화
        setFormData({
          boardTitle: "",
          boardContent: "",
          boardData: null,
          rating: "",
          boardWriter: "", // 초기화
        });
      })
      .catch((error) => {
        console.error("Error adding data:", error);
        alert("게시글 추가 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add New Board</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        {/* 제목 */}
        <div className="mb-3">
          <label htmlFor="boardTitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="boardTitle"
            name="boardTitle"
            value={formData.boardTitle}
            onChange={handleChange}
            placeholder="Enter the title"
            required
          />
        </div>
        {/* 내용 */}
        <div className="mb-3">
          <label htmlFor="boardContent" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="boardContent"
            name="boardContent"
            rows="5"
            value={formData.boardContent}
            onChange={handleChange}
            placeholder="Enter the content"
            required
          ></textarea>
        </div>
        {/* 이미지 업로드 */}
        <div className="mb-3">
          <label htmlFor="boardData" className="form-label">
            Upload Image
          </label>
          <input
            type="file"
            className="form-control"
            id="boardData"
            name="boardData"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        {/* 별점 */}
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            Rating
          </label>
          <select
            className="form-select"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="">Select Rating</option>
           
            <option value="1.0">1.0 ★</option>
       
            <option value="2.0">2.0 ★</option>
     
            <option value="3.0">3.0 ★</option>
         
            <option value="4.0">4.0 ★</option>
        
            <option value="5.0">5.0 ★</option>
          </select>
        </div>
        {/* 제출 버튼 */}
        <div className="text-center">
          <button type="submit" className="btn btn-success">
            Add Board
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardAdd;
